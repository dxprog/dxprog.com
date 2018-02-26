---
title: "Systems Architecture in the Unknown"
slug: systems-architecture-in-the-unknown
date: 2014-01-29T11:13:27-06:00
tags:
-  webdev
- coding
redirect_from:
- entry/systems-architecture-in-the-unknown/
---
Just over a year ago, I launched [redditbooru](http://redditbooru.com) to the world, rolling together a bunch of ideas spawned by the [awwnime repost checker](http://dxprog.com/entry/a-cute-world-of-programming-possibilities/) into a single place. In addition to that, I added the ability for users to host content in addition to being able to index multiple subreddits. To say that it became a wild success would almost be selling it short. At launch, it was indexing maybe 5 subs, now it's 16, my server went from averaging ~23/Kbps per month to over 10/Mbps, and am nearing 100k pageviews for a rolling 30 day period. Despite exponential growth in traffic, the site has experienced almost no traffic related issues proving that my code is able to handle scale. What started off as a fun little afternoon of experimenting has become quite a success.

However, things are not without their flaws. On the technical side, the cron that does the indexing has some issues; items hosted through redditbooru can't be posted to more than one sub and indexed in both places and sometimes, in an attempt to pick up on items removed by mods, posts will be incorrectly marked as hidden. On the front end, the user experience is a bit of a mess as I kept bolting on features. In typical Matt Hackmann fashion, I decided that I would rework the entire thing mostly from the ground up with all of my learnings in mind while adding in some user requests. But, I was going to eschew the tried and true PHP/MySQL setup for nodejs/MySQL/mongodb in an attempt to learn something new and bring myself up to speed with the current development fad.

Two weeks into development, I am questioning that decision.[break]

## nodejs and Asynchronous Programming

Outside of writing some standard libs, the first thing to get running was the indexer. In the past, [this was a PHP script run on cron](https://github.com/dxprog/reddit-booru/blob/master/cron_reddit-booru.php) every five minutes or so. One great thing about node is that it's incredibly simple to write a program that can handle this kind of time management itself. Also, it can do a great many things at once due to its push for making all the things asynchronous. My goal was to make the new indexer able to update all of the subs once per minute and, for the most part, I've achieved that. But not without issues along the way.

Say you have 16 different sources you need to get data for once per minute. Currently, you have 16 async ops queued. Now, when each of those resolves, you're getting 100 posts back from reddit and each of those items is going to need to be acted on, either to create a new post entry or update stats about an old one. Okay, 1600 async ops. If the post is new you're going to need to do the following:

- need to make an entry in MySQL with all the post data. asyncOps += 1

- determine where the source data is being hosted. If it's an image, cool. Go to step 4

- if it's not an image and, say, an album on imgur, we need to resolve that to a list of images. asyncOps += 1

- we know what images to get, so now we need to retrieve them. this can be done either by external request or a cached version in a mongo store. Either way, asyncOps += numberOfImages

- once the image has downloaded, cached (which can add yet another asyncOp), and processed, we need to create a row for it in MySQL. asyncOps += 1

- once the above operation has comeback with an image ID, we need to save a local copy of the image for serving (asyncOps += 1) and also save a copy to an Amazon S3 store for archival (asyncOp += 1)

- assuming all of that was successful, we need to associate the image to the post, creating yet another row in another table. asyncOps += 1

- assuming all of the above was successful, an object is created from the post and image data and stored in mongo for consumption by the frontend. asyncOps += 1


So, at an absolute minimum, that's 7 asynchronous operations per new post. Remember, there could very well be 1600 of these, all that need to be resolved within a minute and the whole operation starts all over again. But, when you have so many waiting operations, things start to fall through the cracks; HTTP calls stop resolving, MySQL calls are either never made or just never heard from again. It's a bad situation. To get around that problem, I cobbled together a queue system. Reddit requests and post creation/updates are tossed in a big array which is processed every tenth of a second. Added to that, every time an async request is made, a counter is incremented so that the queue system will stop processing once there are so many active async operations. Were I to set that number to one, effectively I've just gone back to synchronous code. I initially set the limiter to 100, though due to a problem I will discuss in just a moment, brought it down to 50. And even then, there are issues. But, for the most part, everything updates within the 1 minute time period and hums along nicely. Until...

## Asynchronous Programming and Memory Management
Say you have a program that analyzes images on a per pixel basis. That requires an incredible amount of memory. redditbooru's largest hosted image is in the ballpark of 9000x6000 and when you expand that out into 4-byte uncompressed RGBA values, that's a whopping 206MB. Now, that's an extreme case; the average image size is 1041x1065, or 4.3MB of uncompressed data. But, since we can have up to 50 things going at once, there's a potential for 215MB of image data floating around on average. Toss in some of those larger images and you could quite easily exceed the amount of total memory in the system. I've been leaving the indexer running for the last several days to ensure its stability, but I came home today to find out it had irrecoverably crashed at some point because it simply ran out of memory. You could have a separate process ensuring that the indexer is always running (similar to [what I've got implemented in production](http://dxprog.com/entry/the-plate-and-the-amount-of-stuff-on-it/)), but an errant process gobbling up memory is going to slow everything else down, and when you've only got the one machine, things need to be as lean as possible.

At this point, I'm at a loss as to how to proceed on that issue. There are a few options:

- Decrease the queue limiter again

- Add a similar queue to the image processor so that it only runs

- Rearchitect the indexer to run as individual processes and then have a master program spawn a handful of them as needed

- Write an image processor in some respectable language (C++) that does all the image processing

- Go back to PHP


## mongodb - I don't even need to say anything else
I've been slowly testing the waters with mongo. The concept is interesting, and the promise of running at "web scale" is certainly alluring. However, mongo's been getting all sorts of bad press and the golden child of the NoSQL era seems to be losing popularity. Still, for my need for having denormalized data, the query mechanism that mongo provides, and a (perceived) notion that it's supposed to be very good in a read heavy environment, I thought I'd give it a try. Hell, I was even going to see if I could avoid the need for memcache. However, because the front end exclusively relies on this dataset, it needs to reflect the actual database very closely. But, as I found out when testing the image search endpoint, for a given set of image IDs coming back from MySQL, one image was missing from mongo's store causing javascript's equivalent of a null pointer exception. Confused, I checked the number of items in MySQL versus the number in mongo.

8% of all images were not accounted for in mongo.

Going back to the list of stuff the cron does above, we know that the very last thing to happen on image creation is the store to mongo. The image has been downloaded, processed, synced to MySQL, saved to disk, and uploaded to AWS. I would expect any one of these to fail before simply inserting an simple object into mongo, something that should never fail because it has no constraint checks. But for 8% of all these inserts to simply... vanish on reported success, it's like all those warnings I'd read about mongo coming true before my eyes. Luckily, I saw this failure well before it ever hit production. I guess what I'll do here is move the mongo schema to MySQL and reinstate the memcache layer or maybe even write some internal caching in the js side itself. Or I could forgo that schema entirely and just live with the four or five joins needed to make that data happen. Mongo I'll keep around for analytics dumping, user sessions, and downloaded image cache, but never again will I consider it for client facing data.

## In Summation
Given the two weeks I've been working on this and the problems I've had already (and the problems still outstanding), I'm wondering why I ever considered moving away from PHP. It's stable, reliable, and fails predictably all on top of me being well versed in how to write it and write it well. I'm happy for the learning experience that's come out of all this and has probably helped make me a slightly better developer over all, but going where I've never gone before on a "massive" project may not be the wisest decision after all. At the same time, I want to know if using this environment will make things faster, more scalable, with less overhead. Of course, Digg did this same thing in the summer of 2010.

And look at what happened to them...

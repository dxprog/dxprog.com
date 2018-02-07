---
title: "A Cute World of Programming Possibilities"
slug: a-cute-world-of-programming-possibilities
date: 2012-11-03T11:52:13-05:00
tags:
- anime
- coding
---
![](http://images.dxprog.com/blog/awwnime.jpg "Yay for fancy headers")

My love for programming and continuing fascination with anime has lead to [projects](http://dxprog.com/entry/its-like-nes-emulator-dev-all-over/) in the past. I've also worked on projects that were related to whatever [online social circles](http://dxprog.com/entry/whew/) I was involved with [at the time](http://dxprog.com/entry/mp-skin-studio-tutorial/). I seem to have found something that covers all of these at once.

Enter [r/awwnime](http://www.reddit.com/r/awwnime/), a subreddit whose sole existence is to pass around pictures of cute characters from various anime. Doesn't exactly sound like a pool of awesome programming project ideas, but one would be surprised. This little subreddit of waifus and awws has inspired no less than four very different projects. I had been kicking around the idea of an awwni.me URL for a few days, so when [this comment came along](http://www.reddit.com/r/awwnime/comments/svdl3/sleepover_madoka_magica/c4hfs7k?context=3), I said "fuck it", dropped a few bucks and registered it.

## Project 1 - Eyebleach Alternative
The [awwni.me](http://awwni.me) base site isn't much. It grabs the latest posts from the subreddit and displays it with basic slideshow style controls. Nothing too elaborate, but it lives up to its initial idea of being an anime alternative to [eyebleach](http://eyebleach.com/).

## Project 2 - Post Title Analysis
This one was entirely curiosity on my point, both of the data that would be generated and the implementation. I wanted to see if I could programatically search for trending topics within the subreddit community, specifically characters and shows. The first step to this end was to build a cron job that would collect all new data on a periodic basis. Then, the title would be parsed against other titles to find the longest, most common phrase. In the end, I spun this off into a [bot that posts statistical analyses](http://www.reddit.com/user/ai-tan) of various things happening in the subreddt. Additionally, it also directly kicked off a project at work programatically associating [similar stories to each other](http://www.newson6.com/story/19992537/broken-arrow-police-make-arrest-in-fatal-hit-and-run-of-a-pedestrian).[break]

## Project 3 - Image Similarity Analysis
**Code** - [GitHub](https://github.com/dxprog/awwnimePostFinder)
Even back in the digg days (when they were called dupes), reposts were an issue. On a subreddit as small as r/awwnime, it's even more painfully apparent. Seeing that I already had the cron collecting all images blowing through, tacking on a little bit of image analysis was fairly easy. The analyzing itself is fairly simple and rudimentary; each individual pixel is broken down into twelve "buckets": red, green, and blue with four slots for value. These values or normalized over the entire image and dumped into a database. From there, it's simple arithmetic to calculate whether an image is similar or not. The final result can be found [here](http://awwni.me/repost). The percentage is hardly accurate and I'm not sure what to do about that, but it only shows 100% for images that are insanely close, so there's that. Interestingly enough, bits of the front end for this project have found their way into another work project (not yet live).

## Project 4 - Bracket
[The Great 2012 Awwnime Bracket](http://bracket.awwni.me/)
This project was entirely to kick up some fun within the community and less for the programming challenge (although, that did rear its head). Every year in Japan, there's a thing called the [Saimoe Tournament](http://www.animesaimoe.org/) wherein people will vote for their favorite characters from the previous year of shows. I wanted to bring that to r/awwnime, so I did. Figuring out how the stupid thing would actually work required some thinking, and running it has been both gratifying and tedious. In the end, I settled on a nomination round, an elimination round, and now we've moved on to the bracket proper. There were over 800 nominations to sift through and as of now, over 50000 votes have been cast. Keeping cheating and gaming of the system to a minimum required a little engineering, but the real programming challenge was generating the [bracket images](http://cdn.awwni.me/bracket/bracket_full.jpg). Lots of math. I sometimes suck at that. I did have fun designing the look and interface of this one, though. I don't do that too often.

I don't know what this little community will inspire me to do next, but it's given me half a year of nice little brain challenges and nice pictures.

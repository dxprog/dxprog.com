---
title: "Fun with Load Balancers and Running on Lean Disk Space"
slug: fun-with-load-balancers-and-running-on-lean-disk-space
date: 2015-03-29T09:30:33-05:00
tags:
- coding
---
A while back, I spun up a new server and threw a load balancer on top of it and my existing server. The primary reason at the time was to allow cdn.awwni.me to continue to run while Linode performed some mandatory maintenance on the original server (we'll call it "Chitoge"). The size of that directory at the time was somewhere around 100GB; my new server (we'll call that one "Taiga") has something like 20GB of total space. Obviously, I couldn't clone from Chitoge to Taiga, so I got a little clever. Using some fun around the hosts file, the nginx site config, and a small [PHP script](https://github.com/dxprog/rbcdn), when a file can't be found locally, it'd be retrieved from the Amazon S3 store I use as long term backup. S3 is slow, though, so I later changed it to pull directly from Chitoge. This helped both with speed and didn't count against traffic since internal network traffic is free. In a bout of laziness, instead of opening a connection to that server via IP and hand massaging the 'Host' header of the request (or mounting some sort of file share), I just host overrode cdn.awwni.me on Taiga to point to Chitoge. Everything worked great.

Last night, knowing that I was soon to exhaust space on Chitoge (a thing that has happened on more than one occasion), I decided to convert it over to the same setup as Taiga. This would allow me to kill dozens of gigabytes of locally stored images and extend the life of my server plan at least a couple of years. Knowing that I was now deleting Taiga's source of truth image store, I changed up the script to check from a pool of servers; first try a local server, then if that fails, go to AWS. That worked fine and, while I was setting this script up on Chitoge, I decided that it should check against Taiga just in case it had a copy before wasting time downloading from AWS.

I got everything set up and started deleting old image files. Everything seemed fine, so I let the deleting continue and went to bed.

When I woke up, I was greeted by many messages in my reddit inbox saying that images were experiencing 50x errors. My initial thought was that I was saturating the CPU/connection with that long running process, so I killed it. I was unable to repro any errors, so I went on my merry way... until somebody new complained. Well, fuck...

To make a long story short, because I had pointed each server to each other, I was creating an infinite network loop whenever an non-local image was requesting. Here it is in traffic logs:

[User Request -> Taiga] GET /the_image.jpg
Doesn't exist locally. Retrieving from first server in pool: http://cdn.awwni.me/the_image.jpg (Forced pointing to Chitoge)
[Taiga -> Chitoge] GET /the_image.jpg
Doesn't exist locally. Retrieving from first server in pool: http://cdn.awwni.me/the_image.jpg (Forced pointing to Taiga)
[Chitoge -> Taiga] GET /the_image.jpg
Doesn't exist locally. Retrieving from first server in pool: http://cdn.awwni.me/the_image.jpg

So, basically that until the scripts start timing out. Now, in a normal infinite loop, you kill your own process but, generally, should be safe from affecting others. However, here, every time there's a new request, that's potentially a new instance of PHP being spun up because the other instances are deadlocked waiting for data. So, eventually, the entire chain collapses and you start getting orangereds in your reddit inbox.

In the end, I still have Taiga sourcing from Chitoge since all image uploads go directly there and, generally, Chitoge will have a copy of the file. Chitoge will always take the AWS hit when a file doesn't exist to avoid this loop scenario. There are many ways I could avoid this scenario entirely, but for now, this set up is getting the job done.

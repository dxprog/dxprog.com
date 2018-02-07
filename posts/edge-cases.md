---
title: "Edge Cases"
slug: edge-cases
date: 2013-10-04T11:48:00-05:00
tags:
- daily
---
I'm grasping at straws on what I should post, especially given that I have thirty minutes to write something. I thought I was doing well by actually *having* a post whereas my dear sweet mother had not, but a quick check reveals [that she's on top of her game](http://mom28kids.com/2013/10/oh-crap-i-have-to-write-another-post/), probably with quality.

Browsing through my pictures folder, I came across a few things involving redditbooru's reverse image search. At this point, the thing is an essential tool for the /r/awwnime sub, and when it doesn't work, I get notified. I've [mentioned before](http://dxprog.com/entry/a-cute-world-of-programming-possibilities/) that the image analysis is entirely color based, no edge or corner detection or anything like that. So, when somebody brings up something and my human mind is all "huh, it seems like that should have matched", I'm invariably sent down a rabbit hole of figuring shit out.

![](http://cdn.awwni.me/mhf9.jpg "Taiga...")

This was the first one I had to deeply investigate. The one on the left was the original, repost on the right. It should be noted that the right picture was also animated. The images are squashed because all images are resized to 256x256 to help normalize things, especially useful for taking into account resized pictures. But, the image search failed to pick up on this for a couple reasons: A) the gif is ever so slightly brighter, probably due to the color quantization. Actually, that's really the only thing. The ever so slight facial expression difference would almost certainly be picked up if the color space was the same.

We had some discussion on the thread about whether testing against greyscale would be any help, but the difference was enough that it didn't bring the matches any closer.

![](http://cdn.awwni.me/mhfa.jpg "Skyfaaaaall")

This one was fun. The above picture is the original, the repost I have no idea where it is, but I have some explanation images.

![](http://cdn.awwni.me/mhfb.jpg "Slight differences")

The left side in this case is the repost and you can tell that there are some slight differences in both form and colors, certainly enough to throw off the image search. What I had trouble wrapping my mind around was that these were clearly two different images, but which one was the original and why was there one slightly different.

![](http://cdn.awwni.me/mhfc.png "Overlayed comparison")

Turns out, the slightly shittier left version (not saying it's shitty, it's certainly kicking my ass and most of my other body parts at art) was somebody copying the original in an attempt to improve their art skills.

That's cool. I've been there too.

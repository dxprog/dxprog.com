---
title: "Another Code Battle Royale"
slug: another-code-battle-royale
date: 2010-11-15T22:32:17-06:00
tags:
- coding
- contest
- php
---
My brother and I are programmers. This must be discreetly understood or no good will come of the story I am about to regale. Every [once and again](http://dxprog.com/entry/a-coding-compo/), we'll embark on a coding competition. Last time was a game, this time a chat client. My weapon of choice was various web languages (PHP and JS for the programatic stuff) and his was C++. Arguably, I had an advantage.

Even though I was able to bypass the whole sockets layer, I did set a rule for myself: I could not resort to using a transactional database (i.e. MySQL). Granted, I didn't foresee any issues as I had the power of APC caching on my side. It turned out that this would be what I fought with most and, eventually, just give up on.

For whatever reason, despite the fact that apc_store was returning success on caching an object, it would not persist. A quick call to apc_exists immediately after the store command with the same cache key confirmed this. I went round and round with this issue. Sometimes the object would persist for one or two sessions but ultimately would up be dropped. I read somewhere that storing an array of objects could cause issues (which I was doing), so I serialized the bitch before caching. No dice.

In the end I said "screw it" and just created my own disk-based caching model. I decided to take the whole thing a little further and account for cache collisions (two instances accessing the cache at the same time) which may or may not work. The only reason I even bothered was because I have an ID variable that needs to iterate for every single chat posted and sought to avoid two scripts running simultaneously and writing an erroneous value (a point that was raised in some fashion during my [Digg interview](http://dxprog.com/entry/the-digg-debacle/).

So, two hours after the initial one we'd allotted for the competition, I wound up victorious. While not glamorous, my chat client does indeed work: [Live Demo](http://dev.dxprog.com/quickChat) - [Source](http://dxprog.com/files/quickChat.zip)

What of my brother's program? Well, let's just say the computers weren't talking too nice and the program kept crashing.

Victory is mine!

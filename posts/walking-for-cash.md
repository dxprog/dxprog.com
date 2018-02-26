---
title: "Walking for Cash"
slug: walking-for-cash
date: 2010-04-25T23:25:08-05:00
tags:
- fitness
- html5
- web dev
- work
redirect_from:
- entry/walking-for-cash/
---
As I'd briefly [touched upon](http://dxprog.com/entry/parental-pimps/) in an earlier post, my place of employ is currently having a little fitness competition: can you walk 10,000 steps a day for 75 days? If you reach the grand and glorious total of 750,000, you are awarded two free days of vacation. Everybody was provided with company branded pedometers to keep track of our steppings and left to our devices.

Now, I'm never one to turn down an opportunity to make [money for nothing](http://www.youtube.com/watch?v=V5ZEzWwKJnY), so I'm doing my best to make a firm effort and accomplish this goal. If you take a look at the [blog main page](http://dxprog.com/blog/), you'll see that there is a graph with my current progress on this mission (assuming you're using an HTML5 compliant browser). As you may well notice, I'm a few thousand steps shy of my quota for this week (shame on myself).

Now, that's the boring part. The cool part (and the reason I'm posting) is the really the graph itself. Back in [December](http://twitter.com/dxprog/status/6522777949) I switched the site codebase over to HTML5. Now, this was mostly a change in semantics, using new tags such as <article> and <section>. I'd not done anything special with CSS3 or some of the newer, funner tags such as <video> or <audio>. One major thing I'd really not looked too much into was the new <canvas> tag, with the ability to draw images in the browser on the fly.

That all said, I needed some place to test this exciting new functionality, and making the graph was just the place. To update update said graph, all I do is modify a JSON data file with my step information, and HTML5/JS takes care of the rest. Of course, this leaves people using IE in the dust, but this site was never designed for them anyways.

So, there you have it. A fitness contest spurned my thirst for learning. Now, if IE9 could speed along and summarily obliterate the install base of all previous versions before it, life would be a joy of canvasy win!

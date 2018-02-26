---
title: "RedditBooru v2 - Postmortem"
slug: redditbooru-v2-postmortem
date: 2014-08-03T02:59:52-05:00
tags:
- coding
- general
- redditbooru
- webdev
redirect_from:
- entry/redditbooru-v2-postmortem/
---
Back in January, I wrote a rather [frustrated post](http://dxprog.com/entry/systems-architecture-in-the-unknown/) about rewriting RedditBooru on a new tech stack and how everything sucked. Six months (almost to the day) after that post, I finally launched the second major revision of the site. That launch was not without a whole bunch of drama.

## Codebase Direction

In the aforementioned post, I was originally developing on a stack consisting of nodejs and mongoDB. Shortly after, I abandoned nearly everything I had written, the only thing carried over being the few templates that were done. There were many lessons learned in that excursion, particularly "if it ain't broke, don't rewrite it". I decided that instead of again rewriting everything from the ground up, I would work off of the existing codebase and retool that. This proved immediately to be the right idea, as I was able to quickly port many of the new things I'd written in node to PHP but without any of the stability issues. The first of these was the cron job.

The nodejs version of the cron (which was more of a daemon than a cron, really) heavily used async operations which allowed it to index all sources very quickly, generally in a matter of seconds. PHP is by its nature not async friendly, so I employed some clever process management handled by node, something that I'd casually thrown out as an option to resolve my node woes. The node manager keeps a pool of 4 indexer processes running, allowing for multiple sources to be indexed simultaneously in individual hardware threads but with all the benefits of synchronous code for each individual process. This proved to be rock solid right from the start, though did result in high CPU usage as I'd noticed in the first few days after launch. It was enough of an issue that I dropped the maximum number of processes down to one. Turns out I was unnecessarily hammering MySQL for data, and by [being smarter about my DB calls](https://github.com/dxprog/reddit-booru/commit/1e331512f95f7c61b980573f155629c9cd75f66c), CPU usage was dropped almost to 0 and I was able to ramp back up to 4 processes while still utilizing less CPU than in the previous single running process.

One major change I did make to the front-end was to use [backbone](http://backbonejs.org/) as my JS framework. The primary reason I did this was to familiarize myself with the MV* frameworks that have been all the rage lately and I know the day is coming when I'll need to know this stuff for work. The other reason was that it provided logical structure to my JS instead of haphazardly throwing everything into a single JS file. The only issues I had with the framework were around it's handling of routes, a chunk of code I eventually just [wrote myself](https://github.com/dxprog/reddit-booru/blob/master/static/js/dev/controls/Routes.js) to suit my particular use cases. All in all, I'm pretty happy with backbone, but I feel that I probably did not use it to its fullest advantage. I probably could've gotten away with no framework and using something like [Fiber](https://github.com/linkedin/Fiber) to give me a nice, classical style OOP scheme to work off of.

## Release Day

So, development went pretty smoothly once I kept doing things I knew how to do. And everything was fine... right up until just before the hard date I'd set for release (June 30th, in this case). A couple days before release, I went over my hosting bandwidth cap on the existing server, something that had been threatening to happen for months. I quickly began scrambling to figure how to route traffic to places where I wouldn't be paying the enormous overage fees I would be getting from my hosting. During all that, I made the decision that I should just spin the new redditbooru up on a new machine, one with much greater bandwidth caps. Many hours of file copying later, I had all of my sites on the new machine with traffic slowly diverting over there... except for redditbooru. Because of how it names hosted files, this would have to be transferred over last. And everything probably would have gone okay... if I hadn't forgotten one thing. As the traffic was shifting from the old machine to the new machine, there were weird anomalies showing up with pictures people had posted to reddit, namelyt different people were seeing different things for the same file. At this point, it should be mentioned that a user's DNS could be in one of four states:

- pointing to CloudFlare (which would be pointing to one of the following)
- pointing to AWS
- pointing to the old server
- pointing to the new server

My initial thoughts were that one or two things slipped through before I migrated the database from the old machine to the new machine. I had disabled uploading on the old one, so there shouldn't be any collisions. Except for the fact that I'd forgotten to also turn off the indexer on the old box. This was causing the two separate machines to constantly overwrite each other's images on AWS and since their database IDs were very different, those images would be different as well. And, I was powerless to do anything while the DNS was propagating. Of course, the old indexer was shut down which resolved all issues going forward and I overwrote all the bad images on AWS using the new machine as the source of truth, but it was still a waiting game as that DNS finished up so I could turn off the old server.

It was a hellacious couple of days and I'm honestly surprised anybody still trusted my software after that.

## One Month Later

It's now one month later and things have finally smoothed out. Of course, there are still some issues I've been experiencing with the new software and new machine. For instance, all sites on that machine stopped working a week or two ago. Turns out that MariaDB had enabled binary query logging by default and had exhausted all of the available disk space (some 77GB of logs). MongoDB, which I'd relegated to image caching and internal metrics logging, also just fucking died a couple times, bringing all of RB with it. I've since disabled mongo and migrated the image caching to a [simple disk based system](https://github.com/dxprog/reddit-booru/commit/1c15499f6c21d98de695cb571640a2cba6cd210a). This leaves me in a bit of a bind as many features I had planned were going to use mongo for a denormalized data store (stats type things, mostly). I'm currently looking into redis as a possible way replacing this.

All that said, RedditBooru is healthy now and people are taking advantage of the new features built in, particularly the inline image viewer. That feature is so popular that time-on-site has jumped a full minute and my bandwidth for last month approached 6TB, a full 2TB over what my previous bandwidth cap. This is again going to fast become a major issue, one that needs resolving pretty quickly.

I think overall what I can take away from this whole experience is that calm works makes for higher quality work. Panic only brings additional pain.

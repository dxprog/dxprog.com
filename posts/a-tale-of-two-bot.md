---
title: "A Tale of Two Bots"
slug: a-tale-of-two-bot
date: 2012-01-15T15:24:17-06:00
tags:
- coding
- php
redirect_from:
- entry/a-tale-of-two-bot/
---
![](http://images.dxprog.com/blog/reddit_bots.jpg "Pew pew pew")

RedditBots Source: [ [Download](https://github.com/dxprog/RedditBots) ]

One day, somewhere between Christmas and New Years, a coworker of mine was musing out loud about a vanity reddit account he had created. He was describing exactly what it would do and I was like "dude. We can automate that." So, in a fury of coding and some poring over reddit documentation, I pulled together a very simple bot that did exactly what he had described. Slapped it on an every ten minutes cron job and called it a day. The code was ugly and I vowed to make a nicer version.

That I did and, while I was at it, decided that I should make it a simple framework with which I could bots in a simple manner and have a central script that managed them all. The above source is what I settled on (complete with a working, if not banned, version of a binky79 clone).

My own bot idea, as it was Christmas, was for a bot named Ebeneezer_McUpvote (a portmanteau of Ebenezer Scrooge, Scrooge McDuck and everyone's favorite reddit term, upvote) to randomly upvote a new link and add the comment "Merry Christmas! Have an upvote ^ _ Q". Scripted, running, would execute every five minutes.

[People hate it.](http://www.reddit.com/user/Ebeneezer_McUpvote)

As of this writing, that bot has -310 comment karma. Now here's where the fickleness of reddit shows through.

Yesterday, as I was browsing, I came upon [this post](http://www.reddit.com/r/funny/comments/ogjx1/its_439pm_saturday_in_australia_i_am_drunkthis_is/). So, Oprah giving random upvotes is considered cool, eh?

Enter, [OprahGivesAnUpvote](http://www.reddit.com/user/OprahGivesAnUpvote). She does pretty much EXACTLY the same thing as Ebeneezer_McUpvote, only she says "Look under your chair... you got an UPVOOOOOOOOTE!!". People love her. OprahGivesAnUpvote has, at this writing, 233 comment karma and she's only been running since yesterday morning.

Why the hatred? I dunno. Maybe people don't get the joke of Ebeneezer_McUpvote. Maybe the joke just sucks. Maybe it's not Christmas anymore. Either way, Oprah is loved, McUpvote is not. I'll be interested to see if Ebeneezer's fortune turns around when we get closer to Christmas again...

---
title: "It's an Exercise in Laziness"
slug: its-an-exercise-in-laziness
date: 2018-03-05T20:29:00-06:00
tags:
- "blog a day"
---
I missed yesterday, so... damn. To be fair, there was a rather deadly Oscars drinking game involved. It's helped bolster the feeling I've been having that... I actually kind of _miss_ not drinking. To that end, I shall just try to drink less. Also, not whiskey.

But, that's not today's post. Nah, today I'm not sure what to write about, so I'm just going to post the thing I _did_ write yesterday, namely the one year lookback for my [RedditBooru/AnimeBracket Patreon](https://www.patreon.com/dxprog). For those not aware, Patreon is a crowd-funding site where people can donate to creators on a per project or monthly basis. Over the years running these sites, I've had many people ask if they could donate money, and generally, I turned those down. But, I actually calculated the server costs one day and decided that Patreon would be a good way to offset costs. It's been way more successful than I had imagined and I'm very touched that folks are actually willing to monetarily help out these little projects of mine.

But enough actual writing, time to exercise my copy/paste abilities.

## [One Year Later](https://www.patreon.com/posts/one-year-later-17363919)

It's now been one year since I started this little Patreon, and I want to take a look back on the last year, both in continuing to be completely transparent about the costs but also what was achieved. Finally, I'm going to outline my plans for this year.

First off, costs. Instead of shoe-horning a spreadsheet into this post, [here's an actual spreadsheet with the breakdown](https://docs.google.com/spreadsheets/d/1RJWevaMKnnLgRydd3EHV2Y8UU-JGsCSTx7UerP49Esg/view?usp=sharing). TL;DR - Patron support over the last year covered one third of all hosting costs! And this was with two additional servers being brought on and [bad software on my part literally adding hundreds of dollars to the bill](https://www.patreon.com/posts/recent-outage-in-14020838). Adding that thumbnail server has ultimately saved money.

So, here are the things that were accomplished since February of last year:

**AnimeBracket**

- New home page design with featured popular brackets
- New elimination round admin tools
- Code made PHP7 ready (even though it's running on HHVM)
- Lots of [various small fixes](https://github.com/dxprog/anime-bracket/commits/master)

**RedditBooru**

- Entire site is SSL enabled
- Thumb generation was made its own service, massively reducing costs and adding stability
- Better image sizing for gallery pages
- Browser extension updated for Chrome/Firefox
- Lots of [various fixes](https://github.com/dxprog/reddit-booru/commits/master)

**Future Plans**

AnimeBracket definitely has the lions share of things immediately planned. Here's what I'm thinking:

- Ant-cheating measures. Things got really bad towards the end of last year with people submitting hundreds of votes from bot accounts.
- The ability to rollback brackets to previous rounds. I would've liked to have finished this last year.
- Open up AnimeBracket to non-anime brackets by adding categories and moving to new site

And for RedditBooru:

- Mod tools. People have always been a little confused on how to get their subreddits indexed and my leaving reddit has exacerbated that a bit. Additionally, giving mods the ability to set the config options I do by hand is probably a good idea.
- The number of indexed subreddits is starting to create some UI issues, so I need to take a look at that

So, that's a look back and a peek forward. Thanks again so much for your support and I look forward to what happens in the upcoming year!
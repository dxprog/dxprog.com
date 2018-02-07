---
title: "2013 Anime Boys Bracket - A Postmortem"
slug: 2013-anime-boys-bracket-a-postmortem
date: 2013-10-05T10:43:00-05:00
tags:
- daily
---
Today wound up the [anime boys bracket](http://bracket.awwni.me/2013-boys-bracket/view/) I ran as a precursor to the big girls bracket, testing out some new rules and a much needed overhaul for the administrative side. All in all, it was a roaring success.

## Code Changes

On the whole, I had developed out the system to be fairly robust on the user facing side by the end of the last bracket. The only real issue remaining there was that the bracket overview was a set of enormous images. This year I fixed that by rendering everything client side as a standard page, with a tiny bit of interactivity sprinkled in (that's what I linked above). The real work was done on the backend, moving all the administrative code into the model/controllers and out of CLI scripts I had quickly hammered out. That part was an absolute godsend because all I had to do was login and click "advance bracket". Granted, this could be done on a cron job, but I have to be present to write the [recap post](http://www.reddit.com/r/awwnime/comments/1nts6x/2013_boys_bracket_and_the_winner_is/) anyways. Also, there were almost no technological hiccups this year which made everything so much less stressful.

## Curbing Abuse

Last year, there were some groups of users hell bent on getting their character voted in no matter the cost. Because of the rush I was in to get the code out the door, the system was pretty easy to get around in terms of flooding votes. All votes were tied to IP, so you could either get friends to help, go to the library and vote again, or just power cycle your phone. Because everything was IP based, I can't say how much abuse there was, but I suspect there was a fair amount.

This year, everything was tied to reddit user accounts, using OAuth for authentication. A user would have to have a valid account and that account needed to be at least a month old. I still recorded IPs with the registrations to keep track of multiple users under a single IP. Out of the 660 users who voted, only about a dozen had more than one user to an IP and never more than two. So, another big win.

## Stats

![](http://i.imgur.com/SLrruty.jpg "An upward trend")

In all, 19841 votes were cast and daily views (seen above) were in the hundreds per day. This really doesn't even hold a candle to the bracket last year which had ~264000 votes and thousands of views per day. Now, the vote thing can be partially attributed to the above abuse but also the fact that that bracket ran a lot longer. It was 256 characters as opposed to 64. Still, I'm pleased with the turnout. Most voting happend at 5a CDT at 11% of all votes, 6a came in second with 7%, and 2p and 3p were tied for third with 5%. 3a was the quietest time at 2%.

In all, running this bracket was pretty stress free and very much enjoyable. Granted, I wasn't totally invested being a heterosexual male. But still, everybody else seemed to enjoy it as well and what shit slinging there was was conducted in a civil manner.

I'm not so optimistic for the girls bracket which starts in three weeks...

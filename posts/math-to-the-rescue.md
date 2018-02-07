---
title: "Math to the Rescue"
slug: math-to-the-rescue
date: 2013-11-07T10:24:18-06:00
tags:
- bracket
- general
---
The bracket, which I have mentioned so many times by this point, continues to be an entirely intriguing project. Brackets in general are a very math heavy thing, full of all sorts of logistical and statistical related calculations. Setting up a bracket per [standard sports seeding](http://en.wikipedia.org/wiki/Seed_(sports)) was a bit of a fun nut to crack by itself. However, the interesting problems have been the ones relating to issues cropping up while the bracket's running.

Eliminations and actual user voting began last Saturday and was off to a pretty good start. The next day had an even better turnout. And so it's continued.

Day 1 - 7054 votes, 370 users
Day 2 - 9947 votes, 623 users
Day 3 - 11512 votes, 647 users
Day 4 - 12956 votes, 680 users
Day 5 - 13731 votes, 816 users
Day 6 (in progress) - 14799 votes, 1005 users

As can be seen, each day has had quite a bit of increased turnout over the previous day and the trend doesn't seem to be stopping. This has brought around the very real problem of girls in the first day suddenly having very low vote counts compared to those in the later days.

And that's where math comes in.

To help normalize all the votes against each other, each girl has her votes calculated as a percentage of her day's votes. This is then applied against the day that had the highest number of votes:

adjusted = round((characterVotes / dayVotes) * maxVotes);

(Yes, I'm aware that those extra parenthesis are superfluous thanks to order of operations)

So, now each girl can be correctly ranked against how well she did within her own group and not just as an overall sum.

![](http://i.imgur.com/6LPypdD.jpg "Math is fun when it's fun.")

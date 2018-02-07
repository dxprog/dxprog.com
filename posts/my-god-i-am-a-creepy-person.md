---
title: "My God, I am a creepy person"
slug: my-god-i-am-a-creepy-person
date: 2014-02-16T01:07:30-06:00
tags:
- general
---
I have this personal website, which essentially means I am my own little mini NSA. If I wanted to, for example, find out if a person I have very few details on were to visit here, I'd be able to find that out. Let's say, for example, I know what probable day they'd view this blog, what page they'd be coming from, and approximately where they live.

Well, I have enough data to know (probably) if that person hit my site and what they did when they got here.

As a hypothetical example, let's say I know they're somewhere in Northern California, probably came to the homepage via a Google search, and did so on February 13th. Alright, first thing's first, grep the logs for that day, that page, and exclude crawlers...

Sweet, now I have a list of IPs. Let's plug those into [MaxMind geoip lookup](http://www.maxmind.com/en/geoip_demo) and see what comes of it.

Hmm, no exact match, but ISPs are fuzzy about location and this one is certainly within the area! Alright, now grep the logs for that IP address...

Okay, the person was on the homepage for about three seconds before going to the art page. Once there, they clicked on [three](http://dxprog.com/uploads/Vesperia-Doll.jpg) [pieces](http://dxprog.com/uploads/Kagami_Doll.jpg) of [art](http://dxprog.com/uploads/HanakoChristmas.jpg) before leaving the site. All in all, about a minute of time elapsed between the first and final requests.

Other fun things you can find out while grepping logs is that your mother and former boss are the most frequent visitors to your site. The latter - going under a pseudonym - even listened to the Inception soundtrack on your music page sometime back in November while at work.

This is, of course, all hypothetical.

---
title: "The Automated Warner Waterer"
slug: the-automated-warner-waterer
date: 2016-09-01T04:01:32-05:00
tags:
- coding
- raspi
---
[![youtube video](https://img.youtube.com/vi/R0EhqLACsw4]

Out of nowhere, a blog post!

I'm currently in possession of my brother's frog whilst he gets his new life set up. I love the little guy (the frog, not my brother), so I'm okay with this. The only downside is that it does keep me attached to my place to care for him (again, the frog) at a time in my life where I can do whatever the hell I want whenever the hell I want.

To that last point, I booked a rather spur of the moment trip to visit good ol' [devbus/0.jpg)](https://www.youtube.com/watch?v=R0EhqLACsw4]

Out of nowhere, a blog post!

I'm currently in possession of my brother's frog whilst he gets his new life set up. I love the little guy (the frog, not my brother), so I'm okay with this. The only downside is that it does keep me attached to my place to care for him (again, the frog) at a time in my life where I can do whatever the hell I want whenever the hell I want.

To that last point, I booked a rather spur of the moment trip to visit good ol' [devbus)(http://dxprog.com/comic/dark-over-light/) over the long weekend. Now, the frog (who from hereon out will be referred to as "Warner") can live with some neglect, particularly on the food side of things. I'll only be gone four days, which should be fine. Still, he should be kept moist regularly and that's been weighing on my soul.

Enter the Automated Warner Waterer! (Or, "aww" for short)

## The Supplies

![](https://cdn.awwni.me/tu48.jpg "SUPPLIES!")

- One small fountain pump (picked up at Home Depot)
- Some 1/4" tubing
- Plugs for said tubing
- One Raspberry Pi (I used a 3)
- One [reused, relay-controlled gangbox](http://dxprog.com/entry/christmas-lights-extravaganza/)

Excluding the Pi and the box which I already had, I spent about $25 for everything. Not too shabby. Oh, and this isn't meant to be a blog-by-blow tutorial. I'm not instructables...

## Building It

![](https://cdn.awwni.me/tu4b.jpg "If you look real closely, you can see Warner")

The water pump and tubing stuff came together pretty easily, the stuff that I figured would be difficult. Despite it being drip tubing, I wound up punching some holes as the pump wasn't strong enough to force the water through. Other than that, cake all the way.

![](https://cdn.awwni.me/tu49.jpg "So much wires")

Setting up the script and such to control it via the Raspberry Pi turned out to be trickier, or the part I figured would be easy. Some stuff I learned:

- The Pi has 5v out, which is great for my relay card. But the GPIO pins are only 3.3v, something my relay card did _not_ like. An NPN transistor fixed this.
- The relays themselves are active when they're pulled low, something I do not recall when messing with them before. Had to do some rewiring so that the pump would be off when the relay is engaged (which is basically all the time when the Pi is on). This of course means that if the Pi loses power, that pump will always be on.
- When running something as a cron job, you don't get the benefits of running with that user's shell. So, when you run node, you need to absolute path to that

## The Result

![](https://cdn.awwni.me/tu4a.jpg "The business end")

The way everything is set up now, I can manually water Warner by running the script through SSH, but it's also set to water for fifteen seconds every day at 3PM. In addition to that, it will reboot the Pi at 3:01PM, resetting the GPIO pins and shutting off the pump just in case something went wrong and the script hung with the pump on. MY CODE HAS LIVES IN THE BALANCE.

A pretty good way to spend half a day and it'll make me feel more at ease while I'm away.

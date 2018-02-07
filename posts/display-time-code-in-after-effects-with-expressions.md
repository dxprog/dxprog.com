---
title: "Display Time Code in After Effects with Expressions"
slug: display-time-code-in-after-effects-with-expressions
date: 2008-11-03T21:28:32-06:00
tags:
- after effects
- coding
---
Whilst working on my current video project, I came across a need to display the current time code. Expressions are the answer, of course, so I came up with this.

[code=javascript]txt = "";
frames = timeToFrames(t = time + thisComp.displayStartTime, fps = 1.0 / thisComp.frameDuration, isDuration = false);
f = frames % 30;
s = Math.floor(frames / 30);
m = Math.floor(s / 60) % 60; s %= 60;
h = Math.floor(m / 60);
if (f &lt; 10) f = "0" + f;
if (s &lt; 10) s = "0" + s;
if (m &lt; 10) m = "0" + m;
if (h &lt; 10) h = "0" + h;
txt = h + ":" + m + ":" + s + ";" + f;
txt[/code]

Simply attach this expression to the Source Text property of a text layer and viola!

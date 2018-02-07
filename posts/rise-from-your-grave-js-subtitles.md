---
title: "Rise From Your Grave - JS Subtitles"
slug: rise-from-your-grave-js-subtitles
date: 2010-11-26T19:23:14-06:00
tags:
- coding
- html5
- javascript
- video
---
![](http://images.dxprog.com/blog/rise_from_your_grave.jpg "It LIVES!")

It's that time of week again! Now, [last week](http://dxprog.com/entry/rise-from-your-grave-chainploder/) I made an allusion that there wouldn't be many more new or non-VB projects. Well, this is week defies that in both that this is something pretty recent (this year) and not VB (JavaScript, in this case).

You are certainly well aware of the so-called [Music Page](http://dxprog.com/entry/celebrating-one-year-of-the-music-page/). What most people are not aware of is that there has been a video counterpart to it for almost as long, though its development has been far slower. In its original incarnations, the video page was a way for my bros and I to watch shows across the interwebs while I was in college. Now-a-days, it acts as simple front-end for VLC running on my server. But, streaming is certainly in the plans for it yet.

That in mind, I had begun playing around with the webm codec when it was released for this purpose. However, one naggling issue was that a good chunk of my content is in foreign language (I'll let you guess which one) and ffmpeg is not capable of burning on subtitles. I did a little research around, but ultimately decided that I would just write my own subtitle parser on the front end player - i.e. parsing and displaying SRT formatted subtitles with JavaScript using HTML.

This is arguably pretty easy (the basics of the format are very human readable) and I had a working implementation within about a day. The largest hurdle was getting the timing correct and finding a display format for the font that would allow it to be readable without going old school closed captions style and blocking out the video behind (I settled on a soft yellow with a CSS3 drop shadow). There is some rudimentary support for subtitle position animation, but little else. I would love to get some of the fancier animation stuff implemented as there are many anime that script the karaoke portion of the OP/ED to nice effect.

You can check the subtitles test page here: [ [JavaScript Subtitles](http://dxprog.com/labs/subtitles/) ].
You'll need an HTML5 compliant browser that supports h.264 (Chrome, Safari or IE9 at this point). Also, all the source is in the one file, so just do "view source" in your browser and there it is.

Next week I promise there will be VB goodness!

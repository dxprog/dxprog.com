---
title: "The Neverending Project - Part 1"
slug: the-neverending-project-part-1
date: 2011-10-12T22:20:17-05:00
tags:
- coding
- music
---
I've [blogged](http://dxprog.com/entry/celebrating-one-year-of-the-music-page) about it [before](http://dxprog.com/entry/a-year-of-music-now-with-interactive-graphs/), so I'll keep the introductions short: for the last three years I've been developing, on and off, a web based music player. The last time I talked about features was v3 and I'm now two versions up from that. In today's post, I'll highlight version 4.

[url=http://images.dxprog.com/blog/dxmpv4.jpg]![](http://images.dxprog.com/blog/dxmpv4.jpg "More like a sandbox than a polished product")Click for larger view...[/url]

As you can see, v4 was hardly polished. It fell victim to the "I want to add new features but I don't want to design for it" that v3 had towards the end of it's life (hint: it's the row of links towards the top). v4 was the first to go three column, based loosely off of what Microsoft was doing with the Zune player. The first column was for albums, second for whatever-the-fuck-I-wanted (songs, trending and latest in this case), and the third was the current playlist.

Also introduced in this version was a new extensible player module. I had tacked HTML5 capabilities onto v3 down at the end of its life, but this was the first to be built with that in mind. Also, it was the first to be able to switch output sources (here's where the modular part comes in) from HTML5 to remotely controlled VLC, which would play music out of the server itself. This could be done on the fly without having to use a separate page entirely, as had been done.

Finally, I had made a few things that would aid in the finding of media. Based upon recorded play data, you could get a list of media that was trending in the last seven days. Also added was a search-as-you-type function to quickly locate songs.

Oh, and yes there's a "video" tab there, but it never did anything. I had grandiose plans to merge my separate "video page" into this, but they never panned out.

Ultimately, v4 was just a testing ground for a lot of ideas that all got packaged up neatly in v5...

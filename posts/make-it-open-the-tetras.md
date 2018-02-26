---
title: "Make it open - The Tetras"
slug: make-it-open-the-tetras
date: 2011-01-29T11:24:41-06:00
tags:
- code
- release
- tetra
- web
redirect_from:
- entry/make-it-open-the-tetras/
---
![](http://images.dxprog.com/blog/tetra_logo.jpg "The Tetra logo, courtesy of Don Kennedy")

Tetra: [ [Download](http://dxprog.com/files/tetra.zip) ]
Tetra 2: [ [Download](http://dxprog.com/files/tetra2.zip) ]

Picking up where I left off [last time](http://dxprog.com/entry/make-it-open-ypngine), we shall progress forward with my CMS releases.

After realizing that the core model of YPNgine seemed broken (looking back it may not have been, but whatever), I decided to scrap the entire project and go a completely different route. When I began conceptualizing this new CMS, there were a few things that I needed to consider from the very start: security and extensibility. With that, I began working on Tetra (named after the type of fish I had at the time).[break]

My first goal of security as accomplished simply by writing my user and session modules first with various authentication checks made easily available. Also the idea of having the default "guest" user be an actual user in the database (user ID of 1) made a lot of things much simpler simpler.

Extensibility I accomplished by using an OOP model for what I called "modules" (things like message board, polls, documents, etc). Each module would require two functions that would be invoked by Tetra's core: TetraHandler and HandleRequest. TetraHandler would return various page or admin related items (page title, available navigation options, user settings forms, etc). HandleRequest did content rendering depending on the parameters passed to it which could be anything from a sidebar overview display to the main content.

Tetra was also completely themable, though in saying that so was YPNgine. However, whereas YPNgine used Smarty, Tetra was a solution of my own devise. I cringe to look at this code now because all of this string manipulation was written before I'd learned of regular expressions, so it's bloated and slow. But it did work. In looking at the actual template syntax structure, it's apparent I borrowed a lot from XSL (especially in Tetra 2). Tying in with the themability, each theme could also have multiple styles which just controlled which stylesheets were being linked in.

There were two versions of Tetra, though the two are similar enough that I've been covering them both here. The main differences between 1 and 2 was that 2 dumped all the Tetra core opbjects (database, templating, etc) into their own objects where the first was procedural style functions. Granted, these "objects" were static libs, but did provide some encapsulation none-the-less. Tetra 2 was also a near complete solution with an installer script, could install modules via an upload form in the CMS and had, when it worked, the ability for each user to customize the layout of the page to their liking.

I worked on Tetra from probably late 2003 to sometime in 2005 and was a huge part of life at that time. One of the very last things I developed for Tetra was the blog module, where this blog actually [began](http://dxprog.com/entry/my-real-blog). Tetra is arguably the largest web anything I've ever made both in terms of size and scope. All the source code seems to be very well commented, a habit I've fallen out of, unfortunately.

I've made available the source code for both versions 1 and 2, the links for which can be found at the top of the page. Stay tuned as I release yet more web code, the next of which was quite unique.

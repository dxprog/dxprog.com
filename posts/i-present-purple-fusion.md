---
title: "I Present Purple Fusion!"
slug: i-present-purple-fusion
date: 2007-05-24T03:42:06-05:00
tags:
- web programming
redirect_from:
- entry/i-present-purple-fusion/
---
This is the name of the new site backend I've been working on. Now, for anybody who's been paying attention I haven't written a web engine since Tetra 2. The last time I worked on it was sometime back in '05 I believe. Back then I was extremely proud of my little creation but I look back on it and think to myself "that is one bloated piece of crap". It really was. Over 2500 lines of code. In comparison my new engine is only one or two hundred lines of code and almost as powerful (or it will be).

From a design standpoint Purple Fusion is way different from Tetra. Tetra was built around an object-oriented core. From an interface standpoint this was very clean. However, it did lend to some slowdown and made adding new modules cumbersome at best. It also limited what you could do with a module (to a degree). The new engine completely throws objects out the window (almost, the main class is PurpleFusion and that's the only one) and goes for a scriptable approach. Each page is it's own seperate page script that makes calls for getting data, displaying templates, etc. This makes creating new pages incredible quick and eliminates redundant code. Here's the script for the front page:

<code>
&lt;page title="Home"&gt;
	&lt;template:page_head&gt;
	&lt;db:entries limit="15" sort="entry_date" order="desc"&gt;
	&lt;loop:entries&gt;
		&lt;dblink:category_name table="categories" link="category_id"&gt;
		&lt;field:entry_date type="date" format="m-d-Y"&gt;
		&lt;field:entry_body type="standard"&gt;
		&lt;process:data&gt;
		&lt;template:entry&gt;
	&lt;end:loop&gt;
	&lt;template:page_foot&gt;
&lt;end:page&gt;
</code>

As you can see it borrows from SGML's tag structure. Because of the tag structure it's very human readable and makes for quick prototyping. I'm incredibly pleased with the way it's going right now and hopefully I'll have it running this site in a couple of weeks. Now that I think about it I could even speed things up by generating a cached version of the source code and just include that instead of parsing the page all the time. Yeah, this rocks.

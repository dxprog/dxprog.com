---
title: "With the addition of search, the circle is complete"
slug: with-the-addition-of-search-the-circle-is-complete
date: 2011-01-22T12:07:45-06:00
tags:
- code
- php
- site
- web
redirect_from:
- entry/with-the-addition-of-search-the-circle-is-complete/
---
Sometime in late 2002, I was welcomed on to the [partyfish](http://partyfish.sf.net/) dev team. My first task: create the site wide search. Now, bear in mind that this was my first time really doing anything in PHP and search is quite a big thing. Ask Google. I'm pretty sure they'd back me up.

Today, some eight years later, I have implemented site search into my website. Of course, it's running circles around my original code in terms of complexity, speed and even the amount of lines it's implemented in (340 v 70).

Here are some of the fun things the new search can do:

- Searches through all content types and each type can display differently in search results
- All searches are weighted against where the terms were matched. The algorithm is such: (matches in title * 10) + (matched tags * 5) + matches in body
- As with all aspects of my site, the search has a RESTful interface so I could make an ajaxy instant search if I so desired

Here are some good queries to show off what it can do:

[Rock Band](http://dxprog.com/search/rock%20band/) - Example where weighting really helps
[Photoshop](http://dxprog.com/search/photoshop/) - Example of different document types

btw, if you wanted to see the old partyfish search code, [here you go.](http://dxprog.com/files/search.txt) The new search stuff will be added to the repository shortly and I'll be making that public very soon.

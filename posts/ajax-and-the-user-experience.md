---
title: "Ajax and the User Experience"
slug: ajax-and-the-user-experience
date: 2009-11-12T06:00:58-06:00
tags:
- ajax
- web dev
redirect_from:
- entry/ajax-and-the-user-experience/
---
The code running this website is well over a year old now and, as I've gone back to upgrade/fix things, I've noticed that it is clunky and highly inflexible. The implementation I've used is actually very, very similar to what I used in YPNgine back in 2003; a switch statement calling functions from an included script based upon variables passed in the query string. Granted, there's going to be some degree of that in any implementation, but through some tinkering with the music page and interviewing with some of the developer's at Digg has led me to a new paradigm: a set RESTful API calls independent of all front end management.

Now, aside from the nice code separation and simplification of feature adds and maintainability this provides, it also opens up a new world to Ajax. Since all the data is accessible via query string, almost all the usual functionality that would normally call for separate pages can be added in without ever having to leave the landing page. In fact, I've [implemented this](http://dxprog.dyndns.org/dxsite2) functionality on the test server. As interesting as this may sound, it raises some interesting issues concerning usability and the user experience.

The largest concern is that of site navigation or, more specifically, navigation history. In a normal site, every page you visit will be added to the site history, appending itself to the not only pages visited, but the forward and back buttons as needed. With Ajax, you have none of this. Were you to click a link to a story and have it loaded via Ajax, your browser history does not change. Pressing the back button will take you to the previous entered URL and not the previous page because, technically, you're still on the same page. The new page won't be placed in browsing history which could make finding back a particular story particularly difficult. And, finally, because the page never changes, neither does the URL in the address bar which could lead to confusion.

Say you entered my site on the gallery page using the url http://dxprog.com/gallery and eventually found your way to to the June 2006 blog archives, specifically to a story about my [life without a laptop](http://dxprog.com/entry/tryin-to-survive/). Because the page never actually changes, the address bar will continue to read http://dxprog.com/gallery even though that content is no longer there. This would have made my retrieval of the URL for that story more difficult and, had the title not been permalinked, I wouldn't have been able to retrieve it at all.

Another thing to take into consideration is search engines. When Google crawls your site it doesn't have JavaScript enabled. So, unless you write duplicate functionality to generate the page before sending to the browser, none of your content will get indexed. I face this problem with the current gallery implementation; even though there is a way for me to access individual items via the query string, there are no hard links on the gallery page itself to point to them. Even if there was, all of the content is loaded on the client side so search engine spiders are just going to get a blank page devoid of content. Not a very smart idea if you want that content indexed.

In conclusion, when it comes to Ajax and dynamically loading content, you really have to consider carefully what should and shouldn't be dynamically loaded. Portal pages - any page with links into sub pages of the site such - are probably best left to the traditional method of loading a new page for each item. Smaller things such as paginating an entry's comments probably wouldn't hurt as much since it is an aside to the main material. Though, even then there may be something interesting you'd want picked up on a search engine. It's really is a balancing act between slick functionality and overall usability.

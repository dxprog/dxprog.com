---
title: "Idiocy, Caching, and Reducing Round Trips"
slug: idiocy-caching-and-reducing-round-trips
date: 2015-07-07T09:31:16-05:00
tags:
- coding
---
Over the last few days, I'd been receiving high CPU usage alerts from my host. A tad perplexed, I'd login in, check the graph and logs to see that, indeed, CPU usage was high, but nothing really seemed out of the ordinary. Google Analytics showed that traffic was moderately high, to be expected with a few widely visible brackets going on in /r/anime, but it wasn't anything to raise an eyebrow at. Still, you can't look at the following graph and notice a very predictable period of high activity:

![](http://i.imgur.com/0IUrapB.png "Those peaks would be terrible to bike up")

These peaks were actually coinciding with the most prominent bracket updating, bringing with it a fresh wave users every day. By the time I had received the third CPU alert email, I knew something was up and decided to actually take a look. Luckily, I didn't have to look far. The MySQL query graph was showing 1000+ read queries per second, certainly out of ordinary given how aggressive I am about caching.

Suspecting that something might be awry with memcache, but not actually wanting to bounce it, I bugged the cache library with some [stats tracking](https://github.com/dxprog/anime-bracket/commit/9e96a5838d06e0d3fc034cbc08653ab3329c8c5f) hoping that it would turn up something I had overlooked. Indeed, I know where things are cached, but have never really had a list of just how all of this looks in production. And, true to that, I found something that I had not anticipated: every call to Dal::getById - a method on a class that database models extend - was a cache miss. Every. Single. One. And there were thousands of these, which very quickly explained the high query volume. All of this I found out in about 30 seconds of having that profiling code live, which is good because it also brought the site down and I had to disable it...

With that information, I had a pretty solid lead as to where I needed to be checking for issues: the aforementioned getById method. I was a bit baffled because I knew there should be caching on that, it's one of the two reasons that the method even exists (the other reason being for coding simplicity). So I get in there and take a look. Lo and behold, the cache is checked but [nothing was ever actually stored back](https://github.com/dxprog/anime-bracket/commit/5455f8bc589e4f924714463857c8b8cf64eecb37). Of course, I had to fuck the fix up once before [actually resolving it](https://github.com/dxprog/anime-bracket/commit/46618c77c0cf58a9f8555f05f86a413817bb3069).

Once that was shoved to production, I was greeted with this wonderful little sight:

![](http://i.snag.gy/bGki8.jpg "Down.. down.. down.. ROCK LOBSTER")

So, the immediate issue was fixed, but there was still something obviously very wrong if I was individually getting so many singular items by ID. As it turns out, in one of the most looped pieces of code in the entire project, I was making not one but _two_ calls to get an item by ID. The whole output was cache guarded, but on a per user basis. In the case of the popular running bracket, that's over 400 queries per user per page generation. Unacceptable.

So, in one of those cases of code brevity != code speed, [I did a heavy refactor to stash all the IDs that needed to be fetched and then make a big batch call later](https://github.com/dxprog/anime-bracket/commit/dd6a4251c94ca47454abd6a004c2d64c952664da). There are some trade-offs here. There's still room for optimization here, especially if the getById calls are aggressively cached (indeed, the data fetched changes rarely). Or, the data returned from the batched call could be cached in shorter intervals. It still needs to be looped through as it's decorated with user specific data, but that would bring the overhead down to one big-ish hit only every few minutes. Still, with those measures currently in place, the CPU load issue has gone away and the queries per second is generally down in the double digits on average.

The true sign that everything is working, though, was the lack of an email in my inbox this afternoon.

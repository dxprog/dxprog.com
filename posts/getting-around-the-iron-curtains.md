---
title: "Getting Around the Iron Curtains"
slug: getting-around-the-iron-curtains
date: 2014-02-23T08:55:48-06:00
tags:
- coding
- webdev
redirect_from:
- entry/getting-around-the-iron-curtains/
---
Last week, a friend clued me into CloudFlare, a CDN service that also somehow has a free tier with unlimited bandwidth. This played right into my fears of hitting the 4TB bandwidth ceiling on my current hosting tier. Put into perspective, that's pretty close to all the digital storage I have available in my apartment. Also, it quells the fears that users on the other side of the pond are getting subpar download times. So, with minimal weighing of the consequences, I flipped everything over. And, lo and behold, it worked!

Almost...

You see, some countries and ISPs think that blocking shit on the internet is a really great idea. I'm not going to go on a political rampage right now because that's not my style, but when you're getting messages about users unable to download content from your hosting due to these reasons, it's more than a little irritating. But, goddammit, I'm a programmer and there had to be a solution that'd get me the best of both worlds without shelling out additional money.

After disabling the caching layer on that subdomain (cdn.awwni.me), I began weighing my options. Somehow I needed to find out if a particular user had the ability to talk to CloudFlare (now working through licdn.awwni.me). Most views were going to be served straight out of reddit.com, but I had a couple of attack vectors: the redditbooru.com main site, which is hit often for people doing repost checks or looking at albums that have been posted to reddit, and the RedditBooru browser extensions. The former was going to be the easiest to tinker with (so I thought) and affect the most people.

Since I had a way to test availability, I needed to actually perform the test itself. What I devised was an iframe that would be loaded on every page of RedditBooru. It would load the following script:

```html
<html>
    <head>
        <script type="text/javascript" src="http://licdn.awwni.me/cdncheck.js"></script>
    </head>
</html>
```

```javascript
// If this page has managed to load, go ahead and set the CDN cookie to expire on my 100th birthday
var date = (new Date('2086/6/8')).toGMTString();
document.cookie = 'use_cdn=true; expires=' + date;
```

If the user has access to the licdm subdomain, a cookie is set noting such and does so on the cdn.awwni.me domain. Since these users were now marked, this information can be used in nginx to reroute the user.

```nginx
if ($host != licdn.awwni.me) {
    set $useCdn "P";
}

    if ($http_cookie ~* 'use_cdn') {
    set $useCdn "${useCdn}C";
}

if ($useCdn = PC) {
            rewrite ^/(.*) http://licdn.awwni.me/$1 permanent;
}
```

Getting around nginx' inability to do multiple conditionals in one line aside, the above checks to make sure that the cookie is set and that the user is _not_ coming from the licdn.awwni.me domain. That last bit was added when I accidentally set the CDN cookie on licdn and got caught in an infinite redirect loop for a while. If either of the conditions aren't met, the image will just serve out of my machine.

There are a few drawbacks to this approach. First of all, every request still hits my machine, so I'm still taking a bandwidth hit. Secondly, those getting served out of the CDN have an extra hop for the redirect. However, I believe neither of these issues are bad enough to warrant removing it completely. For starters, on my side I'm now only serving a handful of bytes as opposed to millions. Secondly, a redirect on a single image is pretty much inconsequential to the user's experience.

I've only been running with this solution for a few hours, so I don't yet have a good look on how great the benefits are. Time will tell on that one, but I haven't yet heard any issues on images not loading, so there's some comfort.

---
title: "How I Saved Hundreds of Dollars by Writing Unit Tests"
slug: how-i-saved-hundres-of-dollars-by-writing-unit-tests
date: 2018-03-26T11:25:00-07:00
tags:
- "blog a day"
- webdev
---
There's so much clickbait hyperbole in that title, it makes me _sick_. A more accurate title would be "how I saved hundreds of dollars by actually planning my crappy code... and then verifying it through tests". The world doesn't _need_ another article about "test driven development", but I'm writing one that touches on those points anyways.

To quickly catch folks up, I run an [image hosting/reverse image search](https://redditbooru.com) site on the side. As it's gained traction and grown, things like server disk space and bandwidth caps have become very real issues. I get quite a bit of bandwidth per month from my webhost for the price I pay, but not enough disk space to hold all hosted images. On the flip side, AWS provides lots of cheap storage space, but gets super expensive at the amount of data I push over the pipes every month. If the AWS price calculators are to be believed, it'd be on the order of $1500/mo, which is about ten times more than I'm paying currently and would not be sustainable, even with Patreon supplementing the funds. By bringing in an additional server, load balancer, and doing some work to [keep fresh content on the app servers and only make requests to AWS on an as-neeeded basis](https://dxprog.com/entry/fun-with-load-balancers-and-running-on-lean-disk-space), I managed to have most of the best of both worlds. Everything was great and all was right with the world.

Until it wasn't.[break]

Left by itself, everything _was_ great, but the way the code was, there wasn't much room for adding functionality. It was a script written in haste with only the immediate issue in mind. This made things problematic when I decided I wanted to add [scaling images for serving to mobile clients](https://github.com/dxprog/rbcdn/commit/a22789d46c68bb3b80645762dfc19bcbf51f4805). Bad internal redirects, bloating up the disk with temp files, and inefficient HTTP calls and file handling between the desktop/mobile side caused no end of headaches. Eventually, I got it _mostly_ stable and everything was alright.

Until it wasn't.

Over a few months, I noticed that my AWS bill was slowly rising; slowly rising to the point that it actually _tripled_. I wrote it off in my head as old images becoming popular somewhere and there being more calls to AWS for cache misses. And then, everything broke one day. Like, entire app servers just died and wouldn't stay not dead. After much head scratching and freaking out trying to keep the house of cards propped up, I discovered that there was one major flaw in my mobile optimization code: GIFs _always_ made a hit to AWS.

Every. Single. One.

And this was entirely the logic I built in: don't try to scale a GIF, because those are often large and, specifically, animated. More trouble than it's worth. Within that escape hatch logic, it did nothing at all. It downloaded the GIF from AWS and sent it along the pipe to the client without even bothering to save a local copy. That explained both issues I was seeing: the rising AWS costs as I was making all these calls for uncached GIFs and the server crashing, as my entire pool of HHVM processes were hanging, waiting for network requests to finish.

Fuck.

The immediate solution was to disable mobile optimization. Not ideal, but a website that runs and isn't optimized for your device is better than a website that doesn't run at all. The long term solution was to take everything I'd learned in creating this script, bulldoze what was there, and write something clean from the ground up that I felt confident would work _before_ I deployed it to production.

Enter the "test driven development" (TDD) part of this post.

In true TDD, you write shells for all of your tests _before_ you write any of the actual implementation. In my case, I didn't go that route exactly, but I knew that I wanted as close to 100% test coverage as I could get and I knew what features I wanted. I now had the opportunity to make everything super great and I was going to take the time to do it right. My laundry list of desires were as follows:

- Don't make unnecessary HTTP calls: if an image exists for desktop locally and the mobile version doesn't, don't go to AWS to get the image to resize; it's already right in front of ya.
- Don't make unnecessary HTTP calls _and_ don't waste space: if an image exists for desktop and is already at or below the mobile optimized size, don't put it on disk twice. Just serve the existing image (via symlink, in this case).
- Don't be stupid: we're still not going to resize GIFs, but if you make a request for an image (no matter what the platform), save it locally.
- Communicate to other servers in the pool better: be able to ask _all_ servers in the local pool if they've got an image, not just some master/slave, hosts file, redirect loop nonsense.

Knowing _exactly_ what I wanted to happen and that it needed to be testable greatly informed the architecture. Given the above, I was able to break it out into logical (testable) chunks:

- Responder takes incoming requests and disseminates them to the appropriate handlers.
- The base handler does checks to see if content exists locally or within the pool. It's also responsible for fetching and saving the images back to disk.
- The _mobile_ handler is an extension of the base handler features, adding image scaling and symlinking.
- There's some PHP intrinsic functionality, such as HTTP requests and filesystem stuff. These get wrapped up in utility classes so they can be stubbed in testing.

That's a goddamn plan. It took a few days, but everything went pretty smooth. There were a few things that needed to be tweaked to make them testable, and then some errors I caught in testing, but when I saw the coverage numbers (~90%) and knew that all the functionality I'd planned out had been accounted for... well, it felt good, man. I could deploy this to production knowing that, in theory, everything should just work out of the gate.

And it did!

Since deploying, I've not had a single (related) server fire and my AWS bill has dropped to _lower_ than it was prior to me breaking everything in the first place... thus saving me hundreds of dollars. I took this same approach while replacing [another critical piece of aging, decrepit infrastructure](https://github.com/dxprog/rbthumbs) to similar effect: planned it out against known issues and desired features, wrote it for testability, tested it backwards and forwards (98%, baby!), and deployed. Nary an issue and life's been pretty good since.

I suppose the moral of this tale is "plan things well and things will go well". And, while there's nothing necessarily new here (not even to me), being able to execute this in the isolation of my own project - outside of corporate bureaucracy and timelines - kind of brought to light just how well this _can_ work, to the point of somehow actually saving money. There's lots of personal satisfaction to be had. Like I said...

![](https://cdn.awwni.me/11cg3.jpg)
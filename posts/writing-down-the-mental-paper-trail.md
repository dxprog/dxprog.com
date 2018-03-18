---
title: "Writing Down the Mental Paper Trail"
slug: writing-down-the-mental-paper-trail
date: 2018-03-17T23:32:00-07:00
tags:
- "daily blog"
---
As has become typical in my annual performance review, I got dinged for not better documenting my architecture plans for various work things. I can certainly argue that the expectation wasn't necessarily set well or that the work didn't necessarily require the time and effort to write hollow words simply for the sake of a paper trail, but that's not why we're here. The sentiment is certainly not wrong. I have a tendency to refine an idea in my head and then immediately jump into code, either implementing exactly as I figured it'd go, or pivot as needed. As a friend observed, "i think hakk just does shit and sees what sticks and iterates".

I'll admit, there's a time and a place for both mentalities. When working on something large, it's probably better to actually document at a high level the whole notion. We in the industry call this an "RFC", or "request for comments". The idear being that others look at this document and then are able to begin a discussion on potential issues and, in the end, suss out all the pain points before actually speanding time spinning wheels on implementation. It's also a good indicator of the amount of effort a feature will require, a good thing when trying to decide what and what not to work on. This paragraph full of business buzz words basically describes the position I'm finding myself in on my new team. I hate it because I have no confidence in my ability to actually document such things in actual words, but it must be done.

All of that to get to the _actual_ point of this post: trying to bring back the RSS feed. I was happily [chuffing](https://www.youtube.com/watch?v=nuwjUZCSB2Y) along and ran into a major wall: React really does not like doing things that are HTML-like but not actually HTML. That is to say, HTML has a tag called [`link`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) and it cannot have any children, similar to more frequently used tags like `img` and `input`. These are known as [empty elements](https://developer.mozilla.org/en-US/docs/Glossary/empty_element). Now, RSS _also_ specs out a `link` tag, and it's used for linking to the blog it represents and each individual post item. Unlike its HTML counterpart, the RSS `link` tag wants... will a link as its child content. And, with React in its current state, this is simply impossible. It's enforcing very strictly the rules of HTML, as well it should.

Now, despite being owned and mostly developed by Facebook, React is an open source project. This means that all the source code is freely available and anybody is allowed to contribute back to it. I pulled down a copy of the code and began setting about figuring out how to allow me to have my cake as well as consume it. As I started zeroing in on the solution and creating that mental plan, I decided to check out the [contributing guidelines](https://reactjs.org/docs/how-to-contribute.html) for React before submitting my pull request. Per that doc, they recommend opening an issue for new features to begin a discussion about what's to be implemented: an RFC.

....sigh. Fiiiiiiine.

Some time was spent ensuring that I adhered to the format they'd laid out, and ensuring that the issue was well described, my reasons for wanting to change made clear and validated with an example, and a thorough explanation left of how I planned on implementing my idea. About thirty minutes later, I had a lovely little [proposal written](https://github.com/facebook/react/issues/12396) and hit submit... and then I immediately [wrote all the damn code](https://github.com/dxprog/react/commit/e9731d1cc2f2ae0516b9159dc070493d91c6cb87) (including unit tests) just to see it work.

Overall, I'm pretty pleased with the RFC that I drafted and it felt good being able to articulate what it was I wanted to do and why. I honestly have little faith that I'll get the blessing from the Facebook gods to add this, but if I do, I get my name attached to one of the most used and well liked JavaScript projects ever created (I'd say only jQuery beats React at this).

After that, I guess I can just retire.
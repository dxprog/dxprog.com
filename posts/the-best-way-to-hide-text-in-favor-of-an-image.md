---
title: "The Best Way to Hide Text in Favor of an Image"
slug: the-best-way-to-hide-text-in-favor-of-an-image
date: 2013-10-07T22:34:29-05:00
tags:
- coding
- css
- daily
- html
redirect_from:
- entry/the-best-way-to-hide-text-in-favor-of-an-image/
---
hashtag html5, hashtag css3!

I'm saddened that the red squigglies went away after correcting my spelling of "hashtag"...

Sometimes when you're coding a website, you'll have something in markup that is represented in text for accessibility, but needs to be graphical in presentation. Oftentimes, this will happen for a logo or an icon of some sort. The industry standard way of hiding the text but not the image is to use text-indent to move the text somewhere off the left side of the screen while setting a background.

That last part is fine, the other part is not.

When you text-indent something -9999px offscreen, you're really fucking up the internal render dimensions of the item for the browser. Some dude from Netflix explained more about this on a talk he gave about fixing performance issues on mobile, but I'll be damned if I can find it now. The short of it is, it's bad practice, bad for performance, and you shouldn't do it. But, there's a nifty, cross-browser friendly way to have your cake without resorting to ugly hacks like text-indent.

Disclaimer: I can't take any credit for any of this. I picked it up from my pal Mickael Lucchini during my first tenure at Griffin. However, I have yet to see this trick used or mentioned anywhere else on the internet, so it needs to be shared.

```css
.image-text {
display: [block|inline-block];
height: 0;
padding-top: 10px;
width: 10px;
overflow: hidden;
background: url(BACKGROUND_IMAGE);
}
```

A quick description of what's going on:

**Line 2** - obviously, seeing as we need to set a height and width, we need a block level element
**Line 3** - we zero out the height of the element to force the content out of the renderable area
**Line 4** - instead, we set our height on the padding which gives the element height and allows the background to show through
**Line 5** - width is set as normal
**Line 6** - because our element height is 0, setting the overflow to hidden will hide the text content within
**Line 7** - finally, set the background, probably a sprite or something

There you have it. Probably the best way to image replace text in a performant and browser friendly way (back to IE6, if I'm not mistaken). If you inspect the search icon up in the corner, you can see this code in action (not sure why the input box is off, but that's something for another day). Also, if you're into SASS, here's a handy mixin I made of the above:

```css
@mixin image-text($background, $width, $height, $display: block) {
  overflow: hidden;
  width: $width;
  height: 0;
  padding-top: $height;
  display: $display;
  background: $background no-repeat;
}
```

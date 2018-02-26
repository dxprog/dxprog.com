---
title: "It's like NES emulator dev all over"
slug: its-like-nes-emulator-dev-all-over
date: 2011-04-02T22:05:25-05:00
tags:
- anime
- coding
- javascript
- jslive
redirect_from:
- entry/its-like-nes-emulator-dev-all-over/
---
![](http://images.dxprog.com/blog/jslive.jpg "Yes, my pretties. You will soon be mine!")

Somewhere around the time I began working at Wal-Mart, I thought it would be a nice challenge to write an [NES emulator](http://dxprog.com/entry/one-week-anniversary/). One of these days I'll release my mess of source code for that, but it was probably one of the most awesome programming challenges I've ever undertaken. So, why am I waxing nostalgic about this project from nearly six years ago? (warning - there's technical programmy talk inside)[break]

Well, you may have garnered from [posts past](http://dxprog.com/entry/2010-reviews-finale/) that I may or may not have played visual novels of some anime shows I've seen (I have). In particular, those would be Clannad and Kanon. I've not fully completed either of these games because, let's face it, hunching over a computer reading gratuitous amounts of text is tiring. However, I believe the visual novel format would work well on tablet PCs. Interestingly enough, both of these games as well as most things from Key/VisualArts run on a system called [RealLive](http://haven.parodius.com/formats/#reallive). The actual scenario file for each game is a custom scripting language unique to the RealLive engine. My goal is to make an HTML5 based interpreter so I can make these games available to mobile platforms.

This is where the parallel to NES emulators come: I have to reconstruct the functions, logic, etc. that the RealLive system has in JavaScript and HTML. However, whereas emulating a 6502 is just a series of super basic functions (add the accumulator to the X register and jump if the carry flag was set), this is a whole new level of complexity. It's more akin to writing a C compiler, really. Take this for example:

```Kepago
strS[1900] += strS[1900]
```

Now, in human terms this is pretty simple: add the value of strS[1900] to itself. However, getting a computer to understand this behaviour is something quite different. After a little googling, this is apparently an operation called lexical analysis. My solution is actually a two step process:

1. A PHP script parses the decompiled source code and converts the above into a JSON format like so:

```JSON
{"action":"assign","name":"strS[1900]","value":"strS[1901]","operation":"+=","ln":18487}
```

Name is what's on the left hand side of the equation, operation is the operator and value is the right hand side of the operation.

2.  Now. that format was setup before I realized that true language parsing was going to be required, so at this point my JavaScript is reconstructing the original equation from those variables. It passes these off to a function called "evaluateExpression" which figures out what's a string, variable, function, number, operator, etc. and remaps everything so that it points to internal functions and variables. This string would then look like this:

```JavaScript
variables["strS[1900]"] += variables["strS[1900]"]
```

This string is then run through _eval_ and is parsed by JS natively (allowing me to cop out of writing the really difficult stuff).

So, at this point, I have most all of the branching and logic functions working correctly (as far as I'm aware) in addition to the sound and music (super simple stuff). Now I'm working towards getting the core graphics functions in place which should get me pretty close to a playable state.

It's been a long time since I've had a programming project that's been this enjoyable and branched me off into new territory. I, for one, welcome it.

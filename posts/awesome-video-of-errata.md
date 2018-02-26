---
title: "Awesome Video of Errata"
slug: awesome-video-of-errata
date: 2008-08-08T02:27:01-05:00
tags:
- games
- nes emulator
- rants
redirect_from:
- entry/awesome-video-of-errata/
---
[![youtube video](https://img.youtube.com/vi/B3Vh--awqmQ/0.jpg)](https://www.youtube.com/watch?v=B3Vh--awqmQ)

Now, I realize that the "system specs" spewed forth in the above video were probably intentionally skewed so as to follow the whacky, 80s style zaniness, but as an uber nerd and somebody who's intimately familiar with NES hardware, I feel compelled to correct their errors.

**Claim #1: 3.58Mhz video core clock speed**
The NES video processor, a Ricoh 2C02 "Picture Processing Unit", or PPU, is actually clocked at 5.37Mhz. The CPU is exactly one third of this, or 1.79Mhz. The figure they're quoting is the timing of a color NTSC signal.

**Claim #2: 240x226 resolution**
The PPU actually worked with an internal resolution 256x240, though most old TVs did not display the first and last eight scanlines effectively making the resolution 256x224. This was the same for both NTSC and PAL models.

**Claim #3: 16 sprite pixel depth**
I don't even know where to begin on this one. Firstly, the NES had enough sprite RAM (object attribute memory, or OAM) for 64, 8x8 or 8x16 sprites. Secondly, every sprite could have three colors (four if you include transparency) from a palette of 53 colors. Every scanline could hae a maximum of eight sprites, and when this limit was exceeded some sprites were not drawn causing the infamous flicker. Finally, you could have a total of 25 colors per scanline. What the hell they were talking about to begin with baffles me, but there were no 16s involved there at all. Except maybe that internal 16-bit PPU register that could be written to through dual writes to address $2006....

**Claim #4: NES has a Zilog Z80 processor**
This one's easy. The NES did not have a Z80. It had a Ricoh 2A03, which was a 6502 without decimal mode and a set of sound instructions. The Gameboy, however, had a Z80 and the Sega Genesis used one as its sound processor.

**Claim #5 It's an 8-bit system**
Well, that's about the only thing they got right. Though, the system did have a 16-bit address bus....

Well, I'm finished. I'm sure somewhere God has smote a kitten for my nerdy rantingness, but it had to be said and I said it. Caio.

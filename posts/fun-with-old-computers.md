---
title: "Fun with old computers"
slug: fun-with-old-computers
date: 2008-07-30T01:52:30-05:00
tags:
- computers
---
Every once in a while I get a hankering for a hands on type project. Back in May that project was the [Xbox mod](http://www.dxprog.com/entry/xbox-modding--an-epic-fight-an-epic-win/). This time around it was to build myself a new server after the last one I'd been using overheated while I was away on vacation and the air conditioning was off (at least, that's my guess on the diagnosis). Of course, I would have liked to build something from scratch, but college funds being what they are that isn't always the most viable option. Instead, I took a trip up the the local TriftKo (yes, they spell it with a "K") and picked up the cheapest (and at that time, only) computer they had. I really had no idea what kind of computer it was (though, I made a really close guess based on the ports on the back), but that didn't matter for my needs, namely, to run a web and file server.

Whenever I get a new computer I like to boot it in its "virgin" state to see what the computer is and what it was used for before it came into my possession (so far, I've only found mild pron on one computer). After that, I take the thing apart and, dipping into the vast amounts of old computer parts available to me, upgrade it to make it as high tech as possible. After a long amount of research, trial and error, a BIOS upgrade, and some dabbling in [GRUB for DOS](http://sourceforge.net/projects/grub4dos) I was able to get the computer up to the following specs:

Pentium 166Mhz
64MB RAM
1.2GB Primary drive (still has Win98 on it)
4GB Secondary drive (running the latest Debian)
DVD-RW drive (which doesn't have any power since there are only two large molex adapters available)
Ethernet card
PCI USB 2.0 card

Yeah, it's a laughable computer to say the least and its age did prove to be more of an issue than I originally anticipated. The first was the inability to boot from CD even though the BIOS claimed to support it. I figured the old BIOS was the problem, so I set about trying to update it. Unlucky for me, IBM has pulled all BIOS upgrades for old systems off their site so I was stuck wading through forums. Once I got the BIOS upgraded it still wouldn't boot from CD, but it did correct an issue with identifying the 4GB drive (and now I have support for drives up to 8.4GB).

So, after all those many hours I was still unable to boot my Linux install CD. It was about then that I had the genius idea of copying the Linux kernel off of the install disc onto the Windows 98 drive and starting the installer in GRUB from DOS. Took a few tries to get off the ground, but it did wind up working. Things were looking great, then Linux took six or seven hours to install. I decided to sleep at this point.

Luckily, after Linux was installed and I got ssh up and running I could close the box, clean up the [mess](http://www.flickr.com/photos/dxprog/2716415642/) that had appeared on the floor, and continue the finishing touches from the comfort of my laptop. Everything after that went pretty well, but there was still the issue of not being to use my 120GB hard drive full of stuff that I usually streamed to XBMC. Luckily, the fix for that was really, really simple. Buy a PCI USB card and use my external hard drive enclosure. For the first time in this entire project, and my entire time messing with Linux, it worked first crack out of the barrel without any extra configuration on my part (save changing my home directory mount in fstab).

So, it's been far more useful as of late, but I wanted to take it a step further. The box does have a sound card and seeing as it is sitting right next to my speaker system I figured "Hey, why not use it as a stereo too?" So, that's what I've been doing this evening. Getting the sound card to run was a bitch, especially with the little info I could find on the card itself. Looking through the startup messages it was being found as "AT931 Audio 16". Google turned up two pages on that. It turns out the card is actually a OPTi 82c931, but even finding the correct module for that was a pain in the ass (it's snd-opti93x). After that, I followed [this handy guide](http://www.alsa-project.org/main/index.php/Matrix:Module-opti93x) on the AlsaProject wiki to get the rest up and running.

So now my computer plays sound which is pretty sweet. But, I'm again being bitten in the ass by its age. If you try to do anything while playing an MP3, file access or an HTTP request, the audio starts lagging. So, I think I've devised a clever way around said issue. I'm going to write a series of scripts that will convert the MP3 to a wave file and play the wave (which requires almost no processor time). Couple that with a web interface for making playlists and it'll be the most kick ass twelve year old computer of all time.

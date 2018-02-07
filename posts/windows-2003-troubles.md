---
title: "Windows 2003 Troubles"
slug: windows-2003-troubles
date: 2005-10-30T11:11:48-06:00
tags:
- windows
---
Well, yesterday was a great day... NOT! Somehow, and I've yet been able to figure out why, my password got reset. Now I figure it's one of four scenerios:

**A)** A little kid somehow changed the password by pounding on my keyboard
**B)** One of our neighbors has been sitting cracking our WPA passkey the last month (and I think that all of our neighbors have WiFi)
**C)** Some Uber h4x0r who's peed off at me snuck in via the internet and changed it hoping to make my life miserable
**D)** My SAM file got corrupted

D is the most likely scenerio, but you can't discount any of the others. Anyhoo, I spent most of yesterday figuring out how to undo it without reinstalling Windows. My first thought was to try the Linux distro [austrumi](http://cyti.latgola.lv/ruuni/index_en.html) which has a utility called nt_pass (only in version 0.9.2, btw). Well, that didn't want to work because, gosh, my SAM file is read-only. Well what jerk wrote _that_ program? :-P

So, I went and did some more searching and came across a little hole in the Windows Istaller. Here's how it works:

**A)** You'll need a Windows XP/2003 CD (any flavor: plain, SP1 or SP2) that's bootable (I 'spect most have this kind)
**B)** Boot with that and get to the point where you can repair a Windows install (Enter, Enter, F8, R I believe is the key sequence)
**C)** Just go along with that. Your computer will reboot and start the second half of the install.
**D)** Be paying atention to the progress bar in the lower left of the screen. When I says "Install Devices" hit F10. You'll be greeted by a command prompt which will allow you to do darn near anything you want.
**E)** In this particular case run the command "control userpasswords2" and a friendly box will come up where you can reset passwords, add users, etc.
**F)** Once you've done whatever it is you're going to do let Windows finish installing or you'll lose everything you just did.

Needless to say that I created myself a new user account so I could leave the Aministrator one alone ('tis one of the drawbacks to 2K3. You have to go using the command prompt just to get to a place to add a user :-P). But now I'm back in business and everything works great. I hope somebody out there finds that useful because it sure was to me.

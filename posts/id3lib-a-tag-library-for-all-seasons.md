---
title: "ID3Lib - A tag library for all seasons"
slug: id3lib-a-tag-library-for-all-seasons
date: 2009-10-21T22:07:22-05:00
tags:
- .net
- c++
- coding
- id3lib
- php
---
![](http://images.dxprog.com/blog/id3lib.png "image")

ID3Lib [ [Download](http://dxprog.com/files/ID3Lib.zip) ]

As one may have derived from previous posts, I have a [project](http://labs.dxprog.com/smp/) the uses MP3s quite heavily. As such, retrieving tag data from these is quite an important thing. Having recently migrated my personal server to Windows, I needed a non-Linux variant of my previous [tag read](http://dxprog.com/entry/building-a-web-based-media-player---part-1/). I thought that while I was at it I could add an additional feature, namely saving embedded album art. Unfortunately, I was unable to find any clear directions on how to do so using [TagLib](http://developer.kde.org/~wheeler/taglib.html), so I created my own library. Three different times. In three different languages. A C++ version, a .NET version and, finally, a PHP version.[break]

Each of these libraries works pretty similar, but to give you the general idea, I'll write out a simple program for each.

```c++
#include <iostream>
#include "id3lib.h"

using namespace std;

void main () {
	ID3Lib id3("my.mp3"); // Create the object
	if (!id3)
		cout << "Unable to parse file";
	else {
		cout << "Title: " << id3.artist() << "n"; // Output title using shortcut method
		cout << "Album: " << id3.tag("TALB") << "n"; // Can retrieve any tag with this method
		id3.saveAlbumArt ("album_art.jpg"); // Save any embedded picture
	}
}
```

```c#
using System;
using System.Collections.Generic;
using System.Text;
using Id3Lib_Net;

namespace Id3LibNet_Test
{
    class Program
    {
        static void Main(string[] args)
        {
            Reader t = new Reader("my.mp3"); // Load the MP3 file
            Console.WriteLine(t.title()); // Print out the title using shorthand method
			Frame album = t.getFrame("TALB"); // All loaded tags can be retrieved this way
			t.savePicture ("album_art.jpg");
        }
    }
}
```

```php
include ("id3lib.php");

$id3 = new ID3Lib ("my.mp3"); // Create the ID3Lib object
if (!$id3->getErr()) { // Will be null if load was successful
	echo ("Title: ".$id3->title); // A shortcut for getting the title
	echo ("Album: ".$id3->tags->TALB); // All tags can be accessed this way
	$id3->savePicture ("album_art.jpg"); // Saves an embedded picture
}
else
	echo ("There was an error opening the MP3: ".$id3->getErr());
```

Each library includes a set of methods/properties for the following common tags: title, album, artist, disc, track, year.

All three libraries are licensed under the GPLv3 and have the original source code, so you can do with them what you wish, though credit and a link back here is always nice :-).

ID3Lib [ [Download](http://dxprog.com/files/ID3Lib.zip) ]

Disclaimer: I have only tested these on MP3s I have available to me, so it's very possible that you may have issues with this library. If you do, please leave a comment and I'll update the libs accordingly.

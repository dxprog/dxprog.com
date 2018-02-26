---
title: "Building a Web-based Media Player - Part 1"
slug: building-a-web-based-media-player---part-1
date: 2008-08-31T11:24:40-05:00
tags:
- actionscript
- c++
- coding
- flash
- media player
- tutorial
redirect_from:
- entry/building-a-web-based-media-player---part-1/
---
For the past month I've been tinkering with Flex and my little Linux server. One of the projects that grew out of this was a web media player with which I could listen to all my tunes wherever there happened to be some scraps of internet. This has been one of the coolest projects I've worked on in some time. It successfully blends nearly all of my programming skills: PHP/MySQL, Javascript, XML, Flex/Actionscript 3.0, and some C++. I'm going to write a series of tutorials walking through what I've done in hopes of bringing this coolness to the masses. I'm going to be fairly verbose covering subjects that any seasoned programmer can pretty much skip over. In the first installment I'm going to cover creating the database and getting song information from the MP3s.[break]

The first thing to do, obviously, is set up the database tables. I've kept my setup fairly minimalistic having tables for artists, albums, and tracks. I plan to expand later to track playback habits and so forth, but these are all you need to make your player fully functional. I've got my tables setup as follows:
**artists**
- id (int 4, primary key)
- name (varchar 100)

**albums**
- id (int 4, primary key)[item][item]title (varchar 100)
- artist (int 3)

**tracks**
- id (int 11, primary key)
- title (varchar 100)
- artist (int 4)
- album (int 4)
- track_num (int 3)
- play_count (int 5)
- date_played (int 11)

Most of these fields should be self-explanitory. The tracks table can expand or contract to include what ever metadata you want (I personally left out genre as I hardly ever use that). date_played will store the Unix timestamp of the last time the song was played. I personally like storing my timestamps without formatting as to forego the unnecessary strtotime () conversion. We'll use this later when we create the recently played list.

About now I would begin to discuss how we're going to get this information into the database, but first we need to be able to get the information from the files. I've got two methods for this and it all really depends on your programming skills and what you have available on your server. The first, and most available option is through Actionscript. Let's jump to code.
```actionscript
var tagLoader:Sound = new Sound();
tagLoader.load ("my_song.mp3");
tagLoader.addEventListener (Event.ID3, tagsLoadedHandler)
tagLoader.addEventListener (Event.COMPLETE, tagsLoadedHandler)

function tagsLoadedHandler (e:Event):void
{
	var title:String = tagLoader.id3.title;
	var artist:String = tagLoader.id3.artist;
	var album:String = tagLoader.id3.album;
	var track:String = tagLoader.id3.track;
	// Send to database
	tagLoader.removeEventListener (Event.COMPLETE, tagsLoadedHandler);
}
```
**_Lines 1-2_**
Nothing terribly exciting. We set up our Sound object which will be loading the MP3 and getting ID3 information. Immediately after we load the MP3 file _my_song.mp3_ into our Sound object.
**_Lines 3-4_**
We set up two event listeners so we can catch the data. The first fires once ID3 information has been retrieved. Depending on your MP3 file, this event won't always fire so we set up the COMPLETE event so that the code is run regardless. We'll be talking more about that in the next tutorial.
**_Lines 8-12_**
We store the song information for temporary storage until we send it all off to the database (covered in the next tutorial).
**_Line 13_**
We remove the event listener on the COMPLETE event. In the probable case that the ID3 event was dispatched we want the COMPLETE event removed otherwise all this code will run again adding your song to the database twice. We don't want to pull and iTunes with duplicate song issues.

Alright, that's the first, and slowest way to do things. I say slowest because it actually requires that the song be downloaded to your computer before it gets the information. This isn't bad if you're on a LAN connection, but it's not near as fast as using the server itself to get the information (which we'll be doing now).
```c++
#include <taglib/tag.h>
#include <taglib/fileref.h>

using namespace std;

void readID3 (char *fileName)
{

	TagLib::FileRef f(fileName);

	cout << "\\t\\t<album>" << f.tag()->album() << "</album>\\n";
	cout << "\\t\\t<artist>" << f.tag()->artist() << "</artist>\\n";
	cout << "\\t\\t<title>" << f.tag()->title() << "</title>\\n";
	cout << "\\t\\t<genre>" << f.tag()->genre() << "</genre>\\n";
	cout << "\\t\\t<year>" << f.tag()->year() << "</year>\\n";
	cout << "\\t\\t<track>" << f.tag()->track() << "</track>\\n";

}

int main (int argc, char *argv[])
{

	if (argc == 1) {
		printf ("Usage --\\ntid3xml INPUT\\n");
		return 1;
	}

	cout << "<?xml version="1.0" ?>\\n";
	cout << "<songs>\\n";

	for (int i = 1; i < argc; i++) {
		cout << "\\t<song file=\\"" << argv[i] << "\\">\\n";
		readID3 (argv[i]);
		cout << "\\t</song>\\n";
	}

	cout << "</songs>\\n";
	return 0;

}
```
We'll be writing a small C++ program that reads ID3 information out of the MP3 file and returns XML as the output. Of course, writing the code to read ID3 tags by oneself requires some time, patience, and wading through a lot of documentation. Luckily, there are several libraries out there that will serve our purposes quite nicely. The one I have chosen is TagLib. If you're running debian getting tag lib is as simple as running:
_sudo apt-get install taglib-dev_
Now for some code:

I'm going to skip all the includes and jump right into the meat.
**_Line 10-17_**
This creates our TagLib object and parses the ID3 information for the file supplied to the function. This information is the output to the console.
**_Lines 25-28_**
Checks to make sure a file was passed. If not it outputs a friendly usage guide and moves on. In actuality, since this will be later parsed by a PHP script, it would probably be a better idea to output an error code encapsulated in XML tags.
**_Lines 30-31_**
Set up the XML file structure.
**_Lines 33-37_**
Loop through every file passed and outputs the ID3 information for each.
**_Lines 39-40_**
Close up and quit.
This script has a lot of obvious advantages. First of all is speed. Since it's being run on the server, where the files are kept, there is no waiting for the song to download to get the file info. Secondly, it can parse many files at one time making batch adds possible.
Well, that concludes part one of this tutorial. Next time we'll cover adding the songs to the database utilizing what was covered in this tutorial. We'll cover both scanning an existing library and a creating a front end for adding new songs. 'Til next time, happy coding.

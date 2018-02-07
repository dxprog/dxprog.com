---
title: "PHP ID3Lib 1.0 Release"
slug: php-id3lib-10-release
date: 2010-11-06T13:54:15-05:00
tags:
- code
- id3lib
- php
---
Brand spanking new release of the PHP branch of ID3Lib!

[ [Download](http://dxprog.com/files/id3lib_php.zip) ]
[ [Documentation](http://dxprog.com/docs/id3lib/) ]

**What's new:**

- Added support for ID3v1, older ID3v2
- Genre now returned on all tag versions
- Calculates song duration and average bit rate for constant (CBR) and variable (VBR) bit rate files
- Single object instantiation can read more than one file
- Much improved inline documentation (phpDoc style)
- General code clean-up, bug fixes and improved compatibility

**Example**

[code=php]
include('id3lib.php');
$songs = array('song1.mp3', 'song2.mp3', 'song3.mp3');
$id3 = new ID3Lib();
for ($i = 0, $count = count($songs); i < $count; i++) {
	$id3->readFile;
	$min = floor($id3->length / 60);
	$sec = $id3->length - ($min * 60);
	$sec = strlen($sec) == 1 ? '0' . $sec : $sec;
	echo 'Title: ', $id3->title, '<br />';
	echo 'Artist: ', $id3->artist, '<br />';
	echo 'Album: ', $id3->album, '<br />';
	echo 'Track Number: ', $id3->track, '<br />';
	echo 'Disc: ', $id3->disc, '<br />';
	echo 'Year: ', $id3->year, '<br />';
	echo 'Genre: ', $id3->genre, '<br />';
	echo 'Length: ', $min, ':', $sec, '<br />';
	echo 'Avg. Bit Rate: ', $id3->bitrate, '<br />';
	$id3->savePicture($i.'_pic.jpg');
}
[/code]

If you have any comments/issues, let me know!

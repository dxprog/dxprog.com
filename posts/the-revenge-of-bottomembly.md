---
title: "The Revenge of Bottomembly"
slug: the-revenge-of-bottomembly
date: 2010-10-14T22:09:05-05:00
tags:
- code
- ypn
---
A few days ago I was out walking and reminiscing, as I am wont to do. While I was doing this, I  recalled some of my first web related programming projects, most notably YPNgine. Considering it was my first major PHP outing, I pulled off quite a feat. Writing a message board is no small task. However, there was one part in particular that I was mulling over: the censor. 

If you happen to be a former YPNer, you may recall seeing many references to "bottomembly". Carrying over the censor find/replace list that had been used on phpBB before it, all instances of the character sequence "ass" were summarily replaced with "bottom". Now I am being very choosy when I say "character sequence" and not "word" as the censor couldn't differentiate words.

This oversight was brought to my attention my young programmer self struggled to figure out a solution. Here's what I wound up doing:

```php
// Copyright (c) 2003 Matt Hackmann
// Full copyright info in index.php

function censor_post ($body)
{

	$query = "SELECT * FROM bannedwords";
	$result = db_Query ($query);
	
	$body = " ".$body;
	
	$body = str_ireplace ("assembly", "ytrewq", $body);
	$body = str_ireplace ("assum", "asd;ljf", $body);
	$body = str_ireplace ("glass", "glss", $body);
	$body = str_ireplace ("hello", "hllo", $body);
	
	for ($i = 0; $i < db_num_Rows ($result); $i++) {
		$row = db_fetch_array ($result);
		$body = str_ireplace ($row["blocked_word"], "", $body);
	}
	
	if ($body == " ")
		$body = "Censored";
	
	$body = str_replace ("asd;ljf", "assum", $body);
	$body = str_replace ("ytrewq", "assembly", $body);
	$body = str_replace ("glss", "glass", $body);
	$body = str_ireplace ("hllo", "hello", $body);
	
	return $body;

}
```

As you can see, I started hard coding in a list of safe words, replacing those instances with a random (or not so random) string of characters, run the censor and then convert those strings back to the safe words. This was a list I kept expanding on as they were found during normal conversation on the forum. I giggle as I look at this list and think of what the censor was doing to those words: bottomume, glbottom and hecko.

It's just something that I, eight years later, have to look back on and chuckle about.

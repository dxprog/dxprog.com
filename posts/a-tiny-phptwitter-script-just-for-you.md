---
title: "A tiny PHP/Twitter script just for you!"
slug: a-tiny-phptwitter-script-just-for-you
date: 2009-02-24T15:28:46-06:00
tags:
- coding
- php
- twitter
---
Was rather bored this afternoon and then I though to myself "Why not add Twitter functionality to my music page?" So, after some digging through Twitter APIs and some refreshers on HTTP Authentication, I wrote this tiny, beautiful little script.

```php

// Return values
define ("TWITTER_OK", true);
define ("TWITTER_UNAUTHORIZED", -1);
define ("TWITTER_TOO_LONG", -2);
define ("TWITTER_COULD_NOT_CONNECT", -3);

function sendTweet ($status, $userName, $userPass)
{

	// Open a socket to Twitter
	if (!($socket = fsockopen ("twitter.com", 80)))
		return TWITTER_COULD_NOT_CONNECT;
	
	// Create the headers
	$headers = "POST /statuses/update.xml HTTP/1.1\r\n";
	$headers .= "Host: twitter.com\r\n";
	$headers .= "Authorization: Basic ".base64_encode ($userName.":".$userPass)."\r\n";
	$headers .= "Content-length: ".strlen ("status=$status")."\r\n\r\n";
	$headers .= "status=$status\r\n";
	
	// Send the headers
	fwrite ($socket, $headers);
	
	// Get the response
	$response = "";
	while (!feof ($socket))
		$response .= fgets ($socket, 1024);
	
	// Check for HTTP status OK (200)
	if (!strpos ($response, "200"))
		return TWITTER_UNAUTHORIZED;

	return TWITTER_OK;
		
}

```

It is as simple as it looks. Enjoy!

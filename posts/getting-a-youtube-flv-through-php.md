---
title: "Getting a YouTube FLV through PHP"
slug: getting-a-youtube-flv-through-php
date: 2009-10-04T16:43:38-05:00
tags:
- coding
- php
- tutorial
- youtube
redirect_from:
- entry/getting-a-youtube-flv-through-php/
---
![](http://images.dxprog.com/blog/php_corner.png "PHP Corner")
Recently, while making some additions to the [Music Page](http://labs.dxprog.com/smp/), I came across the need to get the location of a YouTube FLV. Unfortunately, most of my googling turned up outdated results that no longer work. Fortunately, unlike a certain [other](http://hulu.com/) site, it's not impossible. Below is a quick explanation of what I got to work. I'll be assuming that you know how to get your hands on the video ID (the "v" parameter in the query string).[break]

There really is only one thing that's needed by YouTube to get the video file, and that's the video token. As far as I can tell, this is a time sensitive key that is generated for the user to prevent abuse on the YouTube servers. Luckily, this is pretty easy to obtain. The get_video_info page returns not only the token, but all sorts of other valuable information about the video, such as author, date uploaded, length in seconds, etc. Here's a small function that retrieves this information and returns it as an object:

```php
function ytGetInfo ($id)
{
	$file = file_get_contents ("http://www.youtube.com/get_video_info?&video_id=$id");
	$a = explode ("&", urldecode ($file));
	foreach ($a as $i) {
		$e = explode ("=", $i, 2);
		$ret->$e[0] = $e[1];
	}
	return $ret;
}
```

Simple stuff, really. The contents of get_video_info are retrieved and stored in $file. This information comes URL encoded, so we first need to decode that. As with any URL string, each variable is separated by an ampersand (&), so when calling [explode](http://us.php.net/manual/en/function.explode.php). That returns the variable/value pairs in an array ([0]=>"author=dxprog", [1]=>"token=asi940tnas", ...). Iterating through each of those, we then explode the var/value pairs and add them to our outgoing object. Now we have the token (amongst other info), so next will be retrieving the video file itself.

YouTube uses get_video to return where the actual video is stored. Now, I don't know all the nuances of this method, but as of this writing, it returns a 303 See other HTTP response code with the location header pointing to the actual, real address of the video file. We'll functionize that:

```php
function ytGetVideoPath ($id)
{
	$info = ytGetInfo ($id);
	$token = $info->token;
	$headers = get_headers ("http://www.youtube.com/get_video?video_id=$id&t=$token&fmt=18");
	foreach ($headers as $item) {
		if (strpos ($item, "Location: ") !== false) {
			return str_replace ("Location: ", "", $item);
		}
	}
	return false;
}
```

First thing this function does is grab the video information so that we can get the token. We then retrieve the headers of the video providing the video ID _(v)_ and the token _(t)_ as parameters to get_video. The _fmt_ parameter specifies the quality video you want, none being low, 18 being high, and 22 being HD. Using the [get_headers](http://us.php.net/manual/en/function.get-headers.php) function, we should be returned a 303 response code with the location header set to the video location. I can't guarantee that this is always the case, but it hasn't failed me yet.

From here, you can do with the returned URL as you please. You can use [file_get_contents](http://us.php.net/manual/en/function.file-get-contents.php) or [fsockopen](http://us.php.net/manual/en/function.fsockopen.php) - my favorite - to download the stream, load it into your flash video player or whatever you want. I hope you found this little guide useful. If you run into any problems with the above code, please leave a comment below and I'd be happy to help. Cheers!

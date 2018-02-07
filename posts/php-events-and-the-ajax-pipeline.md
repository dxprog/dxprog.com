---
title: "PHP, Events, and the Ajax Pipeline"
slug: php-events-and-the-ajax-pipeline
date: 2013-10-01T08:36:51-05:00
tags:
- coding
- php
---
Working at LinkedIn, I feel almost required to talk about coding on my blog, especially if I want to keep my [Junior Woodchuck Engineer](http://i.imgur.com/8ALLwfP.jpg) sash.

Some months ago, I was trying to beef up the user feedback that [redditbooru](http://awwnime.redditbooru.com/) would give when making requests to the server. One thing I wanted to do was, during a reverse image lookup, have a continually updating status to the user. "Retrieving image", "Searching database", and then the final data. This required a couple of interesting things: implementing an event model in PHP, and the not-so-talked-about third readyState value in the XMLHttpRequest response: 3, or "processing request".

## PHP Eventing

Anybody who has coded JavaScript for more than thirty minutes will understand that it runs on a highly evented model. You attach a listener to an object with a function callback, the object fires and event, and the callback is called with data provided pertaining to the event in question. PHP, being a highly linear programming language, doesn't really have such a concept baked in. Being that I wanted something that could be easily reused through out an entire project, I came up with a stupid simple [events library](https://github.com/dxprog/reddit-booru/blob/master/lib/events.php). Pertaining to the internal event modelling, it exposes the following two methods:

[code=php]public static function addEventListener($eventType, $callback);
public static function fire($eventType, $data = null);[/code]

These work essentially as they do in JavaScript: subscribe to an event with addEventListener and provide a callback. Fire an event with fire of that event type with whatever relevant information that goes with. addEventListener is constructed such that you can add multiple callbacks for a single event, much like the sugary goodness that jQuery provides to the DOM. One possible drawback of my implementation is that the event bus is essentially global, being that all the methods are static. This means you could have naming collisions on event types. Granted, this could easily be converted into an abstract class that any class could later inherit, providing this functionality.

Here are a couple of quick production examples of [event firing](https://github.com/dxprog/reddit-booru/blob/master/api/image.php#L215) and [event subscribing](https://github.com/dxprog/reddit-booru/blob/master/controller/images.php#L199). One half of the puzzle solved.

## Sending and Parsing Evented JSON
As stated previously, on modern browsers, the XMLHttpRequest response has a third ready state of "processing request". Essentially, this fires at certain points as the request is receiving data. We can use this to our advantage to send small status updates to the user as the backend performs numerous/long running tasks. Part of the events library are some calls to handle what I refer to as "evented Ajax", though I'm sure there's a real term for it. It has the following methods:

[code=php]public static function beginAjaxEvent();
public static function endAjaxEvent();
public static function sendAjaxEvent($eventType, $data);[/code]

beginAjaxEvent and endAjaxEvent do essentially what you would expect: they prime the system for sending data out in this fashion and tidy everything up necessarily. sendAjaxEvent is where all the fun happens. I'm going to go through this guy line by line.

[code=php]public static function sendAjaxEvent($eventType, $data) {
$out = new stdClass;
$out->eventType = $eventType;
$out->data = $data;
$out = json_encode($out);

// Pad out the request to a minimum of 4K for Chrome
if (strlen($out) < 4096) {
$out = str_pad($out, 4096, ' ');
}
echo $out;
flush();
}[/code]

**Line 3-7** - pretty simple, preparing the data that will actually be sent to the browser as a JSON response.
**Line 8-11** - An oddity I ran into with Chrome while developing this. Apparently, it will only fire a processing event if the data received is 4K or greater. So, to ensure that the event is fired, we pad the response out to 4K at minimum.
**Line 12-13** - spit out the data and flush the buffer to the browser.

For the power this can wield, it's pretty simple stuff. Of course, you need to be properly set up to receive this type of response on the client end. Being as I'm focusing on the PHP side here, I won't go into details, but [you can check out my implementation](https://github.com/dxprog/reddit-booru/blob/master/view/js/scripts.js#L78). The implementation is fairly tightly coupled with how it's piped out of PHP, particularly expecting the last and largest data coming down the pipe to be an event named "data". But, I have yet to receive any user complaints that this doesn't work, so that's the important part.

Of course, all of this is nice and all, but this particular intrigue of onreadtstatechange isn't compatible on some browsers (cough, IE, cough). For that, there are fallbacks in place to use a standard Ajax request a la jQuery. By setting "evented" parameter on the URL to the request, the event model can be effectively turned on or off. The internal events are ignored, and what would be sent in the data event becomes the response. It's a gracefully degrading solution to the issue. Granted, that query string parameter could go away entirely if one was to do user agent sniffing on the backend.

Well, that's my little write-up on what was probably an afternoon of coding. I haven't yet implemented this anywhere else, but I think that at least the events model could have some (or a lot of uses) in many day to day cases, especially if you were to start messing around with multi-threading in PHP.

But that's a post for another day.

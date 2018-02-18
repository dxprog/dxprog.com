---
title: "Calculate Moon Rise and Set in PHP"
slug: calculate-moon-rise-and-set-in-php
date: 2011-06-28T00:00:00-05:00
tags:
- 
- code
- daily
- release
---
If you've been paying attention to my [Twitter](http://twitter.com/dxprog) account, you've probably seen a reference or two about how I've been calculating the positions of astronomical bodies. Well, today I release part of that to you.

**Download:** [Source](http://pastebin.com/TYfssCph)

The above code is pretty much a direct port of Keith Burnett's implementation [here](http://bodmas.org/astronomy/riset.html). Outside of porting, my only changes were some code clean up and having the timezone be calculated automatically for the longitude given. This means that you will always get back a time stamp that is local to the point of origin.

**How to Use**
Moon::calculateMoonTimes(_month_, _day_, _year_, _latitude_, _longitude_);
```php
date_default_timezone_set('America/Chicago');
include('moon.php');
print_r(Moon::calculateMoonTimes(6, 28, 2011, 36.754478, -96.110291));
```

The above code will output the following result:

[code=output]stdClass Object ( [moonrise] => 1309246800 [moonset] => 1309300560 )[/code]

Moonrise and moonset, as stated previously, are a Unix time stamp local to the latitude and longitude given.

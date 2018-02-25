---
title: "Writing Super Tiny Code"
slug: writing-super-tiny-code
date: 2012-07-11T22:28:52-05:00
tags:
- coding
- daily
- php
---
About a month or so ago, there was a contest thread on reddit whose objective was to write a PHP function to score a bowling game in as few characters as possible. A comma delimited string of frames would be passed in to the function and the score of said string would be returned.

My first step to this was to write, in normal code, a function that would do just that:

```php
function dxprog($game) {
	$game = explode(',', $game);
	$len = count($game);
	$i = 0;
	$score = 0;
	$frame = 0;
	while ($frame < 10) {
		$frame++;
		$score += $game[$i];
		$next = $i + 1 < $len ? $game[$i + 1] : 0;
		$next2 = $i + 2 < $len ? $game[$i + 2] : 0;
		if ($game[$i] == 10) {
			$score += $next + $next2;
			$i++;
		} else if ($game[$i] < 10 && $game[$i] + $next == 10) {
			$score += $next;
			$score += $next2;
			$i += 2;
		} else {
			$score += $next;
			$i += 2;
		}
	}
	return $score;
}
```

496 characters. Obviously, the next step was to minify that code:

```php
function dxprog($game) {
	$g=split(',',$game);$l=count($g);$i=$s=$f=0;while($f<10){$f++;$s+=$g[$i];$n=$i+1<$l?$g[$i+1]:0;$n2=$i+2<$l?$g[$i+2]:0;if($g[$i]==10){$s+=$n+$n2;$i++;}else if($g[$i]<10&&$g[$i]+$n==10){$s+=$n+$n2;$i+=2;}else{$s+=$n;$i+=2;}}return $s;
}
```

That brings us down to 232 characters. All of the minification was done by hand and now began the task of trimming as many characters as I could. Any reduction in characters, no matter how few, was welcomed. I reviewed my logic, rolled together declarations where I could and came up with the following 186 characters:

```php
function dxprog($game) {
	$g=split(',',$game);$l=count($g);$i=$s=$f=0;while($f<10){$f++;$s+=$x=$g[$i];$o=$i+2<$l?$g[$i+2]:0;$n=++$i<$l?$g[$i]:0;if($x==10)$s+=$n+$o;else{$s+=$n;$i++;$s+=$x+$n==10?$o:0;}}return $s;
}
```

This challenge was pretty interesting because it required me to think in ways I never have before. In PHP, there's little reason to write small code, and in JavaScript, I'll just run it all through something like [Closure Compiler](http://closure-compiler.appspot.com/home), so this was something entirely new. What really helped reduce the code in the end was eliminating conditional branches that did the same thing (ternaries also helped immensely).

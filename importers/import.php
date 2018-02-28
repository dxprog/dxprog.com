<?php

date_default_timezone_set('America/Chicago');

// Markup to change
$exp = array (
  "@\[b\](.*?)\[/b\]@",
  "@\[i\](.*?)\[/i\]@",
  "@\[img=(http|https):\/\/(.*?)\](.*?)\[/img\]@",
  "@\[url=(http|https):\/\/(.*?)\](.*?)\[/url\]@",
  "@\|js=(.*?)=sj\|(.*?)\|@",
  "@\[head\](.*?)\[/head\]@",
  "@\[header\](.*?)\[/header\]@",
  "@\[list\](.*?)\[/list\]@s",
  "@\[item\](.*?)\[/item\]@",
  "@\[youtube=(.*?)\]@",
  "@\[flash=(.*?)\]@",
  "@\[code=([^\]]+)\](.*?)\[\/code\]@is");

// What to change it to
$rpl = array (
  "**\$1**",
  "_\$1_",
  "![](\$1://\$2 \"\$3\")",
  "[\$3](\$1://\$2)",
  "<a href=\"javascript:\$1\">\$2</a>",
  "## \$1",
  "## \$1",
  "\$1",
  "- \$1\n",
  "[![youtube video](https://img.youtube.com/vi/\$1/0.jpg)](https://www.youtube.com/watch?v=\$1&youtube-thumb)",
  "<div id=\"flash_embed\"><script type=\"text/javascript\">\$(function(){\$(\"#flash_embed\").flash({swf:\"\$1\", width:630, height:375})});</script></div>",
  "```\$1\n\$2\n```");

$data = file_get_contents('https://api.dxprog.com/?method=content.getContent&contentType=blog&type=json&max=1000');
$data = json_decode($data);

if (!is_array($data->body->content)) {
  $data->body->content = [ $data->body->content ];
}

foreach ($data->body->content as $post) {
  $out = '---' . PHP_EOL;
  $out .= 'title: "' . str_replace('"', '\\"', $post->title) . '"' . PHP_EOL;
  $out .= 'slug: ' . $post->perma . PHP_EOL;
  $out .= 'date: ' . date('c', (int) $post->date) . PHP_EOL;
  $out .= 'tags:' . PHP_EOL;
  foreach ($post->tags as $tag) {
    $out .= '- ' . $tag->name . PHP_EOL;
  }
  $out .= 'redirect_from:' . PHP_EOL;
  $out .= '- entry/' . $post->perma . '/' . PHP_EOL;
  $out .= '---' . PHP_EOL;

  $body = preg_replace($exp, $rpl, $post->body);
  if (preg_match_all('/\[quote\](.*?)\[\/quote\]/is', $body, $matches)) {
    for ($i = 0; $i < count($matches[0]); $i++) {
      $quote = '> ' . implode("\n> ", explode("\n", $matches[1][$i]));
      $body = str_replace($matches[0][$i], $quote, $body);
    }
  }

  $out .= $body . PHP_EOL;
  file_put_contents('./posts/' . $post->perma . '.md', $out);
}
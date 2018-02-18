---
title: "Wordpress - Related Posts Script"
slug: wordpress-related-posts-script
date: 2010-09-13T23:12:47-05:00
tags:
- php
- web dev
- wordpress
---
At my job, I currently have three Wordpress sites under my watchful eye. On one, I was tasked with creating a related posts feature. Now, there are certainly enough plug-ins that will do just that, but none of them worked how I wanted to or were generally more complex than necessary. So, I whipped up this little script:

```php
function relatedPosts($id) {

	/* Build a query to get a list of all posts that share similar tags */
	$s = microtime(true);
	$q = "SELECT count(*) AS total, p.ID, p.post_title, p.post_date FROM wp_posts p INNER JOIN wp_term_relationships t ON p.ID=t.object_id AND t.term_taxonomy_id in (SELECT s.term_taxonomy_id FROM wp_term_relationships s WHERE s.object_id=$id) AND t.object_id != $id AND p.post_status='publish' GROUP BY p.id ORDER BY total DESC, p.post_date DESC LIMIT 5";

	/* Format the output */
	$out = "";
	$result = @mysql_query($q);
	if ($result && @mysql_num_rows($result) > 0) {
		$out = "<h3 class=\"related\">Related Posts</h3><ul class=\"related\">";
		while ($row = mysql_fetch_object($result)) {
			$perma = get_permalink($row->ID);
			$out .= '<li><a href="'.$perma.'">'.$row->post_title.'</a> - '.date("F j, Y", strtotime($row->post_date)).'</li>';
		}
		$out .= "</ul>";
	}
	
	echo($out);

}
```

Just drop that in the wp-content/_yourtheme_/functions.php file, where _yourtheme_ is the directory of your active theme. Then add the following in your wp-content/_yourtheme_/single.php where you want the related posts to appear:

```php
relatedPosts(get_the_ID());
```

You should now have a list of posts with similar tags. Styling is simple: one h3 and one ul, both with the class "related".

Enjoy!

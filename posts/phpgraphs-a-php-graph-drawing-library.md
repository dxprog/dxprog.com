---
title: "phpGraphs - A PHP Graph Drawing Library"
slug: phpgraphs-a-php-graph-drawing-library
date: 2009-09-07T22:49:07-05:00
tags:
- coding
- phpgraphs
- web dev
---
![](http://images.dxprog.com/blog/phpgraphs.png "phpGraphs")
Over the past few days, I've been developing a library to help in drawing graphs for various stuff on the [music page](http://dxprog.com/entry/celebrating-one-year-of-the-music-page). I've built to to be a fairly complete solution that is both robust and simple to use. Today, I offer phpGraphs to the masses to do with as they please, [free of charge.](http://dxprog.com/files/phpGraphs_1.0.zip) Follow the break for a quick tutorial on how to use it.[break]
phpGraphs requires PHP5 and the GD2 extension to be enabled. To install, simply copy the phpGraph.php to a place accessible to your script.
Here's a small script that sets up the graph object an adds data:
```php
include ("http://dxprog.com/phpGraphs.php");

$graph = new Graph ("My Graph", 640, 480);
$dataSet = $graph->createDataSet ("Data Set 1");
for ($i = 0; $i < 50; $i++)
	$dataSet->add (rand () % 100);
```

**Line 2 - **Here, we include the phpGraph library. Pretty self-explanitory.
**Line 4 - **We create our graph object in the variable $graph. The argument passed is the title that will be drawn at the top of the graph. The second two parameters are the width and height of the image, respectively.
**Line 5 - **This creates a new dataset with the name "Data Set 1". It returns a pointer to the dataset object within the graph object. You can create an infinite amount of data sets, though there is a visual limitation I will discuss later.
**Line 6 - **Calling the _add_ function of the object returned on line 5 will add data to the set, in this case a random number from 0 to 100.
phpGraphs has the ability to draw four different types of graph. They are: line, vertical bar, horizontal bar and pie. Following is an example of each graph type along with the function prototype.
![](http://dxprog.com/pics/phpGraphs_line.png "Line Graph")
[code=prototype]image drawLineGraph (xLabel, yLabel, [drawLegend = true], [divisions = 5]);[/code]
![](http://dxprog.com/pics/phpGraphs_vbar.png "Vertical Bar Graph")
[code=prototype]image drawVertBarGraph (yLabel, [drawLegend = true], [divisions = 5]);[/code]
![](http://dxprog.com/pics/phpGraphs_hbar.png "Horizontal Bar Graph")
[code=prototype]image drawHorzBarGraph (yLabel, [drawLegend = true], [divisions = 5]);[/code]
![](http://dxprog.com/pics/phpGraphs_pie.png "Pie Graph")
[code=prototype]image $graph->drawPieGraph ([drawLegend = true]);[/code]
All of these are functions of the Graph object and aach returns a handle to a GD image that you can do with as you please. Some notes on the parameters:
_xLabel - _Label to be drawn on the X axis
_yLabel - _Label to be drawn on the Y axis
_showLegend - _Defines whether to show the legend or not. This is turned on by default. If the legend is disabled, the graph will enlarge to fill the image.
_divisions - _ This says how many times to divide up the Y axis (X for horizontal bar graphs). The default is 5, which should work well in most cases.</p>
<p>By default, phpGraphs has colors set for text, image background, data background, grid, and twelve colors for data sets. Now, as I mentioned above, you can have an infinite amount of data sets, but after the twelfth the color will be black as no colors are set beyond that. phpGraphs, however, gives you complete control over the colors you wish to use. The functions are as follows:</p>
[code=prototype]Graph->setBgColor (r, g, b, [a = 0x00]);
Graph->setDataBgColor (r, g, b, [a = 0x00]);
Graph->setTextColor (r, g, b, [a = 0x00]);
Graph->setGridColor (r, g, b, [a = 0x00]);
Graph->setDataColor (index, r, g, b, [a = 0x00]);[/code]
_r, g, b - _The red, green and blue values of the color. Valid value range is 0-255.
_a_ - Alpha of the color. Valid values are 0-127, with 0 being completely opaque and 127 being completely transparent.
_index - _setDataColor allows you to change the color of the lines, bars and slices used for data. The index value specifies the data set number. Valid valus are 1-infinity.
Below is an example of a graph that has a custom color scheme:
![](http://dxprog.com/pics/phpGraphs_custom.png "A graph using custom colors")
Expounding upon the example given above, here is how a complete script would look.
```php
include ("http://dxprog.com/phpGraphs.php");

// Create the graph and add some data
$graph = new Graph ("My Graph", 640, 480);
$dataSet = $graph->createDataSet ("Data Set 1");
for ($i = 0; $i < 50; $i++)
	$dataSet->add (rand () % 100);

// Draw the graph
$img = $graph->drawLineGraph ("Iteration", "Value", false);

// Add the appropriate headers so the browser recognizes this as an image
header ("Content-type: image/png");
imagepng ($img);
imagedestroy ($img);
```
That's about all there is to it. If you find any bugs, have any feature requests, or are just having issues, feel free to leave a comment below and I'll be glad to help. Enjoy!

[ [Download](http://dxprog.com/files/phpGraphs_1.0.zip) ]

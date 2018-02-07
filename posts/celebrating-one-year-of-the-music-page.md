---
title: "Celebrating One Year of the Music Page"
slug: celebrating-one-year-of-the-music-page
date: 2009-09-01T04:32:32-05:00
tags:
- coding
- music page
- web dev
---
For the casual frequenter of my blog, you've probably seen me mention the illustrious [Music Page](http://dxprog.com/entry/building-a-web-based-media-player---part-1/) before. It has been my pet project for a year now and has been the catalyst for a few leaps in coding practice for me. Firstly, it's responsible for my becoming quite adept at advanced "OOP"-like JavaScript-ing. Secondly, it's given me an outlet to try out new things such as dynamic graphs in PHP or using Bing's search API. Let's take a brief walk through history.[break]

One thing I'll mention about the Page that has been intrinsic to every version: the whole concept is based on disposable playlists. Unlike iTunes or Windows Media Player which has you going through a huge list either right clicking to add to playing or ctrl-selecting and dragging off into a permanent playlist, the Music Page queues up songs in a single click, which I believe makes it a whole lot faster and easier to set up whatever music I want to listen to.

**The First Version**
[url=http://dxprog.com/pics/music_page_1.jpg]![](http://dxprog.com/pics/music_page_1.jpg "Music Page v1")[/url]
The first version of this project was really just a front end for playing MP3s through my server and didn't actually involve any streaming at all. It was more of a "see if a can" type thing without any real plans for fleshing out a full app. That didn't come until I decided to throw in a the Flash app.

I don't remember exactly why I decided to create the streaming player; perhaps so I could listen to my music while I was working at school. In fact, I believe I started this project in the month I had my PHP class. While everyone else was struggling trying to create the simple home page that was required, I was off doing extra-curricular activities. An ass I am.

The page pretty much stayed like this for quite some time. Somewhere, I moved everything to two columns and added playlist support, but that was it. No fancy effects, no JavaScripty goodness. Hell, it didn't even get a look refresh until November when I made a Christmas theme.
[url=http://dxprog.com/pics/music_page_1_winter.jpg]![](http://dxprog.com/pics/music_page_1_winter.jpg "Music Page v1 - Winter Theme")[/url]

**Music Page v2**
[url=http://dxprog.com/pics/music_page_2.jpg]![](http://dxprog.com/pics/music_page_2.jpg "Music Page v2")[/url]
The second revision of the page saw quite a lot of additional features. The first big change was completely dropping PHP for any kind of front end job. Instead, it handled data management and everything else was handled by JavaScript through Ajax. This was the real beginning of my JavaScript coding days. I'd been piddling around with jQuery for a little bit before, but now I brought it out in force.

The second major update was the layout. Instead of having a giant list of everything off to the right like you see in most desktop media players, I hid all the track names and moved the album list to left. This, coupled with the addition of album art thumbnails and the larger font for album names, made it far easier to find the songs I was looking for. Additionally, I also included the ability to save playlists.

Finally, another welcome feature, was the inline upload form (not shown). Using a bunch of Ajax calls and a little C++ application to grab ID3 tags, I was able to quickly upload a whole bunch of songs without having to go to a different page or worry about page refresh due to form submission. This made the addition of music a thousand times easier. However, a page refresh was still required to update the album list on the left.

But, as had happened with the first one, I began shoe-horning features on that the original code base and design had never been intended for. So, I began work on the be all and end all of the Music Page.

**Music Page Rev. 3**
[url=http://dxprog.com/pics/music_page_3.jpg]![](http://dxprog.com/pics/music_page_3.jpg "Music Page Rev. 3")[/url]
With the current iteration, I've rewritten the entire code base from ground up (except the PHP stuff. It's stayed mostly the same). This is more of a evolutionary revision as opposed to the revolutionary of v2.

Again, this version has seen PHP kicked even more to the curb by revoking its right to sort all the data before sending it to the page script. All of the tracks are loaded and sorted on the fly in JavaScript, which allows me to fully update the album list whenever I wish, such as after the addition of new MP3s.

In visual changes, I moved all the playlist data off to the right and added pages for each of the various functions. This makes the left column much less cluttered while giving the other functions the time of day they deserve. Also, by creating the paged portal, I leave plenty of room for me to expand in the future. This has already come in handy as I've been adding features the last couple days that weren't originally intended.

First is the play history graph, as seen in the picture above. Before, I'd been using a [twitter account](http://twitter.com/dxmusic) to track my play history (and, somewhat successfully, last.fm before that). However, I'm now storing play history in a local table in the database for the sole purpose of tracking stats (another page I could add in the future). The second feature is the addition of inline album art search.

[url=http://dxprog.com/pics/music_page_3_art.jpg]![](http://dxprog.com/pics/music_page_3_art.jpg "Music Page Rev. 3 - Album Art Search")[/url]
Using the Bing API (because Google's doesn't do image search), you can scour the webs to locate, download and set album art. The text box shown above is filled with the name of the album by default, but you're able to enter in custom terms and search to your heart's content until you find what you want.

So there's a history of what the Music Page has gone through. It's been quite an adventure pulling this thing together and I've certainly learned a lot from the experience. The one thing that I think makes this project sweeter than just a fun past time is the fact that it's a viable application. I literally have not used any desktop music player since I created this thing (my brothers too). Being that I actually use it on a day-to-day basis gives me an advantage in seeing what's working, what's not and what I would like to added. I wish all projects could work out this well.

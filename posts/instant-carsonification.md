---
title: "Instant Carsonification!"
slug: instant-carsonification
date: 2010-12-03T23:41:52-06:00
tags:
- coding
- javascript
---
![](http://images.dxprog.com/blog/carsonification.jpg "Haha! Obsolescence.")

[David Carson](http://www.davidcarsondesign.com/). I could begin a long diatribe about how I hate this guy and his hack methodology of design, but I will instead be mostly silent and say that I've boiled David Carson down to a 554 byte JavaScript bookmarklet:

|js=(function(){var b=function(a){return Math.floor(Math.random()*a)},h=function(a){var c=document.getElementsByTagName(a),d;for(d in c){a=c[d];try{var g=a.getAttribute("style");Math.random()>0.6&&a.setAttribute("style",g+";left:"+b(1024)+"px;top:"+b(768)+"px; font-size:"+b(120)+"px !important;z-index:"+b(1E3))}catch(i){}}},e=["a","img","p","div","span","table","tr","td","th","h1","h2","h3","h4","h5","h6","li"],f;for(f in e)h(e[f]);document.getElementsByTagName("body")[0].innerHTML+='<style type="text/css">* { position:fixed !important; }</style>'})();=sj|Instant Carsonification|

You can drag that to your bookmarks bar/window or you can copy and paste the URL from the link above and paste it into the title bar of your favorite website. For a more instant gratification, just click it. Any poison you pick, enjoy!

---
layout: post
title: Back To Top
categories: jQuery tip
date: 2016-02-23 10:23:20
tags: jQuery, UI, backtotop
cover_image: images/grassland.jpg
---

###Simply jQuery, how to back to last page.

~~~~
$('a#back').click(function(){
	parent.history.back();
	return false;
})
~~~~
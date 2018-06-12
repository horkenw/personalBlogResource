---
layout: post
title: Flexbox bug on IOS SE or below
categories: Front-end technology
date: 2018-6-10 20:40:06
tags: flexbox, ios, layout
cover_image: images/lakeview.jpg
---

In my project that I have to deal with, I got some tricky cross browser support problems.
So I decided to writing down some problem that I was met and how to sloved it.

## Flexbox not wrapping well on IOS (SE or below)

I was planning to use flexbox layout for a list of items, for most of brower or mobile device even tablets, show really cool, and easy doing.
But I didn't notice that I have to dealing with IPhone SE.

So something going wrong, my box broke, I found that no matter on browser or embed webview in APP,
looks like all my itme wrap in one line, and it render overflow mobile screen.

but something strange, when I saw the flexbox tutorial DEMO, it look same as we looked on SE, 
this does not make sense.

## Flexbox didn’t wrap on iOS

I guess that should be my CSS setting problem not about the mobile device.

Here is my setting in flex box
```css
.gamebox{
	display: flex;
	flex-flow: row wrap;
	padding: 15px;
    justify-content: space-between;
    min-width: 100%;
    background: hsl(52, 15%, 20%);
}
.item{
	min-width: 18%;
	max-width: 18%;
	margin: 0 5px;
	margin-bottom: 10px;
	flex: 1;
	border-radius: 15px;
	cursor: pointer;
}
```
Most of browser looks charming, but SE look awful.

##  Just 'flex: 1' will break wrapping on IOS

After I searching on browser, I just found that does not have much people meet this problem, most of tricky part is `Flexbox` still have some unknowing bug on IOS sys, so people try to avoid this situation to use `float: left` instead.

But I believe that should be have one of people have playing this on IOS. 
Thankfully, I'm reallly found someone who had this problem almost same as I met.

Here is orginal question 
[CSS Flexbox not wrapping on iOS](http://flassari.is/2016/04/css-flexbox-not-wrapping-on-ios/)

>It turned out to be a simple fix, on my flexbox child item I had to change
>`flex: 1`
>to
>`flex: 1 0 $minWidth; // Just 'flex: 1' will break wrapping on iOS.`
>where $minWidth is the minimum desired width of the flexbox child item.

So, after that I was change my CSS style, and it really work after I made some change.

After change
```css
.gamebox{
	display: flex;
	flex-flow: row wrap;
	padding: 15px;
    justify-content: space-between;
    min-width: 100%;
    background: hsl(52, 15%, 20%);
}
.item{
	// seems we can ignore min-width and max-width after set flex-baise, but for avoid something else problems I still keep it there.
	min-width: 18%; 
	max-width: 18%; 
	margin: 0 5px;
	margin-bottom: 10px;
	flex: 1 0 18%; // ← change here
	border-radius: 15px;
	cursor: pointer;
}
```
---

DONE! Hurray ~~~
Flexbox is a awesome and easy going layout, but in some not common browser or some oldies browser, it maybe hide some bugs in it.
Maybe after done with your website, you should to try it on some device to make sure it looks great.


By Horken <horkenwong@gmail.com>

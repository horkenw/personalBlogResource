---
layout: post
title: Fashion Digital Clock
date: 2015-08-24 20:36:31
categories: funny toy
tags: canvas, html, javascript animation,
cover_image: images/digitalclock.jpg
---

### How to make a fashion digital clock

I was browsing on internet to saw some CANVAS article, and I saw this demo is kinda cool and awesome, so I was decided to make a similar one for myself.

![digital-clock](/images/contentimg/digitalcalandar.png)

- - -

```CSS
canvas{
	background: hsl(0, 0%, 90%);
	display: none;
}
```

```javascript
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
ctx.strokeStyle="hsl(190, 84%, 80%";
ctx.lineWidth=12;
ctx.lineCap="round"
ctx.shadowBlur=10;
ctx.shadowColor="hsl(190, 84%, 90%)";

function degToRad(deg){
	var factor=Math.PI/180;
	return deg*factor;
}

function renderTime(){
	var now=new Date();
	var today=now.toDateString();
	var time=now.toLocaleTimeString();
	var h=now.getHours();
	var min=now.getMinutes();
	var sec=now.getSeconds();
	var mils=sec+(now.getMilliseconds()/1000);

	ctx.fillStyle="hsl(0,0%, 60%)";
	ctx.fillRect(0,0 , 500,500)

	ctx.beginPath();
	ctx.arc(200,230, 180, degToRad(270), degToRad(h*15) -90);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(200,230, 160, degToRad(270), degToRad(min*6) -90);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(200,230, 140, degToRad(270), degToRad(mils*6) -90);
	ctx.stroke();

	ctx.font="35px Georgia";
	ctx.fillStyle="hsl(190, 100%, 60%)";
	ctx.fillText(today, 90, 200);

	ctx.font="30px Georgia";
	ctx.fillStyle="hsl(190, 100%, 60%)";
	ctx.fillText(time, 120, 280);

}

setInterval(renderTime, 40);
```
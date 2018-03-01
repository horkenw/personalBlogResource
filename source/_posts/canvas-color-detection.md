---
layout: post
title: CANVAS 圖片色系檢測
categories: Js tip
date: 2018-01-15 17:53:35
tags: javascript, canvas, color brightness
cover_image: images/beachside.jpg
---

以前印象中看過一個網站上有種特殊的效果就是網頁文字會跟隨背景圖片或是顏色亮度自動調整色彩，這給我感覺是非常神奇和有趣的。
但是又不知道它的原理邏輯是什麼，又不知道該如何著手去查詢，這時候就只能望洋興嘆。

只是沒想到最近居然有機會讓我碰到這個類似的功能，
>>有個客戶非常希望能夠知道他們每次上傳的圖片究竟是屬於亮色系還是暗色系，然後要做不同的處理。

哈哈，這下就讓我找到機會來試試這個效果。

乍聽之下還頗困難的，我該怎麼去解析圖片的亮度就是一個很大的問題。
但是當我上網拜了一下大神之後，忽然間整個問題變成了一蹴而就、不費吹灰之力。

這真的要多虧了`HTML 5`的新功能

## CANVAS
[CANVAS介紹](https://www.w3schools.com/html/html5_canvas.asp)

這是一個類似網頁畫布的東西，可以用一些簡單的JS指令在這畫布上畫出各種需要的形狀或是色彩，甚至於可以直接將圖片複製一份進去，進行特別的改動。

而要達成檢查顏色亮度的功能就是將圖片一張一張的畫進去之後，再用`CANVAS`的內建功能`getImageData()`來取出每一個pixel的圖片的色系。

### getImageData()

CANVAS 2D提共的API，他回傳一個自訂範圍內畫布底層像素的數據，可以讓我們獲得該圖片的完整像素數據。

取得的像素數據是 `[R, G, B, A, R, G, B, ...]` 一直重複至圖片範圍最末端

------

既然知道原理，那實際上要做起來就很簡單了，將圖片畫入畫布之後，簡單跑一個迴圈，取出R、G、B三種元素各自的總量，然後再做加總做平均之後就可以知道圖片究竟是亮色系，或是暗色系。(甚至於可以直接修改，將圖片變成反白後的色系。)

圖片色彩判斷例子
~~~javascript

var imageData = ctx.getImageData(0, 0, canvas寬度, canvas高度).data;
var r, g, b, avg, colorSum;
for(var x = 0, len = data.length; x < len; x += 4){
	r = data[x];
	g = data[x+1];
	b = data[x+2];

	avg = Math.floor((r+g+b)/3); //將R、G、B三元素加總取平均數
	colorSum += avg; //最後將取得的數再做加總
}

brightness = Math.floor(colorSum / (this.width * this.height)); 
// 加總之後的數值去除圖片的總面積就可以取得這張圖片的亮度 Ps. 數字越大(越接近0) 代表越暗

~~~

這大概就是我這次查出來得到的資料。
[順帶附上一個小DEMO](https://github.com/horkenw/CSSnJS/blob/master/canvas/detectBrightness.html)
可以下載之後直接看程式。


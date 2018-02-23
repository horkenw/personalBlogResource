---
title: 文字取代圖片的方法
date: 2017-01-15 21:45:35
categories: Front-end technology
tags: HTML, CSS, 圖片取代文字
cover_image: images/grassland.jpg
---

最近遇到一個還蠻奇特的情境，早在幾年前就有人提過，Image 部分雖說不需要使用文字，但是又有文章提到 Google 的 SEO 其實會去抓 Image 裡面是否有文字，也就是說除了 Alt 必須要設定之外，另外就是圖片底下還可以放置文字，更明確的表達出這張圖所代表的意義。

取自 [L. Jeffrey Zeldman](http://www.zeldman.com/2012/03/01/replacing-the-9999px-hack-new-image-replacement/)  圖片取代文字的設定
***

## 主要 CSS 設定

```css
.hide-text {
	text-indent: 100%;
	white-space: nowrap;
	overflow: hidden;
}
```

最初時期我在使用的方法不外乎 `display:none` 或是  `-9999PX` 方法使文字消失或是隱藏。
可是這就衍伸出一個問題，`display: none` 會被爬蟲認定為是不存在的東西，所以就算你訂的在完整，對爬蟲來說依舊是 NULL。

所以之後就有去翻找一些資料，想說去查看看其他人對這部分都是怎麼處裡的。
說來也很巧，我在查詢圖片 `Title` 跟 `Alt` 差別(這又是另外一篇故事了~)的時候，忽然就看到這篇文章。

我發現這作者使用的取代方式更高明XD!! 筆記一下~
***

### 替代 -9999PX HACK 

+ 主要的應用是指我設定 `text-indent` 為整個內縮 100%，也就是直接跳出可視位置。
+ 接著為了避免文字太長，又用 `white-space` 強制要求他顯示的時候我只要一整行，不要自動根據寬度換行。
+ 最後面我只要把所有超出範圍的東西全部隱藏。 對! 就是它 `overflow: hidden;`

噹噹!!  完成了。這樣圖片裡面的文字就不會跟著圖片的時候顯示，造成我們會在透明的圖片上還看的到底下的文字內容。

作者在原文提到

>a performance hit caused by the need to draw a giant 9999px box offscreen. 
>(Yes, the browser really does this.)

對於瀏覽器來說，這會是一個很大的消耗，因為他需要為了那-9999px繪製一個超過原本瀏覽器大小的範圍，簡單來說就是他消耗了效能去做原本其實不需要做的事情(雖然說現在電腦普遍都好到可以忽略不計這點消耗)。

另外一個例外則是，如果你的文字長到9999px都遮不住，那他可能就會漏餡，或是你必須另外在用更多 `9` 去移動,其實我真的就覺得沒這必要了。

以上就是我這次的討論。如果你也喜歡 CSS, HTML 或是 JavaScript 的技術，歡迎來跟我一起討論。

By Horken <horkenwong@gmail.com>



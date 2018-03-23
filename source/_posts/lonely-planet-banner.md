---
layout: post
title: 偽寂寞星球主視覺
categories: UI design
date: 2018-02-21 18:21:11
tags: hero banner, banner caousel
cover_image: images/grassland.jpg
---

前幾天看到寂寞星球他們的主視覺，覺得那個感覺真的不錯。
所以就決定去把他試著仿照做一個出來。

Base Plugin:
jQuery
owl-caousel
animate.css

看看成果:
[偽寂寞星球主視覺][1]

[原始碼](https://github.com/horkenw/horkenw.github.io/tree/master/project/heroBanner)

完成這個工作，主要分成幾個部分：

+ 圖片輪播
+ 圖片漸進縮小的動畫
+ 底下簡介的點擊跳躍圖片
+ 根據點選去橫向移動上方的橫條
+ 畫面改變的定位與大小
+ 底下簡介的布置方式

### 圖片輪播 & 底下簡介的點擊跳躍圖片
這部分算簡單，畢竟owl-caousel都已經完成這個工作了，我需要做的就是call method就可以達到我要的東西。

### 圖片漸進縮小的動畫
這邊除了靠 animate.css去做移動時候的動畫之外，一開始進去的圖片漸漸縮小功能
則是用 css keyframe 去寫一個簡單的縮小動畫，以下給個範例。

```css
.owl-item .item {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: 16s forwards zoomScale;
    animation: 16s forwards zoomScale;
    overflow: hidden;
    z-index: 0;
}

@keyframes zoomScale {
    from {
        transform: scale(1.2);
    }
    to {
        transform: scale(1);
    }
}
```

### 根據點選去橫向移動上方的橫條
接下來這部分大概是我覺得這其中最困難的一個，因為每次點擊的時候都是一個自己的li，這就造成我完全沒辦法抓他的左邊座標，並且要找出對應的X座標，才能給滑動的距離。
最後在 jQuery 找到 `offset()`,這可以幫忙我抓到我當前點的元素他距離邊界的距離，才能用來定位移動距離。
**不要用當前滑鼠點下去的座標，因為會落差，畢竟是以li為單位，而不是當前點擊的位置**

```javascript
$('.point_bar').css('left', $(target).offset().left)
```

以上是我這次遇到比較棘手的問題。

喔!! 對了，我還自己增加了一個有趣的功能，會根據當前圖片的色彩明亮度，簡單調整字體的顏色。
也就是說當使用較暗的圖片會變成白色，反之則使用黑色。

這部分則是使用到CANVAS的色彩解析來判斷，詳細的解釋之前因該有說過，就不再贅述。

[1]:http://horkenw.github.io/project/heroBanner/
---
layout: post
title: Css Specific Formula
categories: Front-end technology
date: 2016-01-15 21:33:15
tags: css formula
cover_image: images/lakeview.jpg
---

取自 [Kalpesh Singh](http://www.codewithcoffee.com/5-things-know-css-specificity/) CSS比重的分析
***

最近在Linkin上看到一篇有關於CSS比重差異的文章忽然覺得很有趣，特找過來給需要看看，也加深自己的印象。

如同在工作上常會發現為什麼明明設定過CSS了卻沒辦法覆蓋取代之前的設定，而又不是很想用!Important去強制改變。

最後往往只好再去把CSS重新寫過，這得花上不少時間...... 後來在看過這篇文章在對階層有所了解，也終於知道為什麼設定會一直都失效的問題原因在哪。

## 一個ID比數個CLASS更為強大

ID比重最為重要，一個ID可以打趴所有的CLASS。
舉例來說 ：

~~~
<p id="foo" class="bar1 bar2 bar3 bar4">I have ONE ID and FOUR Classes</p>

#foo {
  color: tomato;
}
.bar1.bar2.bar3.bar4 {
  color: steelblue;
}
~~~

所以結果的顯示是????.............................

如果你覺得是*藍色*就錯了，如同標題所說的一個ID可以打趴無數個CLASS (!IMPORTANT例外)。
所以是**紅色**。

## CLASS之間的階級比較

再看一個例子，如果我們有很多的CLASS呢???

~~~
<p class="bar1 bar2 bar3 bar4">I have FOUR Classes</p>

.bar1.bar2.bar3.bar4 {
	color: steelblue;
}

p.bar3.bar4 {
	color: #2e8dcd;
}
~~~

如果說你認為是**藍色**，那BINGO!!!
簡單來說，第一個CSS設定了4個CLASS比重上是 `0-4-0`，所以他的權重就比第二個 `0-2-0` 來的更重，所以是以第一個顏色來設定。
至於什麼是 `0-4-0`、什麼又是`0-2-0`? 別著急，最後會說的**CSS比重量表**，可以清楚的知道比重區別。

## 寫在HTML上的STYLE

再CSS的比重區別上有個非常重要的例外，就是**內嵌CSS(INLINE CSS)**，它就像是同花順，任何*外部IMPORT的CSS*都只是FULL-HOUSE(你說鐵支? 就是!important阿~~ (茶)，那同花一定打的過FULL-HOUSE不是嗎?

## !IMPORTANT真的非常重要

先來看例子:
~~~
<p id="foo" class="bar1 bar2 bar3 bar4">I have ONE ID and FOUR Classes</p>

#foo {
	color: tomato;
}
.bar1.bar2.bar3.bar4 {
	color: steelblue!important;
}
~~~

我們以上面這例子來說，如果省略IMPORTANT，OK! 很簡單都知道是 ID 勝，可是當我們加上一個IMPORTANT之後，就翻盤了，多了IMPORTANT就很像是鳥槍換砲，加上去的就是贏就對了。

# CSS比重量表

最後，我們來看一下先前提到的css比重量表

![css-specific-formula](/images/contentimg/CSS-Specificity-Formula.jpg)

|Selector       |No of IDs (a)     |No of Classes(b)    | No of Elements(c)     |Specificity(a-b-c)|
|:-------------:|------------------|--------------------|-----------------------|------------------|
|p              |0                 |0                   |1                      |0-0-1             |
|p#foo          |10                |0                   |1                      |10-0-1            |
|p.bar          |0                 |1                   |1                      |0-1-1             |
|p.bar1.bar2.bar|0                 |3                   |1                      |0-3-1             |

根據以上的表個因該就可以很清楚的了解比重的差別了，不是嗎? 一個ID代表10分，所以如果我有一個ID、一個CLASS那我就是有10 - 1 - 0，以此類推。
---
title: '[HTML]Input-radio and label'
date: 2017-04-23 22:45:35
categories: Front-end technology
tags: HTML, structor, semantic
cover_image: images/lakeview.jpg
---

下午花了我一整天去處理一個Bug，我想很多人都常用Tab標籤來區分內容吧?
今天就有了這個任務，要做一個tab來區隔幾張圖表。

恩...，CSS做起來其實不難，還可以說其實很簡單。

當完成之後試試，奇怪為什麼我點選了Tab，但是我底下的頁面卻不會連動切換??

再仔細的看過我的Code，然後還到網路上找個各種範例來參考，都其實差不多阿，到底是哪邊出問題...

~~~~
	<input type="radio" name="labelTab" id="tab1" />
	<labelfor="tab"></label>
	<div class="tab-content">.....</div>
~~~~

我真的不認為我寫的有問題，一直到我忽然有點腦衝就把label裡的for值改的跟radio id相同

~~~~
	<input type="radio" name="labelTab" id="tab1" />
	<label for="tab"></label>
	<div class="tab-content">.....</div>
~~~~

雨過天晴世界和平了

這件事情也讓我發覺了原來label 的for其實是很重要的，或許我對label的了解不夠深入，下次可以再試看看還有沒有東西會牽動或是被牽動到。

有點晚了 好不容易撐到寫完了.... 晚安 我要睡覺了!! zzZZZZ.....

***

I was spend almost all afternoon to solved a problem.
Well, we normally use input radio with label in the form control,
yeah, we can just click the button to select which we want,but.....

## If we want use label to cover radio botton?

that is to say

### use tab separate content

so this is how I use to do..

~~~~
	<input type="radio" name="labelTab" id="tab1" />
	<labelfor="tab"></label>
	<div class="tab-content">.....</div>
~~~~

What is that strange question??
why when I click label doesn't trigger page transition?
I was searched on the internet, but no one talking about anything about this problem..

until... 
### I was suddenly change "id" to "radio" same as "label" "for" value...

~~~~
	<input type="radio" name="labelTab" id="tab1" />
	<label for="tab"></label>
	<div class="tab-content">.....</div>
~~~~

oh, I just realize "label" for value will trigger input radio to selected.

By Horken <horkenwong@gmail.com>
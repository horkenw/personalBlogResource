---
layout: post
title: Right Click Menu
categories: UI design
date: 2016-03-06 19:57:56
tags: javascript, custom click menu
---

I was got a feature request few days ago, is about our costomer they don't want the original right click menu. They want a costom menu only show out download & delete & past three action.

So, we have to consider about how to make it, I was consider about use `click` event at beginning, but that kinda not a good idea, because if we have to use original click event, that might occurs unexpected error.

## About Contextmenu event

After I serch on internet, I saw most of people to do this all use `contextmenu` event. 

According to W3C school:
> The oncontextmenu event occurs when the user right-clicks on an element to open the context menu

[Contextmenu](https://www.w3schools.com/jsref/event_oncontextmenu.asp)

So now I know that right click also has their own event, not only `click` event to detectd which button you were click though.

---

Example code:

```javascript
	document.addEventListener('contextmenu', (evt)=>{
		----do something when right click on page----
	})
```



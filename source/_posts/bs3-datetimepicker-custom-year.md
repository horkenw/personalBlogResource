---
layout: post
title: BS3 Datetimepicker custom range
categories: jQuery tip
date: 2015-05-12 22:29:00
tags: bs3-datetimepicker, jQuery, ui
cover_image: images/grassland.jpg
---

### Eonasdan BS3+ datetimepicker - how to costom set year range

Sometime we want to limited user to selected a date from a range we decided, to avoided they choose randomly to make some error occur.

For this feature I was use **Eonasdan datetimepicker**, it give me some options to make this easier to do.

How to do that is just used minDate and MaxDate to set-up the start and end year, like example below:

![datepicker-thumbnail](/images/contentimg/calendar.jpg)



~~~
<script type="text/javascript">
	$(function () {
		var hdlist=["12/25/2015", "12/25/2016"];
		$('#datetimepicker5').datetimepicker({
			defaultDate: new Date(), // set up default today at beginning
			minDate: moment('01/01/2000'), //I need to show from 01/01/2000
			maxDate: moment('02/01/2016'),//and End at 02/01/2016
			disabledDates: [ //or get array from setdisableDates(hdlist)
				moment("12/25"),
				new Date(2013, 11-1 , 21),
				"11/22/2013 00:53"
				]
			});
		});
		function setdisableDates(list){ //pick up special day to disable in hdlist
			var disableList = [];
			for(var key in list ){
				disableList.push(moment(list[key]));
			}
			return disableList;
		}
	}   
</script>
~~~
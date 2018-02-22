function calendarSetup(data){
	this.calendar = data.calendar;
	this.eventDetail= [{date: '2016-12-15', event: 'holliday'}, {date: '2016-12-13', event: 'specialPrice'}, {date: '2016-12-04', event: 'holliday'}];
	this.startDate = new Date();
	this.maxDate = '+6m';
	this.columnNum = data.column===2 ? data.column : 1;
	this.selectedDate = [this.startDate.getMonth() ,this.startDate.getFullYear()];
	this.eventDate = [];
	this.selectMonth = '';
	this.offMonthSelect={};
	this.offMonthBox = [];
	this.nexBtn = '.ui-datepicker-next';
	this.preBtn = '.ui-datepicker-prev';
	this.smallCalendar = 'col-md-3 col-sm-3 col-xs-3';
	this.largeCalendar = 'col-md-8 col-sm-8 col-xs-8';
	this.toggleMonths = $('#monthset');

	this.initCalendar();
	this.setHollidayBtn();
	if(this.columnNum===2)
		this.calendar.parent().addClass(this.largeCalendar);
	else
		this.calendar.parent().addClass(this.smallCalendar);
}

calendarSetup.prototype.initCalendar = function(){
	if(this.eventDate.length) this.getAllSelectDate();
	this.showCalendar();
	$(this.nexBtn+',' + this.preBtn).off('click');

	$(document).on('click', this.nexBtn, //下一個月
		$.proxy(function(){
			var inst = $.datepicker._getInst(this.calendar[0]), selectYear;
			
			this.selectMonth = this.selectedDate[0];
			selectYear = this.selectedDate[1];
			this.selectedDate[0] = inst.drawMonth = inst.selectedMonth = this.selectMonth+2>11 ? this.selectMonth+2-11 : this.selectMonth+3;
			this.selectedDate[1] = inst.drawYear = inst.selectedYear = this.selectMonth+2>11 ? selectYear+1: selectYear;
			$.datepicker._notifyChange(inst);
			$.datepicker._adjustDate($( "#datepicker" )[0]);
		}, this));

	$(document).on('click', this.preBtn, //上一個月
		$.proxy(function () {
			var inst = $.datepicker._getInst($( "#datepicker" )[0]);

			this.selectMonth = this.selectedDate[0];
			selectYear = this.selectedDate[1];
			this.selectedDate[0] = inst.drawMonth = inst.selectedMonth = this.selectMonth-2<0 ? this.selectMonth-2+11 : this.selectMonth-3;
			this.selectedDate[1] = inst.drawYear = inst.selectedYear = this.selectMonth-2<0 ? selectYear-1: selectYear;
			$.datepicker._notifyChange(inst);
			$.datepicker._adjustDate($( "#datepicker" )[0]);
		}, this))

	this.toggleMonths.on('click',
		$.proxy(function () {
			this.calendar.datepicker('destroy');
			if(arguments[0].target.checked){
				this.calendar.parent().removeClass(this.smallCalendar);
				this.calendar.parent().addClass(this.largeCalendar);
				this.columnNum = 2;
			}
			else{
				this.calendar.parent().removeClass(this.largeCalendar);
				this.calendar.parent().addClass(this.smallCalendar);
				this.columnNum = 1;
			}
			this.showCalendar();
		}, this))
}
calendarSetup.prototype.refreshCalendar = function(){
	this.calendar.datepicker('refresh');
}
calendarSetup.prototype.setHollidayBtn = function(){
	var weekendBtn = $('#weekend'), offMonthBtn = $('#offmonth');

	weekendBtn.on('click', $.proxy(function(){
		// this.calendar.datepicker("destroy");
		this.showCalendar.call(this, $(arguments[0].target).prop('checked'));
		this.refreshCalendar();
	}, this));

	offMonthBtn.on('click', $.proxy(function(){
		if(offMonthBtn.prop('checked') && this.offMonthSelect.month+1){
			this.offMonthBox.push({month: this.offMonthSelect.month, year: this.offMonthSelect.year});
			this.showCalendar.call(this, weekendBtn.prop('checked'));
		}
		else{
			if(this.offMonthSelect.month+1){
				var idx = this.offMonthBox.map(function(x){ // remove selected date from Detail array
						return x;
					}).findIndex(function(array){
						return array.month === this.offMonthSelect.month && array.year === this.offMonthSelect.year;
					}.bind(this));
				if(idx >= 0) this.offMonthBox.splice(idx, 1);
			}
			this.showCalendar.call(this, weekendBtn.prop('checked'));

			var arrayCheck = function(){
				var checked = false;
				for(var i=this.offMonthBox.length; i--;){
					if(this.offMonthBox[i].month === this.offMonthSelect.month) checked = true;
				}
				return checked;
			}

			if('')offMonthBtn.prop('checked', arrayCheck);
			if(this.offMonthSelect.month === undefined) alert('請先選擇要設定的月份');
		}
		this.refreshCalendar();
	}, this));
}

calendarSetup.prototype.showCalendar = function(holliday){
	this.calendar.datepicker({
		inline: true,
		numberOfMonths: [ 3, this.columnNum ],
		dateFormat: "yy-mm-dd", 
		defaultDate: this.clickStartday,
		minDate: this.startDate,
		autoSize: true,
		maxDate: this.maxDate,
		beforeShowDay: this.setHolliday.bind(this),
		onSelect: this.setEventItems.bind(this)
	});
}

calendarSetup.prototype.setEventItems = function(txt, obj){
	//set next or prev page month
	this.selectedDate[0] = obj.drawMonth;
	this.offMonthSelect.month = obj.selectedMonth;
	this.selectedDate[1] = obj.drawYear;
	this.offMonthSelect.year = obj.selectedYear;

	$('.month_label').addClass('deny');

	$('.eventselect').fadeIn(500);
	if($.inArray(txt, this.eventDate) === -1){
		$('input[name=event]').prop('checked', false);

		// one day set
		$('input[name=event]').off('click').on('click', 
			$.proxy(function(){ 
				var eventDetail = this.eventDetail;
				$('.eventselect').fadeOut(500);
				switch ($(arguments[0].target).val()){
					case '2':
						eventDetail.push({date: txt, event: 'holliday'})//假期
						break;
					case '3':
						eventDetail.push({date: txt, event: 'specialPrice'}) //活動
						break;
					case '1':
						eventDetail.push({date: txt, event: 'cancel'}) //取消
						break;
					default:
				}
				this.getAllSelectDate();
			}, this)
		);
	}
	else{
		var idx = this.eventDate.indexOf(txt);
		this.eventDate.splice(idx, 1); //remove from date array
		var idx = this.eventDetail.map(function(x){ // remove selected date from Detail array
			return x.date;
		}).indexOf(txt);
		this.eventDetail.splice(idx, 1);

		// one day set
		$('input[name=event]').off('click').on('click', 
			$.proxy(function(){ 
				var eventDetail = this.eventDetail;
				$('.eventselect').fadeOut(500);
				switch ($(arguments[0].target).val()){
					case '2':
						eventDetail.push({date: txt, event: 'holliday'})//假期
						break;
					case '3':
						eventDetail.push({date: txt, event: 'specialPrice'}) //活動
						break;
					case '1':
						eventDetail.push({date: txt, event: 'cancel'}) //取消
						break;
					default:
				}
				this.getAllSelectDate();
			}, this)
		);
	}
}

calendarSetup.prototype.setHolliday = function(date){
	var weekend = [], weekday;

	if(this.offMonthBox.length){
		for(var i = this.offMonthBox.length; i--;){
			if(this.offMonthBox[i].month == date.getMonth() && this.offMonthBox[i].year == date.getFullYear()){
				weekend[0] = true;
				weekend[1] = 'pink';
				weekend[2] = '休假日';
			}
		}
	}

	if($('#weekend').prop('checked') && (date.getDay() == 0 || date.getDay() == 6)){
		weekend[0] = true;
		weekend[1] = 'pink';
		weekend[2] = '休假日';
	}
	weekday = this.setDefaultStyle(date, weekend.length);
	return !weekday ? weekend: weekday;
}

calendarSetup.prototype.setDefaultStyle = function(date){
	var dmy = date.getFullYear() + "-" + ('0'+(date.getMonth()+1)).slice(-2)+ "-" +('0'+date.getDate()).slice(-2), 
		eventFound= false,
		offMonthBtn = $('#offmonth');

	this.selectMonth = date.getMonth();

	var idx = this.offMonthBox.map(function(x){ // remove selected date from Detail array
			return x;
		}).findIndex(function(array){
			return array.month === this.offMonthSelect.month && array.year === this.offMonthSelect.year;
		}.bind(this));
	if(idx<0) offMonthBtn.prop('checked', false);
	else offMonthBtn.prop('checked', true);


	for(var i=this.eventDetail.length; i--;){
		if(this.eventDetail[i].date === dmy){
			switch (this.eventDetail[i].event){
				case 'holliday':
					eventFound = true;
					return [true, "pink", "休假日"];
				case 'specialPrice':
					eventFound = true;
					return [true, "skyblue", "活動日"];
				case 'cancel':
					eventFound = true;
					return [true, "", "工作日"];
				default:
					console.log(this.eventDetail[i].event)
				}
			}
		}
	if (!eventFound && !arguments[1]) return [true, "", "工作日"];
}

calendarSetup.prototype.getAllSelectDate = function(){
	this.eventDate=[];
	for(var i = this.eventDetail.length; i--;){
		this.eventDate.push(this.eventDetail[i].date);
	}
}

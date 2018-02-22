;(function($, window, document, undefined){
	var menuOptions = {
		menuData		: '',
		listNodeName    : '.list_items',
		itemCreateBtn 	: '.add_more',
		nestable		: false,
		group		    : 0,
		maxDepth		: 3,
		threshold       : 20,
		sleepTime		: 50
	}

	function menuSetup(el, options){
		this.options = $.extend({}, menuOptions, options);
		this.el = $(el).find(this.options.listNodeName);
		this.dataArray = this.options.data;
		this.addEvtAction = $.fn.addEvent;
		this.removeItemArray={};
		this.initList();
		this.nestableList();
		this.itemEditable = false;
	}

	menuSetup.prototype.initList = function(){
		this.createNewList();
		$(this.options.itemCreateBtn).on('click', this.addNewItem.bind(this));
	}

	menuSetup.prototype.createNewList = function(){
		if(!this.dataArray.length) return;
		this.destory();
		var menu = this;

		$(this.dataArray).each(function(i, v){
			menu.el.append(menu.setItem(v));
		})
	}

	menuSetup.prototype.addNewItem = function(item){
		var menu = this;
		this.itemEditable = false;
		this.createNewList();
		this.itemEditable = true;
		menu.el.append(menu.setItem(''));
		menu.el.find('.editarea').focus().select();
	}

	menuSetup.prototype.setItem = function(item){
		var itemNodeName = $('<li class="list_item" />'),
			itemLabel = $('<div class="list_handle" />'),
			itemIcon = $('<i class="fa fa-th" aria-hidden="true"></i>'),
			clickCount = 0;

			if(!this.itemEditable){

				itemNodeName.append(itemLabel.clone().text(item.name));
				itemNodeName.data({
					name: item.name,
					url: item.url
				})

				if(item.children){ //add Second level
					var colpbtn = $('<button data-action="collapse" type="button">Collapse</button>'),
						expdbtn = $('<button data-action="expend" type="button" style = "display:none">expend</button>'),
						secondul = $('<ul class="list_items"></ul>');
						
						for(var idx = 0; idx<item.children.length; idx++){
							secondul.append(this.setItem(item.children[idx]));
							itemNodeName.prepend(colpbtn).prepend(expdbtn).append(secondul);
						}
						
				}
				itemNodeName.find('.list_handle:first').prepend(itemIcon);

				this.addEvtAction(itemNodeName.find('.list_handle')[0], 'click', function(){
					clickCount++; //detected click or dblclick
					$(this.el).find('.click').removeClass('click');
					setTimeout(function(){
						if(this.itemEditable) this.listCancelEdit.call(this, arguments[0]);
						$(arguments[0].target).parent().addClass('click');
						if(clickCount >= 2){
							if(this.itemEditable) this.listCancelEdit.call(this, arguments[0]);
							this.clickItems.call(this, arguments[0]);
						}
					}.bind(this, arguments[2]), this.options.sleepTime)
					
				}.bind(this, arguments[1], arguments[0]));
			}
			else{
				itemNodeName.append(this.editedZone());
				
			}
		return itemNodeName;
	}

	menuSetup.prototype.editedZone = function(idx){
		var editBox = $('<div class="editbox"/>'),
			editBtn = $('<button class="editbtn">確認</button>'),
			editinp = $('<input type="text" class="editarea"/>');

			var saveNewItem = function(evt){
				evt.preventDefault();

				this.itemEditable = false;

				if(!idx ||idx.fst === -1 ){
					this.dataArray.push({url: '#', name: $('.editarea').val()});
				}
				else{
					if(idx.snd === -1){
						this.removeItemArray = this.dataArray.splice(idx.fst, 1);
						this.removeItemArray[0].removeidx = idx.fst;

						var item = this.removeItemArray;
						this.dataArray.splice(item[item.length-1].removeidx, 0, {url: item.url, name: $('.editarea').val()});
					}
					else if(idx.tth === -1){
						this.removeItemArray = this.dataArray[idx.fst].children.splice(idx.snd, 1);
						this.removeItemArray[0].removeidx = idx.snd;

						var item = this.removeItemArray;
						this.dataArray[idx.fst].children.splice(item[item.length-1].removeidx, 0, {url: item.url, name: $('.editarea').val()});
					}
				}
				this.createNewList();
				if(idx.snd === -1 && this.removeItemArray.length) $(this.options.listNodeName).children().eq(this.removeItemArray[0].removeidx).addClass('click');
				else if(idx.tth === -1 && this.removeItemArray.length) 
						$(this.options.listNodeName).eq(1).children().eq(this.removeItemArray[0].removeidx).addClass('click');
				this.removeItemArray={};
			}

			this.addEvtAction(editinp[0], 'keypress', function(evt){
				if(evt.keyCode === 13) saveNewItem.call(this, evt);
			}.bind(this));

			this.addEvtAction(editBtn[0], 'click', saveNewItem.bind(this));
			editBox.append(editinp);
			editBox.append(editBtn);

		return editBox;
	}

	menuSetup.prototype.clickItems = function(evt){
		this.itemEditable = true;
		var item = evt, rootEl = item.target.parentElement, idx;
		this.dataArray = this.el.parent().nestable('serialise'); //update itemsArray
		item.target.parentElement.removeChild(item.target);

		idx = this.arraySelect(this.dataArray, item.target.innerText);

		$(rootEl).append(this.editedZone(idx));
		$(rootEl).find('.editarea').data('url', $(rootEl).data('url'));
		$(rootEl).find('.editarea').val(item.target.innerText).focus().select();
	}

	menuSetup.prototype.destory = function(){
		this.el.empty();
	}

	menuSetup.prototype.upDateList = function(){
		this.dataArray = data;
	}

	menuSetup.prototype.arraySelect = function(arr, text){
		var idxOftxt = {fst: -1, snd: -1, tth: -1};

		var arrCheck = function(arr, text){
			return arr.map(function(x){ // remove selected date from Detail array
				return x.name;
			}).indexOf(text);
		}

		idxOftxt.fst = arrCheck(arr, text);

		if(idxOftxt.fst < 0)
			for(var i = arr.length; i--;){
				if (arr[i].children){
					idxOftxt.snd = arrCheck(arr[i].children, text);
					if(idxOftxt.snd > -1){
						idxOftxt.fst = i;
						break;
					}
					else{
						for(var j = arr[i].children.length; j--;){
							idxOftxt.tth = arrCheck(arr[i].children[j].children, text);
							if(idxOftxt.tth > -1){
								idxOftxt.snd = j;
								idxOftxt.fst = i;
								break;
							}
						}
					}
				}
			}
		return idxOftxt
	}
	
	menuSetup.prototype.nestableList = function(){
		if(this.options.nestable) 
			this.el.parent().nestable({
				group		   : this.options.group,
				maxDepth		: this.options.maxDepth,
       			threshold		: this.options.threshold
			});
		else return; //todo remove nestable feature
	}

	menuSetup.prototype.listCancelEdit = function(){
		this.dataArray = this.el.parent().nestable('serialise');
		this.itemEditable = false;
		if(arguments[0].target){
			var idx = this.arraySelect(this.dataArray, arguments[0].target.innerText);
			this.createNewList();
			if(idx.snd === -1)
				$(this.options.listNodeName).children().eq(idx.fst).addClass('click');
			else if(idx.tth === -1)
				$(this.options.listNodeName).eq(1).children().eq(idx.snd).addClass('click');
			else
				$(this.options.listNodeName).children().eq(idx.fst).children().eq(idx.snd).children().eq(idx.tth).addClass('click');
		}
	}

	$.fn.menuData = function(params){
		var listRoot = this,
			fnSelect = this;

		listRoot.each(function(){
			var menuSet = $(this).data('menuList');

			if(!menuSet){
				$(this).data('menuList', new menuSetup(this, params));
			}
			else{
				if(typeof params === 'string' && typeof menuSet[params] === 'function'){
					var array, args;
					fnSelect = menuSet[params]('', args? args: '');
				}
			}
		})
		return fnSelect|| listRoot;
	}
})(window.jQuery, window, document)
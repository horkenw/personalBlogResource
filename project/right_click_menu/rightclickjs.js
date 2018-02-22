(function(){
	'use strict';

	function clickInsideElement(node, className){
		var el = node.srcElement || node.target;

		if(el.classList.contains(className)) return el;
		else{
			while (el = el.parentNode){
				if (el.classList && el.classList.contains(className)) return el;
			}
		}
		return false;
	}

	function getPosition(el){
		var posx = 0, posy = 0;

		if(!el) var el = window.event;

		if(el.pageX || el.pageY){
			posx = el.pageX;
			posy = el.pageY;
		}
		else if(el.clientX || el.clientY){
			//annotation posx & posy seems has problem by last two argument, the value is same??
			// posx = el.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			// posy = el.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			posx = el.clientX + document.body.scrollLeft;
			posy = el.clientY + document.body.scrollTop;
		}

		return{
			x: posx,
			y: posy
		}
	}

	var contextMenuClassName = 'context-menu',
		contextMenuItemClassName = 'context-menu-item',
		contextMenuLinkClassName = 'context-menu-link',
		activeClassName = 'context-menu-active';

	var taskItemsClassName = 'task',
		taskItemInContext;
	
	var	menu = document.querySelector('#context-menu'),
		menuItems = menu.querySelectorAll('.context-menu_item'),
		menuState = 0,
		menuWidth,
		menuHeight,
		clickCoords,
		clickCoordsX,
		clickCoordsY,
		windowWidth,
		windowHeight;


	function init(){
		contextListener();
		clickListener();
		keyupListener();
		resizeListener();
	}

	function contextListener(){
		document.addEventListener('contextmenu', function(evt){
			taskItemInContext = clickInsideElement(evt, taskItemsClassName);
			if(taskItemInContext){
				evt.preventDefault();
				toggleMenuOn();
				positionMenu(evt);
			}
			else{
				toggleMenuOff();
			}
		})
	}

	function positionMenu(el){
		clickCoords = getPosition(el);
		
		clickCoordsX = clickCoords.x;
		clickCoordsY = clickCoords.y;


		menuWidth = menu.offsetWidth + 4;
		menuHeight = menu.offsetHeight + 4;

		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;

		if((windowWidth - clickCoordsX) < menuWidth) menu.style.left = windowWidth - menuWidth + 'px';
		else menu.style.left = clickCoordsX + 'px';
		if((windowHeight - clickCoordsY) < menuHeight) menu.style.top = windowHeight - menuHeight + 'px';
		else menu.style.top = clickCoordsY + 'px';
	}
	
	function menuItemListener(link){
		console.log('Task ID - '+ taskItemInContext.getAttribute('data-id') + ', Task action - ' + link.getAttribute('data-action'));
		toggleMenuOff();
	}

	function clickListener(){
		document.addEventListener('click', function(el){
			var clickElIsLink = clickInsideElement(el, contextMenuLinkClassName);

			if(clickElIsLink){
				el.preventDefault();
				menuItemListener(clickElIsLink);
			}
			else{
				var button =  el.which || el.button;
				if( button === 1) toggleMenuOff();
			}
			
		})
	}

	function keyupListener(){
		window.onkeyup = function(key){
			if(key.keyCode === 27) toggleMenuOff();
		}
	}

	function resizeListener(){
		window.onresize = function(){
			toggleMenuOff();
		}
	}

	function toggleMenuOn(){
		if(!menuState){
			menuState = 1;
			menu.classList.add(activeClassName);
		}
	}

	function toggleMenuOff(){
		if(menuState){
			menuState = 0;
			menu.classList.remove(activeClassName)
		}
	}

	//startup app
	init();
})();
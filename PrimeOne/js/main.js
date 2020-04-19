//Borger menu
function burgerMenu(selector) {
	let menu = $(selector);
	let button = menu.find('.header_menu_button');
	let links = menu.find('.header_menu_nav_link');
	let overlay = menu.find('.header_menu_overlay');

	button.on('click', (e) => {
		e.preventDefault();
		toggleMenu();
		if(!headerLang.hassClass('done')){
			headerLang.addClass('done').appendTo(headerMenu);
		}
	});

	links.on('click', () => toggleMenu());
	overlay.on('click', () => toggleMenu());

	function toggleMenu() {
		menu.toggleClass('header_menu_active');
		if (menu.hasClass('header_menu_active')) {
			$('body').css('overflow', 'hidden');
		} else {
			$('body').css('overflow', 'visible');
		}
	}
}

burgerMenu ('.header__burger_menu');

//Image background
function ibg() {
	$.each($('.ibg'), function(index, val) {
		if($(this).find('img').length>0) {
			$(this).css('background-image', 'url("'+$(this).find('img').attr('src')+'")');
		}
	});
}
ibg();

//Google map
function map(n) {
	google.maps.Map.prototype.sentCenterWithOffset = function(latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function() {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x+offsetX;
			aPoint.y = aPoint.y+offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function() {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(40.7424076,-73.9264566)]
	]
	var options = {
		zoom: 15.1,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		//scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url:'../img/icons/map.png',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			//icon:icon,
			position: locations[i][0],
			map: map,
		});
		markers.push(marker);
	}
}
if($("#map").length>0) {
	map();
}
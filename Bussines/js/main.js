//Burger=======================================//
function burgerMenu(selector) {
	let menu = $(selector);
	let button = menu.find('.menu-header__icon');
	let links = menu.find('.menu-header__list');
	let overlay = menu.find('.menu__overlay');

	button.on('click', (e) => {
		e.preventDefault();
		toggleMenu();
	});
	links.on('click', () => toggleMenu());

	if(menu.hasClass('menu-header__active')) {
		console.log('active');
	};

	overlay.on('click', () => toggleMenu());

	function toggleMenu() {
		$(window).resize(function(event) {
			adaptive_function();
		});
		function adaptive_header(w,h) {
			if(w<767.98){
				menu.toggleClass('menu-header__active');
				if (menu.hasClass('menu-header__active')) {
					$('body').css('overflow', 'hidden');
				} else {
					$('body').css('overflow', 'auto');
				}
			}
			else{
				$('body').css('overflow', 'auto');
			}
		}
		function adaptive_function() {
			var w=$(window).outerWidth();
			var h=$(window).outerHeight();
			adaptive_header(w,h);
		}
		adaptive_function();
	}
}
	burgerMenu ('.menu-header');
//======================//

//=======================================//
function ibg() {
	$.each($('.ibg'), function(index, val) {
		if($(this).find('img').length>0) {
			$(this).css('background-image', 'url("'+$(this).find('img').attr('src')+'")');
		}
	});
}
ibg();
//=======================================//
//googleMap
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
			map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function() {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(51.8226725,8.2179722)],
		[new google.maps.LatLng(53.9288011,12.8450323)],
		[new google.maps.LatLng(50.6662537,6.9617142)],
		[new google.maps.LatLng(57.1312036,9.7569399)],
	]
	var options = {
		zoom: 4,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		//scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url:'../img/map.svg',
		scaledSize: new google.maps.Size(28, 34),
		anchor: new google.maps.Point(14, 17)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon:icon,
			position: locations[i][0],
			map: map,
		});
		markers.push(marker);
	}
}
if($("#map").length>0) {
	map();
}
//=======================================//
//TAB====================================//
$('.js-tab__navitem').on('click', function(){
	if ($(this).hasClass('active')) {return;}
	var tabName = $(this).data('tab'),
		tab = $('.js-tab-item[data-tab="'+tabName+'"]');
	if(tabName == '3') {

		$('.js-tab__navitem.active').removeClass('active');
		$(this).addClass('active');

		$('.js-tab-item.anim').removeClass('anim');
		$('.js-tab-item').addClass('active');

		setTimeout(function(){
			$('.js-tab-item').addClass('anim');
		}, 150);
	}else {
		$('.js-tab__navitem.active').removeClass('active');
		$(this).addClass('active');

		$('.js-tab-item.active').removeClass('active');
		$('.js-tab-item.anim').removeClass('anim');
		tab.addClass('active');

		setTimeout(function(){
			tab.addClass('anim');
		}, 150);
	}
});
//=======================================//
//Scroll=================================//
function slowScroll(id){
	$('html, body').animate({
		scrollTop:$(id).offset().top
	}, 500);
}
$(document).on("scroll", function() {
	if($(window).scrollTop() === 0)
		$("header").removeClass("fixed");
	else
		$("header").attr("class", "fixed");
});
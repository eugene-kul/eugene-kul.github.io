//Burger=======================================//
function burgerMenu(selector) {
	let menu = $(selector);
	let button = menu.find('.menu-header__icon');
	let links = menu.find('.menu-header__list');
	let overlay = menu.find('.menu-header__overlay');

	button.on('click', (e) => {
		e.preventDefault();
		toggleMenu();
		toggleLogo();
	});
	links.on('click', () => toggleMenu());

	overlay.on('click', () => toggleMenu());
	
	function toggleLogo() {
		$('.header__text').toggleClass('active');
		$('.header__logo').toggleClass('active');
	}

	function toggleMenu() {
		$(window).resize(function(event) {
			adaptive_function();
		});
		function adaptive_header(w,h) {
			if(w<767.98){
				links.on('click', () => toggleLogo());
				overlay.on('click', () => toggleLogo());

				menu.toggleClass('menu-header__active');
				if (menu.hasClass('menu-header__active')) {
					console.log('on');
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

//TABheaderMenu====================================//
$('.js__menu').on('click', function(){
	if ($(this).hasClass('active')) {return;}
	
		$('.js__menu.active').removeClass('active');
		$(this).addClass('active');
});
//=======================================//

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

//перенос русского текста================//
// $(function() {
//     $('.txt').hyphenate();
// });

// $.fn.hyphenate = function() {
//   var all = "[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]",
//     glas = "[аеёиоуыэю\я]",
//     sogl = "[бвгджзклмнпрстфхцчшщ]",
//     zn = "[йъь]",
//     shy = "\xAD",
//     re = [];
   
//   re[1] = new RegExp("("+zn+")("+all+all+")","ig");
//   re[2] = new RegExp("("+glas+")("+glas+all+")","ig");
//   re[3] = new RegExp("("+glas+sogl+")("+sogl+glas+")","ig");
//   re[4] = new RegExp("("+sogl+glas+")("+sogl+glas+")","ig");
//   re[5] = new RegExp("("+glas+sogl+")("+sogl+sogl+glas+")","ig");
//   re[6] = new RegExp("("+glas+sogl+sogl+")("+sogl+sogl+glas+")","ig");
//   return this.each(function() {
//     var text = $(this).html();
//     for (var i = 1; i < 7; ++i) {
//       text = text.replace(re[i], "$1"+shy+"$2");
//     }
//     $(this).html(text);
//   });
// };
//========================================//

//TAB_mobile====================================//
$('.js-tab__mobilenavitem').on('click', function(){
	if ($(this).hasClass('active')) {return;}
	var tabName = $(this).data('tab'),
		tab = $('.js-tab-mobileitem[data-tab="'+tabName+'"]');
	
		$('.js-tab__mobilenavitem.active').removeClass('active');
		$(this).addClass('active');

		$('.js-tab-mobileitem.active').removeClass('active');
		$('.js-tab-mobileitem.anim').removeClass('anim');
		tab.addClass('active');

		setTimeout(function(){
			tab.addClass('anim');
		}, 300);
	
});
//=======================================//

//TAB_work====================================//
$('.js-tab__navitem').on('click', function(){
	if ($(this).hasClass('active')) {return;}
	var tabName = $(this).data('tab'),
		tab = $('.js-tab-item[data-tab="'+tabName+'"]');
		
		$('.js-tab__navitem.active').removeClass('active');
		$(this).addClass('active');

		$('.js-tab-item.active').eq(0).removeClass('active');
		$('.js-tab-item.anim').removeClass('anim');
		tab.addClass('active');

		setTimeout(function(){
			tab.addClass('anim');
		}, 300);
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
//=======================================//

//googleMap===============================//
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
		[new google.maps.LatLng(38.823709,-77.018734)],
	]
	var options = {
		zoom: 17,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		//scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url:'../img/Contacts/icon/pin_1.svg',
		scaledSize: new google.maps.Size(30, 40),
		anchor: new google.maps.Point(15, 20)
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

$(document).ready(function(){
	$(window).resize(function(event) {
		adaptivePersonal();
	});
	adaptivePersonal();
	function adaptivePersonal() {
		var w=$(window).outerWidth();
		var columnAdaptive = $('.personal_tablist');
		var columnBlock = $('.block-content-link');

		if (w <= 767) {
			if(!columnBlock.hasClass('done')){columnBlock.addClass('done').prependTo(columnAdaptive);}
		}
		else {
			if(columnBlock.hasClass('done')){columnBlock.removeClass('done').prependTo($('.personal_content'));}
		}
	}
})

function initPremummFullText(){
	var maxHeight = $(".personal-cart_about").height();
	if ($(".personal-cart_about-text").height() <= maxHeight) {
		$(".show-text").remove();
		$(".personal-cart_about").removeClass('gradient');
	}		
	$(document).on("click", ".show-text", function(e) {
		var height = $(".personal-cart_about-text").height();
		var contText = $(".personal-cart_about");
		if (contText.height() == maxHeight) {
			contText.animate({maxHeight: height}, 200, "swing");
			$(".personal-cart_about").removeClass('gradient');
			$(this).text("Скрыть");
		} else {
			contText.animate({maxHeight: maxHeight}, 200, "swing");
			$(".personal-cart_about").addClass('gradient');
			$(this).text("Читать полностью");
		}
		e.preventDefault();
		return false;
	});
}

function initAwardsActive() {
	var blockOn = $('.awards-item.active');
	var blockTo = $('.blockTo');
	if (blockOn.length>=3) {$('.get-awards').hide();}

	if (blockOn.hasClass('active')) {
		blockOn.prependTo(blockTo);
	}
	else {blockOn.appendTo('.personal-cart_awards-body');}
}

//tabs========================
function initPersonalTabs() {
	$('.personal_nav-item').click(function(event){
		if ($(this).hasClass('active')) return;

		var tabName = $(this).data('tab'),
		tab = $('.personal_tabitem[data-tab="'+tabName+'"]');
		contentLink = $('.personal_content-link[data-tab="'+tabName+'"]')

		$('.personal_nav-item.active').removeClass('active');
		$(this).addClass('active');

		$('.personal_tabitem.active').removeClass('active');
		tab.addClass('active');

		$('.personal_content-link.active').removeClass('active');
		contentLink.addClass('active');
	});
	$('.popap-nav').click(function(event) {
		$(this).toggleClass('active').next().toggleClass('active');
		$('.popap-overflow').slideToggle(300);
	});
	$('.popap-overflow, .popap-link').click(function(event) {
		$('.popap-nav.active').removeClass('active');
		$('.popap-list.active').removeClass('active');
		$('.popap-overflow').slideToggle(300);
	});
}
//==========================================================================================================

function showText(){
	var maxHeight = $(".comment-item_content").height();
	if ($('.show-comment a').hasClass('show')) {
		$('.comment-item_content').addClass('openText').removeClass('closeText');
		$('.show-comment a').text('Скрыть').addClass('hide').removeClass('show');
	}	else if ($('.show-comment a').hasClass('hide')) {
		$('.comment-item_content').removeClass('openText').addClass('closeText');
		$('.show-comment a').text('Читать полностью').addClass('show').removeClass('hide');
	}
}
$(window).scroll(function(event) {
	var s =$(this).scrollTop();
	var h=$(window).outerHeight();
	if(s>h/1.5) {
		$('.icon-menu-duble').addClass('fix');
		$('.button-up').addClass('fix');
	} else {
		$('.icon-menu-duble').removeClass('fix');
		$('.button-up').removeClass('fix');
	}
});
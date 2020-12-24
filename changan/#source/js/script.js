$('.js-menu-icon').click(function(){
	$(this).toggleClass('active');
	$('.js-overflow').toggleClass('active');
	$('.js-menu-list').toggleClass('active');
	//$('body').toggleClass('lock');
});
$('.js-overflow').click(function(){
	$(this).toggleClass('active');
	$('.js-menu-icon').toggleClass('active');
	$('.js-menu-list').toggleClass('active');
	//$('body').toggleClass('lock');
});

//залипалка второй строчи менюшки
addEventListener('scroll', slimMenu);
addEventListener('resize', slimMenu);
slimMenu();
function slimMenu() {
	let list_hght = $('.js-menu-body').css('height').replace('px','');
	let header_hght = $('header').css('height').replace('px','');
	$('body').css('padding-top', header_hght+'px');
	let topScroll = window.pageYOffset;
	if (topScroll <= header_hght-list_hght) {
		$('header').css('top', 0 - topScroll +'px');
		if ($(window).outerWidth()<=767.98) {$('.js-menu-list').css('top', header_hght - topScroll +'px')}
		else {$('.js-menu-list').css('top', '0px')}
	}
	else {
		$('header').css('top', list_hght - header_hght+'px');
		if ($(window).outerWidth()<=767.98) {$('.js-menu-list').css('top', list_hght +'px')}
		else {$('.js-menu-list').css('top', '0px')}
	}
}

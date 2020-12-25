let btnSvg1 = `<svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M2.9842 0.0421448H0L5.9684 7.45481L0 14.9579H2.9842L8.9526 7.45481L2.9842 0.0421448Z"/><path d="M9.03156 0.0421448H6.04736L12.0158 7.45481L6.04736 14.9579H9.03156L15 7.45481L9.03156 0.0421448Z"/></svg>`;
$('.btn.btn-type3').append(btnSvg1);

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

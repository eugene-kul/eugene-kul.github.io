$(window).resize(function(event) {
	mainblock();
});
function mainblock() {
	var h=$(window).outerHeight();
	$('.main-page').css('min-height',h);
}
mainblock();

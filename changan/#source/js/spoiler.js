$(document).ready(function(){
	$('.spMain').click(function(event) {
		if($('.spBlock').hasClass('oneBlock')){
			$('.spMain').not($(this)).removeClass('active');
			$('.spSub').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});
})

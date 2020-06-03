$(document).ready(function(){
	$('.spMain').click(function(event) {
		if($('.spBlock').hasClass('oneBlock')){
			$('.spMain').not($(this)).removeClass('active');
			$('.spSub').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});

	$(window).resize(function(event) {
		adaptiveAutor();
	});
	adaptiveAutor();
	
	function adaptiveAutor() {
		var w=$(window).outerWidth();
		var autorBtn = $('.autorpage_link');
		var autorBtnAdaptive = $('.autorpage_btn-adaptive');
		var bookAdaptive = $('.autor-adaptive');
		var bookBlock = $('.autor-block');

		if (w <= 767) {
			if(!bookBlock.hasClass('done')){bookBlock.addClass('done').appendTo(bookAdaptive);}
			if(!autorBtn.hasClass('done')){autorBtn.addClass('done').appendTo(autorBtnAdaptive);}
		}
		else {
			if(bookBlock.hasClass('done')){bookBlock.removeClass('done').prependTo($('.autorpage'));}
			if(autorBtn.hasClass('done')){autorBtn.removeClass('done').appendTo('.autorpage_list');}
		}
	}
})

function initPremummFullText(){
	var maxHeight = $(".autorpage_description").height();
	if ($(".autorpage_description-text").height() <= maxHeight) {
		$(".show-text").remove();
		$(".autorpage_description").removeClass('gradient');
	}		
	$(document).on("click", ".show-text", function(e) {
		var height = $(".autorpage_description-text").height();
		var contText = $(".autorpage_description");
		if (contText.height() == maxHeight) {
			contText.animate({maxHeight: height}, 200, "swing");
			$(".autorpage_description").removeClass('gradient');
			$(this).text("Скрыть");
		} else {
			contText.animate({maxHeight: maxHeight}, 200, "swing");
			$(".autorpage_description").addClass('gradient');
			$(this).text("Читать полностью");
		}
		e.preventDefault();
		return false;
	});
}



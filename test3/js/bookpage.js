$(document).ready(function(){
	$('.btnClick').click(function(event) {
		$(this).toggleClass('active');
	});


	$('.spMain').click(function(event) {
		
		if($('.spBlock').hasClass('oneBlock')){
			$('.spMain').not($(this)).removeClass('active');
			$('.spSub').not($(this).next()).slideUp(300);
		}
		$(this).toggleClass('active').next().slideToggle(300);
		
	});

	$(window).resize(function(event) {
		adaptiveBook();
	});
	adaptiveBook();
	function adaptiveBook() {
		var w=$(window).outerWidth();
		var blockGenre = $('.bookpage_genre-item');
		var blockGenreAdaptive = $('.bookpage_tags');
		var btnBlock = $('.adaptive-btn');
		var btnAdaptive = $('.adaptive-popap');
		var bookAdaptive = $('.book-adaptive');
		var bookBlock = $('.book-block');

		if (w <= 767) {
			if(!bookBlock.hasClass('done')){bookBlock.addClass('done').appendTo(bookAdaptive);}
			if(!btnBlock.hasClass('done')){btnBlock.addClass('done spSub').appendTo(btnAdaptive);}
			if(!blockGenre.hasClass('done')){blockGenre.addClass('done').prependTo(blockGenreAdaptive);}
		}
		else {
			if(bookBlock.hasClass('done')){bookBlock.removeClass('done').prependTo($('.bookpage'));}
			if(btnBlock.hasClass('done')){btnBlock.removeClass('done spSub').prependTo($('.block-btn'));}
			if(blockGenre.hasClass('done')){blockGenre.removeClass('done').prependTo($('.bookpage_genre'));}
		}
	}
})

function initPremummFullText(){
	var maxHeight = $(".bookpage_description").height();
	if ($(".bookpage_description-text").height() <= maxHeight) {
		$(".show-text").remove();
		$(".bookpage_description").removeClass('gradient');
	}		
	$(document).on("click", ".show-text", function(e) {
		var height = $(".bookpage_description-text").height();
		var contText = $(".bookpage_description");
		if (contText.height() == maxHeight) {
			contText.animate({maxHeight: height}, 200, "swing");
			$(".bookpage_description").removeClass('gradient');
			$(this).text("Скрыть");
		} else {
			contText.animate({maxHeight: maxHeight}, 200, "swing");
			$(".bookpage_description").addClass('gradient');
			$(this).text("Читать полностью");
		}
		e.preventDefault();
		return false;
	});
}



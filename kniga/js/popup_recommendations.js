$(document).ready(function(){

	$('.test-btn').on('click', function() {
		$('.popup').fadeIn();
		$('.popup-backdrop').fadeIn();
	});

	$('.popup-backdrop').on('click', function() {
		$('.popup').fadeOut();
		$(this).fadeOut();
	});

	$('.close-popup').on('click', function() {
		$('.popup').fadeOut();
		$('.popup-backdrop').fadeOut();
	});

	$('.popup-step-btn').on('click', function() {

		var statusCheck = $(this).hasClass('disable');

		if (statusCheck == false) {
			var currentStep = $('.popup-step.active');
			currentStep.next().addClass('active');
			currentStep.removeClass('active');
			//$('.popup_books__slider').slick("setPosition", 0);
		}	
	});

	$('.popup-step-back').on('click', function() {
		var currentStep = $('.popup-step.active');

		currentStep.prev().addClass('active');
		currentStep.removeClass('active');
	});

	$('.popup-step-2 .popup_checkbox').not('.disable').on('click', function() {
		var checkedNum = $('input[name="genres[]"]:checked').length;
		
		if (checkedNum > 0) {
			$('.popup-step-2 .popup-step-btn').removeClass('disable');
		}
		else{
			$('.popup-step-2 .popup-step-btn').addClass('disable');
		}
	});

	$('.popup-step-3  .popup_books__item-rate--list li').hover( function() {
		var rate = $(this).attr('data-rate');
		var rateInfo = $(this).attr('data-rate-info');
		
		$(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--star').html(rate);
		$(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--info p').html(rateInfo);

		$(this).parents('.popup_books__item-rate').find('.popup_books__item-rate--info').addClass('visible');

	});

	$('.popup-step-3 .popup_books__item-rate--list li').mouseleave(function() {
	    $(this).parents('.popup_books__item-rate').find('.popup_books__item-rate--info').removeClass('visible');

	    var rate = $(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--new span').text();
	    var rateInfo = $(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--new span').attr('data-rate-info');

	    $(this).parents('.popup_books__item-rate').find('.popup_books__item-rate--star').html(rate);
		$(this).parents('.popup_books__item-rate').find('.popup_books__item-rate--info p').html(rateInfo);
	});

	$('.popup-step-3 .popup_books__item-rate--list li').on('click', function() {


		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
			$(this).parents('.popup_books__item-rate').find('.popup_books__item-rate--info').removeClass('active');
			$(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--new').removeClass('active');
			$(this).parent().next().removeClass('active');
		}	
		else{
			$(this).parent().find('li').removeClass('active');
			$(this).addClass('active');

			$(this).parents('.popup_books__item-rate').find('.popup_books__item-rate--info').addClass('active');

			var rate = $(this).attr('data-rate');
			var rateInfo = $(this).attr('data-rate-info');
			
			$(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--new').addClass('active');
			$(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--new span').html(rate);
			$(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--new span').attr('data-rate-info' , rateInfo);

			$(this).parent().next().addClass('active');
		}
	});

	$('.popup_books__item-notiterested').on('click', function() {
		$(this).parents('.popup_books__item-rate').find('.popup_books__item-rate--info').removeClass('active');
		$(this).parents('.popup_books__item-rate').find('.popup_books__item-rate--list li').removeClass('active');
		$(this).parents('.popup_books__item-photo').find('.popup_books__item-rate--new').removeClass('active');
	});



	// $('.mob-rate-popup .popup_books__item-rate--list li').on('click', function() {
	// 	var current = $(this);

	// 	var rate = $(this).attr('data-rate');
	// 	var rateInfo = $(this).attr('data-rate-info');
		
	// 	$(this).parents('.mob-rate-popup').find('.popup_books__item-rate--star').html(rate);
	// 	$(this).parents('.mob-rate-popup').find('.popup_books__item-rate--info p').html(rateInfo);

	// });

	$('.popup_books__item').on('click', function() {
		var windowWidth = $( window ).width();

		$(this).addClass('open');

		if (windowWidth < 768) {

			$('.mob-rate-popup').fadeIn();
			$('.mob-rate-backdrop').fadeIn();

			if ( $('.popup_books__item.open').find('.popup_books__item-rate--new').hasClass('active') == true ){
				$('.mob-rate-popup').find('.popup_books__item-rate--info').addClass('visible');

				var a = $('.popup_books__item.open').find('.popup_books__item-rate--new span').text();
				var b = $('.popup_books__item.open').find('.popup_books__item-rate--new span').attr('data-rate-info');

				$('.mob-rate-popup').find('.popup_books__item-rate--star').html(a);
				$('.mob-rate-popup').find('.popup_books__item-rate--info p').html(b);

				$('.mob-rate-popup .popup_books__item-rate--list li').removeClass('active');
				$('.mob-rate-popup .popup_books__item-rate--list li[data-rate="'+a+'"]').addClass('active');
			}
			else{
				$('.mob-rate-popup').find('.popup_books__item-rate--info').removeClass('visible');
				$('.mob-rate-popup .popup_books__item-rate--list li').parent().find('li').removeClass('active');
			}

			// $('.mob-rate-popup .popup_books__item-rate--list li').on('click', function(event) {



			// 	var current = $(this);

			// 	if ( current.hasClass('active') == true ) {

			// 		$(this).removeClass('active');
			// 		$('.mob-rate-popup').find('.popup_books__item-rate--info').removeClass('visible');

			// 		console.log(current.length);
			// 	}
			// 	// else if( current.hasClass('active') == false ){
			// 	// 	console.log(2);
			// 	// }
			// 	else{
			// 		console.log(current.length);


			// 		current.parent().find('li').removeClass('active');
			// 		current.addClass('active');


					

			// 		var rate = $(this).attr('data-rate');
			// 		var rateInfo = $(this).attr('data-rate-info');
					
			// 		$('.mob-rate-popup').find('.popup_books__item-rate--star').html(rate);
			// 		$('.mob-rate-popup').find('.popup_books__item-rate--info p').html(rateInfo);

			// 		// $('.popup_books__item.open').find('.popup_books__item-rate--new').addClass('active');
			// 		// $('.popup_books__item.open').find('.popup_books__item-rate--new span').html(rate);	
					
			// 		// $('.popup_books__item.open').find('.popup_books__item-rate--new span').attr('data-rate-info' , rateInfo);

			// 		$('.mob-rate-popup').find('.popup_books__item-rate--info').addClass('visible');


			// 	}
			// });
		}

	});

	$('.mob-rate-popup .popup_books__item-rate--list li').on('click', function() {
		var current = $(this);

		if ( current.hasClass('active') == true ) {

			$(this).removeClass('active');
			$('.mob-rate-popup').find('.popup_books__item-rate--info').removeClass('visible');
		}
		else{

			current.parent().find('li').removeClass('active');
			current.addClass('active');

			var rate = $(this).attr('data-rate');
			var rateInfo = $(this).attr('data-rate-info');
			
			$('.mob-rate-popup').find('.popup_books__item-rate--star').html(rate);
			$('.mob-rate-popup').find('.popup_books__item-rate--info p').html(rateInfo);

			// $('.popup_books__item.open').find('.popup_books__item-rate--new').addClass('active');
			// $('.popup_books__item.open').find('.popup_books__item-rate--new span').html(rate);	
			
			// $('.popup_books__item.open').find('.popup_books__item-rate--new span').attr('data-rate-info' , rateInfo);

			$('.mob-rate-popup').find('.popup_books__item-rate--info').addClass('visible');


		}
	});

	$('.mob-rate-backdrop').on('click', function() {
		$('.mob-rate-popup').fadeOut();
		$(this).fadeOut();
		$('.popup_books__item.open').removeClass('open');
	});

	$('.mob-rate-popup_form__cancel ').on('click', function() {
		$('.mob-rate-popup').fadeOut();
		$('.mob-rate-backdrop').fadeOut();
		$('.popup_books__item.open').removeClass('open');
	});

	$('.mob-rate-popup_form__ok').on('click', function() {

		var rate = $('.mob-rate-popup .popup_books__item-rate--list li.active').attr('data-rate');
		var rateInfo = $('.mob-rate-popup .popup_books__item-rate--list li.active').attr('data-rate-info');

		$('.popup_books__item.open').find('.popup_books__item-rate--new').addClass('active');
		$('.popup_books__item.open').find('.popup_books__item-rate--new span').html(rate);	
		
		$('.popup_books__item.open').find('.popup_books__item-rate--new span').attr('data-rate-info' , rateInfo);

		if ( $('.mob-rate-popup').find('.popup_books__item-rate--info').hasClass('visible')) {
			$('.popup_books__item.open').find('.popup_books__item-rate--new').addClass('active');
		}
		else{
			$('.popup_books__item.open').find('.popup_books__item-rate--new').removeClass('active');
		}

		$('.mob-rate-popup').fadeOut();
		$('.mob-rate-backdrop').fadeOut();
		$('.popup_books__item.open').removeClass('open');

	});

	$('.popup_books__item-add').on('click', function() {
		$(this).toggleClass('active');
	});


});

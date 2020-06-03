var globalTimeoutModal;

$(document).ready(function() {

	
	
    $(".rate_inp input").on("input", function() { 
        $(this).parent().parent().find('.show_rate-value').show() ;
        $(this).parent().parent().find('.show_rate-value .rate_value').html(this.value) ;
        $(this).parent().parent().find('.item_tip').hide() ;
        //$(this).parent().parent().parent().find('.flags').hide() ;
    });
	$(".adm-pass").on("click", function(event) { 
        if ($(this).hasClass('visible-pass')) {
            $(this).removeClass('visible-pass').addClass('hidden-pass');
            $(this).siblings('input').attr('type', 'password');

            return true;
        }

        $(this).removeClass('hidden-pass').addClass('visible-pass');
        $(this).siblings('input').attr('type', 'text');
	});
  
    $('body').on("keyup", '.search_input_js', function (event) {
        
        var find_name = '' ;
        var val = $(this).val().toLowerCase() ;
            
        var counter = 0 ;
        
        if(val) {
            
            $('.search_list_js .search_item_js').each(function() {
                
                find_name = $(this).find('.search_name_js').html().toLowerCase() ;
                if(find_name.indexOf(val) + 1) { 
                    
                    $(this).show() ;
                    counter++ ;
                    
                }
                else $(this).hide() ;
                
            });
        
        } else $('.search_list_js .search_item_js').show() ;
        
        if(counter == 0 && val) {
            
            $(this).find('.search_nofound_js').show() ;
            
        } else $(this).find('.search_nofound_js').hide() ;
        
        
    });
    $(".rating3 .one_star").on("mouseover", function(event) { 
        var val = parseInt($(this).attr('data-id')) ;
        var text = '' ;
        if(val > 0) {

            if(val == 1) text = 'очень слабо' ;
            if(val == 2) text = 'слабо' ;
            if(val == 3) text = 'посредственно' ;
            if(val == 4) text = 'удовлетворительно' ;
            if(val == 5) text = 'средне' ;
            if(val == 6) text = 'выше среднего' ;
            if(val == 7) text = 'хорошо' ;
            if(val == 8) text = 'очень хорошо' ;
            if(val == 9) text = 'отлично' ;
            if(val == 10) text = 'великолепно' ;
            $(this).parent().find('.rate_num').html(val).show() ;
            $(this).parent().find('.rate_text').html(text).show() ;

            $('.rating3 .one_star sup').html('').hide() ;
            if($(this).parent().hasClass('big')) $(this).find('sup').html(text).show() ;

        }
    });
    $(".rating3.big .one_star").on("mouseout", function(event) { 
        if(!$(this).hasClass('active')) $(this).find('sup').html('').hide() ;
    });
    $(".card-item .card-item_img").on("mouseout", function(event) { 
        //if(!$(this).find('.rating3 .rate_num').hasClass('active')) $(this).find('.rating3 .rate_num').html('').hide() ;
        //if(!$(this).find('.rating3 .rate_text').hasClass('active')) $(this).find('.rating3 .rate_text').html('').hide() ;
    });

    rateNow() ;



	
	initRateHoverData();
	initFavoriteFunc();
	initNotIntrestedBook();
	initChooseRateBook();
	
	initBookSlider();
	initMobileRateForm();
	
	$(window).on("resize", function() {
		initBookSlider();	
		initMobileRateForm();
		initTextCancelButton();
	});
	
	initCloseRateModal();
	initRateModalSubmit();
	initRemoveRateDetailBook();
	initChangeRateDetailBook();
	
	
	initCounterDigitsFields();
	initSendRateAfterRead();	
	
	initFormOnlyRecenzition();
	initTextCancelButton();
	if ($("#modal_detail_rating").length) {
		globalTimeoutModal = setTimeout(function() {
			$("#modal_detail_rating").modal("show");
		}, 5000);
	} else {
		if ($("#modal_detail_rating_recenzition").length) {
			$("#modal_detail_rating_recenzition").modal("show");
		}
		if ($("#modal_detail_rating_onboard").length) {
			$("#modal_detail_rating_onboard").modal("show");
		}
	}
	
	
	initMainTipsSlider();
	initMobileMenuHamb();
	
	initInnerCheckboxesChange();
	initChangeTabBoardForm();


	initPremiunDropdown();
	initPremummFullText();

	initAwardsActive();
	initPersonalTabs();
	
	initCustomMobileSelect();
	initShowPremiumHeader();
});

function initChangeTabBoardForm() {
	$(document).on("click", ".j-change-tab-onboard", function(e) {
		$(this).closest(".modal-body").find(".tab-board-modal-choose").each(function() {
			$(this).toggleClass("active");
		});
		e.preventDefault();
		return false;
	});
}

function initInnerCheckboxesChange() {
	$(document).on("click", ".j-auto-change-inner-checkbox", function(e) {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");		
			if (!$(event.target).closest('input[type="checkbox"]').length) {	
				$(this).find('input[type="checkbox"]').prop("checked", false);	
			}
		} else {
			$(this).addClass("active");		
			if (!$(event.target).closest('input[type="checkbox"]').length) {	
				$(this).find('input[type="checkbox"]').prop("checked", true);	
			}
		}
	});
}
function initShowPremiumHeader() {
	if ($(".premium-header").length) {
		$(window).on("scroll", function() {
			if ($(window).scrollTop() + 20 > $(".show-on-mobile .custom-select-mobile").offset().top) {
				if (!$(".premium-header").hasClass("showed")) {
					$(".premium-header").addClass("showed");
				}
			} else {
				if ($(".premium-header").hasClass("showed")) {
					$(".premium-header").removeClass("showed");		
				}	
			}
		});
	}
}

function initCustomMobileSelect() {
	$(document).on("change", ".j-premium-choose-year", function() {
		$(this).closest(".custom-select-mobile").find(".default-select-value").text($(this).val());
		var select = $(this);
		if ($(this).val() == "Все") {
			$(".premiums-table__body .premiums-table__row").show();			
		} else {
			$(".premiums-table__body .premiums-table__row").each(function() {
				if ($(this).data("year")*1 == select.val()*1) {
					$(this).show();
				} else {
					$(this).hide();					
				}
			});
		}
		
		if ($(this).data("relate-values")) {
			var attr_relate = $(this).data("relate-values");
			$('select[data-relate-values="'+attr_relate+'"]').each(function() {
				if ($(this).val()!=select.val()) {
					$(this).val(select.val());
					$(this).closest(".custom-select-mobile").find(".default-select-value").text(select.val());
					
				}
			});
		}
		
	});
}

function initPremummFullText(){
	var premuimMaxHeight = $(".premium-detail-text").height();
	
	if ($(".premium-detail-text__inner").height() <= premuimMaxHeight) {
		$(".j-show-all-text").remove();
	}
	
	$(document).on("click", ".j-show-all-text", function(e) {
		var height = $(".premium-detail-text__inner").height();
		var contText = $(".premium-detail-text");
		
		if (contText.height() == premuimMaxHeight) {
			contText.animate({maxHeight: height}, 200, "swing");
			$(this).text("Скрыть");
		} else {
			contText.animate({maxHeight: premuimMaxHeight}, 200, "swing");			
			$(this).text("Читать полностью");
		}
		
		e.preventDefault();
		return false;
	});
}

function initPremiunDropdown() {
	$(document).on("click", ".j-open-list-noms", function() {
		$(this).toggleClass("opened");
	});
	
	$(document).click(function(event) {
		$(".j-open-list-noms").each(function() {
			if ($(event.target).closest(this).length) return;
			$(this).removeClass("opened");
			event.stopPropagation();
		});
	});	
	
}

function initMobileMenuHamb() {
	$(document).on("click", ".j-mobile-menu-btn", function() {
		showMobileMenu();
	});
	
	$(document).on("click", ".j-close-mobile-menu", function() {
		hideMobileMenu();
	});
	
	$(document).click(function(event) {
		if ($(event.target).closest(".mobile-menu-wrapper").length || $(event.target).closest(".j-mobile-menu-btn").length) return;
		hideMobileMenu();
		event.stopPropagation();
	});
  
  
}
function showMobileMenu() {
	$(".mobile-menu-overlay").css({display: "block", opacity: 0});
	$(".mobile-menu-overlay").animate({opacity: 1}, 100, "swing");
	$(".mobile-menu-overlay").addClass("active");
	
}
function hideMobileMenu() {
	$(".mobile-menu-overlay").animate({opacity: 1}, 100, "swing");
	$(".mobile-menu-overlay").removeClass("active");		
	setTimeout(function() {
		$(".mobile-menu-overlay").animate({opacity: 0}, 300, "swing", function() {
			setTimeout(function() {
				$(".mobile-menu-overlay").css({display: "none"});
			}, 300);
		});
	}, 500);
}


function initMainTipsSlider() {
  $('.slick-tips-main-slider').slick({
    dots: true,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    draggable: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });
  	
}

function initTextCancelButton() {
	if ($(window).width() <= 700) {
		$(".modal-cencel-btn").each(function() {
			if (!$(this).hasClass("j-hide-onboard-description") && !$(this).hasClass("j-change-tab-onboard")) {
				$(this).text('Отмена');
			}
		})
		$(".j-save-onboard").each(function() {
			$(this).text('Сохранить');
		})
	} else {
		$(".modal-cencel-btn").each(function() {
			if (!$(this).hasClass("j-hide-onboard-description") && !$(this).hasClass("j-change-tab-onboard")) {
				$(this).text('Я не хочу писать рецензию');	
			}
		})
		$(".j-save-onboard").each(function() {
			$(this).text('Создать новую полку');
		})
	}
}

function initFormOnlyRecenzition() {
	$(document).on("click", ".j-hide-form-recenzition-only", function()  {
		$("#modal_detail_rating_recenzition").modal("hide");
	});
	
	$(".j-rate-only-recenzition").on("click", ".books-slider_item-image_rate-form-star", function() {
		var cont = $(".form-recenzition-container");
		var wrapper = $(this).closest(".j-rate-only-recenzition");
		var value = $(this).data("value");
		cont.removeClass("disabled");
		cont.find("form").removeAttr("disabled");
		cont.find("textarea").removeAttr("disabled");
		cont.find("input").removeAttr("disabled");
		cont.find("button").removeAttr("disabled");
		$(this).closest(".book-detail-l-side__rate-form").slideUp(300);
		wrapper.find(".book-rate-show-recenzition").show();
		for (var i = 1;i<=10;i++) {
			wrapper.find(".book-rate-show-recenzition").find(".rate-star").removeClass("star_"+i);
		}
		wrapper.find(".book-rate-show-recenzition").find(".rate-star").addClass("star_"+value);
		wrapper.find(".book-rate-show-recenzition").find(".rate-star").text(value);
		wrapper.find(".j-choosen-rate-recenzition").text(value);
	});
	
	$(document).on("click", ".j-change-rate-recenzition", function() {
		if ($(this).closest(".j-rate-read-buttons").length == 1) {
			$(".j-rate-read-set-after").slideDown(300);
			$(this).closest(".j-rate-read-buttons").slideUp(300);
			$(".modal-footer-link").removeClass("mobile-hidden");
		} else {
			var cont = $(".form-recenzition-container");
			cont.addClass("disabled");
			cont.find("form").attr("disabled", "disabled");
			cont.find("textarea").attr("disabled", "disabled");
			cont.find("input").attr("disabled", "disabled");
			cont.find('button[type="submit"]').attr("disabled", "disabled");
			$(".book-rate-show-recenzition").slideUp(300);
			cont.closest(".j-rate-only-recenzition").find(".book-detail-l-side__rate-form").slideDown(300);
		}
	});
	
	$(document).on("keyup", ".j-check-title", function() {
		if ($(this).val() == "") {
			$(this).closest(".onboard-title-form__left").addClass("error-input");
		} else {
			$(this).closest(".onboard-title-form__left").removeClass("error-input");			
		}		
	});
	$(document).on("keyup", ".j-check-text", function() {
		if ($(this).val() == "") {
			$(this).closest(".j-counter-digits__container").addClass("error-input");
		} else {
			$(this).closest(".j-counter-digits__container").removeClass("error-input");			
		}		
	});
	
	$(document).on("submit", ".j-form-send-only-recenzition", function(e) {
		var input = $(this).find(".j-check-title");
		var text = $(this).find(".j-check-text");
		if (input.length == 1 && input.val() == "") {
			input.closest(".onboard-title-form__left").addClass("error-input");
		} else if (text.length == 1 && text.val() == "") {
			text.closest(".j-counter-digits__container").addClass("error-input");
		} else {
			
			//ajax отправка данных
					
			var modalSuccessTarget = $(this).data("modal-success");
			var prevCont = $(modalSuccessTarget).closest(".modal-body").find(".modal-body_top-content").eq(0);
			prevCont.css("overflow","hidden");
			prevCont.animate({height: 0, paddingBottom: 0}, 400, "swing", function() {
				$(modalSuccessTarget).show(400);
			});
		}
		e.preventDefault();
		return false;
	});
	
	/*
	$(document).on("submit", ".j-form-send-choose-board", function(e) {
		
		//ajax отправка данных
				
		var modalSuccessTarget = $(this).data("modal-success");
		var prevCont = $(modalSuccessTarget).closest(".modal-body").find(".modal-body_top-content").eq(0);
		prevCont.css("overflow","hidden");
		prevCont.animate({height: 0, paddingBottom: 0}, 400, "swing", function() {
			$(modalSuccessTarget).show(400);
		});
		
		e.preventDefault();
		return false;
	});
	*/
	
	
	
	$(document).on("click", ".j-hide-onboard-description", function() {
		if ($(".j-description-onboard").css("display") == "block" || $(".j-description-onboard").css("display") == "inline-block") {
			$(this).text("Добавить описание");
			$(".j-description-onboard").hide();
		} else {
			$(this).text("Убрать описание");
			$(".j-description-onboard").show();			
		}
		
	});
}

function initSendRateAfterRead() {
	$(".j-rate-read-set-after").on("click", ".books-slider_item-image_rate-form-star", function() {
		//ajax отправка на оценку книги
		var cont = $(".j-rate-read-buttons");
		$(".j-rate-read-set-after").slideUp(300);
		$(".j-rate-read-buttons").slideDown(300);
		var value = $(this).data("value");
		
		cont.find(".book-rate-show-recenzition").show();
		for (var i = 1;i<=10;i++) {
			cont.find(".book-rate-show-recenzition").find(".rate-star").removeClass("star_"+i);
		}
		cont.find(".book-rate-show-recenzition").find(".rate-star").addClass("star_"+value);
		cont.find(".book-rate-show-recenzition").find(".rate-star").text(value);
		cont.find(".j-choosen-rate-recenzition").text(value);
				
		$(".j-add-to-board").data("value", value);
		$(".modal-footer-link").addClass("mobile-hidden");
	});
	
	$(document).on("click", ".j-show-recenzion", function() {
		$(".j-rate-read-buttons").slideUp(300);
		$(".j-rate-read-puclicated-buttons").slideUp(300);
		$(".j-rate-read-form-recenzition").slideDown(300);
	});
	
	$(document).on("click", ".j-hide-form-recenzition", function() {
		$(".j-rate-read-buttons").slideDown(300);
		$(".j-rate-read-form-recenzition").slideUp(300);
	});
	
	$(document).on("submit", ".j-form-send-recenzition", function(e) {
		$(".j-rate-read-form-recenzition").slideUp(300);
		$(".j-rate-read-puclicated-buttons").slideDown(300);
		e.preventDefault();
		return false;
	});
	
	$(document).on("click", ".j-add-to-board", function() {
		var value = $(this).data("value");
		$("#modal_detail_rating_onboard").find(".books-slider_item-image_rate-form-stars").find(".star_"+value).trigger('click');
		$("#modal_detail_rating_onboard").modal("show");
		$("#modal_detail_rating").modal("hide");
		
	});
}

//функция пересчета количества символов
function initCounterDigitsFields() {
	$(".j-counter-digits-field").each(function() {
		$(this).on("keyup", function() {
			var cont = $(this).closest(".j-counter-digits__container");
			var span = cont.find(".j-counter-digits").find("span");
			span.text($(this).val().length);
		});
	});
}


var timeout_show_change_form; //храним переменную о таймере показа изменения рейта в деталке


//тут впихнуть ajax на удаление
function initRemoveRateDetailBook() {
	$(document).on("click", ".j-remove-detail-rate", function() {
		clearTimeout(timeout_show_change_form);
		var parent = $(this).closest(".book-detail-l-side__wrapper");
		var id = parent.data("id");
		parent.find(".books-slider_item-image_rate-rating").remove();
		parent.find(".book-detail-l-side__rate-form_wrapper").show();
		parent.find(".book-detail-l-side__rate-form_thx").hide();
		if ($(window).width() > 767) {
			parent.find(".book-detail-l-side__rate-form").show();
		}
		parent.find(".book-detail-l-side__rate-form_change").hide();
		parent.find(".book-detail-l-side__rate-remove-rate").hide();
		parent.find(".selected_rating").removeClass("selected_rating");
		parent.find(".book-detail-l-side__mobile-modal-change-rate").removeClass("showed");
		parent.find(".book-detail-l-side__mobile-modal-rate").addClass("showed");
		
		//$.ajax({data: {book_id: id}});
	});
}


function initChangeRateDetailBook() {
	$(document).on("click", ".j-change-detail-rate", function() {
		clearTimeout(timeout_show_change_form);
		var parent = $(this).closest(".book-detail-l-side__wrapper");
		var current_rate = parent.find(".j-change-detail-rate__value").text();
		
		parent.find(".book-detail-l-side__rate-form_wrapper").show();
		parent.find(".book-detail-l-side__rate-form_thx").hide();
		parent.find(".book-detail-l-side__rate-form").show();
		parent.find(".book-detail-l-side__rate-form_change").hide();
		parent.find(".books-slider_item-image_rate-form-star[data-value=\""+current_rate+"\"]").addClass("selected_rating");
	});
	
}

//обработчик формы сохранения оценки с мобилки
function initRateModalSubmit() {
	$(document).on("submit", ".j-rate-form-mobile", function(e) {
		var form = $(this);
		var id_book = form.find('input[name="book_id"]').val();
		var rate = form.find('input[name="rate"]').val();
		var comment = form.find('textarea').val();
		$.ajax({
			data: form.serialize(),
			type: "POST",
			url: "/ajax.php",
			dataType: "json",
			success: function(result) {			
				//не благодари бро, в ответе сервера в 'text' ложишь просто нужный ответ и он сам подставится в случае ошибки и выведется на форму
				//все равно надо будет проверять на наличие текста или выбранного рейтинга
				//type = success - если успешный ответ
				//type = error - когда нужно вывести ошибку	
				//в average_rage - ложи пересчитанную усредненную оценку после записи в БД и она сама впихнется в нужную карточку книги
				//см ajax.php - там примеры все
				if (result.type == "success") {
					
					if ($(".j-detail-book-rating").length) { //если сохраняемся в детальной странице книги
						$(".j-close-rate-modal").trigger("click");
						form.find(".error-message").remove();
						var book_obj = $('.j-detail-book-rating[data-id="'+id_book+'"]');	
						book_obj.find(".books-slider_item-image_rate-rating").remove();
						if (rate != '0') {
							book_obj.find(".books-slider_item-image_rate_container").append('<div class="books-slider_item-image_rate-rating">'+rate+'</div>');
						}
						book_obj.find(".books-slider_item-image_rate").text(result.average_rage);
						if (rate != '0') {
							book_obj.find(".book-detail-l-side__mobile-modal-rate").removeClass("showed");
							book_obj.find(".book-detail-l-side__mobile-modal-change-rate").addClass("showed");
							book_obj.find(".j-detail-book-rate-label").text(rate);
							book_obj.find(".j-change-detail-rate__value").text(rate);
							book_obj.find(".book-detail-l-side__mobile-modal-change-rate").data("init-rate", rate);
							book_obj.find(".book-detail-l-side__mobile-modal-change-rate").data("init-comment", comment);
							book_obj.find(".book-detail-l-side__rate-remove-rate").show();
						} else {
							book_obj.find(".book-detail-l-side__mobile-modal-rate").addClass("showed");
							book_obj.find(".book-detail-l-side__mobile-modal-change-rate").removeClass("showed");
							book_obj.find(".book-detail-l-side__rate-remove-rate").hide();
							
						}
						
						
					} else {//если сохраняемся в общем списке
						$(".j-close-rate-modal").trigger("click");
						var book_obj = $('.books-slider_item[data-id="'+id_book+'"]');
						book_obj.find(".books-slider_item-image_rate-rating").remove();
						book_obj.find(".books-slider_item-image_rate_container").append('<div class="books-slider_item-image_rate-rating">'+rate+'</div>');
						book_obj.find(".books-slider_item-image_rate").text(result.average_rage);
						form.find(".error-message").remove();
						
						if (form.closest(".j-poll-rate-modal").length == 1) {
							setTimeout(function() {
								initPollCounter();
							}, 100);							
						}	
						
					}
									
				} else if (result.type == "error") {
					if (form.find(".error-message").length == 0) {
						form.find(".rate-modal_buttons").before('<div class="error-message"></div>');
					}
					form.find(".error-message").text(result.text);
				} else {
					if (form.find(".error-message").length == 0) {
						form.find(".rate-modal_buttons").before('<div class="error-message"></div>');
					}
					form.find(".error-message").text('Внутренняя ошибка');					
				}

			}
		});
		e.preventDefault();
		return false;
	});
}

//закрытие модалки
function initCloseRateModal() {
	$(document).on("click", ".j-close-rate-modal", function(e) {
		$(".rate-modal-overlay").removeClass("show-rate-modal");
		var form = $(this).closest(".j-rate-form-mobile");
		form.find("textarea").val('');
		form.find(".books-slider_item-image_rate-center").hide();
		form.find(".books-slider_item-image_rate-form-star").removeClass("selected_rating");
		form.find(".error-message").remove();
		form.find(".j-mode-delete").remove();
		e.preventDefault();
		return false;
	});
}

//вызов модалки на мобилке при клике на рейтинг
function initMobileRateForm() {
	if ($(window).width() <= 767) {
		$(document).on("click", ".books-slider_item-image_rate", function() {
			$(".rate-modal-overlay").addClass("show-rate-modal");	
			var book_id = $(this).closest(".books-slider_item").data("id");
			$(".j-rate-form-mobile").find('input[name="book_id"]').val(book_id);
			if ($(this).closest(".j-poll-books-container").length == 1) {
				$(".rate-modal-overlay").addClass("j-poll-rate-modal");
			} else {
				$(".rate-modal-overlay").removeClass("j-poll-rate-modal");				
			}
		});
		
		$(document).on("click touch", ".j-show-modal-rate", function() {
			var book_id = $(this).data("id");
			
			var init_rate = $(this).data("init-rate");
			var init_comment = $(this).data("init-comment");
			
			if (init_comment) {
				$(".j-rate-form-mobile").find('textarea').val(init_comment);
			}
			
			if (init_rate) {
				$(".j-rate-form-mobile").find(".rate-modal_inner-form").prepend('<input type="hidden" name="mode" class="j-mode-delete" value="delete">');
				$(".j-rate-form-mobile").find('.books-slider_item-image_rate-form-star[data-value="'+init_rate+'"]').trigger("click");
			}
			
			$(".rate-modal-overlay").addClass("show-rate-modal");	
			$(".j-rate-form-mobile").find('input[name="book_id"]').val(book_id);	
			
					
		});
	}
}

//инициализация слайдеров книг
function initBookSlider() {
	
	if ($(window).width() >= 1200) {
		if ($(".books-slider").length > 0) {
			$(".books-slider").each(function() {
				if (!$(this).hasClass("j-poll-books-container")) {
					if ($(this).find(".books-slider_item").length > 5) {
						$(this).removeAttr("style");
						$(this).slick({
						    dots: false,
						    infinite: false,
						    speed: 300,
						    slidesToShow: 5,
						    draggable: true,
						    slidesToScroll: 1
					    });
				    }
				}
			});	
		}
	} else {
		var razn = 44;
		if ($(window).width() <= 767) {
			razn = 20;
		}
		$(".books-slider_wrapper").each(function() {
			if ($(this).find(".j-poll-books-container").length == 0) {
				var count = $(this).find(".books-slider").find(".books-slider_item").length;
				var width_block = $(this).find(".books-slider").find(".books-slider_item").eq(0).width()+razn;
				if ($(this).find(".books-slider").hasClass("slick-initialized")) {
					$(this).find(".books-slider").slick('unslick');
				}
				$(this).find(".books-slider").css("width", width_block*count);
			}
		});
	}
}

//инициализация клика рейтинга
function initChooseRateBook() {
	$(document).on("click", ".j-hover-star", function(event) {
		var obj = $(this);
		if (obj.closest(".book-detail-l-side__rate-form").length == 1) { //если это детальная страница книги
			var value = obj.data("value");
			var parent = $(this).closest(".book-detail-l-side__wrapper");
			var book_id = parent.data("id")
			//ajax отправка value 
			//$.ajax({data:{rate:value, book_id: book_id}});
			
			parent.find(".selected_rating").removeClass("selected_rating");
			parent.find(".book-detail-l-side__rate-form_wrapper").hide();
			parent.find(".book-detail-l-side__rate-form_thx").show();
			parent.find(".book-detail-l-side__rate-remove-rate").show();
			clearTimeout(timeout_show_change_form);
			timeout_show_change_form = setTimeout(function() {
				parent.find(".book-detail-l-side__rate-form").hide();
				parent.find(".book-detail-l-side__rate-form_change").show();
			}, 2000);
			
			parent.find(".books-slider_item-image_rate-rating").remove();
			parent.find(".j-change-detail-rate__value").text(value);
			parent.find(".books-slider_item-image_rate_container").append('<div class="books-slider_item-image_rate-rating">'+value+'</div>');
			//можешь не благодарить - функция обновления итогового числа рейтинга (в success аякса можно юзать)
			updateTotalRate('5,2', parent);
		} else { //если общий список
			var parent = $(this).closest(".books-slider_item");
			if (obj.hasClass("selected_rating")) {
				parent.find(".books-slider_item-image_rate-center").removeClass("selected_rating");
				parent.find(".books-slider_item-image_rate-center").hide();
				parent.find(".books-slider_item-image_rate-rating").remove();
				obj.removeClass("selected_rating");
				var value = '0';
			} else {
				obj.closest(".books-slider_item-image_rate-form-stars").find(".books-slider_item-image_rate-form-star").removeClass("selected_rating");
				obj.addClass("selected_rating");
				var value = obj.data("value");
				
				parent.find(".books-slider_item-image_rate-close").remove();
				if (parent.find(".books-slider_item-image_rate-rating").length == 0) {
					parent.find(".books-slider_item-image_rate_container").append('<div class="books-slider_item-image_rate-rating"></div>')
				}
				parent.find(".books-slider_item-image_rate-rating").text(value);
				parent.find(".books-slider_item-image_rate-center").addClass("selected_rating");
				parent.find(".books-slider_item-image_rate-center").removeAttr("style");				
			}
			
			
			var text = obj.data("text");
			var book_id = parent.data("id");
			
						
			

			
			if (obj.closest(".j-rate-form-mobile").length) {
				var form = obj.closest(".j-rate-form-mobile");
				form.find('input[name="rate"]').val(value)
				form.find(".j-hover-star-text").text(text);
				form.find(".j-hover-star-value").text(value);
				if (value == '0') {
					form.find(".books-slider_item-image_rate-center").hide();					
				} else {
					form.find(".books-slider_item-image_rate-center").show();
				}
			} else {
				
				//ajax отправка value 
				//$.ajax({data:{rate:value, book_id:book_id}});
			}
			
			//можешь не благодарить - функция обновления итогового числа рейтинга (в success аякса можно юзать)
			updateTotalRate('3,2', parent);
		}
	});
}

//инициализация "не интересно"
function initNotIntrestedBook() {
	$(document).on("click", ".j-book-not-intrested", function() {
		var obj = $(this).closest(".books-slider_item");
		obj.find(".j-hover-star").removeClass("selected_rating");		
		obj.find(".books-slider_item-image_rate-rating").remove();
		obj.find(".books-slider_item-image_rate-center").removeClass("selected_rating");
		var book_id = $(this).data("id");
		
		// $.ajax({data:{book_id:book_id}});
		
		/* первая реализация, если не нужно - то можно снести
		if (obj.find(".books-slider_item-image_rate-close").length == 1) {
			obj.find(".books-slider_item-image_rate-close").remove();
			obj.find(".j-hover-star").removeClass("selected_rating");
		} else {
			obj.find(".books-slider_item-image_rate-rating").remove();
			obj.find(".books-slider_item-image_rate_container").append('<div class="books-slider_item-image_rate-close"></div>');	
		}*/
	});
}

//инициализация добавления на полку
function initFavoriteFunc() {
	$(document).on("click", ".j-add-to-favorite", function() {
		$(this).toggleClass("added-to-favorite");
		var parent = $(this).closest(".books-slider_item-image");
		var parent_wr = parent.closest(".books-slider_item");
		var book_id = parent_wr.data("id");
		if ($(this).hasClass("added-to-favorite")) {
			if (parent.find(".icon-added-to-favorite").length == 0) {
				parent.prepend('<div class="icon-added-to-favorite"></div>');
			}
			//добавляем на полку
			// $.ajax({data:{book_id:book_id}});
		} else {
			parent.find(".icon-added-to-favorite").remove();
			//удаляем с полки
			// $.ajax({data:{book_id:book_id}});
		}
	});
}

//инициализация ховера звезд
function initRateHoverData() {
	$(document).on("click", ".j-hover-star-container", function(e) {
		if ($(window).width() > 767) {
			if ($(e.target).closest(".books-slider_item-image_rate-form-container").length == 1
				|| $(e.target).closest(".j-add-to-favorite").length == 1) 
			{			
				e.preventDefault();
				return false;
			}
		} else {
			
			if ($(this).closest(".j-poll-books-container").length == 1) {
				e.preventDefault();
				return false;
			} else {
				if ($(e.target).closest(".books-slider_item-image_rate_container").length) {
					e.preventDefault();
					return false;
				}
			}
		}
	});
	
	$(".j-hover-star").hover(function() {
		var obj = $(this);
		var value = obj.data("value");
		var text = obj.data("text");
		var parent = obj.closest(".j-hover-star-container");
		var span_value = parent.find(".j-hover-star-value");
		var span_text = parent.find(".j-hover-star-text");
		span_value.text(value);
		span_text.text(text);
		
		var block = parent.find(".books-slider_item-image_rate-center");
		if (!block.hasClass("selected_rating")) {
			block.show();
		}
		
	}, function() {
		var obj = $(this);
		var parent = obj.closest(".j-hover-star-container");
		var block = parent.find(".books-slider_item-image_rate-center");
		if (!block.hasClass("selected_rating")) {
			block.hide();
		} else {
			var obj_data = parent.find(".books-slider_item-image_rate-form-star.selected_rating");
			var value = obj_data.data("value");
			var text = obj_data.data("text");
			var span_value = parent.find(".j-hover-star-value");
			var span_text = parent.find(".j-hover-star-text");
			span_value.text(value);
			span_text.text(text);
			
			
		}
		
	});
}

function updateTotalRate(value, parent_book_obj) {
	parent_book_obj.find(".books-slider_item-image_rate").text(value);
}

function rateNow() {

    $(document).ready(function() {

       //------------ИЗМЕНЕНИЕ РЕЙТИНГА КНИГИ----------------//
        $('.card-item_img input[type=range]').on('input', function (e) {
            $(this).parent().children('.rate-num').text($(this).val());
            $(this).parent().children('.rate-num').css({
                'left': ($(this).val()) * 8.5 + '%'
            })
        });
        $('.card-item_img input[type=range]').on('change', function (e) {

            //если не на странице книги
            if(!$(this).hasClass('no_change_rating')) {

                var book_id = $(this).attr('data-id') ;
                var value = $(this).val() ;
                var user_id = parseInt($(this).attr('data-user-id')) ;
                var for_selection = parseInt($(this).attr('data-for-selection')) ;
                if(book_id > 0 && user_id > 0) {
                    if(value > 0) $('.book_item_'+book_id+' .user_rate-box').show().html(value) ;
                    else $('.book_item_'+book_id+' .user_rate-box').hide() ;
                    ajax_change_rating(book_id, 'books', 'book_item_'+book_id, value, for_selection);
                } else {
                    $('.modal').modal('hide') ;
                    $('.wrapper').addClass('blur-bg');
                    $('body').addClass('modal-open');
                    $('#reg-modal').modal('show') ;
                }

            }
        });
        //------------КОНЕЦ ИЗМЕНЕНИЕ РЕЙТИНГА КНИГИ----------------//

    });

}


var widgetId2 ;
var widgetId3 ;
var widgetId5 ;
 onloadCallback = function() {
    widgetId2 = grecaptcha.render('capcha2', {
        'sitekey' : '6Ld_PpsUAAAAAKkZjt2r0cHf4hbp0TwJTu8xTgq9',
        'theme' : 'light'
    });
    widgetId3 = grecaptcha.render('capcha3', {
        'sitekey' : '6Ld_PpsUAAAAAKkZjt2r0cHf4hbp0TwJTu8xTgq9',
        'theme' : 'light'
    });
    if($('#capcha5').length) { 
        widgetId5 = grecaptcha.render('capcha5', {
            'sitekey' : '6Ld_PpsUAAAAAKkZjt2r0cHf4hbp0TwJTu8xTgq9',
            'theme' : 'light'
        });
    }
};
/*
(function($) {
    $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
            })
            .jcarousel({
                wrap: 'circular'
            }).jcarouselSwipe({
                perSwipe: 1
            }); // init jcarouselSwipe;

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .on('click', function(e) {
                e.preventDefault();
            })
            .jcarouselPagination({
                perPage: 1,
                item: function(page) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
    });
})(jQuery);
*/


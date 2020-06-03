$(function() {
	

	$(document).on("click",".j-show-notify-modal", function() {
		$("#notif-modal").modal("show");
		$(this).find(".j-clear-current-notify").trigger("click");
	});
	
	$(document).on("click", ".j-show-all-notifies", function() {
		$(".j-hidden-ntf").each(function() {
			$(this).css("opacity", 0);
			$(this).removeClass("j-hidden-ntf");
			$(this).animate({opacity:1}, 200);
		});
		$(this).remove();
	});
	
	$(window).on("scroll", function() {
		initNtfBlock();
	});
	
	initNtfBlock();
	
	$(document).on("click", ".j-close-mobile-ntf-menu", function(e) {
		$(".ntf-mobile-menu__overlay").remove();
		e.preventDefault();
		return false;		
	});
	
	$(document).on("click", ".j-show-ntf-main-menu", function() {
		if ($(window).width() > 767) {
			 $(".ntf-menu-main").toggleClass("showed");
		} else {
			$("body").append('<div class="ntf-mobile-menu__overlay"><div class="ntf-mobile-menu__btns"><a href="#" class="j-clear-notify-from-mobile">Отметить все прочитанными</a><a href="https://yandex.ru/">Настройки</a></div><div class="ntf-mobile-menu__close"><a href="#" class="j-close-mobile-ntf-menu">Отменить</a></div></div>');
		}
	});


	$(document).on("click", ".j-show-ntf-current-menu", function() {
		if ($(window).width() <= 767) {
			$(".j-show-ntf-current-menu").each(function() {
				$(this).find(".ntf-menu-main").removeClass("showed");
				$(this).closest(".ntf-block").removeClass("hovered");
			});
			$(this).find(".ntf-menu-main").addClass("showed");
			$(this).closest(".ntf-block").addClass("hovered");
		}
	});

	$(document).click(function(event) {
		if ($(window).width() <= 767) {
			if ($(event.target).closest(".j-show-ntf-main-menu").length) return;
			$(".j-show-ntf-main-menu .ntf-menu-main").removeClass("showed");
		}
	});	
	
	$(document).on("click", ".j-clear-notify", function(e) {
		//ajax запрос на очистку уведомлений
		$(".notify-icon").find("span").remove();
		$(".ntf-block").removeClass("ntf-block-blue");
		$(".ntf-menu-main").removeClass("showed");
		e.preventDefault();
		return false;
	});
	
	
	$(document).on("click", ".j-clear-notify-from-mobile", function(e) {
		//ajax запрос на очистку уведомлений
		$(".notify-icon").find("span").remove();
		$(".ntf-block").removeClass("ntf-block-blue");
		$(".ntf-mobile-menu__overlay").remove();
		e.preventDefault();
		return false;
	});
	
	
	

	$(document).click(function(event) {
		if ($(window).width() <= 767) {
			if ($(event.target).closest(".j-show-ntf-main-menu").length) return;
			$(".j-show-ntf-main-menu .ntf-menu-main").removeClass("showed");
		}
	});	
	

	
	
	$(document).on("click", ".j-clear-current-notify", function(e) {
		var _block = $(this);
		var id = _block.data("id"); //id уведомления которое прочитано
		//ajax запрос на одно уведомление
		_block.closest(".ntf-block").removeClass("ntf-block-blue");
+		_block.closest(".ntf-menu-main").removeClass("showed");
		var new_count = ($(".notify-icon").find("span").text()*1) - 1;
		if (new_count == 0) {
			$(".notify-icon").find("span").remove();
		} else {
			$(".notify-icon").find("span").html(new_count);
		}
		e.preventDefault();
		return false;
	});
	
	$(document).on("click", ".j-show-notifies", function() {
		$(".ntf-wrapper").toggleClass("showed");

		if ($(window).width() > 767) {
			//setTimeout(function() {
			if (!$('.ntf-wrapper__overflow').hasClass('ntf-desktop-scroll')) {
				$('.ntf-wrapper__scroll').scrollbar();
				$('.ntf-wrapper__overflow').addClass('ntf-desktop-scroll');
			}

			//}, 1000);
		}
				
	});
	

	$(document).click(function(event) {
		if ($(event.target).closest(".j-show-all-notifies").length || $(event.target).closest(".ntf-wrapper").length || $(event.target).closest(".j-show-notifies").length || $(event.target).closest(".ntf-mobile-menu__overlay").length || $(event.target).closest("#notif-modal").length) return;
		$(".ntf-wrapper").removeClass("showed");
	});	
	
	setTimeout(function() {
		showNotify("Рецензии", "Сейчас", "<strong>Кристина Асмус</strong> поделилась вашей рецензией на книгу «Герцогиня»", "images/photo-ntf.png");
	}, 2000);
	
	$(document).on("click", ".ntf-r-close", function() {
		var _block = $(this).closest(".ntf-r-wrapper");
		_block.removeClass("showed");
		setTimeout(function() {
			_block.remove();
		}, 400);
		
	});
	
	$(document).on("click", ".ntf-mobile-close", function() {
		$(".ntf-wrapper").removeClass("showed");
	});
});

function showNotify(title, time, text, image = '') {
	var img = '';
	if (image) {
		img = '<div class="ntf-r-wrapper__image" style="background-image: url('+image+')"></div>';
	}
	$('body').append('<div class="ntf-r-wrapper"><div class="ntf-r-wrapper__title">Новое уведомление<span class="ntf-r-close"></span></div><div class="ntf-r-wrapper__theme">'+title+'<span>'+time+'</span></div><div class="ntf-r-wrapper__text">'+img+' '+text+'</div><div>');
	setTimeout(function() {
		$(".ntf-r-wrapper").addClass("showed");
		setTimeout(function() {
			$(".ntf-r-wrapper").removeClass("showed");
			setTimeout(function() {
				$(".ntf-r-wrapper").remove();
			}, 500);
		}, 3000);
	}, 100);
}

function initNtfBlock() {
	if ($(document).scrollTop() > 0) {
		if (!$(".ntf-wrapper").hasClass("ntf-scrolled")) {
			$(".ntf-wrapper").addClass("ntf-scrolled");
		}
	} else {
		if ($(".ntf-wrapper").hasClass("ntf-scrolled")) {
			$(".ntf-wrapper").removeClass("ntf-scrolled");
		}
	}	
}
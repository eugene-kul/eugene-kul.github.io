var was_sended_on_10 = false;
$(function() {
	$(document).on("click", ".j-poll-item-step1", function(e) {
		
		if ($(e.target).closest(".poll-contenet__subgenre").length == 1) {
			if ($(".modal-poll").hasClass("on-showed-subgenre")) {
				$(".modal-poll").removeClass("on-showed-subgenre");				
			} else {

				var num = 0;
				if ($(window).width() <= 650) {
					num = 0;
				}
								
				$(".modal-poll").addClass("on-showed-subgenre");
				var pollitem = $(this);
				var parent_category = $(this).find(".poll-contenet__subgenre").data("parent-category");
				if ($("#subgenreslist"+parent_category).length == 0) {
					$.ajax({
						url: "ajax_get_subgenre.html",
						type:"GET",
						data: {id:parent_category},
						success: function(result_html) {
							var result_html = $(result_html).attr("id", "subgenreslist"+parent_category);
							pollitem.closest(".poll-content__step1-row").after(result_html);
							var index = (pollitem.index()*1)+1;
							if (pollitem.closest(".poll-content__step1-row").find(".poll-content__item").length == 1 && $(window).width() <= 650) {
								index = 2;
							}
							
							$("#subgenreslist"+parent_category).eq(num).addClass("arrow-index"+index);							
							$("#poll-modal").animate({scrollTop: $("#subgenreslist"+parent_category).eq(num).position().top - 140 }, 300);
						}
					})
				} else {
					$("#subgenreslist"+parent_category).eq(num).show();
				}
			}
		} else {
			
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				$(this).find('input[type="checkbox"]').prop("checked", false);
				var parent_category = $(this).find(".poll-contenet__subgenre").data("parent-category");
				if ($("#subgenreslist"+parent_category).length == 1) {
					$("#subgenreslist"+parent_category).remove();
				}
				
			} else {
				$(this).addClass("active");			
				$(this).find('input[type="checkbox"]').prop("checked", true);
			}
			
			if ($(".j-send-poll-step-1").serialize() == "") {
				$(".j-send-poll-step-1").find("button").attr("disabled", "disabled");
			} else {
				$(".j-send-poll-step-1").find("button").removeAttr("disabled");				
			}
		}
	});
	
	$(document).on("click", ".j-item-subgenre", function(e) {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).find('input[type="checkbox"]').prop("checked", false);
		} else {
			$(this).addClass("active");			
			$(this).find('input[type="checkbox"]').prop("checked", true);
		}
	});
	
	$(document).mouseup(function (e){
		var div = $(".poll-contenet__subgenres-list");
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			$(".modal-poll").removeClass("on-showed-subgenre");	
			div.hide();
		}
	});
	
	$(document).on("submit", ".j-send-poll-step-1", function(e) {
		var form = $(this);
		$(".poll-content-step-1").hide();
		$(".modal-poll.modal-poll-step1").removeClass("modal-poll-step1");
		$(".modal-poll").addClass("modal-poll-step2");
		
		$.ajax({
			data: form.serialize(),
			url: "ajax_get_poll_step_2.html",
			type: "GET",
			success: function(result_html) {
				$(".poll-content-step-2").html(result_html);
				$(".poll-content-step-2").show();
				initRateHoverData();
				initPollChoosenBooks();
				was_sended_on_10 = false;
				$("#poll-modal").animate({scrollTop: 0}, 0);
			}
		});
		e.preventDefault();
		return false;
	});
	
	$(document).on("click", ".j-poll-back-step-to-1", function() {
		$(".poll-content-step-1").show();
		$(".poll-content-step-2").hide();
		$(".modal-poll.modal-poll-step2").removeClass("modal-poll-step2");
		$(".modal-poll").addClass("modal-poll-step1");
	});
	
	$(document).on("click", ".j-load-next-page-poll", function(e) {
		var page = $(this).data("page")*1;
		var form = $(".j-send-poll-step-1");
		$.ajax({
			data: form.serialize()+'&page='+page,
			url: "ajax_get_poll_step_2.html",
			type: "GET",
			success: function(result_html) {
				var result = $(result_html).find(".j-poll-books-container").html();
				$(".poll-content-step-2 .books-slider").append(result);
				initRateHoverData();
			}
		});		
		
		$(this).data("page", (page+1));
		
		e.preventDefault();
		return false;
	});
	
	$(document).on("click", ".poll-notify-wrapper__close", function() {
		$(".poll-notify-wrapper").fadeOut(300);		
		console.log('ok');
	});
	
	$(document).on("submit", ".j-final-step-poll", function(e) {
		openLoader();
		var formpoll = $(this);
		//аякс отправка данных при нажатии на кнопку "получить подборку" с последующим редиректом
		$.ajax({
			data: formpoll.serialize(),
			url: "",
			type: "POST",
			success: function() {
				window.location.href = "poll.php";
			}
		});
				
		e.preventDefault();
		return false;
	});
	
	
	$("#poll-modal").on("scroll", function() {
		if ($("#poll-modal .books-slider_wrapper-scroll").length) {
			if ($("#poll-modal .books-slider_wrapper-scroll").offset().top - 60 < 0) {
				$(".on-scroll-step-2-poll-header").addClass("showed");
			} else {
				$(".on-scroll-step-2-poll-header").removeClass("showed");			
			}
		}
	});
	

});

function initPollCounter() {
	var current = $(".j-poll-books-container").find(".books-slider_item-image_rate-rating").length*1;
	$(".j-current-couter-choosen").text(current);
	
	$(".j-final-step-poll").find(".j-hidden-poll-book").remove();
	
	$(".j-poll-books-container").find(".books-slider_item-image_rate-rating").each(function() {
		var cont = $(this).closest(".books-slider_item");
		var book_id = cont.data("id");
		$(".j-final-step-poll").prepend('<input type="hidden" name="book[]" value="'+book_id+'" class="j-hidden-poll-book">');
	});
	
	if (current >= 10) {
		if (current > 10) {
			$(".j-hide-max-poll").hide();
		} else {
			$(".j-hide-max-poll").show();			
		}
		$(".modal-poll-final-btn").removeAttr("disabled");
		if (was_sended_on_10 == false) {
			was_sended_on_10 = true;
			var formpoll = $(".j-final-step-poll");
			
			//аякс отправка данных при выборе 10ой книги (автоматическое формирование подборки)
			$.ajax({
				data: formpoll.serialize(),
				url: "",
				type: "POST",
				success: function() {
					showPollNotify("https://yandex.ru/");
				}
			});
		}

	} else {
		$(".modal-poll-final-btn").attr("disabled","disabled");				
	}
}

function initPollChoosenBooks() {
	$(".j-poll-books-container").on("click", ".j-hover-star, .j-book-not-intrested", function() {
		setTimeout(function() {
			initPollCounter();
		}, 100);
	});
}
function showPollNotify(link) {
	$(".poll-notify-wrapper").fadeIn(300);
	$(".poll-notify-wrapper__link").attr("href", link);
	setTimeout(function() {
		$(".poll-notify-wrapper__close").trigger("click");
	}, 10000);
}

function openLoader() {
	$('#loader').show();
	console.log('step2');
	setTimeout(function(){$('#loader').hide();}, 4000);
}

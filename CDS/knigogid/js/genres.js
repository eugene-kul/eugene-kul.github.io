$(function() {
	
	$(".genres-wrapper").hover(function() {},
	function() {
		$(this).removeClass("showed");
	});
	
	$(document).on("change", ".j-gdd-select-custom", function() {
		var option = $(this).find("option:selected");
		var text = option.text();
		var direction = option.data("type");
		var block = $(this).closest(".gdd-select-custom");
		block.removeClass("asc");
		block.removeClass("desc");		
		block.addClass(direction);		
		block.find("span").text(text);
	});
	
	$(document).on("submit", ".j-gdd-filter-form", function(e) {		
		$(".gdd-filter").removeClass("showed");
		e.preventDefault();
		return false;		
	});
	
	$(document).on("click", ".j-close-gdd-filter", function(e) {
		$(".gdd-filter").removeClass("showed");
		e.preventDefault();
		return false;				
	});
	
	$(document).on("click", ".j-gdd-filters", function(e) {
		$(".gdd-filter").toggleClass("showed");
		e.preventDefault();
		return false;				
	});
	
	$(document).click(function(event) {
		if ($(event.target).closest(".gdd-filter").length || $(event.target).closest(".ntf-r-wrapper").length) return;
		if ($(".gdd-filter").hasClass("showed")) {
			$(".gdd-filter").removeClass("showed");
		}
	});	
		
	
	$(document).on("change", ".j-gdd-checked-counter", function() {
		var counter = $(".j-gdd-checked-counter:checked").length;
		if (counter == 0) {
			$(".j-gdd-filters").find(".j-counter-on-button").remove();
			$(".gdd-filter__submit").attr("disabled", "disabled");
		} else {
			if ($(".j-gdd-filters").find(".j-counter-on-button").length == 0) {
				$(".j-gdd-filters").prepend('<span class="j-counter-on-button"></span>');
			}
			$(".j-counter-on-button").html(counter);
			$(".gdd-filter__submit").removeAttr("disabled");
		}
		
		if ($(".genres-list-lnks.genres-list-lnks__with-numbers").length) {
			var cont_selected = $(".genres-list-lnks.genres-list-lnks__with-numbers");
			var html = '';
			$(".j-gdd-checked-counter:checked").each(function() {
				var closest = $(this).closest(".gdd-filter__checkbox");
				html+='<a href="#">'+closest.find("label").text()+' <span>'+closest.find(".gdd-filter__counter").text()+'</span></a>';
			});
			cont_selected.html(html);
			
		}
	});
	
	$(document).on("click", ".gdd-filter__clear", function(e) {
		$(".j-gdd-checked-counter").prop("checked", false);
		$(".j-gdd-checked-counter").trigger("change");
		e.preventDefault();
		return false;		
	});
	

	var initHeight = $(".gdd-desc__wrapper").height();
	
	$(document).on("click", ".j-gdd-show-all", function(e) {
		
		var wrapperHeight = $(".gdd-desc__wrapper").height(); 
		var height = $(".gdd-desc").height();
		
		if (wrapperHeight != initHeight) {
			$(this).text("Читать полностью");
			$(".gdd-desc__wrapper").animate({height: initHeight}, 300, "swing");
		} else {
			$(this).text("Скрыть");
			$(".gdd-desc__wrapper").animate({height: height}, 300, "swing");
		}
		
		e.preventDefault();
		return false;
	});
	
	$(document).on("click", ".j-load-more-genres", function(e) {
		$(this).closest(".genres-list-lnks").find(".j-hidden-genres").removeClass("j-hidden-genres");
		$(this).remove();
		e.preventDefault();
		return false;
	});
	
	$(".j-hover-genres-links").find("a").hover(function() {
		var id = $(this).data("id");
		if (id > 0) {
			var block = $(this).closest(".j-hover-genres-links").next(".j-hover-genres-links");
			block.find("a").css('display', 'none');
			if (block.next(".j-hover-genres-links").length) {
				block.next(".j-hover-genres-links").find("a").css('display', 'none');
			}
			$(".j-hover-genres-links").find('a[data-parent="'+id+'"]').css('display', 'block');
		}
		var link = $(this).data("link");
		var src = $(this).data("src");
		var title = $(this).data("title");
		if (link && src && title) {
			$(".j-popular-book-genre").attr("href", link);
			$(".j-popular-book-genre").find("span").text(title);
			$(".j-popular-book-genre").find("img").attr("src", src);
		}
	});

	$(".j-show-genre-menu").hover(function() {
		if (!$(".genres-wrapper").hasClass("showed")) {
			$(".genres-wrapper").addClass("showed");
			$(".ntf-wrapper").removeClass("showed");
		}
	});
	

	$(document).click(function(event) {
		if ($(event.target).closest(".genres-wrapper").length || $(event.target).closest(".ntf-r-wrapper").length) return;
		if ($(".genres-wrapper").hasClass("showed")) {
			$(".genres-wrapper").removeClass("showed");
		}
	});		
	
	$(window).on("scroll", function() {
		initGenresBlock();
		initGddBlock();
	});
	
	initGenresBlock();	
	initGddBlock();	
});


function initGenresBlock() {
	if ($(document).scrollTop() > 0) {
		if (!$(".genres-wrapper").hasClass("genre-scrolled")) {
			$(".genres-wrapper").addClass("genre-scrolled");
		}
	} else {
		if ($(".genres-wrapper").hasClass("genre-scrolled")) {
			$(".genres-wrapper").removeClass("genre-scrolled");
		}
	}	
}

function initGddBlock() {
	if ($(document).scrollTop() > 0) {
		if (!$(".gdd-filter").hasClass("gdd-filter-scrolled")) {
			$(".gdd-filter").addClass("gdd-filter-scrolled");
		}
	} else {
		if ($(".gdd-filter").hasClass("gdd-filter-scrolled")) {
			$(".gdd-filter").removeClass("gdd-filter-scrolled");
		}
	}	
}
/* version 1.4, Jan 11th, 2016 */
var anim = typeof anim !== 'undefined' ? anim : {};

$(function () {
	anim = $.extend({}, {
		timer:           null,
		busy:            false,
		scroll_padding:  0,
		effects_padding: 0,
		refresh:         function () {}
	}, typeof anim !== 'undefined' ? anim : {});

	anim.refresh = function () {
		var $window = $(window);
		var $document = $(document);
		var $body = $(document.body);
		var i = 0;
		var window_top = anim.effects_padding;
		var window_bottom = $window.height()*1.1 - anim.effects_padding*1.1;
		var document_top = anim.scroll_padding;
		var document_bottom = $document.height()*1.1 - anim.scroll_padding*1.1;
		
		if ($window.scrollTop() === 0) {
			if (!$body.hasClass('at-top')) {
				$body.addClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
			}
		} else if ($window.scrollTop() + $window.height() === $document.height()) {
			if (!$body.hasClass('at-bottom')) {
				$body.addClass('at-bottom').removeClass('at-top').removeClass('near-top').removeClass('near-bottom');
			}
		} else if ($window.scrollTop() <= document_top) {
			if (!$body.hasClass('near-top')) {
				$body.addClass('near-top').removeClass('near-bottom').removeClass('at-top').removeClass('at-bottom');
			}
		} else if ($window.scrollTop() + $window.height() >= document_bottom) {
			if (!$body.hasClass('near-bottom')) {
				$body.addClass('near-bottom').removeClass('near-top').removeClass('at-top').removeClass('at-bottom');
			}
		} else {
			if ($body.hasClass('at-top') || $body.hasClass('at-bottom') || $body.hasClass('near-top') || $body.hasClass('near-bottom')) {
				$body.removeClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
			}
		}
		
		$('*[class*="anim"]').each(function () {
			i++;
			var element = this;
			var $element = $(element);
			var element_bounding = element.getBoundingClientRect();

			var position_class = undefined;
			if (element_bounding.top > window_bottom && element_bounding.bottom > window_bottom) {
				position_class = 'anim-below';
			} else if (element_bounding.top < window_bottom && element_bounding.bottom > window_bottom) {
				position_class = 'anim-partially-below'
			} else if (element_bounding.top < window_top && element_bounding.bottom > window_top) {
				position_class = 'anim-partially-above'
			} else if (element_bounding.top < window_top && element_bounding.bottom < window_top) {
				position_class = 'anim-above';
			} else {
				position_class = 'anim-within';
			}

			if ($element.hasClass('anim-load') && !$element.hasClass('anim-within')) {
				$element.removeClass('anim-below anim-partially-below anim-within anim-partially-above anim-above');
				$element.addClass('anim-within');
			}

			if (!$element.hasClass(position_class) && !$element.hasClass('anim-load')) {
				if ($element.hasClass('anim-once')) {
					if (!$element.hasClass('anim-within')) {
						$element.removeClass('anim-below anim-partially-below anim-within anim-partially-above anim-above');
						$element.addClass(position_class);
					}
					if ($element.hasClass('anim-partially-above') || $element.hasClass('anim-above')) {
						$element.addClass('anim-within');
					}
				} else {
					$element.removeClass('anim-below anim-partially-below anim-within anim-partially-above anim-above');
					$element.addClass(position_class);
				}
			}
		});
	};

	$(window).bind('scroll resize load ready', function () {
		if (!anim.busy) {
			anim.busy = true;
			setTimeout(function () {
				anim.busy = false;
				anim.refresh();
			}, 150);
		}
	});
});
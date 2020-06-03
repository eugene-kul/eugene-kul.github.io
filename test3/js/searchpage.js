//tabs========================
function initPersonalTabs() {
	$('.searchpage_navtab-link').click(function(event){
		if ($(this).hasClass('active')) return;

		var tabName = $(this).data('tab'),
		tab = $('.searchpage_tabitem[data-tab="'+tabName+'"]');

		if (tabName==1) {
			$('.searchpage_tabitem').addClass('active');
			$('.searchpage_tabitem.full-page').removeClass('full-page');
		}	else	{
			$('.searchpage_tabitem.active').removeClass('active');
			$('.searchpage_tabitem.full-page').removeClass('full-page');
			tab.addClass('active full-page');
		}

		$('.searchpage_navtab-link.active').removeClass('active');
		$(this).addClass('active');

	});
	$('.spMain').click(function(event) {
		$(this).toggleClass('active').next().toggleClass('active');
	});
}
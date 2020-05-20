//poll__block dots=======================
$('.poll__dots-item').click(function(event){
	if ($(this).hasClass('poll__dots-item_acive')) return;
	$('.poll__dots-item.poll__dots-item_acive').removeClass('poll__dots-item_acive');
	$(this).toggleClass('poll__dots-item_acive');
});

//tabs tariff
$('.rate-list__navtab-item').click(function(event){
	if ($(this).hasClass('rate-list__navtab-item_active')) return;

	var tabName = $(this).data('tab'),
		tab = $('.rate-list__tab-item[data-tab="'+tabName+'"]');

	$('.rate-list__navtab-item.rate-list__navtab-item_active').removeClass('rate-list__navtab-item_active');
	$(this).addClass('rate-list__navtab-item_active');

	$('.rate-list__tab-item.rate-list__tab-item_active').removeClass('rate-list__tab-item_active');
	tab.addClass('rate-list__tab-item_active');
});

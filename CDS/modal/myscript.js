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
//==========================================================================================================
//modal tabs для окна communication-v2
$('.communication__navtab-item--v1').click(function(event){
	if ($(this).hasClass('communication__navtab-item_active')) return;

	var tabName = $(this).data('tab'),
		tab = $('.communication__tabitem--v1[data-tab="'+tabName+'"]');

	$('.communication__navtab-item--v1.communication__navtab-item_active').removeClass('communication__navtab-item_active');
	$(this).addClass('communication__navtab-item_active');

	$('.communication__tabitem--v1.communication__tabitem_active').removeClass('communication__tabitem_active');
	tab.addClass('communication__tabitem_active');
});

// lkz jryf communication-v2
$('.communication__navtab-item--v2').click(function(event){
	if ($(this).hasClass('communication__navtab-item_active')) return;

	var tabName = $(this).data('tab'),
		tab = $('.communication__tabitem--v2[data-tab="'+tabName+'"]');

	$('.communication__navtab-item--v2.communication__navtab-item_active').removeClass('communication__navtab-item_active');
	$(this).addClass('communication__navtab-item_active');

	$('.communication__tabitem--v2.communication__tabitem_active').removeClass('communication__tabitem_active');
	tab.addClass('communication__tabitem_active');
});
//========================================================================================================================================================
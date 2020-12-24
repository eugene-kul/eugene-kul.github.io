//перенос русского текста================//
$(function() {
    $('.txt').hyphenate();
});

$.fn.hyphenate = function() {
  var all = "[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]",
    glas = "[аеёиоуыэю\я]",
    sogl = "[бвгджзклмнпрстфхцчшщ]",
    zn = "[йъь]",
    shy = "\xAD",
    re = [];
   
  re[1] = new RegExp("("+zn+")("+all+all+")","ig");
  re[2] = new RegExp("("+glas+")("+glas+all+")","ig");
  re[3] = new RegExp("("+glas+sogl+")("+sogl+glas+")","ig");
  re[4] = new RegExp("("+sogl+glas+")("+sogl+glas+")","ig");
  re[5] = new RegExp("("+glas+sogl+")("+sogl+sogl+glas+")","ig");
  re[6] = new RegExp("("+glas+sogl+sogl+")("+sogl+sogl+glas+")","ig");
  return this.each(function() {
    var text = $(this).html();
    for (var i = 1; i < 7; ++i) {
      text = text.replace(re[i], "$1"+shy+"$2");
    }
    $(this).html(text);
  });
};
//========================================//

//TAB====================================//
$('.tab__navitem').on('click', function(){
	if ($(this).hasClass('active')) {return;}
	var tabName = $(this).data('tab'),
		tab = $('.tab-item[data-tab="'+tabName+'"]');
	
		$('.tab__item.active').removeClass('active');
		$(this).addClass('active');

		$('.tab-item.active').removeClass('active');
		$('.tab-item.anim').removeClass('anim');
		tab.addClass('active');

		setTimeout(function(){
			tab.addClass('anim');
		}, 300);
});
//=======================================//

//filter==========================================================================
$('.filter__item').click(function(event){
  var i = $(this).data('filter');
  if (i==1) {
    $('.portfolio__column').show();
  } else {
    $('.portfolio__column').hide();
    $('.portfolio__column.f_'+i).show();
  }
  $('.filter__item').removeClass('filter__item__active');
  $(this).addClass('filter__item__active');

  return false;
});
//===========================================================================================//


//======================================================//
//mini-parallax=========================
$(window).scroll(function(event) {
  var s =$(this).scrollTop();
  $('.mainblock__image').css('transform','translate3d(0, '+s/-2+'px, 0)');
  $('.mainblock__image').css('filter', 'blur('+s/50+'px)');
});

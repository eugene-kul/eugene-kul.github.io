$(window).scroll(function(event) {
  var s =$(this).scrollTop();

  $('.pageaboutus__bg').css('transform','translate3d(0, '+s/2+'px, 0)');
});
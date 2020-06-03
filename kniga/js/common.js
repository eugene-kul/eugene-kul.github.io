$(function () {

  $(".burger-menu").click(function () {
    $(this).toggleClass("menu-on"); // тогглим класс для анимации бургера
    $('main').toggleClass('glass'); // тут добавляем размытие, когда открыто меню/модальное окно
    $('.nav-data').toggleClass('show-menu');
  });

  $('.lvl1-item').click(function () {
    $('.header-menu_lvl2').toggleClass('show');
  });

  // всякая штука для инициализации слайдера



  $('.start_carousel').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    draggable: false,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $('.book-card_carousel').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    draggable: true,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $('.my-shelfs_carousel').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    draggable: true,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $('.my_shelfs-cab').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    draggable: true,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 875,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $('.artist-book_slider').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    draggable: true,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },

      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

  $('.artist-book_preview-slider').slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    draggable: true,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  //   немного работы ползунка

  $('.book-item input[type=range]').on('input', function (e) {
    $(e.target).css({
      'backgroundSize': ((100 / e.target.max) * e.target.value) + '%'
    });
  }).trigger('input');

  // $('#write-comment_modal').modal('show');
  // $('#send-note_modal').modal('show');
  // $('#full-description_modal').modal('show');

  // тогглим blur_bg для wrapper, чтоб при открытии/закрытии модального окна размывался фон
  $('.modal').on('show.bs.modal', function () {
    $('.wrapper').toggleClass('blur_bg');
  }).on('hide.bs.modal', function () {
    $('.wrapper').toggleClass('blur_bg');
  });

  // открытие меню

  $('.already_login-box').click(function () {

    $('.user_item-menu_box').toggleClass('open');

  });


  // развернуть/свернуть блок с текстом комментария. .full тут ключевой класс, остальные просто для примера.
  $('.trying-btn').click(function () {

    $('.onetwo').toggleClass('full');
    $(this).html('свернуть <i class="fas fa-chevron-up"></i>');

  });

  // заливка замков для чекбокса секретность

  $('.secret-check input').click(function () {

    if ($(this).is(':checked')) {
      $('.svg-lock, .svg-unlock').addClass('notactive');
    } else {
      $('.svg-lock, .svg-unlock').removeClass('notactive');
    }

  });

  $('.gender-check input').click(function () {

    if ($(this).is(':checked')) {
      $('.gender-check .female').addClass('active');
      $('.gender-check .male').removeClass('active');
    } else {
      $('.gender-check .female').removeClass('active');
      // $('.gender-check .male').addClass('active');
    }

  });


  $('.header-search').click(function () {

    $('.hidden-search_box, .hidden_search-input').toggleClass('active');
    $('header').toggleClass('blur_bg');
    $('#form_search .search_input').focus();

  });

  /*
  $('.link-input_btns .edit').click(function(){
      $('.form-soc_item .link-input input').addClass('edit');
  });
  */


  // передаю высоту дочернему блока от родительского, чтобы не костылить с таблицами.

  $('.fails-box').each(function () {
    var height = $(this).parent().height();
    $(this).css('height', height);
  });

  $('.genres-types .card-header').click(function(){
    $(this).toggleClass('active');
    $('.genres-types .card').toggleClass('active');
  });

  $('.content_item-box input[type=range]').on('input', function (e) {
    $(e.target).css({
      'backgroundSize': ((100 / e.target.max) * e.target.value) + '% 100%',
    });
  }).trigger('input');
  
  $('.content_item-box input[type=range]').mouseup(function (e) {
    if (e.which == 1) {
      $('.thank_box').css({
        'display': 'block'
      }).delay(1000).fadeOut(2000);
    }
  })
  
  $(".rate_inp input").on("input", function () {
    $(this).parent().parent().find('.show_rate-value').show();
    $(this).parent().parent().find('.show_rate-value .rate_value').html(this.value);
    $(this).parent().parent().find('.item_tip').hide();
  });

});


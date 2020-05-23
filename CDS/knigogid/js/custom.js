$(function () {

    // кастомный скролл
    $('.scrollbar-inner').scrollbar({});

    // шапочку фиксируем
    $(window).scroll(function () {

        /*
        //если достигнут низ экрана в ридере - показываем стрелочки
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
          
            $('.reader-content .next, .reader-content .prev').fadeIn() ;

        } else {

            $('.reader-content .next, .reader-content .prev').fadeOut() ;

        }
        */

        var height = $(window).scrollTop();
        if (height > 1) {
            $('.header-nav').addClass('hid');
            $('.header-box, .header-container, .all-reviews_header').addClass('scrolled');
        } else {
            $('.header-nav').removeClass('hid');
            $('.header-box, .header-container, .all-reviews_header').removeClass('scrolled');
        }
    });

    // открытие поиска в десктопной версии шапки
    /*
    $('.header-search_btn').click(function () {
        $('.header-search_box input').toggleClass('open');
    });
    */

    // открытие поиска в мобильной версии шапки
    /*
    $('.header-search_btn-mobile').click(function(e) {
        $('.header-search').slideToggle(300);
    }) ;
    */
    /*
    $(document).click(function (event) {
        if ($(event.target).closest(".header-search_btn").length) return;
        $(".header-search_box input").removeClass('open');
        event.stopPropagation();
    });
    */

    //   ползунок
    $('.range-mix').on('input', function (e) {
        $(e.target).css({
            'backgroundSize': ((100 / e.target.max) * e.target.value) + '% 100%',
        });
    }).trigger('input');

    $(".carousel").swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

        if (direction == 'left') $(this).carousel('next');
        if (direction == 'right') $(this).carousel('prev');

      },
      allowPageScroll:"vertical"
    });

    $('footer .accordion-opener').click(function () {
        $(this).toggleClass('change-icon');
    });

    // открытие уведомлений
    $('.header-notice').click(function (e) {
        $('.notice-box.top').toggle(0);
    });

    $(document).click(function (event) {
        if ($(event.target).closest(".header-notice").length) return;
        $(".notice-box.top").hide(0);
        event.stopPropagation();
    });

    // Дестроим карусель на больших экранах
    $(window).resize(carouselResize);

    function carouselResize() {
        let winWidth = $(window).width();
        let carousel = $('.carousel .tips-item');

        const maxTabletWidth = 1024;

        if (winWidth >= maxTabletWidth) {
            if (carousel.hasClass("carousel-item"))
                carousel.removeClass("carousel-item");
        } else {
            if (!carousel.hasClass("carousel-item"))
                carousel.addClass("carousel-item");
        }
    }

    carouselResize();

    // пробую перемещать оценку

    $('.card-item_img input[type=range]').bind('mousedown touchstart', function (e) {
        $(this).parent().children('.rate-num').addClass('visible-box');
        $(this).parent().parent().children('.card-item_description').children('.card-item_rating').addClass('visible-box');
    });
    $('.card-item_img input[type=range]').bind('mouseup touchend', function () {
        $(this).parent().children('.rate-num').removeClass('visible-box');
        $(this).parent().parent().children('.card-item_description').children('.card-item_rating').removeClass('visible-box');
    })


    $('.card-item_img input[type=range]').on('input', function (e) {
        $(this).parent().children('.rate-num').text($(this).val());
        $(this).parent().children('.rate-num').css({
            'left': ($(this).val()) * 8.5 + '%'
        })
    });

    // показать мобильное меню.

    $('.header-user').click(function () {
        $('.dropdown-block').toggle();
    });

    $(document).click(function (event) {
        if ($(event.target).closest(".header-user").length) return;
        $(".dropdown-block").hide(0).removeClass('open');
        event.stopPropagation();
    });

    // modal
    $('#chapter-modal').modal('show');


    $(function () {
        $('.reg-modal_input').each(function (e) {
            var placeholder = $(this).attr('placeholder');
            $(this).before('<span>' + placeholder + '</span>');
            $(this).on('focus', function () {
                var inputContent = $(this).val();
                if (inputContent == '') {
                    $(this).prev().addClass('visible');
                }

            });
            $(this).on('blur', function () {
                var inputContent = $(this).val();
                if (inputContent == '') {
                    $(this).prev().removeClass('visible');
                }
            });
        });
    });

    let inpPass = $('.reg-modal_input.pass');
    let inpPass2 = $('.reg-modal_input.pass2');

    $('.show-pass.one').click(function (e) {
        $(this).toggleClass('show');
        if(inpPass.attr('type') == 'password') {
            inpPass.attr('type', 'text')
        }
        else{
            inpPass.attr('type', 'password');
        }
    });
    $('.show-pass.two').click(function (e) {
        $(this).toggleClass('show');
        if(inpPass2.attr('type') == 'password') {
            inpPass2.attr('type', 'text')
        }
        else{
            inpPass2.attr('type', 'password');
        }
    });

    // прыгаем по шагам в модальном окне
    let $nextBtn = $('.next-step_btn');

    $nextBtn.on('click', function () {
        if(!$(this).hasClass('disabled1')) {

            $(this).parents('.step-item').slideToggle();
            $(this).parents('.step-item').next().slideToggle();

        }
    })

    // поддержка тултипов
    $('[data-toggle="tooltip"]').tooltip();

    // добавляем blur при открытии модального окна
    $('.modal').on('show.bs.modal', function () {
        $('.wrapper').addClass('blur-bg');
        $('body').addClass('modal-open');
    }).on('hide.bs.modal', function () {
        $('.wrapper').removeClass('blur-bg');
        $('body').removeClass('modal-open');
    });

    // для body добавляем класс, чтобы запретить прокрутку при открытии поиска
    /*
    $('#search-input').click(function(e) {
        e.preventDefault();

        $('.wrapper').addClass('blur-bg');
        $('.search-win').show();
        $('.search-win_top-inp input[type=text]').focus();
        $('body').addClass('modal-open');
    });
    */
    $('.header-search_btn, .header-search_btn-mobile').click(function(e) {
        e.preventDefault();

        $('.wrapper').addClass('blur-bg');
        $('.search-win').show();
        $('.search-win_top-inp input[type=text]').focus();
        $('body').addClass('modal-open');
    });

    $('.search-win_close-btn').click(function(e) {
        e.preventDefault();

        $('.wrapper').removeClass('blur-bg');
        $('.search-win').hide();
        $('body').removeClass('modal-open');
    });

    $('.clear-text_btn').click(function(e) {
        e.preventDefault();
        $('.search-win_top-inp input[type=text]').val('');
    })

    // показать уведомление о добавлении книги
    $('.add_shelf_book-list_item').click(function () {
        $('.popup-box').show().fadeOut(2000);
    });

    // настройки создания книжной полки
    $('.create_shelf_btn').click(function (e) {
        $('.create_shelf_box').toggleClass('create');
        $('.create_shelf_settings').slideToggle("slow");
    });

    $('.secret-shelf input').change(function () {
        if (this.checked) {
            $('.secret-shelf span').text('Закрытая')
        } else {
            $('.secret-shelf span').text('Открытая')
        }
    });

    $('.add_description-btn').click(function () {
        $('.shelf_name-description').slideToggle('slow');
    });

    // открытие отрывка книги
    /*
    $('.open-fragment_btn').click(function () {
        $('.book_item-fragment p').toggleClass('open');
        if ($('.book_item-fragment p').hasClass('open')) {
            $(this).text('Свернуть');
        } else {
            $(this).text('Развернуть');
        }
    });
    */



// Развернуть описаине
$('.article-award .link-more').click(function (e) {
    $(this).siblings('.mob-hidden').toggle();
    if ($(this).text() == "Скрыть описание") { 
        $(this).text("Читать описание"); 
    } else { 
        $(this).text("Скрыть описание"); 
    }; 
    e.preventDefault();
});

// Развернуть блок в таблице
$('.table-row .cell .jq-link').click(function (e) {
    $(this).siblings('.hidden').toggle();
    if ($(this).text() == "Свернуть") { 
        $(this).text("Развернуть"); 
    } else { 
        $(this).text("Свернуть"); 
    }; 
    e.preventDefault();
});
    

    // Открыть комментарий
    $('.open-comment button').click(function () {
        $('.comment-item_content').toggleClass('open');
        if ($('.comment-item_content').hasClass('open')) {
            $(this).text('Свернуть');
        } else {
            $(this).text('Развернуть');
        }
    });


    // кнопка настроек в профиле.

    $(document).click(function (e) {
        let cont = $('.book_item-menu_btn');

        if (!cont.is(e.target) && cont.has(e.target).length === 0) {
            $('.book_item-menu_btn .dropdown-block').fadeOut(0);
        }
        else {
            $(e.target).find('.dropdown-block').fadeIn(0);
        }
    });

    // аккордеон для жанров
    let genresBtn = $('#genres .card .accordion-opener');

    genresBtn.click(function () {
        $(this).children('.genres-icon').toggleClass('active');
        $(this).parents('.card').toggleClass('active');
    });

    // последние запросы

    // let liWidth = $('.request-list li').width();
    // $('.more-request_items').click(function(e) {
    //     e.preventDefault();
    //     $('.request-list li').css({
    //         'transform' : `translateX(-${liWidth += liWidth}px)`, // какую-то хрень написал, но уже времени не было что-то придумывать. Визуально должно работать так.
    //         'transition': '.5s'
    //     });
    // });

    // Ридер
    $('.reader-content').click(function (e) {
        if ($(this).hasClass('active')) {
            $('.reader-content, .reader-section_list, .reader-header').removeClass('active');
        }
        else {
            $('.reader-header, .reader-settings_lgscreen').toggleClass('active');
            $('.settings-data').fadeOut(300);
            $('.chapters-box').slideUp(300);
        }

        if ($('.reader-header').hasClass('active')) {
            $('.reader-funcs').hide(300);
        }
        else {
            $('.reader-funcs').delay(300).show(300);
        }
    });

    $('.reader-actions button').click(function (e) {
        $('.reader-section_list, .reader-content').addClass('active');
        $('.settings-data').fadeIn(300);

        $('.chapters-box').hide(300);
    });
});

$(function () {
    // Ползунок для перелистывания страниц
    $('.settings-range input[type=range]').on('input', function () {
        var el, newPoint, newPlace, offsetPos;
        el = $(this);
        var widthInp = el.width();

        newPoint = (el.val() - el.attr('min')) / (el.attr('max') - el.attr('min'));
        offsetPos = 0.5;

        if (newPoint < 0) newPlace = 0;
        else if (newPoint > 1) newPlace = widthInp;
        else {
            newPlace = widthInp * newPoint + offsetPos;
            offsetPos -= newPoint;
        }
        // перемещение тултипа
        $('.output')
            .css({
                'left': newPlace,
                'marginLeft': offsetPos + "%"
            })
            .text(el.val());
    }).trigger('input');

    // ползунок в читалке
    $('.settings-range input[type=range]').on('input', function (e) {
        $(e.target).css({
            'backgroundSize': ((100 / e.target.max) * e.target.value) + '% 100%',
        });
    }).trigger('input');


    $('.settings-range input[type=range]').bind('mousedown touchstart', function () {
        $('.output').show();
    }).bind('mouseup touchend', function () {
        $('.output').hide();
    });

    // показать окно настроек
    $('.show-settings_btn').click(function (e) {
        e.preventDefault();
        $('.settings-data').fadeToggle(300);
        $('.chapters-box, .reader-section_list').hide(300);
    });

    // изменение контента ридера

    // выравнивание текста
    $('.align-left').click(function (e) {
        Cookies.set('reader_align', 'left') ;
        $(this).addClass('active');
        $('.align-center').removeClass('active');
        if ($(this).hasClass('active')) {
            $('.reader-content_container').css({
                'textAlign': 'left'
            });
        }
    });

    $('.align-center').click(function (e) {
        Cookies.set('reader_align', 'justify') ;
        $(this).addClass('active');
        $('.align-left').removeClass('active');
        if ($(this).hasClass('active')) {
            $('.reader-content_container').css({
                'textAlign': 'justify'
            });
        }
    });
    // ------ выравнивание текста end

    // межстрочное растояние start
    let lhSm = $('.lh-sm');
    let lhMd = $('.lh-md');
    let lhLg = $('.lh-lg');

    lhSm.click(function (e) {
        Cookies.set('reader_lineHeight', '1.4') ;
        $(this).addClass('active');
        $('.lh-md, .lh-lg').removeClass('active');
        $('.reader-content_container').css({
            'lineHeight': '1.4'
        });
    });

    lhMd.click(function (e) {
        Cookies.set('reader_lineHeight', '1.6') ;
        $(this).addClass('active');
        $('.lh-sm, .lh-lg').removeClass('active');
        $('.reader-content_container').css({
            'lineHeight': '1.6'
        });
    });

    lhLg.click(function (e) {
        Cookies.set('reader_lineHeight', '1.8') ;
        $(this).addClass('active');
        $('.lh-sm, .lh-md').removeClass('active');
        $('.reader-content_container').css({
            'lineHeight': '1.8'
        });
    });

    // Изменение размера шрифта
    let fzPlus = $('.fz-plus');
    let fzMinus = $('.fz-minus');
    let fzMin = 14;

    fzPlus.click(function (e) {
        fzMin++;
        Cookies.set('reader_fontSize', fzMin) ;
        $('.reader-content_container, .reader-content_container p').css('fontSize', fzMin + 'px');
        fzMinus.removeAttr('disabled');
        if (fzMin >= 24) {
            $(this).attr('disabled', 'disabled');
        }
    });

    fzMinus.click(function (e) {
        fzMin--;
        Cookies.set('reader_fontSize', fzMin) ;
        $('.reader-content_container, .reader-content_container p').css('fontSize', fzMin + 'px');
        fzPlus.removeAttr('disabled');
        if (fzMin <= 14) {
            $(this).attr('disabled', 'disabled');
        }
    });

    // Изменение семейства шрифтов.
    $('.font-carousel').carousel({
        interval: false
    });

    let fontCarousel = $('.font-carousel');
    let slideCarousel = function () {


        let index = $('.carousel-item.active', fontCarousel).index() + 1;
        if (index === 1) {
            $('.reader-content_container').css('fontFamily', 'Montserrat_regular');
        }
        /*
        else if (index === 2) {
            $('.reader-content_container').css('fontFamily', 'proxima_regular');
            
        }
        else if (index === 3) {
            $('.reader-content_container').css('fontFamily', 'AdelleCyrillic');
            
        }
        */
        else if (index === 2) {
            
            $('.reader-content_container').css('fontFamily', 'Open Sans');
            
        }
        else if (index === 3) {
            $('.reader-content_container').css('fontFamily', 'RobotoSlab_regular');
            
        }

        //устанавливаем дефолтные настройки ридера
        var reader_scheme = Cookies.get('reader_scheme') ;
        if(reader_scheme) $('body').addClass(reader_scheme) ;

        var reader_align = Cookies.get('reader_align') ;
        if(reader_align) {

            if(reader_align == 'justify') {
                $('.settings-data-box .align-text .align-left').removeClass('active') ;
                $('.settings-data-box .align-text .align-center').addClass('active') ;
            }
            $('.reader-content_container').css('textAlign', reader_align);

        }

        var reader_lineHeight = Cookies.get('reader_lineHeight') ;
        if(reader_lineHeight) {

            if(reader_lineHeight != '1.4') $('.settings-data-box .lh-sm').removeClass('active') ;
            if(reader_lineHeight == '1.6') $('.settings-data-box .lh-md').addClass('active') ;
            if(reader_lineHeight == '1.8') $('.settings-data-box .lh-lg').addClass('active') ;
            $('.reader-content_container, .reader-content, .reader-content_container p, .reader-content p').css('lineHeight', reader_lineHeight+'!important');

        }

        var reader_fontSize = Cookies.get('reader_fontSize') ;
        if(reader_fontSize) {

            $('.reader-content_container, .reader-content_container p').css('fontSize', reader_fontSize + 'px');

        }

        var reader_fontFamili = Cookies.get('reader_fontFamili') ;
        if(reader_fontFamili) {

            if(reader_fontFamili != 'Montserrat_regular' && reader_fontFamili != 'Open Sans' && reader_fontFamili != 'RobotoSlab_regular') reader_fontFamili = 'Montserrat_regular' ;
            $('.reader-content_container').css('fontFamily', reader_fontFamili);

        }

    }

    fontCarousel.on('slid.bs.carousel', slideCarousel).trigger('slid.bs.carousel');

    $('.carousel-indicators li').click(function () {
        var index = $(this).attr('data-slide-to') ;
        if(index == 0) Cookies.set('reader_fontFamili', 'Montserrat_regular') ;
        if(index == 1) Cookies.set('reader_fontFamili', 'Open Sans') ;
        if(index == 2) Cookies.set('reader_fontFamili', 'RobotoSlab_regular') ;
    });


    // смена цветовой схемы
    $('.dark-scheme_btn').click(function () {
        $('body').removeClass('default sepia').addClass('dark');
        Cookies.set('reader_scheme', 'dark') ;
    });
    $('.white-scheme_btn').click(function () {
        $('body').removeClass('dark sepia').addClass('default');
        Cookies.set('reader_scheme', 'default') ;
    });
    $('.sepia-scheme_btn').click(function () {
        $('body').removeClass('dark default').addClass('sepia');
        Cookies.set('reader_scheme', 'sepia') ;
    });

    // содержание в читалке
    $('.show-chapters_btn').click(function (e) {
        $('.chapters-box').slideDown(300);
        $('.settings-data').fadeOut(300);
        $('.reader-section_list').hide(300);
    });
    $('.chapters-box .close').click(function (e) {
        $('.chapters-box').slideUp(300);
    });

    // reader fullscreen
    document.addEventListener('click', function (e) {

        if (!e.target.hasAttribute('data-toggle-fullscreen')) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }

        


    }, false);

    // show single page in reader
    $('.single-page_btn').click(function(e) {
        $('.reader-content_container').toggleClass('single');
        if($('.reader-content_container').hasClass('single')) Cookies.set('reader_single', 'single') ;
        else Cookies.set('reader_single', '') ;
    });

    var reader_single = Cookies.get('reader_single') ;
    if(reader_single == 'single') $('.reader-content_container').addClass('single');

    // authors list
    /*
    let letterStr = $('.alphabet-list li a').not('.all-authors_link');
    let headerText = $('.alphabet-header');

    letterStr.click(function (e) {
        e.preventDefault();
        let text = $(this).text();
        headerText.text('Выбран автор на букву' + ' ' + '"' + text.toUpperCase() + '"');
    });

    $('.all-authors_link').click(function (e) {
        e.preventDefault();
        headerText.text('Авторы')
    });
    */


    // кнопка наверх
    let upBtn = $('.up_btn');
    let upBtnHeader = $('.up_btn-header');

    $(window).scroll(function(e) {

        if ($(this).scrollTop() >= 100) {
            upBtn.fadeIn('slow');
        } else {
            upBtn.fadeOut(0);
        }

        if($(window).width() <= 768) {
            $('.up_btn-header').hide();
        }
    });

    upBtn.click(function(e) {
        $('html, body').animate({
            scrollTop: 0
        }, 500)
    });
    upBtnHeader.click(function(e) {
        $('html, body').animate({
            scrollTop: 0
        }, 500)
    });


    // my rewards

    let menuItem = $('.rewards_list_content li');

    $('.reward_item_content').hide();

    function toggleReward(element) {
        if($(element).hasClass('active')) {
            closeReward(element);
        }
        else{
            openReward(element);
        }
    }

    function openReward(element) {
        $(element).addClass('active');
        $(element).children('.reward_item_content').delay(150).slideDown(200);
    }
    
    function closeReward(element) {
        setTimeout(function() {
            $(element).removeClass('active');
        }, 400);

        $(element).children('.reward_item_content').delay(150).slideUp(200);
    }

    menuItem.click(function(e) {
        closeReward($('.rewards_list_content_item.active'));
        toggleReward(this);
        e.stopPropagation();
    });

    $(document).click(function(event) {
        if($(event.target).hasClass('rewards_list_content_item'))
            return;

        closeReward($('.rewards_list_content_item'));
    })


    // book shops
    $('.buy_book_btn').click(function() {
        $(this).toggleClass('active');
    })

});


// Новый ползунок



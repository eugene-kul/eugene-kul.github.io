function copyToClipboard(id) {

    /* Get the text field */
    var copyText = document.getElementById(id) ;

    /* Select the text field */
    copyText.select() ;

    /* Copy the text inside the text field */
    document.execCommand("copy") ;

}

function sklonenie(n, text_forms) {  
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}
function show_register_or_login(type) {

    $('#reg-modal #action_login').val(type) ;
    $('#form_authorization .hide_after2').hide() ;
    $('#form_authorization .hide_after').show() ;
    
    $('#reg-modal .reg-modal_btns, #reg-modal .sep, #reg-modal .log_ac').show() ;
    $('#reg-modal .bulks').hide() ;

    if(type == 'reset') {

        $('#reg-modal .action-list .registration-item, #reg-modal .action-list .login-item').removeClass('active') ;
        $('#reg-modal .log_ac, #reg-modal .reg_ac').css('display', 'block');
        $('#reg-modal .reset-pass').css('display', 'none');
        $('#reg-modal .dop_pass, #reg-modal .dop_pass1').hide() ;
        $('#reg-modal .reg-modal_btns, #reg-modal .sep, #reg-modal .log_ac').hide() ;
        $('#reg-modal .bulks').show() ;
        $('#reg-modal .submit').val('Сбросить пароль') ;
        $('#reg-modal .reset-pass_modal_tip').show() ;
        $('#reg-modal .registration_socmedia_data').hide() ;

    }

    if(type == 'login') {

        $('#reg-modal .action-list .registration-item').removeClass('active') ;
        $('#reg-modal .action-list .login-item').addClass('active') ;
        $('#reg-modal .log_ac').hide() ;
        $('#reg-modal .reg_ac').css('display', 'block');
        $('#reg-modal .reset-pass').css('display', 'block');
        $('#reg-modal .dop_pass1').show() ;
        $('#reg-modal .dop_pass').hide() ;
        $('#reg-modal .submit').val('Вход') ;
        $('#reg-modal .reset-pass_modal_tip').hide() ;
        $('#reg-modal .registration_socmedia_data').hide() ;

    }

    if(type == 'register') {

        $('#reg-modal .action-list .registration-item').addClass('active') ;
        $('#reg-modal .action-list .login-item').removeClass('active') ;
        $('#reg-modal .log_ac').css('display', 'block');
        $('#reg-modal .reg_ac').hide() ;
        $('#reg-modal .reset-pass').hide() ;
        $('#reg-modal .dop_pass1').css('display', 'block');
        $('#reg-modal .dop_pass').css('display', 'block');
        $('#reg-modal .submit').val('Подтвердить') ;
        $('#reg-modal .reset-pass_modal_tip').hide() ;
        $('#reg-modal .registration_socmedia_data').show() ;

    }

}

function urlLit(w,v) {
    var tr='a b v g d e j z i y k l m n o p r s t u f h c ch sh ~ y ~ e yu ya ~ jo'.split(' ');
    var ww=''; w=w.toLowerCase();
    for(i=0; i<w.length; ++i) {
    cc=w.charCodeAt(i); ch=(cc>=1072?tr[cc-1072]:w[i]);
    if(ch){ if(ch.length<3) ww+=ch; else ww+=eval(ch)[v];} }
    return(ww.replace(/[^a-zA-Z0-9\-]/g,'-').replace(/[-]{2,}/gim, '-').replace( /^\-+/g, '').replace( /\-+$/g, ''));
}

function check_duplicate_b() {

    var numberOfChecked = $('.check_dupl_b:checked').length ;
    var array = [] ;
    if(numberOfChecked == 2) {

        $('.check_dupl_b').each(function () {

            if (!this.checked) $(this).prop('disabled', true) ;
            else {

                array.push($(this).val()) ;

            }

        });  
        $('body').append('<div style="position:fixed;bottom:250px;left:50px" class="form_add_a_b dupl_btn_b"><a href="/admin/duplicates/books?id1='+array[0]+'&id2='+array[1]+'" target="_blank" class="btn1" title="">Объединить книги</a></div>') ;    

    } else {

        $('.dupl_btn_b').hide() ;
        $('.check_dupl_b').prop('disabled', false) ;

    }

}
function check_duplicate() {

    var numberOfChecked = $('.check_dupl:checked').length ;
    var array = [] ;
    if(numberOfChecked == 2) {

        $('.check_dupl').each(function () {

            if (!this.checked) $(this).prop('disabled', true) ;
            else {

                array.push($(this).val()) ;

            }

        });  
        $('body').append('<div style="position:fixed;bottom:200px;left:50px" class="form_add_a_b dupl_btn"><a href="/admin/duplicates/authors?id1='+array[0]+'&id2='+array[1]+'" target="_blank" class="btn1" title="">Объединить авторов</a></div>') ;    

    } else {

        $('.dupl_btn').hide() ;
        $('.check_dupl').prop('disabled', false) ;

    }

}
function infowindow(text) {

    setTimeout(function() {$('.infowindow').html(text).fadeIn() ;}, 1000) ;
    setTimeout(function() { $('.infowindow').fadeOut('slow') ; }, 2000) ;

}
function change_url(page) {

    var url = $(location).attr("href") ;
    if(url.indexOf('/page-') + 1) {

        url = url.replace(/\/page-\d+/gi, "\/page-"+page) ;

    } else if(url.indexOf('?') + 1)    {

        url = url.replace(/\?+/gi, "\/page-"+page+"?") ;

    } else {

        url = url + '/page-'+page ;

    }
    window.history.pushState(null, null, url) ;
                
    $('.page-list .active_item').removeClass('active_item') ;
    $('.page-list .page-'+page).addClass('active_item') ;

}

function order_filter(form_id, asc_desc) {

    $('#'+form_id).find('input[name="order"]').val(asc_desc) ;
    $('#'+form_id).submit() ;

}

function change_user_avatar(mes) {

    $('#user_avatar').attr('src', 'https://knigogid.ru/uploads/users/'+mes.file_200_300) ;
    $('.already_login-box .user_item-avatar, .already_login-box .user_menu-avatar').attr('src', '/uploads/users/'+mes.file_42_42) ;

    if($('.remove_avatar_btn')) $('.remove_avatar_btn').show() ;
    if($('#avatar_user')) $('#avatar_user').val(mes.file_default) ;

}

function load_book_file_user(mes) {

    if(mes.ext) $('.loaded_book').html('Загружена книга в формате <a target="_blank" href="/uploads/books/'+mes.ext+'/'+mes.path+''+mes.filename_default+'" title="">'+mes.ext+'</a>') ;

}

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function load_book_file(mes) {

    window.location.reload() ;

}

function load_image(mes) {

    if(mes.type == 'book_image') {

        $('.book_image').attr('src', '/storage/books/'+mes.file_default) ;
        $('#poster_book').val(mes.file_default) ;

    }

    if(mes.type == 'award_image') {

        $('.book_image').attr('src', '/storage/awards/'+mes.file_default) ;
        $('#poster_book').val(mes.file_default) ;

    }

    if(mes.type == 'author_image') {

        $('.book_image').attr('src', '/storage/authors/'+mes.file_default) ;
        $('#poster_book').val(mes.file_default) ;

    }

    else if(mes.type == 'collection_image') {

        $('.book_image').attr('src', '/uploads/posters/collections/'+mes.file_default) ;
        $('#poster_book').val(mes.file_default) ;

    }

}

function font_size(action, div) {

    var size = parseInt($(div).css('font-size')) ;
    if(action == 'plus' && size <= 26) size++ ;
    else if(action == 'plus' && size > 26) size = 16 ;
    else if(action == 'minus' && size < 12) size = 16 ;
    else size-- ;
    $(div).css('font-size', size+'px') ;
    Cookies.set('book_text_size', size) ;

}
function background_color(background, color, div) {

    $(div).css('background', background) ;
    $(div).css('color', color) ;
    Cookies.set('book_text_background', background) ;
    Cookies.set('book_text_color', color) ;

}

function standart_settings_toread(div, div2) {

    $(div).css('font-size', '16px') ;
    Cookies.set('book_text_size', 16) ;

    $(div2).css('background', '#fffff8') ;
    $(div2).css('color', '#1a3d52') ;
    Cookies.set('book_text_background', '#fffff8') ;
    Cookies.set('book_text_color', '#1a3d52') ;

}

function generatePassword( len ) {
    var pwd = [], cc = String.fromCharCode, R = Math.random, rnd, i;
    pwd.push( cc( 48 + (0 | R() * 10) ) );
    pwd.push( cc( 65 + (0 | R() * 26) ) );

    for( i = 2; i < len; i++ ){
        rnd = 0 | R() * 62;
        pwd.push( cc( 48 + rnd + (rnd > 9 ? 7 : 0) + (rnd > 35 ? 6 : 0) ) );
    }

    return pwd.sort( function(){
        return R() - .5;
    } ).join( '' );
}
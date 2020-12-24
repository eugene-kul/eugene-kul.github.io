//forms=======
//placeholder====================================
function forms(){
	$('input, textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).next().addClass('active');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){$(this).attr('type', 'password');};
			$(this).val('');
		};
	});
	$('input[data-value], textarea[data-value]').each(function(){
		if(this.value == '' || this.value == $(this).attr('data-value')){
			if($(this).hasClass('1') && $(this).parent().find('.form__label').lenght==0){$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');}
			else{this.value = $(this).attr('data-value');}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).next().addClass('active');
			$(this).parent().addClass('focus');
			if($(this).hasClass('1') && $(this).parent().find('.form__label').lenght==0){$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');}
		}
		$(this).click(function(){
			if(this.value == $(this).attr('data-value')){
				if($(this).attr('data-type')=='pass'){$(this).attr('type', 'passward');};
				this.value = '';
			};
		});
		$(this).blur(function(){
			if(this.value == ''){
				if(!$(this).hasClass('1')){this.value = $(this).attr('data-value');}
			$(this).removeClass('focus');
			$(this).next().removeClass('active');
			$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){$(this).attr('type','text');};
			};
		});
	});
	 $('.btn-clear').click(function() {
		$(this).removeClass('active');
		$(this).prev().val($(this).prev().attr('data-value')).removeClass('focus');
		if($(this).prev().attr('data-type')=='pass'){$(this).prev().attr('type','text');};
	})
}
forms();
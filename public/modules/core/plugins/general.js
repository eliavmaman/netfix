$(document).ready(function () {
	$('.dropM').hide();
	$('.drop').hover (function () {
		$('.dropM').slideDown();
	});
	$('.drop').mouseleave (function () {
		$('.dropM').fadeOut();
	});
	
	/*IE Fixes */
	if($.browser.msie && $.browser.version == 7){
		$('#menu ul.dropM').css({'margin': '39px -104px 0px 0px'});
	}
	
	if($.browser.msie){
		$('input[type="text"]').css({'line-height': '39px'});
	}
	
}); 


 $(function() {
	if(!$.support.placeholder) { 
		var active = document.activeElement;
		$(':text').focus(function () {
			if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
				$(this).val('').removeClass('hasPlaceholder');
			}
		}).blur(function () {
			if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
				$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
			}
		});
		$(':text').blur();
		$(active).focus();
		$('form').submit(function () {
			$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
		});
	}
});
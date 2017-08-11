jQuery(document).ready(function(){

	$('a.reg-btn').click(function(){
        $('p#email').html('');
		var email = $('input#email').val();
		if (email != '') {
            var result = ajax_query({prefix: 'admin', handler: 'reset_password', data: email}, 'reset-password', 'json');
			console.log(result);
			if (result.result == true) {
                $('#enter-email').hide();
    			$('#done').show();
				setNotice({
					result: true,
					notice: `${result.notice}: ${email}.`
				}, function() {
					window.location.reload();
				});
    		} else
                {
					$(document).addNotify(result.notice);
				}
        } else
			$(document).addNotify('Введите почту.');

        return false;
	});
});

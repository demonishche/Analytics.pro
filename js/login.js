$(document).ready(function() {
    function auth(){
        var arrayData = {};
        $('.error').html('');
        $('.forms input').each(function() {
            var input = $(this);
            arrayData[input.attr('name')] = input.val();
        });
        var result = ajax_query({prefix:'', handler : 'login', data : JSON.stringify(arrayData)}, 'login', 'json');
        if (result.result == false) {
            if(result.errorCode == 2) {
                $('section.forms').empty().html('<center><b  style="color:#dd4747;font-weight:bold;">Ваш аккаунт заблокирован!</b><br/>Обратитесь в службу поддержки!</center>');
                $('div.enter-button').remove();
            } else
                $('.error').html('Неверные данные для авторизации');

                //return false;
        } else
            location.reload();
    }

    $(document).on('click', '.signin', function() {
        auth();
    });

    $('input#current').keyup(function(e) {
        if(e.keyCode == 13){
            auth();
        }
    });

    //Проверка почты
    jQuery('input[type="email"]').focusout(function() {
        var email = $(this).val();
        var id = $(this).attr('id');

        if ( $(this).val().length >= 1 ){
            if(isValidEmailAddress(email)) {
                $(this).removeClass('input-error');
                $('p[id="'+id+'"]').html("");
            } else {
                $(this).addClass('input-error');
                $('p[id="'+id+'"]').html("Неверная формулировка email");
            }
        } else {
            $(this).removeClass('input-error');
            $('p[id="'+id+'"]').html("");
        }
    });

    //Функция валидации email
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }
});

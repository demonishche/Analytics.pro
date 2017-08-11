$(document).ready(function() {

  var unicity = new Array();
   var item = {
        name : 'email',
        message : 'Пользователь с таким E-mail уже существует.',
        action : 'is_email_exists',
        page : 'register'
   };
   unicity.push(item);
   var item = {
        name : 'login',
        message : 'Пользователь с таким логином уже существует.',
        action : 'is_login_exists',
        page : 'register'
   };
   unicity.push(item);

   var params = {
       errorInputStyle : 'input-error',
       checkUnicity : unicity,
       successInputStyle: 'success'
   }

  //потеря фокуса с инпутов
   $(document).on('blur', 'section.forms .form-group input', function() {
        var object = $(this);
        object.checkInput(params);
   });

  $(document).on('keyup', 'input', function(e) {
        var object = $(this);
        if ((e.keyCode == 13)) {
            object.checkInput(params);
            if ($(this).attr('id') != 'repeat')
                $(this).parent().nextAll('.form-group').first().find('input').focus();
            else $(this).trigger('blur');
        }
   });

  $('.register-button').click(function() {
    result = 0;
    result = $('section.forms .form-group').checkInput('checkAll', params);
    check  = result.result;

    //проверка подтверждения соглашения
    if ($('input#check').prop('checked') == false)
    {
        addError($('input#check'), 'Ознакомтесь с условиями предоставления услуг');
        check = false;
    }
    else
    {
        deleteError($('input#check'))
    }
    if (check)
    {
       var register = ajax_query({handler : 'new_user', data : result.data}, 'register', 'json');
       if (register.result == true) {
            window.location.href = '/login';
       } else {
            console.log(register.notice);
          }

    }
  });
});

//сбрасывание ошибок
function deleteError(object)
{
    var id = object.attr('id');
    $('p#'+id+'').html('');
    object.removeClass('input-error');
}

//создание новой ошибки
function addError(object, message)
{
    var id = object.attr('id');
    $('p#'+id+'').html(message);
    object.removeClass('success').addClass('input-error');
}

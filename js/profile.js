$(document).ready(function() {
  $('.save-pass').click(function() {
    var unicity = new Array();
     var item = {
          name : 'current',
          message : 'Неверный пароль',
          action : 'is_user_exists',
          page : 'profile'
        };
     unicity.push(item);
     var params = {
         errorInputStyle : '',
         checkUnicity : unicity,
         successInputStyle: 'input-success'
     }
    var res = $('.password-block').checkInput('checkAll', params);

    if(res.result == true){
      var data = {new_password: $('input[name='new']').val()};
        result = ajax_query({handler: 'set_user_password', data}, 'profile', 'json');

        if(result.result == true){
            setNotice({
                result: true,
                notice: 'Ваш пароль успешно изменен.'
            }, function() {
                window.location.reload();
            });
        } else {
          $(document).addNotify('Ошибка изменения пароля.');
        }
    }
  });

  $('.save-email').click(function () {
    var object = $('input[name='email']');
    var unicity = new Array();
     var item = {
          name : 'email',
          message : 'Пользователь с таким E-mail уже существует.',
          action : 'is_email_exists',
          page : 'profile'
     };
     unicity.push(item);
     var params = {
         errorInputStyle : 'input-error',
         checkUnicity : unicity,
         successInputStyle: 'input-success'
     }
     var res = object.checkInput(params);
    if(res){
      var data = {email: object.val()};
      result = ajax_query({handler: 'set_user_email', data}, 'profile', 'json');
      if(result.result == true){
        setNotice({
            result: true,
            notice: 'Ваша электронная почта успешно изменена.'
        }, function() {
            window.location.reload();
        });
      } else
        $(document).addNotify('Ошибка изменения электронной почты.');
    }
  });
});

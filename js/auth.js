$(document).ready(function() {

    //Отображение кнопки Показать/Скрыть пароль
  jQuery('input[type='password']').keyup(function() {
    var id = $(this).attr('id');
    var block = $(this).parent().parent();
        if ( $(this).val().length > 0 )
            block.find('.show-pass[id=''+id+'']').show();
        else
            block.find('.show-pass[id=''+id+'']').hide();
    });

//Действия по нажатию на Показать/Скрыть пароль
  jQuery('.show-pass').click(function() {
    var txt = $(this).attr('id');
    var inpt = $('input[id=''+txt+'']');
      if ( inpt.attr('type') == 'password') {
          inpt.attr('type','text');
          $(this).html('Скрыть');
      } else {
          inpt.attr('type','password');
          $(this).html('Показать');
      }
  });
});

$(document).ready(function() {
  var page_name=getPagename();
  $('.menu-links a[href="/'+page_name+'"] li').addClass('li-active');

  //Появление флажков
  $(document).on('click', '.show-more', function() {
      var pos = $(this).offset();
      $('.flag').fadeIn('fast');
      var pos = $(this).offset();
      var screen_width = window.innerWidth;
      $('.flag').offset({
          top: pos.top,
          left: pos.left - 120
      });
  });


  //Закрытие флага
  $(document).click(function(event) {
      var flag = $('.flag');
      if (flag.has(event.target).length === 0 && !$(event.target).closest(".show-more").length) {
          flag.fadeOut('fast');
      }
  });

  //Открытие модалки удаления
  $(document).on('click','#delete' ,function() {
      $('.modal-block-delete')
          .css("display", "flex")
          .hide()
          .fadeIn();
  });

  //Открытие модалки изменения имени
  $(document).on('click', '#change_name', function() {
      $('.modal-change-name')
          .css("display", "flex")
          .hide()
          .fadeIn();
  });

  //Закрытие модального окна
  $('.modal-block .close-icon').click(function() {
      $('.modal-block').fadeOut();
  });

  //Закрытие при нажатии за пределами модального окна
  $('.modal-block').click(function(e) {
      if (e.target !== this) return;
        $('.modal-block').fadeOut();
  });

//Отображение кнопки Показать/Скрыть пароль
  jQuery('input[type="password"]').keyup(function() {
    var id = $(this).attr('id');
    var block = $(this).parent().parent();
        if ( $(this).val().length > 0 )
            block.find('.show-pass[id="'+id+'"]').show();
        else
            block.find('.show-pass[id="'+id+'"]').hide();
    });

//Действия по нажатию на Показать/Скрыть пароль
  jQuery('.show-pass').click(function() {
    var txt = $(this).attr('id');
    var inpt = $('input[id="'+txt+'"]');
      if ( inpt.attr('type') == 'password') {
          inpt.attr("type", "text");
          $(this).html('Скрыть');
      } else {
          inpt.attr("type", "password");
          $(this).html('Показать');
      }
  });

    //Функция валидации email
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }

    // $('.favorite.not-checked').hover(function() {
    //     $(this).html('<i class="fa fa-star" aria-hidden="true"></i>');
    // }, function() {
    //     $(this).html('<i class="fa fa-star-o" aria-hidden="true"></i>');
    // })
    //
    // $('.favorite.checked').hover(function() {
    //     $(this).html('<i class="fa fa-star-o" aria-hidden="true"></i>');
    // }, function() {
    //     $(this).html('<i class="fa fa-star" aria-hidden="true"></i>');
    // })

    $(document).on('click', '.favorite.not-checked', function() {
        var type = $(this).attr('data-fav-type'),
            id = $(this).attr('data-elem-id');

        res = ajax_query({
            handler: 'add_to_fav',
            data: {type, id}
        }, 'cab', 'json');

        if (res) {
            $(this).removeClass('not-checked');
            $(this).addClass('checked');
            $(this).html('<i class="fa fa-star" aria-hidden="true"></i>');
        }
    });

    $(document).on('click', '.favorite.checked', function() {
        var type = $(this).attr('data-fav-type'),
            id = $(this).attr('data-elem-id');

        res = ajax_query({
            handler: 'del_from_fav',
            data: {type, id}
        }, 'cab', 'json');

        if (res) {
            $(this).addClass('not-checked');
            $(this).removeClass('checked');
            $(this).html('<i class="fa fa-star-o" aria-hidden="true"></i>');
        }
    });
});

function getFavData(type) {
    var res = ajax_query({
        handler: 'get_from_fav',
        data: {type}
    }, 'cab', 'json');

    res.forEach(function(item) {
        $(`.favorite[data-elem-id="${item.data_id}"]`).removeClass('not-checked');
        $(`.favorite[data-elem-id="${item.data_id}"]`).addClass('checked');
        $(`.favorite[data-elem-id="${item.data_id}"]`).html('<i class="fa fa-star" aria-hidden="true"></i>');
    });
}

//проверка на целое число
function isInt(num) {
    if (num.indexOf(",") == -1 && num.indexOf(".") == -1)
        return true;
    else return false;
}

//перевод строк в числа
function parseNum(type, num) {
    var result = 0;
    switch (type) {
        case "INT":
            result = parseInt(num);
            break;
        case "DOUBLE":
            result = parseFloat(num);
            break;
    }
    return result;
}

function getUrlVars() {
	    var vars = {};
	    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}

function setOnlyPagenameUrl() {
  var pagename = getPagename();
  history.replaceState('', null, "/" + pagename);
}

//вставка времени в дату
function setTimeToDate(date, time) {
    if (time !== undefined) {
        date.setHours(time.substring(0, 2));
        date.setMinutes(time.substring(3));
        return date;
    }
    return date;
}

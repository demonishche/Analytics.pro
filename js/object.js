$(document).ready(function() {
    dataFieldArray = new Array(); //поля объекта
    object_id = 0;
    object_name = "";
    date_limit = 0; //максимальная и минимальная дата
    //шаблон данных для таблицы
    data_template = "<td class='row_time'>{{LOOP_VAR:ROW_TIME}}<span style='display: none;'>{{LOOP_VAR:TIMESTAMP}}</span></td>";
    field_count = 0;
    empty_object_data = true;
    obj_type = "simple";
    complex_object_row_template = "";
    obj_data = {};
    summ_results = [];
    sort_search = {search_param : {obj_id: object_id},
                    order_by: 'row_time',
                    order_method: 'DESC',
                    page_num: 1,
                    max_row: 10};
    removed_data_id = [];

    //выделение пункта меню
    $('.menu-links a[href="/cab/data"] li').addClass('li-active');


    //вызов функций для загрузки данных
    init();

    //загрузка имени объекта
    $('.object-name h4').html(object_name);

    if (!empty_object_data) {

        //установка времени для графика
        dateInst(date_limit);

        //прорисовка графика
        chart.buildChart(obj_type);

        $('.results-table').show();
        $('.config-bar, .result-nav').css('display', 'flex');

        //увеличение графика
        $(document).on('click', '.zoom-chart-button', function() {
            $('.zoom-chart')
                .css("display", "flex")
                .hide()
                .fadeIn();
            chart.drawBigChart();
        });

        //открытие поиска
        $(document).on('click', '.open-search', function() {
            $('.search-data')
                .css("display", "flex")
                .hide()
                .show("slow");
            $(this).hide();
            $('.close-search').show();
        });

        //закрытие поиска
        $(document).on('click', '.close-search', function() {
            $('.search-data').hide("slow");
            $(this).hide();
            $('.open-search').show();
        });

        //смена критерия поиска
        $(document).on('change', '.search-data .chart-data select', function() {
            var search_id = $('.search-data .chart-data option:selected').val();
            $('input.search').hide();
            if (search_id == 0) $('input#date-search').show();
            else $('input#num-search').show();
            makeTableComplexFormat();
        });

        //смена количества отображаемых данных на одной странице
        $(document).on('keyup', '.data-count input', function(e) {
            if (e.keyCode == 13) {
                var count = parseInt($(this).val());
                sort_search.max_row = count;
                insert_sorted_data();
                if ($('.check-general-data').prop('checked'))
                    makeTableComplexFormat();
            }
        });

    }

    setTimeout(
        "$('.load-block').fadeOut()", 1500);

    //удаление при перезагрузке
    $(window).bind('beforeunload', function(e) {
        removeAllData();
    });

    //удаление при перезагрузке
    $(window).on('beforeunload', function(e) {
        removeAllData();
    });

    //выбор типа сложного объекта при добалении
    $('.type-of-complex-object input').change(function() {
      if ($(this).is(':checked')) {
        $('.one-date-block').slideDown();
        $('.complex-object-data tbody tr td[data-object-data-id="row_time"]').remove();
        $('.complex-object-data thead tr th:first-child').remove();
        resizeComplexModalBlock(0, true);
        return;
      }

      var date_block = "<td style='min-width: 210px;' data-object-data-id='row_time'><input class='input date-block-date' type='text' /><input class='input date-block-time' type='time' /></td>";
      $('.one-date-block').slideUp();
      $('.complex-object-data thead tr').prepend("<th>Дата</th>");
      $('.complex-object-data tbody tr').each(function() {
          $(this).prepend(date_block);
      });
      $('.date-block-date').datepicker();
      setDateToInput($('.date-block-date'), 0)
      setTimeToObject($('.date-block-time'), 0)
      resizeComplexModalBlock(150, true);
    });

    //добавление поля при добавлени данных
    $('.add-object-field i').click(function() {
      var date_block = "<td style='min-width: 300px;' data-object-data-id='row_time'><input class='input date-block-date' type='text' /><input class='input date-block-time' type='time' /></td>";
      if ($('.type-of-complex-object input').is(':checked')) {
        $('.complex-object-data tbody').append('<tr>' + complex_object_row_template + '</tr>');
        return;
      }
      $('.complex-object-data tbody').append('<tr>' + date_block + complex_object_row_template + '</tr>');
      $('.date-block-date').datepicker();
    });

    //удаление строк в добавлении
    $(document).on('click', '.complex-object-data .remove_row', function() {
      $(this).parents('tr').remove();
    });

    $('.check-all-block .check-all').change(function() {
        if ($(this).is(':checked')) {
            $('.check-row').prop('checked', true);
            return;
        }

        $('.check-row').prop('checked', false);
    });

    $(document).on('click', '.paginator-buttons button', function() {
        sort_search.page_num = $(this).attr('name');
        insert_sorted_data();
        if ($('.check-general-data').prop('checked'))
            makeTableComplexFormat();
    });

    $(document).on('click', '.build-chart', function() {
        chart.buildChart(obj_type);
    });

    $(document).on('click', '.redact-data', function() {
        var parent = $(this).parents('tr'),
            id = parent.attr('data-row-id'),
            data = {};
        dataFieldArray.forEach(function(item, index) {
            if (item.count_operation.length == 0)
                data['fid' + item.field_id] = parent.find('td.fid' + item.field_id).html();
        });
        $('.complex-object-data-redact').attr('data-row-id', id);
        showModalRedact(data);
    });
});

function removeNullInNumber(num) {
    var last_elem = num.toString().slice(num.length - 1);
    if (last_elem == "0" || last_elem == ".") {
        num = parseFloat(num.slice(0, num.length - 1));
        return removeNullInNumber(num);
    }
    else return num;
}

function resizeComplexModalBlock(plus, animate) {
    var field_count = $('.complex-object-data thead th').length;
    if (field_count > 2) {
      var width = plus + field_count*150;
      if (animate)
        $('.modal-block-add-object > div').animate({width: width + 'px'}, "slow");
      else
        $('.modal-block-add-object > div ').css('width', width + 'px');
    }
}

function showModalAdd() {
    makeComplexDataFormat();
    if ($('.complex-object-data tbody tr').length == 0)
        $('.add-object-field i').trigger("click");
    resizeComplexModalBlock(0, false);
    $('.modal-block-add-object').fadeIn().css('display', 'flex');
    $('.add-object-data a').removeClass('empty-block-button');
    $('#object-data-date').datepicker();
    setDateToInput($('#object-data-date'));

    var
        hour = 0;
    minute = 0;
    hour = new Date().getHours();
    minute = new Date().getMinutes();

    if (hour.toString().length == 1)
        hour = "0" + hour;
    if (minute.toString().length == 1)
        minute = "0" + minute;

    $('.object-data-item input[type="time"]').val(hour + ":" + minute);
}

function showModalRedact(redact_data) {
    $('.modal-block-redact-object').fadeIn().css('display', 'flex');
    var template = $("<tr>" + complex_object_row_template + "</tr>");
    template.find('.remove_row').remove();
    for(key in redact_data) {
        template.find('td[data-object-data-id="' + key + '"] input').val(redact_data[key]);
    }
    $('.complex-object-data-redact tbody').html(template);
}

function setDateToInput(object = 0, custom_date = 0) {
    var date = new Date();
    if (custom_date != 0)
        date = new Date(custom_date);
    var
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    if (object != 0)
        object.val(day + '.' + month + '.' + year);

    return (day + '.' + month + '.' + year);
}

function removeData(el) {
    var
        colspan = $('.check-general-data').is(':checked') ? field_count : field_count + 1,
        td = '<td class="removed-td" colspan="' + colspan + '">Данные удалены. <span onclick="restoreData(this)">Восстановить.</span></td>',
        parent = $(el).parents("tr"),
        id = parent.attr('data-row-id');
        removed_data_id.push(id);

    parent.addClass("removed");
    parent.append(td);
    parent.find('td').not('.removed-td').hide();
}

function removeDataByGeneralDate(el) {
    var
        date = $(el).parents('tr').find('td:nth-child(2) span:nth-child(2)').html(),
        all_data = get_data_by_param('row_time', date)

        console.log(all_data);
    all_data.forEach(function(item, index) {
        removed_data_id.push(item.row_id);
    });
    checkOnRemoved();
}

function checkOnRemoved() {
    var colspan = $('.check-general-data').is(':checked') ? field_count : field_count + 1,
        td = '<td class="removed-td" colspan="' + colspan + '">Данные удалены. <span onclick="restoreData(this)">Восстановить.</span></td>';
    removed_data_id.forEach(function(item) {
        var parent = $('.data-table tr[data-row-id=' + item + ']');
        if (parent !== undefined) {
            console.log(parent);
            parent.addClass("removed");
            parent.append(td);
            parent.find('td').not('.removed-td').hide();
        }

    });
}

function removeAllData() {
    var result = false;

    if (removed_data_id.length > 0)
        result = ajax_query({
            handler: 'remove_object_data',
            data: {
                object_id,
                data_id: removed_data_id
            }
        }, 'data', 'json');
    return result.result;
}

function restoreData(el) {
    var
        parent = $(el).parents('tr');
        id = parent.attr('data-row-id'),

    removed_data_id.splice(removed_data_id.indexOf(id), 1);
    parent.removeClass("removed");
    parent.find('.removed-td').remove();
    parent.find('td').show();
    if ($('.check-general-data').is(':checked'))
        parent.find('.row_time').hide();
}

function restoreSumm(el) {
    var
        parent = $(el).parents('tr');

    parent.removeClass("removed-summ");
    parent.find('.removed-td').remove();
    parent.find('td').show();
}

//вызов функций загрузки данных
function init() {
    DatepickerSetting();
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    getObjectId();
    sort_search.search_param.obj_id = object_id;
    getObjectById();
    loadFields();

    chart = new Charts(object_id, $('#container2'), dataFieldArray);

    data_template = "{{LOOP:OBJECT_DATA_LIST}}<tr data-row-id='{{LOOP_VAR:ROW_ID}}'><td class='check-row-td'><input class='check-row' type='checkbox' /></td>" + data_template + "<td class='remove'><i class='fa fa-pencil redact-data' aria-hidden='true'></i><i class='fa fa-times' aria-hidden='true' onclick='removeData(this)'></i></td></tr> {{END_LOOP:OBJECT_DATA_LIST}}";
    if (obj_type == 'complex')
        chart.makeComplexFormatOfData();

    if (insert_sorted_data()) {

        if (obj_type == "simple") {
            load_charts_data(0, 0);
            ready_charts_data();
        }
        returnMinMax();
        dataFieldArray.forEach(function(item, index) {
            if (item.field_type == "TEXT") {
                $('.calc-sum-type#3 select, .chart-field-param-setting select').append("<option value='" + item.field_id + "'>" + item.field_name + "</option>");
            }
        });
        $('.empty-block').hide();
        empty_object_data = false;
    } else {
        $('.not-empty-object').hide();
        $('.add-object-data a').addClass('empty-block-button');
    }
}

//сброс настроек сортировки и поиска
function resetSettings() {
    $('.data-count input').val("10");
    $('input#date-search').val("");
    $('input#num-search').val("");
    $('.sort').removeClass('sorted_by');
    $('.data-table thead th[data-object-id="date"]').addClass('sorted_by');
    $('.close-search').trigger('click');
    sort_search = {search_param : {obj_id: object_id},
                    order_by: 'row_time',
                    order_method: 'DESC',
                    page_num: 1,
                    max_row: 10};
    insert_sorted_data();
    if ($('.check-general-data').prop('checked'))
        makeTableComplexFormat();
}

//установка даты и времени
function dateInst(date_limit) {
    $("#datepicker-from").datepicker({
        minDate: new Date(date_limit.min * 1000),
        maxDate: new Date(date_limit.max * 1000)
    });

    setDateToInput($("#datepicker-from"), date_limit.min * 1000);
    //$("#datepicker-from").datepicker("setDate", new Date(date_limit.min * 1000));

    $("#datepicker-to").datepicker({
        minDate: new Date(date_limit.min * 1000),
        maxDate: new Date(date_limit.max * 1000)
    });

    setDateToInput($(".datepicker-to"), date_limit.max * 1000);
    //$(".datepicker-to").datepicker("setDate", new Date(date_limit.max * 1000));

    $("#date-search").datepicker({
        minDate: new Date(date_limit.min * 1000),
        maxDate: new Date(date_limit.max * 1000)
    });

    $('.calc-sum-from, .calc-sum-to').datepicker();
    setDateToInput($('.calc-sum-from'), date_limit.min * 1000);
    setDateToInput($('.calc-sum-to'), date_limit.max * 1000);

    setTimeToObject($('.calc-sum-time-from'), date_limit.min);
    setTimeToObject($('.calc-sum-time-to'), date_limit.max);
    setTime();
    // $(".datepicker-to").datepicker("show");
    // $(".datepicker-to").datepicker("hide");
}

//добавление данных в объект
function addData() {
    var
        result = false;
    urlData = getUrlVars();
    obj_id = urlData['id'];

    //if (obj_type == "complex") {
      getComplexData();
      //return;
    //}

    //getData(obj_id);

    $('.complex-object-data tbody tr').remove();
}

//сортировка данных
function sort(el) {
    var
        id = $(el).parent().attr('data-object-id');
    method = "ASC";
    if ($(el).hasClass('fa-long-arrow-up')) method = "DESC";
    if (id == "date") id = "row_time";
    else id = "fid" + id;

    sort_search.order_by = id;
    sort_search.order_method = method;

    insert_sorted_data();
    if ($('.check-general-data').prop('checked'))
        makeTableComplexFormat();

    $('.sort').removeClass('sorted_by');
    $(el).addClass('sorted_by');
}

//поиск данных
function searchData() {
    var
        search_id = $('.search-data .chart-data option:selected').val();
    search_by = 0;
    search_param = "";
    if (search_id == 0) {
        search_by = "row_time";
        search_param = $('input#date-search').val();
    } else {
        search_by = "fid" + search_id;
        search_param = $('input#num-search').val();
    }

    sort_search.search_param = {obj_id: object_id};
    if (search_by == "row_time") {
        var first_date = $('input#date-search').datepicker("getDate").getTime(),
            sec_date = first_date;
        sec_date = new Date(sec_date).setHours(23, 59, 59);
        first_date = first_date/1000;
        sec_date = sec_date/1000;
        search_param = "(`row_time` BETWEEN " + first_date + " AND " + sec_date + ")";
        search_by = "ALL_STR";
    }
    if (search_param != "")
        sort_search.search_param[search_by] = search_param;
    insert_sorted_data();
    if ($('.check-general-data').prop('checked'))
        makeTableComplexFormat();
}

function setTimeToObject(object = 0, custom_time = 0) {
  var
      hour = new Date().getHours(),
      minute = new Date().getMinutes();

  if (custom_time != 0) {
    hour = new Date(custom_time * 1000).getHours();
    minute = new Date(custom_time * 1000).getMinutes();
  }

  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  if (object == 0)
    return hour + ":" + minute;

  object.val(hour + ":" + minute);
}

//установка минимального и максимального времени
function setTime() {
    var
        hour = 0;
    minute = 0;
    hour = new Date(date_limit.min * 1000).getHours();
    minute = new Date(date_limit.min * 1000).getMinutes();

    if (hour.toString().length == 1)
        hour = "0" + hour;
    if (minute.toString().length == 1)
        minute = "0" + minute;

    $('.time-from').val(hour + ":" + minute);
    hour = new Date(date_limit.max * 1000).getHours();
    minute = new Date(date_limit.max * 1000).getMinutes();

    if (hour.toString().length == 1)
        hour = "0" + hour;
    if (minute.toString().length == 1)
        minute = "0" + minute;

    $('.time-to').val(hour + ":" + minute);
}

//получение минимальной и максимальной даты
function returnMinMax() {

    var result = false;
    if (object_id != 0) {
        result = ajax_query({
            handler: 'get_min_max_obj_date',
            data: {object_id}
        }, 'data', 'json');
        date_limit = result;
    }
}

//сброс данных для графика
function resetData() {
    dataFieldArray.forEach(function(item, i) {
        if (item.field_type != "TEXT") {
            data_id["fid" + item.field_id] = {
                name: item.field_name,
                data: new Array()
            };
        }
    });
}

//получение общих данных объекта
function getObjectById() {

    var result = false;
    if (object_id > 0) {
        result = ajax_query({
            handler: 'get_object_by_id',
            data: {object_id}
        }, 'data', 'json');
    }
    obj_data = result[0];
    obj_type = result[0].obj_type;
    //if (obj_type == "simple") $('.modal-content.complex').hide();
    //if (obj_type == "complex") $('.modal-content.simple').hide();
    $('.user-info h3').html(result[0].user_login);
    $('.user-info .date p').html(result[0].obj_time);
    object_name = result[0].obj_name;
    return result;
}

function makeComplexDataFormat() {
    var
        ready_complex_date = '',
        complex_data = '<tr>' + complex_object_row_template + '</tr>',
        data_template_array = obj_data.obj_template;
    if (obj_data.obj_template == false) return;
    data_template_array.forEach(function(item, index) {
        var row = $(complex_data);
        for (var key in item) {
            row.find('td[data-object-data-id="' + key + '"] input').attr('value', item[key]);
        }
        ready_complex_date += row.prop('outerHTML');
    });
    $('.complex-object-data tbody').html(ready_complex_date);
}

//функция вставки отсортированых данных в таблицу
function insert_sorted_data() {
    var result = false;

    result = ajax_query({
        handler: 'get_sort_object_data',
        data: {
            tpl_data: data_template,
            search_param: sort_search.search_param,
            order_by: sort_search.order_by,
            order_method: sort_search.order_method,
            page_num: sort_search.page_num,
            max_row: sort_search.max_row
        }
    }, 'data', 'json');

    if (result.obj_data != "false") {
        show_button(result.buttons)
        $('.data-table tbody').html(result.obj_data);
        checkOnRemoved();
        return true;
    } else return false;
}

function get_data_by_param(field = null, param) {
    var result = false,
        search_param = {obj_id: object_id};

    if (field != null)
        search_param[field] = param;

    result = ajax_query({
        handler: 'get_data_by_param',
        data: {
            search_param
        }
    }, 'data', 'json');
    return result;
}

//настройка кнопок пагинации
function show_button(buttons) {
    $('.paginator-buttons button').hide();
    for (key in buttons) {
        var elem = $('.paginator-buttons button#'+key);
        elem.show();
        elem.attr('name', buttons[key]);
        if (key == "before" || key == "current" || key == "after")
            elem.html(buttons[key]);
    }
}

//смена формата таблицы на таблицу с общей датой
function makeTableComplexFormat() {
  var
      temp_timestamp = 0,
      temp_time = '',
      field_count = $('.data-table thead tr th').length,
      date_template = '<tr class="general-date"><td class="check-row-td"><input class="check-row" type="checkbox" onChange="checkTableDataRows($(this));"/></td><td colspan="' + (field_count - 3) + '">',
      remove_cell = '<td class="remove"><i class="fa fa-times" aria-hidden="true" onClick="removeDataByGeneralDate(this)"></i></td>',
      before_elem = 0;

  $('.general-date').remove();
  $('.general-date-sum').remove();
  $('.data-table thead th:nth-child(1)').show();
  $('.data-table tbody tr:not(.removed) td.row_time').show();
  if ($('.check-general-data').is(':checked')) {
      $('.data-table thead th:nth-child(1)').hide();
      $('.data-table tbody tr td.row_time').hide();
      var length_of_set = $('.data-table tbody tr').length;
      $('.data-table tbody tr').each(function(index) {
        var date = $(this).find('td.row_time span').html();
        if (date != temp_timestamp) {
            // if (temp_timestamp != 0) {
            //     before_elem.after(calcSummForComplexDateFormat(temp_timestamp));
            // }
            temp_timestamp = date;
            temp_time = setDateToInput(0, temp_timestamp*1000) + " " + setTimeToObject(0, temp_timestamp);
            $(this).before(date_template + temp_time + '<span class="toggle-row" ><i onClick="toggvarableDataRow($(this));" class="fa fa-chevron-up" aria-hidden="true"></i></span><span style="display: none;">' + temp_timestamp + '</span></td>' + remove_cell + '</tr>');
        }
        // if (index == length_of_set - 1)
        //     $(this).after(calcSummForComplexDateFormat(temp_timestamp));
        before_elem = $(this);
      });
  }

}

//получение id объекта
function getObjectId() {
    var
        urlData = getUrlVars();
    if (urlData['id'] !== undefined) {
        object_id = urlData['id'];
    }
}

//проверка на целое число
function isInt(num) {
    if (num.indexOf(",") == -1 && num.indexOf(".") == -1)
        return true;
    else return false;
}

function getComplexData() {
  var
      resultArray = [],
      dataArray = {},
      check = true;
      empty = false;
  if ($('.type-of-complex-object input').is(':checked')) {
    var date = new Date($('.one-date-block .one-date-value').datepicker("getDate"));
    date = setTimeToDate(date, $('.one-date-block .one-time-value').val());
    date = date.getTime() / 1000;

    $('.complex-object-data tbody tr').each(function() {
        dataArray['row_time'] = date;
        $(this).find('td').not('.remove_row').each(function() {
            var result = getOneRowData($(this));

            check = result.check;
            empty = result.empty;
            dataArray = Object.assign({}, dataArray, result.data);
        });
        makeData(dataArray);
        resultArray.push(Object.assign({}, dataArray));
        dataArray = {};
      });
  }
  else {
    $('.complex-object-data tbody tr').each(function() {
      $(this).find('td').not('.remove_row').each(function() {
          var result = getOneRowData($(this));

          check = result.check;
          empty = result.empty;
          dataArray = Object.assign({}, dataArray, result.data);
      });
      makeData(dataArray);
      resultArray.push(Object.assign({}, dataArray));
      dataArray = {};
    });
  }
  if (empty)
      $(document).addNotify('Добавление данных', 'Вы ввели не все данные', 4000);
  if (check && !empty) {
      makeData(dataArray);
      result = ajax_query({
          handler: 'insert_complex_data',
          data: {
              object_id,
              data: resultArray
          }
      }, 'data', 'json');
      if (result.result = true) {
          $('.modal-block').fadeOut();
          $(document).addNotify('Добавление данных', 'Данные успешно добавлены.', 4000);
          setTimeout(function() {
              window.location.reload();
          }, 1000);
      } else $(document).addNotify('Добавление данных', result.notice, 4000);
  }
}

function getOneRowData(el) {
  var
      data_id = el.attr('data-object-data-id'),
      val = "",
      type = "",
      result = false,
      row_position = el.parents('tr').index(),
      el_position = el.index(),
      el_title = el.parents('table').find('thead th:nth-child(' + (el_position + 1) + ')').html(),
      result_row = {empty: false, check: true, data: {}};

  if (data_id == "row_time") {
      var date = new Date(el.find('input:first-child').datepicker("getDate"));
      date = setTimeToDate(date, el.find('input[type="time"]').val());
      result_row.data['row_time'] = date.getTime() / 1000;
  } else {
      val = el.find('input').val();
      type = el.attr('data-field-type');
      if (val.length == 0) {
          result_row.empty = true;
          result_row.check = false;
      }
      else if (type == "INT") {
          if (!isInt(val) || isNaN(parseInt(val))) {
              $(document).addNotify('Неверные данные', 'Вы ввели неверные данные в поле "' + el_title + '" в строке: ' + (row_position + 1) + '.');
              result_row.check = false;
          }
      }
      else if (type == "DOUBLE" && isNaN(parseInt(val))) {
        $(document).addNotify('Неверные данные', 'Вы ввели неверные данные в поле "' + el_title + '" в строке: ' + (row_position + 1) + '.');
        result_row.check = false;
      }
      if (type == "TEXT" && result_row.check && !result_row.empty)
        result_row.data[data_id] = val;
      else if (result_row.check && !result_row.empty)
        result_row.data[data_id] = parseNum(type, val);
  }

  return result_row;
}

function returnFullDate(date, time) {
  var date = new Date(date.datepicker("getDate"));

  date = setTimeToDate(date, time.val());

  return date.getTime() / 1000;
}

//получение, подготовка и отправка данных на сервер
function getData(obj_id) {
    var
        dataArray = {},
        check = true,
        empty = false;
    $('.simple .object-data-item').each(function() {
        var
            data_id = $(this).attr('data-object-data-id'),
            val = "",
            type = "";

        if (data_id == "row_time") {
            var date = new Date($(this).find('#object-data-date-' + obj_type).datepicker("getDate"));

            date = setTimeToDate(date, $(this).find('input[type="time"]').val());
            dataArray["row_time"] = date.getTime() / 1000;
        } else {
            val = $(this).find('input').val();
            type = $(this).attr('data-field-type');
            if (val.length == 0) {
                empty = true;
            }
            if (type == "INT") {
                if (!isInt(val) && isNaN(parseInt(val))) {
                    $(document).addNotify('Неверные данные', 'Вы ввели неверные данные в поле "' + ($(this).find('.object-data-item-name').text()) + '".');
                    check = false;
                }
            }
            else if (type == "DOUBLE") {
                if (!isInt(val) && isNaN(parseInt(val))) {
                    $(document).addNotify('Неверные данные', 'Вы ввели неверные данные в поле "' + ($(this).find('.object-data-item-name').text()) + '".');
                    check = false;
                }
            }
            if (type == "TEXT" && check && !empty) {
                dataArray["fid" + data_id] = val;
            }
            else if (check && !empty)
                dataArray["fid" + data_id] = parseNum(type, val);
        }

    });
    if (empty)
        $(document).addNotify('Добавление данных', 'Вы ввели не все данные', 4000);
    if (check && !empty) {
        makeData(dataArray);
        result = ajax_query({
            handler: 'insert_data',
            data: {
                object_id,
                data: dataArray
            }
        }, 'data', 'json');
        if (result.result = true) {
            $('.modal-block').fadeOut();
            $(document).addNotify('Добавление данных', 'Данные успешно добавлены.', 4000);
            setTimeout(function() {
                window.location.reload();
            }, 1000);
        } else $(document).addNotify('Добавление данных', result.notice, 4000);
    }
}

function redact_data() {
    var
        dataArray = {},
        check = true,
        empty = false,
        row_id = $('.complex-object-data-redact').attr('data-row-id');
    $('.complex-object-data-redact td').each(function() {
        var
            data_id = $(this).attr('data-object-data-id'),
            val = $(this).find('input').val(),
            type = $(this).attr('data-field-type'),
            head = $('.complex-object-data-redact thead tr');
        if (val.length == 0) {
            empty = true;
        }
        if (type == "INT") {
            if (!isInt(val) || isNaN(parseInt(val))) {
                $(document).addNotify('Вы ввели неверные данные в поле "' + (head.find('th[data-field-id="' + data_id + '"]').html()) + '".');
                check = false;
            }
        }
        else if (type == "DOUBLE") {
            if (isNaN(parseInt(val))) {
                $(document).addNotify('Вы ввели неверные данные в поле "' + (head.find('th[data-field-id="' + data_id + '"]').html()) + '".');
                check = false;
            }
        }
        if (type == "TEXT" && check && !empty) {
            dataArray[data_id] = val;
        }
        else if (check && !empty)
            dataArray[data_id] = parseNum(type, val);

    });
    if (empty)
        $(document).addNotify('Вы ввели не все данные', 4000);
    if (check && !empty) {
        makeData(dataArray);
        result = ajax_query({
            handler: 'redact_data',
            data: {
                object_id,
                row_id,
                data: dataArray
            }
        }, 'data', 'json');
        if (result.result = true) {
            $('.modal-block').fadeOut();
            setNotice({
                result: true,
                notice: 'Данные успешно отредактированы.'
                }, function() {
                    window.location.reload();
                });
        } else $(document).addNotify('Ошибка редактирования даных', 4000);
    }
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

//загрузка полей объекта
function loadFields() {
    var result = false;
    if (object_id != 0) {
        result = ajax_query({
            handler: 'get_fields_list_by_object_id',
            data: {object_id}
        }, 'data', 'json');
    }
    if (result != false) {
        dataFieldArray = result;
        field_count = result.length + 2;
        result.forEach(function(item, i) {
            // if (obj_type == "simple") {
            //     if (item.count_operation.length == 0) {
            //         var item_field_type = "text";
            //         if (item.field_type != 'TEXT')
            //             item_field_type = 'number';
            //         $('#modal-add-object-data .modal-content.simple').append("<div class='object-data-item' data-object-data-id='" + item.field_id + "' data-field-type='" + item.field_type + "'><p class='object-data-item-name'>" + item.field_name + "</p><input type='" + item_field_type + "'></div>");
            //     }
            // }
            //if (obj_type == "complex") {
                if (item.count_operation.length == 0) {
                    var head_th = '<th data-field-id="fid' + item.field_id + '">' + item.field_name + '</th>';
                    $('.complex-object-data thead tr').append(head_th);
                    $('.complex-object-data-redact thead tr').append(head_th);

                    var item_field_type = "text";
                    if (item.field_type != 'TEXT')
                      item_field_type = 'number';

                    complex_object_row_template += '<td data-object-data-id="fid' + item.field_id + '" data-field-type="' + item.field_type + '"><input class="input" type="' + item_field_type + '" value="" /></td>';
                }
            //}
            $('.chart-data select').append("<option value='" + item.field_id + "'>" + item.field_name + "</option>");
            $('.data-table thead > tr').append("<th data-object-id='" + item.field_id + "'>" + item.field_name + " <i class='fa fa-long-arrow-down sort' aria-hidden='true' onclick='sort(this)'></i><i class='fa fa-long-arrow-up sort' aria-hidden='true' onclick='sort(this)'></i></th>");
            $('.results-table thead > tr').append("<th data-object-id='" + item.field_id + "'>" + item.field_name + "</th>");
            data_template += "<td class='fid" + item.field_id + "'>{{LOOP_VAR:FID" + item.field_id + "}}</td>";
        });

        complex_object_row_template += '<td class="remove_row" ><i class="fa fa-times" aria-hidden="true"></i></td>';
        $('.data-table thead > tr').append("<th class='remove'></th>");
        $('.results-table thead > tr').append("<th class='remove'></th>");
    }
}

//создание данных для отправки на сервер
function makeData(dataArray) {
    if (dataFieldArray.length != dataArray.length) {
        dataFieldArray.forEach(function(item, i) {
            if (item.count_operation.length > 0) {
                var
                    result = makeOperations(dataArray["fid" + item.first_field_id], dataArray["fid" + item.second_field_id], item.count_operation);
                dataArray["fid" + item.field_id] = parseFloat(result);
            }
        });
    }
}

//выполнение операций на введенными данными
function makeOperations(first_field, sec_field, operation) {
    var result = 0;
    switch (operation) {
        case "+":
            result = first_field + sec_field;
            break;
        case "-":
            result = first_field - sec_field;
            break;
        case "*":
            result = first_field * sec_field;
            break;
        case "/":
            result = first_field / sec_field;
            break;
    }
    return result.toFixed(4);
}

//настройка календаря
function DatepickerSetting() {
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        nextText: "&#8594;",
        prevText: "&#8592;",
        currentText: 'Сегодня',
        monthNames: ['Январь (1)', 'Февраль (2)', 'Март (3)', 'Апрель (4)', 'Май (5)', 'Июнь (6)',
            'Июль (7)', 'Август (8)', 'Сентябрь (9)', 'Октябрь (10)', 'Ноябрь (11)', 'Декабрь (12)'
        ],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
        ],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        beforeShowDay: function(date) {
            var day = date.getDate();
            return [true, (day < 10 ? "zero" : "")];
        },
        onSelect: function() {
            $(this).data('datepicker').inline = true;
        },
        onClose: function() {
            $(this).data('datepicker').inline = false;
        }
    };
}

function toggvarableDataRow(arrow) {
    var
        parent = arrow.parents('td');
        date = parent.find('span:nth-child(2)').html();

    if (arrow.hasClass('fa-chevron-up'))
        $('.data-table tr td.row_time span:contains(' + date + ')').parents('tr').hide();
    else
        $('.data-table tr td.row_time span:contains(' + date + ')').parents('tr').show();
    arrow.toggleClass('fa-chevron-up fa-chevron-down');
}

function checkTableDataRows(object) {
    var
        parent = object.parents('tr');
        date = parent.find('span:nth-child(2)').html();

    if (object.is(':checked')) {
        $('.data-table tr td.row_time span:contains(' + date + ')').parents('tr').find('.check-row').prop('checked', true);
        return;
    }

    $('.data-table tr td.row_time span:contains(' + date + ')').parents('tr').find('.check-row').prop('checked', false);
}

//ФУНКЦИИ ДЛЯ РАБОТЫ С ГАРФИКОМ
function Charts(obj_id, container, fields_array) {
    this.data_id = {};
    this.ready_chart_data = [];
    this.container = container;
    this.fields_array = fields_array;
    this.obj_id = obj_id;
    Highcharts.setOptions({
        lang: {
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            weekdays: ['Восресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            shortMonths: ['Янв', 'Фев', 'Мрт', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Нбр', 'Дек'],
            shortWeekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        }
    });
}

Charts.prototype.resetChartData = function() {
    var data_id = this.data_id;
    this.fields_array.forEach(function(item, index) {
        if (item.field_type != "TEXT") {
            data_id["fid" + item.field_id] = {
                name: item.field_name,
                data: []
            };
        }
    });
}

Charts.prototype.loadChartData = function(min_date, max_date) {
    this.resetChartData();

    var result = ajax_query({
        handler: 'get_object_data_array',
        data: {
            object_id: this.obj_id,
            min_date: min_date,
            max_date: max_date
        }
    }, 'data', 'json');


    var data_id = this.data_id;
    result.forEach(function(item, index) {
        var date = (parseInt(item.timestamp) + 10800) * 1000;
        for (var key in item) {
            if (data_id[key] !== undefined) {
                data_id[key].data.push([date, parseFloat(item[key])]);
            }
        }
    });
}

Charts.prototype.readyChartData = function() {
    this.ready_chart_data = [];
    for (var key in this.data_id) {
        this.ready_chart_data.push(this.data_id[key]);
    }


}

Charts.prototype.drawChart = function() {
    this.ready_chart_data.forEach(function(item) {
        item.data.sort(function(a, b) {
            return a[0] - b[0];
        });
    });

    this.container.highcharts({
        title: {
            text: ""
        },
        chart: {
            spacingTop: 40,
            backgroundColor: "#fff"
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: this.ready_chart_data
    });
}

Charts.prototype.buildChart = function(obj_type) {
    var
        min = new Date($(".datepicker-from").datepicker("getDate")),
        max = new Date($(".datepicker-to").datepicker("getDate")),
        text_field = false;

    min = setTimeToDate(min, $('.time-from').val());
    max = setTimeToDate(max, $('.time-to').val());
    min = min.getTime() / 1000;
    max = max.getTime() / 1000;

    //поиск текстовых полей
    this.fields_array.forEach(function(item, index) {
        if (item.field_type == "TEXT") {
            text_field = true;
            return;
        }
    });


    //объект простой и не содержит текстовых полей
    if (!text_field) {
        this.loadChartData(min, max);
        this.readyChartData();
        $('.complex.chart-fields-setting').hide();
    }
    //объект простой с текстовыми полями
    else if (text_field) {
        var
            field_name = "",
            elem_name  = $('.chart-field-param-setting input[name="field-prop-name"]').val();

        if (elem_name != "") {
            field_name = $('.chart-field-param-setting select option:selected').val();
            this.makeComplexFormatOfData(field_name, elem_name, min, max);
        }
        else {
            this.initChartDataSettingForComplexFormatOfData(obj_type);
            // this.loadChartData(min, max);
            // this.readyChartData();
        }

    }
    //сложный объект с текстовыми полями
    // else if (obj_type == "complex" && text_field) {
    //     var
    //         field_name = $('.chart-field-param-setting select option:selected').val(),
    //         elem_name = $('.chart-field-param-setting input[name="field-prop-name"]').val();
    //
    //     if (elem_name != "")
    //         this.makeComplexFormatOfData(field_name, elem_name, min, max);
    //     else
    //         this.initChartDataSettingForComplexFormatOfData(obj_type);
    //
    // }
    // //другой вариант
    // else {
    //     this.loadChartData(min, max);
    //     this.readyChartData();
    //     $('.complex.chart-fields-setting').hide();
    // }

    this.drawChart();
}

Charts.prototype.makeComplexFormatOfData = function(field = "", prop, min_date = 0, max_date = 0) {
    this.ready_chart_data = [];

    if (field == "")
        return false;

    var
        chart_data = get_data_by_param("fid" + field, prop),
        complex_chart_data = [];

    if (chart_data == false)
        return false;

    //поиск не текстовых полей
    this.fields_array.forEach(function(item, index) {
        if (item.field_type != "TEXT") {
            complex_chart_data["fid" + item.field_id] = {
                name: item.field_name,
                data: []
            };
        }
    });

    //создание массива данных
    chart_data.forEach(function(item, index) {
        var date = parseInt(item.timestamp);
        if (date >= min_date && date <= max_date) {
            date = (date + 10800) * 1000;
            for (var key in item) {
                if (complex_chart_data[key] !== undefined) {
                    complex_chart_data[key].data.push([date, parseFloat(item[key])]);
                }
            }
        }
    });


    for (var key in complex_chart_data) {
        this.ready_chart_data.push(complex_chart_data[key]);
    }
}

Charts.prototype.initChartDataSettingForComplexFormatOfData = function(obj_type) {
    var
        firstData = {},
        min_id = 0;

    this.fields_array.forEach(function(item, index) {
        if (item.field_type == "TEXT") {
            if (min_id == 0 || min_id > item.field_id)
                min_id = item.field_id;
        }
    });
    firstData['field_id'] = min_id;
    firstData['field_text'] = $('.data-table tr:first-child td.fid' + firstData['field_id']).html();
    $('.chart-field-param-setting input[name="field-prop-name"]').val(firstData['field_text']);

    this.buildChart(obj_type);
}

Charts.prototype.drawBigChart = function() {
    $('.big-chart').highcharts({
        title: {
            text: ""
        },
        chart: {
            spacingTop: 40,
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: this.ready_chart_data
    });
}

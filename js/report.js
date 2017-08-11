$(document).ready(function() {
    report_id = getReportId();
    class_id = 0;
    report_name = 0;
    report_fields = [];
    text_field = [];
    objects = [];
    report_settings = [];
    report_type = 1;
    data = [];
    object_titles = [];
    fields_count = 0;
    min_date = 0;
    max_date = 0;
    sort_search = {
        search_arr: {report_id},
        order_by: {},
        page_num: 1,
        max_rows: 10
    };

    $('.menu-links a[href='/cab/data'] li').addClass('li-active');
    getReportSettings(report_id);
    setReportName();
    makeTableForReport();
    firstGetData();
    showPagButtons(data['buttons']);
    makeDataTable();
    DatepickerSetting();
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    getMinMaxDate();
    initDate();
    setChartSearchSettings();
    setChartByType(1);
    chart = new reportChart($('#container2'), getDataForChart()['data'], report_settings, 1);
    showChart();

    $(document).on('change', '#chart-type', function() {
        var type = $('select#chart-type option:selected').val();
        setChartByType(type);
    });

    $('.show-summ').click(function() {
        if ($(this).prop('checked'))
            calcSummOfRows();
        else {
            $('.summ-row').remove();
        }
    });

    $('.refresh-report-data').click(function() {
        refreshReportData();
        window.location.reload();
    });

    $('.build-chart').click(function() {
        showChart();
    });

    //увеличение графика
    $(document).on('click', '.zoom-chart-button', function() {
        $('.zoom-chart')
            .css('display', 'flex')
            .hide()
            .fadeIn();
        chart.drawBigChart();
    });

    $(document).on('click', '.paginator-buttons button', function() {
        sort_search.page_num = $(this).attr('name'),
        sort_search.max_row = $('input#data-count').val();
        data = getReportData(sort_search.search_arr, sort_search.order_by, sort_search.page_num, sort_search.max_rows);
        console.log(data, sort_search.max_rows);
        makeDataTable();
        showPagButtons(data['buttons']);
    });

    //смена количества отображаемых данных на одной странице
    $(document).on('keyup', '.data-count input', function(e) {
        if (e.keyCode == 13) {
            var count = parseInt($(this).val());
            sort_search.max_rows = count;
            data = getReportData(sort_search.search_arr, sort_search.order_by, sort_search.page_num, sort_search.max_rows);
            console.log(data, sort_search.max_rows);
            if (data.data.length == 0) {
                sort_search.page_num = data.buttons.current;
                data = getReportData(sort_search.search_arr, sort_search.order_by, sort_search.page_num, sort_search.max_rows);
            }
            makeDataTable();
            showPagButtons(data['buttons']);
        }
    });

    $(document).on('click', '.reset-search-date', function() {
        $('input#datepicker-search').val('');
    });
});

//получение id отчета
function getReportId() {
    var urlData = getUrlVars();
    if (urlData['id'] !== undefined) {
        return urlData['id'];
    }

    window.location.href = '/data';
}

//проверка на существование отчета
function isReportExist(report_id) {
    return ajax_query({handler: 'is_report_exsist', data: {report_id}}, 'report', 'json');
}

//получение настроек отчета
function getReportSettings(report_id) {
    var result = ajax_query({handler: 'get_report_settings', data: {report_id}}, 'report', 'json');
    report_settings = result;
    class_id = result.class_id;
    report_name = result.report_name;
    report_fields = result.report_fields;
    text_field = result.text_field;
    objects = result.objects;
    report_type = parseInt(result.report_type);
    fields_count = report_fields.length;
}

//установка имеи отчета
function setReportName() {
    $('.report-name').html(report_name);
}

function setChartSearchSettings() {
    switch (report_type) {
        case 1:
            $('.chart-fields-setting').remove();
            break;
        case 2:
            $('select#chart-type option[value='3']').remove();
            $('select#chart-type option[value='2']').html(`Полю '${text_field.field_name}'`);
            $('.chart-text-field p').html(text_field.field_name + ':');
            $('.search-text-field label').html(text_field.field_name + ':');
            $('.not-type-2').remove();
            var text_fields = [];
            report_data.forEach(function(item) {
                if (text_fields.indexOf(item.text_field) == -1) {
                    text_fields.push(item.text_field);
                    $('#chart-text-field').append(`<option value='${item.text_field}'>${item.text_field}</option>`);
                    $('#search-text-field').append(`<option value='${item.text_field}'>${item.text_field}</option>`);
                }
            });
            report_fields.forEach(function(item) {
                $('#chart-fields').append(`<option value='fid${item.field}'>${item.field_name}</option>`);
            });
            break;
        case 3:
            $('select#chart-type option[value='2']').remove();
            $('.not-type-3').remove();
            report_fields.forEach(function(item) {
                $('#chart-fields').append(`<option value='fid${item.field}'>${item.field_name}</option>`);
            });
            var objects = report_settings.report_objects;
            for (key in objects) {
                $('#chart-objects').append(`<option value='${key}'>${objects[key]}</option>`);
                $('#search-objects').append(`<option value='${key}'>${objects[key]}</option>`);
            }
            break;
        case 4:
            $('select#chart-type option[value='2']').html(`Полю '${text_field.field_name}'`);
            $('.chart-text-field label').html(text_field.field_name + ':');
            var text_fields = [];
            report_data.forEach(function(item) {
                if (text_fields.indexOf(item.text_field) == -1) {
                    text_fields.push(item.text_field);
                    $('#chart-text-field').append(`<option value='${item.text_field}'>${item.text_field}</option>`);
                }
            });
            var objects = report_settings.report_objects;
            for (key in objects) {
                $('#chart-objects').append(`<option value='${key}'>${objects[key]}</option>`);
                $('#search-objects').append(`<option value='${key}'>${objects[key]}</option>`);
            }
            report_fields.forEach(function(item) {
                $('#chart-fields').append(`<option value='fid${item.field}'>${item.field_name}</option>`);
                $('#search-fields').append(`<option value='fid${item.field}'>${item.field_name}</option>`);
            });
            break;
    }
}

function setChartByType(chart_type) {
    switch (parseInt(chart_type)) {
        case 1:
            $('.not-chart-1').hide();
            $('.chart-1').show();
            if (report_type == 4) {
                $('.all_obj').show();
            }
            break;
        case 2:
            $('.not-chart-2').hide();
            $('.chart-2').show();
            break;
        case 3:
            $('.not-chart-3').hide();
            $('.chart-3').show();
            $('#chart-text-field option:nth-child(1)').prop('selected', true);
            break;
    }
}

//создание шаблона таблицы для отчета
function makeTableForReport() {
    table = '';
    object_titles = [];
    switch (report_type) {
        case 2:
            table += `<th data-field-id=${text_field.field_id}>${text_field.field_name}</th>`;
            object_titles.push('text_field');
            fields_count++;
            break;
        case 3:
            table += `<th>Объект</th>`;
            object_titles.push('obj_name');
            fields_count++;
            break;
        case 4:
            table += `<th>Объект</th>`;
            table += `<th data-field-id=${text_field.field_id}>${text_field.field_name}</th>`;
            fields_count += 2;
            object_titles.push('text_field');
            break;
    }
    report_fields.forEach(function(item, index) {
        temp_row = `<th data-field-id=${item['field']}>${item['field_name']}</th>`;
        table += temp_row;
        object_titles.push('fid' + item['field']);
    });

    $('.data-table thead tr').html(table);
}

//получение данных отчета
function getReportData(where, order_by, page_num, max_row) {
    var result = ajax_query({handler: 'get_report_data', data: {where, order_by, page_num, max_row}}, 'report', 'json');

    return result;
}

function getDataForChart() {
    return getReportData({report_id}, '', 1, 0);
}

//первое получение данных
function firstGetData() {
    sort_search.order_by['row_time'] = 'DESC';
    switch (report_type) {
        case 2:
            sort_search.order_by['text_field'] = 'ASC';
            break;
        case 3:
            sort_search.order_by['obj_name'] = 'ASC';
            break;
        case 4:
            sort_search.order_by['obj_name'] = 'ASC';
            sort_search.order_by['text_field'] = 'ASC';
            break;
    }

    data = getReportData(sort_search.search_arr, sort_search.order_by, sort_search.page_num, sort_search.max_rows);
}

//обновление данных отчета
function refreshReportData() {
    var result = ajax_query({handler: 'refreshReportData', data: {report_id}}, 'report', 'json');

    return result;
}

//вывод данных в таблицу
function makeDataTable() {
    var
        result_table = '',
        timestamp = -1;
        report_data = data.data,
        temp_obj = 0;

    report_data.forEach(function(item, index) {
        var temp_row = `<tr data-timestamp='${item.timestamp}'>`;

        if (timestamp == -1 || item['timestamp'] != timestamp) {
            temp_row = `<tr class='main-date'><td data-timestamp='${item['timestamp']}' colspan='${fields_count}'>${item.row_time}</td></tr>` + temp_row;
            timestamp = item['timestamp'];
            if (report_type == 4) {
                temp_obj = item.obj_id;
                temp_row += `<td class='obj_td' data-obj-id=${item.obj_id}>${item.obj_name}</td>`;
            }
        }
        else {
            if (report_type == 4) {
                if (temp_obj != item.obj_id) {
                    temp_row += `<td class='obj_td' data-obj-id=${item.obj_id}>${item.obj_name}</td>`;
                    temp_obj = item.obj_id;
                }
                else
                    temp_row += `<td class='obj_td' data-obj-id=${item.obj_id}></td>`;
            }
        }

        object_titles.forEach(function(field) {
            var temp_val = item[field];
            if (field != 'text_field' && !isInt(temp_val))
                temp_val = parseFloat(temp_val).toFixed(2);
            temp_row += `<td data-field-id='${field}'>${temp_val}</td>`;
        });
        temp_row += '</tr>';
        result_table += temp_row;
    });

    $('.data-table tbody').html(result_table);
}

//вывод суммы строк
function calcSummOfRows() {
    $('.main-date').each(function(index, item) {
        var
            timestamp = $(this).find('td').attr('data-timestamp'),
            summ_row = calcSummOfElems(getDataForSumm(timestamp)).row;
        $(`tr[data-timestamp=${timestamp}]:last`).after(summ_row);
    });
}

//получение данных для подсчета суммы
function getDataForSumm(timestamp) {
    var
        elems = $(`.data-table tbody tr:not(.main-date)[data-timestamp='${timestamp}']`);
    return elems;
}

//посчет суммы строк
function calcSummOfElems(elems) {
    var
        result = {},
        row = '',
        sum_row = '';

    report_fields.forEach(function(item) {
        sum_row += `<td data-field-id='fid${item['field']}'></td>`;
        result[`fid${item['field']}`] = 0;
    });
    for (var i = 0; i < (fields_count - report_fields.length); i++)
        sum_row = '<td></td>' + sum_row;
    sum_row = `<tr class='summ-row'>${sum_row}</tr>`;
    sum_row = $(sum_row);
    elems.each(function(index, item) {
        for (var key in result) {
            var num = parseFloat($(item).find(`td[data-field-id='${key}']`).html());
            result[key] += num;
        }
    });

    for (var key in result) {
        sum_row.find(`td[data-field-id='${key}']`).html(result[key]);
    }

    return {result: result, row: sum_row};
}

function getMinMaxDate() {
    var result = ajax_query({handler: 'get_min_max_date', data: {report_id, class_id: report_settings.class_id}}, 'report', 'json');
    min_date = parseInt(result.min_time);
    max_date = parseInt(result.max_time);
}

function initDate() {
    $('#datepicker-search').datepicker();

    $('#datepicker-from').datepicker({
        minDate: new Date(min_date * 1000),
        maxDate: new Date(max_date * 1000)
    });

    setDateToInput($('#datepicker-from'), min_date * 1000);

    $('#datepicker-to').datepicker({
        minDate: new Date(min_date * 1000),
        maxDate: new Date(max_date * 1000)
    });

    setDateToInput($('#datepicker-to'), max_date * 1000);
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

//настройка календаря
function DatepickerSetting() {
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        nextText: '&#8594;',
        prevText: '&#8592;',
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
            return [true, (day < 10 ? 'zero' : '')];
        },
        onSelect: function() {
            $(this).data('datepicker').inline = true;
        },
        onClose: function() {
            $(this).data('datepicker').inline = false;
        }
    };
}

//настройка кнопок пагинации
function showPagButtons(buttons) {
    $('.paginator-buttons button').hide();
    for (key in buttons) {
        var elem = $('.paginator-buttons button#'+key);
        elem.show();
        elem.attr('name', buttons[key]);
        if (key == 'before' || key == 'current' || key == 'after')
            elem.html(buttons[key]);
    }
}

function resetSettings() {
    sort_search.search_arr = {report_id},
    sort_search.order_by.row_time = 'ASC';
    sort_search.page_num = 1;
    sort_search.max_rows = 10;
    $('input#data-count').val(10);
    $('.sort#ASC').addClass('sorted_by');
    $('.sort#DESC').removeClass('sorted_by');
    $('input#datepicker-search').val('');
    $('select#search-text-field option[value='0']').prop('selected', true);
    $('select#search-objects option[value='0']').prop('selected', true);
    data = getReportData(sort_search.search_arr, sort_search.order_by, sort_search.page_num, sort_search.max_rows);

    makeDataTable();
    showPagButtons(data['buttons']);
}

function searchData() {
    if ($('input#datepicker-search').val().length > 0) {
        sort_search.search_arr['row_time'] = new Date($('.datepicker-search').datepicker('getDate'));
        sort_search.search_arr['row_time'] = sort_search.search_arr['row_time'].setHours(23, 59, 59);
        sort_search.search_arr['row_time'] = sort_search.search_arr['row_time']/1000;
    }
    else
        delete sort_search.search_arr.row_time;

    if (report_type == 2) {
        if ($('select#search-text-field option:selected').val() != 0)
            sort_search.search_arr['text_field'] = $('select#search-text-field option:selected').val();
        else
            delete sort_search.search_arr.text_field;
    }
    else if (report_type == 3) {
        if ($('select#search-objects option:selected').val() != 0)
            sort_search.search_arr['obj_id'] = $('select#search-objects option:selected').val();
        else
            delete sort_search.search_arr.obj_id;
    }
    else if (report_type == 4) {
        if ($('select#search-text-field option:selected').val() != 0)
            sort_search.search_arr['text_field'] = $('select#search-text-field option:selected').val();
        else
            delete sort_search.search_arr.text_field;

        if ($('select#search-objects option:selected').val() != 0)
            sort_search.search_arr['obj_id'] = $('select#search-objects option:selected').val();
        else
            delete sort_search.search_arr.obj_id;
    }

    console.log(sort_search);

    data = getReportData(sort_search.search_arr, sort_search.order_by, sort_search.page_num, sort_search.max_rows);

    makeDataTable();
    showPagButtons(data['buttons']);
}

function sort(el) {
    var method = $(el).attr('id');

    if (method == 'ASC') {
        $('.sort#ASC').addClass('sorted_by');
        $('.sort#DESC').removeClass('sorted_by');
    }
    else {
        $('.sort#ASC').removeClass('sorted_by');
        $('.sort#DESC').addClass('sorted_by');
    }

    sort_search.order_by.row_time = method;
    data = getReportData(sort_search.search_arr, sort_search.order_by, sort_search.page_num, sort_search.max_rows);

    makeDataTable();
    showPagButtons(data['buttons']);
}

function showChart() {
    chart.resetData();
    if (report_type == 1) {
        chart.chart_type = 1;
    }
    else {
        var type = $('select#chart-type option:selected').val();
        switch (parseInt(type)) {
            case 1:
                chart.chart_type = 1;
                if ($('*').is('#chart-objects')) {
                    chart.setObjId(parseInt($('#chart-objects option:selected').val()));
                }
                if ($('*').is('#chart-text-field')) {
                    chart.setTextField($('#chart-text-field option:selected').val());
                }
                break;
            case 2:
                chart.chart_type = 2;
                if ($('*').is('#chart-objects')) {
                    chart.setObjId(parseInt($('#chart-objects option:selected').val()));
                }
                if ($('*').is('#chart-fields')) {
                    chart.setField($('#chart-fields option:selected').val());
                }
                break;
            case 3:
                chart.chart_type = 3;
                if ($('*').is('#chart-text-field')) {
                    chart.setTextField($('#chart-text-field option:selected').val());
                }
                if ($('*').is('#chart-fields')) {
                    chart.setField($('#chart-fields option:selected').val());
                }
                break;
            default:

        }
    }

    chart.resetChartData();
    chart.setMinMax();
    chart.loadChartData();
    chart.readyChartData();
    chart.drawChart();
}

//ГРАФФИК
function reportChart(container, chart_data, report_settings, chart_type) {
    this.fields = report_settings.report_fields;
    this.container = container;
    this.data = chart_data;
    this.chart_type = chart_type;
    this.chart_data = {};
    this.ready_chart_data = [];
    this.text_fields = [];
    this.text_field = '';
    this.object_id = 0;
    this.field_id = 0;
    this.objects = report_settings.report_objects;
    this.min = 0;
    this.max = 0;
    Highcharts.setOptions({
        lang: {
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            weekdays: ['Восресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            shortMonths: ['Янв', 'Фев', 'Мрт', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Нбр', 'Дек'],
            shortWeekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        }
    });
}

reportChart.prototype.resetData = function() {
    this.text_field = '';
    this.object_id = 0;
    this.field_id = 0;
}

reportChart.prototype.resetChartData = function() {
    var
        chart_data = this.chart_data,
        fields = this.fields;
    chart_data = {};
    if (this.chart_type == 1) {
        fields.forEach(function(item, index) {
            chart_data['fid' + item.field] = {
                name: item.field_name,
                data: []
            };
        });
    }
    else if (this.chart_type == 2) {
        this.getReportTextFields();
        this.text_fields.forEach(function(item) {
                chart_data[item] = {
                    name: item,
                    data: []
                };
        });
    }
    else if (this.chart_type == 3) {
        var objects = this.objects;
        for (key in objects) {
            chart_data[key] = {
                name: objects[key],
                data: []
            };
        }
    }
    this.chart_data = chart_data;
}

reportChart.prototype.readyChartData = function() {
    this.ready_chart_data = [];
    for (var key in this.chart_data) {
        this.ready_chart_data.push(this.chart_data[key]);
    }
}

reportChart.prototype.setMinMax = function() {
    var
        min = new Date($('.datepicker-from').datepicker('getDate')),
        max = new Date($('.datepicker-to').datepicker('getDate'));

    this.min = min.setHours(23, 59, 59);
    this.max = max.setHours(23, 59, 59);

}

reportChart.prototype.drawChart = function() {
    this.ready_chart_data.forEach(function(item) {
        item.data.sort(function(a, b) {
            return a[0] - b[0];
        });
    });

    this.container.highcharts({
        title: {
            text: ''
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

reportChart.prototype.setTextField = function(text_field) {
    this.text_field = text_field;
}

reportChart.prototype.setObjId = function(object_id) {
    this.object_id = object_id;
}

reportChart.prototype.setField = function(field) {
    this.field_id = field;
}

reportChart.prototype.getReportTextFields = function() {
    var
        text_fields = this.text_fields,
        data = this.data;
    data.forEach(function(item) {
        if (text_fields.indexOf(item.text_field) == -1)
            text_fields.push(item.text_field);
    });
}

reportChart.prototype.loadChartData = function() {
    var
        data = this.data,
        chart_data = this.chart_data,
        field_id = this.field_id,
        text_field = this.text_field,
        object_id = this.object_id,
        chart_type = this.chart_type;
        min = parseInt(this.min) + 7200000;
        max = parseInt(this.max) + 7200000;

    data.forEach(function(item, index) {
        var date = (parseInt(item.timestamp) + 7200) * 1000;
        if (date < min || date > max)
            return;

        if (chart_type == 1) {
            for (var key in item) {
                if (chart_data[key] !== undefined) {
                    if (text_field != '' && item.text_field == text_field) {
                        if (object_id != 0 && object_id == item.obj_id)
                            chart_data[key].data.push([date, parseFloat(item[key])]);
                        else if (object_id == 0) {
                            chart_data[key].data.push([date, parseFloat(item[key])]);
                        }
                    }
                    else if (object_id != 0 && object_id == item.obj_id && text_field.length == 0) {
                        chart_data[key].data.push([date, parseFloat(item[key])]);
                    }
                    else if (text_field.length == 0 && object_id == 0)
                        chart_data[key].data.push([date, parseFloat(item[key])]);
                }
            }
        }
        else if (chart_type == 2) {
            if (chart_data[item.text_field] !== undefined) {
                if (object_id != 0 && object_id == item.obj_id) {
                    chart_data[item.text_field].data.push([date, parseFloat(item[field_id])]);
                }
                else if (object_id == 0)
                    chart_data[item.text_field].data.push([date, parseFloat(item[field_id])]);
            }
        }
        else if (chart_type == 3) {
            if (chart_data[item.obj_id] !== undefined) {
                if (text_field != '' && item.text_field == text_field) {
                    chart_data[item.obj_id].data.push([date, parseFloat(item[field_id])]);
                }
                else if (text_field.length == 0)
                    chart_data[item.obj_id].data.push([date, parseFloat(item[field_id])]);
            }
        }
    });
}

reportChart.prototype.drawBigChart = function() {
    $('.big-chart').highcharts({
        title: {
            text: ''
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

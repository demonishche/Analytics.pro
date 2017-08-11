$(document).ready(function() {
    urlData = getUrlVars();
    $('.menu-links a[href="/cab/data"] li').addClass('li-active');
    getFavData("report");

    $('.add-report').click(function() {
        $('.modal-block-add-report')
            .css("display", "flex")
            .hide()
            .fadeIn();
    });

    //создание нового отчета
    $(document).on('click', '.add-report-data', function() {
        var data = collectDataForReport();
        if (data) {
            res = ajax_query({
                handler: 'new_report',
                data: data
            }, 'report', 'json');

            if (res.result == true) {
                setNotice({
                    result: true,
                    notice: 'Отчет "<b>' + data['report_name'] + '</b>" успешно создан.'
                }, function() {
                    window.location.reload();
                });
                $('.modal-block-add-class').fadeOut();
            } else {
                setNotice({
                    result: false,
                    notice: res.notice
                }, function() {
                    window.location.reload();
                });
            }
        }

        return false;
    });

    //удаление отчета
    $(document).on('click', '.group .show-more', function() {
        var
            id = $(this).parents('.group').attr('data-report-id'),
            name = $(this).parents('.group').find('.title h5').html(),
            delete_card = $('.modal-block-delete'),
            change_card = $('.modal-change-name');

        delete_card.attr('data-report-id', id);
        delete_card.find('.modal-content h4').html('Удалить отчет "' + name + '"');
        change_card.attr('data-report-id', id);
        change_card.find('input#name-to-change').val(name);
    });

    //удаление отчета
    $(document).on('click', '.modal-block-delete .delete-report', function() {
        var id = $(this).parents('.modal-block').attr('data-report-id');
        var res = ajax_query({
            handler: 'delete_report',
            data: {id}
        }, 'report', 'json');
        if (res.result == true) {
            setNotice({
                result: true,
                notice: 'Отчет успешно удален.'
            }, function() {
                window.location.reload();
            });
        } else {
            $(document).addNotify('Произошла ошибка при удалении отчета: ' + res.notice + '.');
        }
        $('.modal-block-delete').fadeOut();
    });

    // изменение имени отчета
    $(document).on('click', '.modal-change-name .save-changes', function() {
        var
            id = $(this).parents('.modal-block').attr('data-report-id'),
            name = $(this).parents('.modal-block').find('input#name-to-change').val(),
            prev_name = $('.group[data-report-id="' + id + '"] .title h5').html();

        if (name == prev_name || name.length == 0) {
            $(document).addNotify('Вы ввели неверные данные.');
        } else {
            var res = ajax_query({
                handler: 'rename_report',
                data: {
                    report_id: id,
                    report_name: name
                }
            }, 'report', 'json');
            if (res.result == true) {
                setNotice({
                    result: true,
                    notice: 'Имя отчета успешно изменено.'
                }, function() {
                    window.location.reload();
                });
            } else {
                $(document).addNotify('Произошла ошибка при изменении имени отчета.');
            }
        }
        $('.modal-change-name').fadeOut();
    });

    //отображение списка текстовых полей
    $(document).on('click', 'input[name="without-text-field"]', function() {
        if (!$(this).prop('checked')) {
            $('.styled-select.text-field').show();
            return true;
        }

        $('.styled-select.text-field').hide();
    });
});

function collectDataForReport() {
    var
        result = {},
        report_type = 1,
        report_name = '',
        text_field = 0,
        report_objects = false,
        report_fields = false,
        period = "daily",
        use_objects_name = false,
        check = true;

    report_name = getReportName();
    if (!report_name) {
        check = false;
        $(document).addNotify('Некоректное имя отчета.');
    }

    period = $('select#report_period option:selected').val();
    if (period === undefined) {
        check = false;
        $(document).addNotify('Ошибка создания отчета.');
    }

    use_objects_name = $('input#use-object-name').prop('checked');
    if (use_objects_name === undefined) {
        check = false;
        $(document).addNotify('Ошибка создания отчета.');
    }

    report_objects = getReportObjects();
    if (!report_objects) {
        check = false;
        $(document).addNotify('Нужно выбрать объекты для формирования отчета.');
    }

    report_fields = getReportFields();
    if (!report_fields) {
        check = false;
        $(document).addNotify('Нужно выбрать поля для формирования отчета.');
    }

    var use_text_field = $('.modal-content-row.text-field input[name="without-text-field"]').prop("checked") ? false : true;
    if ($('*').has('.modal-content-row.text-field').length > 0 && use_text_field)
        text_field = $('select#text-field option:selected').val().substring(3);
    else use_text_field = false;
    if (text_field === undefined) {
        check = false;
        $(document).addNotify('Ошибка создания отчета.');
    }

    report_type = defineReportType(use_objects_name, use_text_field);
    if (!report_type) {
        check = false;
        $(document).addNotify('Ошибка создания отчета.');
    }

    if (!check) return false;

    result = {
        class_id: parseInt(urlData['id']),
        report_name,
        period: parseInt(period),
        report_type: parseInt(report_type),
        report_objects,
        report_fields,
        text_field: parseInt(text_field)
    };

    return result;
}

function getReportName() {
    var name = $('.report-name input').val();

    if (name.length > 0)
        return name;

    return false;
}

function getReportFields() {
    var result = [];

    $('.field-for-report').each(function() {
        if ($(this).find('input').prop('checked')) {
            var
                id = $(this).attr('data-field-id'),
                operation = $(this).find('select option:selected').val();

            result.push({
                field: id,
                operation
            });
        }
    });

    if (result.length > 0)
        return result;

    return false;
}

function getReportObjects() {
    var result = [];

    if (!$('.object-for-report input#obj0').prop('checked')) {
        $('.object-for-report').each(function() {
            var sel_object_id = $(this).find('input').attr('id');
            if ($(this).find('input').prop('checked') && sel_object_id != 0)
                result.push(sel_object_id.substring(3));
        });
    } else {
        result.push("0");
    }

    if (result.length > 0)
        return result;

    return false;
}

function defineReportType(object_name, text_field) {
    if (!object_name && !text_field)
        return 1;
    if (!object_name && text_field)
        return 2;
    if (object_name && !text_field)
        return 3;
    if (object_name && text_field)
        return 4;

    return false;
}

$(document).ready(function() {

    complex_object_row_template = "<tr>";
    url = getUrlVars();
    $('.menu-links a[href="/cab/data"] li').addClass('li-active');
    loadFields(url['id']);
    getFavData("object");
    //Открытие модалки добавления обьекта
    $('.add-object').click(function() {
        $('.modal-block-add-object')
            .css("display", "flex")
            .hide()
            .fadeIn();
    });

    //добавление объекта
    $(document).on('click', '.modal-block-add-object .add-object-data', function() {
        createObject(this);
    });

    //удаление объекта
    $(document).on('click', '.group .show-more', function() {
        var
            id = $(this).parents('.group').attr('data-object-id'),
            name = $(this).parents('.group').find('.title h5').html(),
            delete_card = $('.modal-block-delete'),
            change_card = $('.modal-change-name');
        delete_card.attr('data-object-id', id);
        delete_card.find('.modal-content h4').html('Удалить объект "' + name + '"');
        change_card.attr('data-object-id', id);
        change_card.find('input#name-to-change').val(name);
    });

    //удаление объекта
    $(document).on('click', '.modal-block-delete .delete-object', function() {
        var id = $(this).parents('.modal-block').attr('data-object-id'),
            res = ajax_query({
                handler: 'remove_object',
                data: id
            }, 'data', 'json');
        if (res.result == true) {
            setNotice({
                result: true,
                notice: `Объект успешно удален.`
            }, function() {
                window.location.reload();
            });
        } else {
            $(document).addNotify('Произошла ошибка при удалении объекта: ' + res.notice + '.');
        }
        $('.modal-block-delete').fadeOut();
    });

    // изменение имени объекта
    $(document).on('click', '.modal-change-name .save-changes', function() {
        var
            id = $(this).parents('.modal-block').attr('data-object-id'),
            name = $(this).parents('.modal-block').find('input#name-to-change').val(),
            prev_name = $('.group[data-object-id="' + id + '"] .title h5').html();

        if (name == prev_name || name.length == 0) {
            $(document).addNotify('Вы ввели неверные данные.');
        } else {
            var res = ajax_query({
                handler: 'change_object_name',
                data: {
                    object_id: id,
                    object_name: name
                }
            }, 'data', 'json');
            if (res.result == true) {
                setNotice({
                    result: true,
                    notice: 'Имя объекта успешно изменено.'
                }, function() {
                    window.location.reload();
                });
            } else {
                $(document).addNotify('Произошла ошибка при изменении имени объекта.');
            }
        }
        $('.modal-change-name').fadeOut();
    });

    $(document).on('click', '.modal-content td.remove_row', function() {
        $(this).parents('tr').remove();
    });
});

//загрузка полей объекта
function loadFields(class_id) {
    var result = false;

    if (class_id == 0) class_id = urlData['class'];
    result = ajax_query({
        handler: 'get_fields_list',
        data: {
            class_id
        }
    }, 'data', 'json');

    if (result != false) {
        dataFieldArray = result;
        $('.complex .data-model thead tr, .complex .data-model tbody').html('');
        result.forEach(function(item, i) {
            if (item.count_operation.length == 0) {
                $('.complex .data-model thead tr').append('<th data-field-id="fid' + item.field_id + '">' + item.field_name + '</th>');
                var item_field_type = "text";
                if (item.field_type != 'TEXT')
                    item_field_type = 'number';
                complex_object_row_template += '<td class="fid' + item.field_id + '" data-field-type="' + item.field_type + '"><input class="input" type="' + item_field_type + '" /></td>';
            }
        });
        complex_object_row_template += '<td class="remove_row"><i class="fa fa-times" aria-hidden="true"></i></td></tr>';
    }
    $('.complex .data-model tbody').append(complex_object_row_template);
    var field_count = $('.modal-content.complex thead th').length;
    if (field_count > 3)
        $('.modal-block-add-object .modal-type-1 ').css('width', 'calc(' + field_count + '*150px)');
}

//создание объекта
function createObject(parent) {
    var
        name = $(parent).parents('.modal-block').find('.modal-content.name input').val(),
        class_id = url['id'],
        data = {},
        res = false;
    if (name.length == 0) {
        $(document).addNotify('Введите имя объекта.');
        return;
    }
    data = {
        name: name,
        class_id: class_id
    };

    var object_template = [],
        check = true;

    $('.data-model tbody tr').each(function(i) {
        object_template[i] = {};
        $(this).find('td').each(function() {
            if ($(this).hasClass('remove_row')) return;
            var val = $(this).find('input').val();

            if (val.length > 0) {

                var type = $(this).attr('data-field-type'),
                    id = $(this).attr('class');

                if (type == "INT") {

                    if (!isInt(val)) {
                        check = false;
                        $(document).addNotify('Вы ввели неверные данные в поле "' + ($('table thead th[data-field-id="' + id + '"]').html()) + '" в строке ' + (i + 1) + '.');
                        return false;
                    }

                }

                if (type != "TEXT") {
                    val = parseNum(type, val)
                }

                object_template[i][id] = val;
            }
        });
    });
    if (check) {
        if (object_template.length == 1 && Object.keys(object_template[0]).length == 0)
            data['object_template'] = [];
        else
            data['object_template'] = object_template;
        console.log(data);
        res = ajax_query({
            handler: 'new_object',
            data
        }, 'data', 'json');
    }

    if (res.result == true) {
        setNotice({
            result: true,
            notice: 'Объект "<b>' + data.name + '</b>" успешно создан.'
        }, function() {
            window.location.reload();
        });
        $('.modal-block-add-object').fadeOut();
    } else
        $(document).addNotify('Возникла ошибка при создании объекта "<b>' + data.name + '</b>".');
}

//изменение типа объекта
function ObjectTypeChange() {
    var field_count = $('.modal-content.complex thead th').length;
    if (field_count > 3)
        $('.modal-block-add-object .modal-type-1 ').css('width', 'calc(' + field_count + '*150px)');
    $('.modal-content.complex').fadeIn();
    object_type = "complex";
}

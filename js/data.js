dataFieldArray = {};

$(document).ready(function() {

    object_type = "simple";
    complex_object_row_template = "<tr>";
    field_row = $('.field-row')[0].outerHTML;
    change_class_id = 0;
    change_class_name = "";
    delete_fields_id = [];

    getFavData("class");

    //Перетаскивание блоков
    $("ul#sortable, ul#class-change-sortable").sortable({
        // revert: true
    });

    //Открытие модалки добавления класса
    $('.add-class').click(function() {
        $('.modal-block-add-class')
            .css("display", "flex")
            .hide()
            .fadeIn();
        $('.modal-block-add-class').find('ul#sortable .form-type-2').remove();
    });

    //Скрыть модал-3
    $(".hide-data").click(function() {
        $(".object-data").fadeIn(200).animate({
            height: "0",
            display: "none",
        }, {
            duration: 1000,
            queue: false
        });
        $(".object-data").delay(999).fadeOut();
    });

    //Открытие модалки изменения имени
    $(document).on('click', '#redact_class', function() {
        openRedactClass();
        $('.modal-class-change')
            .css("display", "flex")
            .hide()
            .fadeIn();
    });

    //создание нового класса
    $(document).on('click', '.create-class', function() {
        var data = makeClass($(this).parents('.modal-block'));

        if (data != false) {
            res = ajax_query({
                handler: 'new_class',
                data
            }, 'data', 'json');
            console.log(res);
            if (res.result == true) {
                setNotice({
                    result: true,
                    notice: 'Класс "<b>' + data['name'] + '</b>" успешно создан.'
                }, function() {
                    window.location.reload();
                });
                $('.modal-block-add-class').fadeOut();
            } else {
                setNotice({
                    result: false,
                    notice: 'Возникла ошибка при создании класса "<b>' + data['name'] + '</b>": ' + res.notice + '.'
                }, function() {
                    window.location.reload();
                });
            }
        }

        return false;
    });

    //появение меню класса
    $(document).on('click', '.group .show-more', function() {
        var
            id = $(this).parents('.group').attr('data-class-id'),
            name = $(this).parents('.group').find('.title h5').html(),
            delete_card = $('.modal-block-delete'),
            change_card = $('.modal-class-change');
        delete_card.attr('data-class-id', id);
        delete_card.find('.modal-content h4').html(`Удалить класс "${name}".`);
        change_card.attr('data-class-id', id);
        change_class_id = id;
    });

    //удаление класса
    $(document).on('click', '.modal-block-delete .delete-button', function() {
        var id = $(this).parents('.modal-block').attr('data-class-id');
        var res = ajax_query({
            handler: 'remove_class',
            data: id
        }, 'data', 'json');
        if (res.result == true) {
            setNotice({
                result: true,
                notice: 'Класс успешно удален.'
            }, function() {
                window.location.reload();
            });
        } else {
            $(document).addNotify('Произошла ошибка при удалении класса: ' + res.notice + '.');
        }
        $('.modal-block-delete').fadeOut();
    });

    // изменение имени класса
    $(document).on('click', '.modal-change-name .save-button', function() {
        var
            id = $(this).parents('.modal-block').attr('data-class-id'),
            name = $(this).parents('.modal-block').find('input#name-to-change').val(),
            prev_name = $('.group[data-class-id="' + id + '"] .title h5').html();

        if (name == prev_name || name.length == 0) {
            $(document).addNotify('Вы ввели неверные данные.');
        } else {
            var res = ajax_query({
                handler: 'change_class_name',
                data: {
                    class_id: id,
                    class_name: name
                }
            }, 'data', 'json');
            if (res.result == true) {
                setNotice({
                    result: true,
                    notice: 'Имя класса успешно изменено.'
                }, function() {
                    window.location.reload();
                });
            } else {
                $(document).addNotify('Произошла ошибка при изменении имени класса.');
            }
        }
        $('.modal-change-name').fadeOut();
    });

    $(document).on('click', '.add-line', function() {
        $(this).parents('.modal-content').find('ul#sortable').append(field_row);
        enableCount($(this).parents('.modal-content').find('ul#sortable .field-row'));
        $( "#sortable" ).sortable({
          revert: true
        });
        return false;
    });

    $(document).on('click', '.add-line-redact', function() {
        $(this).parents('.modal-content').find('ul#class-change-sortable').append(field_row);
        var cur_row = $('ul#class-change-sortable .field-row:last');
        cur_row.find('.top').append('<div class="new_row_value"><label>Значение: </label><input class="input" type="number" value="0"/></div>');
        enableCount($(this).parents('.modal-content').find('ul#class-change-sortable .field-row'));
        $( "#class-change-sortable" ).sortable({
          revert: true
        });
        return false;
    });

    $(document).on("change", ".styled-select.form-type", function() {
        var type = $(this).find('option:selected').text();
        var this_form = $(this).parents('.field-row');
        var parent = ($(this).parents('ul#sortable').length > 0) ? $(this).parents('ul#sortable') : $(this).parents('ul#class-change-sortable');
        if (parent.attr("id") == "class-change-sortable") {
            switch (type) {
                case "Текстовый":
                    this_form.find('.new_row_value').show();
                    this_form.find('.new_row_value input')
                        .val("")
                        .attr("type", "text");
                    break;
                case "Числовой":
                    this_form.find('.new_row_value').show();
                    this_form.find('.new_row_value input')
                        .val("")
                        .attr("type", "number")
                        .val("0");
                    break;
                case "Дробный":
                    this_form.find('.new_row_value').show();
                    this_form.find('.new_row_value input')
                        .val("")
                        .attr("type", "number")
                        .val("0");
                    break;
            }
        }
        if (type == "Подсчет")
        {
            this_form.find('.new_row_value').hide();
            this_form.find('.bottom')
                .css("display", "flex")
                .hide()
                .fadeIn();
        }
        else
        {
            this_form.find('.bottom').fadeOut();
        }
        var elem_num = this_form.index();
        parent.find('.field-row').each(function() {
            if ($(this).index() >= elem_num)
                addOptionToOptionalSelect($(this));
        });
    });

    $(document).on('change', '.field-row .top > input', function() {
        var parent = ($(this).parents('ul#sortable').length > 0) ? $(this).parents('ul#sortable') : $(this).parents('ul#class-change-sortable');
        var count = parent.find('.field-row').length;
        if (count > 2)
        {
            var elem_num = $(this).parents('.field-row').index();
            parent.find('.field-row').each(function() {
                if ($(this).index() > elem_num)
                    addOptionToOptionalSelect($(this));
            });
        }
    });

    $(document).on('click', '.field-row i.fa-close', function() {
        var parent = ($(this).parents('ul#sortable').length > 0) ? $(this).parents('ul#sortable') : $(this).parents('ul#class-change-sortable'),
            isBelong = $(this).parents('.field-row').hasClass("class_field");
        if (parent.attr('id') == "sortable" || !isBelong) {
            var elem_num = $(this).parents('.field-row').index();
            parent.find('.field-row').each(function() {
                if ($(this).index() > elem_num)
                    addOptionToOptionalSelect($(this));
            });
            $(this).parents('.field-row').remove();
            enableCount(parent.find('.field-row'));
        }
        else {
            deleteFieldFromRedact($(this).parents('.field-row'));
        }
    });

    $('.save-changes-button').click(function() {
        var class_name = $('.modal-class-change input.name-to-change').val(),
            change_name = true,
            collectedData = collectDataToChangeClass();
        if (class_name.length == 0) {
            $(document).addNotify('Вы ввели неверное имя класса.');
        } else if (class_name != change_class_name) {
            var res = ajax_query({
                handler: 'change_class_name',
                data: {
                    class_id: change_class_id,
                    class_name: class_name
                }
            }, 'data', 'json');
            if (res.result == false) {
                change_name = false;
                $(document).addNotify('Произошла ошибка при редатировании имени класса.');
            }
        }

        if (change_name) {
            var res = ajax_query({
                handler: 'update_class_fields',
                data: {
                    class_id: change_class_id,
                    fields: collectedData
                }
            }, 'data', 'json');
            if (res) {
                setNotice({
                    result: true,
                    notice: 'Класс успешно отредактирован.'
                }, function() {
                    window.location.reload();
                });
            }
            else {
                $(document).addNotify('Произошла ошибка при редатировании имени класса.');
            }
        }
        delete_fields_id = [];
    });
});

//загрузить строку для добавления поля в класс
function getFormType() {
    var result = false;
    $.ajax({
        url: "/theme/pages/form-type.tpl",
        dataType: "text",
        async: false,
        success: function(data) {
            result = data;
        }
    });
    return result;
}

//подсчет количестав полей в классе
function enableCount(parent) {
    parent.each(function() {
        if ($(this).index() > 1)
            $(this).find('.styled-select.form-type select option[value="count"]').attr("disabled", false);
        else
        {
            $(this).find('.styled-select.form-type select option[value="count"]').attr("disabled", true);
            if ($(this).find('.styled-select.form-type option:selected').val() == "count")
            {
                $(this).find('.styled-select.form-type option[value="int"]').attr("selected", true);
                $(this).find('.styled-select.form-type').trigger("change");
            }
        }
    });
}

//добавление опций в селект добавления поля в класс
function addOptionToOptionalSelect(object) {
    var fields = new Array();
    fields.push({item : "Не выбрано", index : -1});
    object.parents('.modal-content').find('.field-row').each(function() {
        if ($(this).index() < object.index() && $(this).find('.top input').val() != "" && $(this).find('.styled-select.form-type option:selected').val() != 'string')
        {
            var obj = {item : $(this).find('.top input').val(), index : $(this).index()};
            fields.push(obj);
        }

    });
    object.find('.styled-select.num select option').remove();
    fields.forEach(function(item, i) {
        object.find('.styled-select.num select').append($("<option value='" + item.index + "'>" + item.item + "</option>"));
    });
}

function openRedactClass() {
    var class_data = ajax_query({handler: 'get_class_data', data: change_class_id}, 'data', 'json'),
        class_fields = ajax_query({handler: 'get_fields_list', data: {class_id: change_class_id}}, 'data', 'json');

    change_class_name = class_data.class_name;
    $('.modal-class-change input.name-to-change').val(class_data.class_name);
    $('ul#class-change-sortable').html("");
    console.log(class_fields);
    class_fields.forEach(function(item) {
        var redact_field_row = $(field_row);
        redact_field_row
            .addClass("class_field")
            .attr('data-field-id', item.field_id)
            .find('input[name="field-name"]').val(item.field_name);
        redact_field_row.find('.form-type select').attr("disabled", "disabled");

        $('ul#class-change-sortable').append(redact_field_row);
        enableCount($('.modal-class-change .modal-content ul#class-change-sortable .field-row'));
        var cur_row = $('ul#class-change-sortable .field-row:last');
        if (item.count_operation.length > 0) {
            var first_num = $.grep(class_fields, function(e) { return e.field_id == item.first_field_id;})[0].field_name,
                second_num = $.grep(class_fields, function(e) { return e.field_id == item.second_field_id;})[0].field_name;
            addOptionToOptionalSelect(cur_row);
            cur_row.find('.styled-select.form-type option[value="count"]').attr("selected", true);
            cur_row.find('.bottom')
                .css("display", "flex")
                .find(".first-num option:contains('" + first_num + "')").attr("selected", true);
            cur_row.find(".bottom .operations option:contains('" + item.count_operation + "')").attr("selected", true)
            cur_row.find(".bottom .second-num option:contains('" + second_num + "')").attr("selected", true);
        }
        else {
            switch (item.field_type) {
                case "TEXT":
                    cur_row.find('.styled-select.form-type option[value="string"]').attr("selected", true);
                    break;
                case "INT":
                    cur_row.find('.styled-select.form-type option[value="int"]').attr("selected", true);
                    break;
                case "DOUBLE":
                    cur_row.find('.styled-select.form-type option[value="double"]').attr("selected", true);
                    break;
            }
        }
    });

    console.log(class_data, class_fields);
}

function deleteFieldFromRedact(field) {
    var value = field.find("input[name='field-name']").val(),
        using = false;
    $("ul#class-change-sortable .bottom select option:selected").each(function() {
        if ($(this).text() == value)
            using = true;
    });

    if (using) {
        $(document).addNotify('Поле не может быть удалено, так как исспользуется в подсчетах.');
    }
    else {
        if (confirm("Удалив поле, вы можете потеряять данные. Удалить?")) {
            var elem_num = field.index();
            if (field.hasClass('class_field'))
                delete_fields_id.push(field.attr('data-field-id'));
            field.each(function() {
                if ($(this).index() > elem_num)
                    addOptionToOptionalSelect($(this));
            });
            field.remove();
            enableCount(field.parents('ul').find('.field-row'));
        }
    }
}

//Создание нового класса
function makeClass(parent) {
    var check = true;
    var arrayData = new Array();
    var reports_name = parent.find('input.class-name').val();
    if (reports_name == "") {
        $(document).addNotify('Введите имя класса.');
        check = false;
        return false;
    } else {
        var temp = collectData(parent);
        if (!temp) {
            check = false;
            return false;
        } else arrayData = temp;
    }
    if (check == true) {
        var result = {};
        result['name'] = reports_name;
        result['data'] = arrayData;
        return result;
    } else {
        return false;
    }
}

//сбор данных для создания класса
function collectData(parent) {
    var arrayData = new Array();
    var check = true;
    if (parent.find('ul#sortable .field-row').length == 0) {
        check = false;
        $(document).addNotify('Клас должен содержать поля.');
    }
    parent.find('ul#sortable .field-row').each(function() {

        var object = {};
        object['field_id'] = $(this).index();
        object['name'] = $(this).find('.top > input').val();

        if (object['name'] == "") {
            $(document).addNotify('Класс содержит поле без имени.');
            check = false;
            return false;
        }

        object['type'] = $(this).find('.top > .styled-select.form-type option:selected').val();

        if (object['type'] == "count") {
            object['first_field'] = $(this).find('.styled-select.first-num select').val();
            object['second_field'] = $(this).find('.styled-select.second-num select').val();
            object['operations'] = $(this).find('.styled-select.operations select option:selected').text();

            if (object['first_field'] == -1 || object['second_field'] == -1) {
                alert("Выберите поля для подсчета.");
                check = false;
                return false;
            }
        }
        arrayData.push(object);
    });
    if (!check) return check;
    else return arrayData;
}

function collectDataToChangeClass() {
    var arrayData = new Array(),
        arrayChanged = new Array(),
        arrayDelete = new Array(),
        check = true,
        parent = $('.modal-class-change'),
        class_fields = ajax_query({handler: 'get_fields_list', data: {class_id: change_class_id}}, 'data', 'json');
    if (parent.find('ul#class-change-sortable .field-row').length == 0) {
        check = false;
        $(document).addNotify('Клас должен содержать поля.');
    }
    $('ul#class-change-sortable .field-row').each(function() {
        var object = {},
            ready_field = {},
            temp_obj = {};

        if ($(this).hasClass("class_field")) {
            var temp_id = $(this).attr('data-field-id'),
                 field_name = $(this).find("input[name='field-name']").val();
            ready_field['field_id'] = parseInt(temp_id);
            if (field_name == "") {
                 $(document).addNotify('Класс содержит поле без имени.');
                 check = false;
                 return false;
            }
            temp_obj = $.grep(class_fields, function(e) { return e.field_id == temp_id;})[0];
             if (temp_obj.field_name != field_name)
                 ready_field['name'] = field_name;
             if ($(this).index() != temp_obj.order)
                ready_field['order'] = $(this).index();
             if (temp_obj.count_operation.length > 0) {
                var
                    first_num = $(this).find(".first-num select option:selected").text(),
                    second_num = $(this).find(".second-num select option:selected").text(),
                    first_num_id = $('ul#class-change-sortable').find('input').filter(function() {return this.value == first_num;}).parents('.field-row').attr('data-field-id'),
                    second_num_id = $('ul#class-change-sortable').find('input').filter(function() {return this.value == second_num;}).parents('.field-row').attr('data-field-id'),
                    operation = $(this).find('.operations select option:selected').text();
                    if (first_num == "Не выбрано" || second_num == "Не выбрано") {
                        $(document).addNotify('Выберите поля для подсчета.');
                        check = false;
                        return false;
                    }
                    if (first_num_id === undefined)
                        ready_field['first_num'] = {type: "new", field: first_num};
                    else if (first_num_id != temp_obj.first_field_id)
                        ready_field['first_num'] = {type: "old", field: first_num_id};
                    if (second_num_id === undefined)
                        ready_field['second_num'] = {type: "new", field: second_num};
                    else if (second_num_id != temp_obj.second_field_id)
                        ready_field['second_num'] = {type: "old", field: second_num_id};
                    if (operation != temp_obj.count_operation)
                        ready_field['count_operation'] = operation;
            }
            if (Object.keys(ready_field).length > 1)
                arrayChanged.push(ready_field);
        }
        else {
            object['field_id'] = $(this).index();
            object['name'] = $(this).find('.top > input').val();

            if (object['name'] == "") {
                $(document).addNotify('Класс содержит поле без имени.');
                check = false;
                return false;
            }

            object['type'] = $(this).find('.top > .styled-select.form-type option:selected').val();
            object['order'] = $(this).index();
            if (object['type'] == "count") {
                var
                    first_num = $(this).find(".first-num select option:selected").text(),
                    second_num = $(this).find(".second-num select option:selected").text(),
                    first_num_id = $('ul#class-change-sortable').find('input').filter(function() {return this.value == first_num;}).parents('.field-row').attr('data-field-id'),
                    second_num_id = $('ul#class-change-sortable').find('input').filter(function() {return this.value == second_num;}).parents('.field-row').attr('data-field-id'),
                    operation = $(this).find('.operations select option:selected').text();

                if (first_num == "Не выбрано" || second_num == "Не выбрано") {
                    $(document).addNotify('Выберите поля для подсчета.');
                    check = false;
                    return false;
                }
                if (first_num_id === undefined)
                    object['first_field'] = {type: "new", field: first_num};
                else if (first_num_id != temp_obj.first_field_id)
                    object['first_field'] = {type: "old", field: first_num_id};

                if (second_num_id === undefined)
                    object['second_field'] = {type: "new", field: second_num};
                else if (second_num_id != temp_obj.second_field_id)
                    object['second_field'] = {type: "old", field: second_num_id};

                if (operation != temp_obj.count_operation)
                    object['operations'] = operation;

            }
            else {
                object['value'] = $(this).find('.new_row_value input').val();
                if (object['type'] == "int" && !isInt(object['value'])) {
                    $(document).addNotify('Значение нового поля не соответствует типу.');
                    check = false;
                    return false;
                }
                if (object['value'].length == 0) {
                    $(document).addNotify('Укажите значения в новых полях.');
                    check = false;
                    return false;
                }
            }
            arrayData.push(object);
        }
    });
    if (!check) return check;
    else return {old: arrayChanged, new: arrayData, delete: delete_fields_id};
}

//открытие класса
function openClass(class_id, ready = false) {
    var
        url = location.href;
    objects = false;
    if ($('.class .general-item-1 .general-title-1[data-class-id=' + class_id + ']').length) {
        if (!ready) history.pushState('', null, url + "?class=" + class_id);
        let name = $('.class .general-item-1 .general-title-1[data-class-id=' + class_id + '] h3').html();
        $('.object .item-back p').html(name);
        $('.class').hide();
        $('.object').show();
        objects = ajax_query({
            handler: 'get_objects_list',
            data: {class_id}
        }, 'data');
        $('.object-list').html(objects);
        if ($('.object-list').has('.empty-block').length > 0)
            $('.add-object a').addClass('empty-block-button');
        else
            $('.add-object a').removeClass('empty-block-button');
        return true;
    } else history.pushState('', null, "/data");
    return false;
}

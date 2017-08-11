$(document).ready(function() {

    group_id = 0;
    deleted_users = [];
    urlData = getUrlVars();
    if (urlData['id'] !== undefined) {
        group_id = urlData['id'];
    }

    getFavData("class");

    $('.thin li a[href="/cab/my-group"]').parent().addClass('li-active');

    //Закрытие модального окна
    $('.item-closed').click(function() {
        $('.modal-block').fadeOut();
    });

    //Закрытие при нажатии за пределами модального окна
    $('.modal-block').click(function(e) {
        if (e.target !== this) return;
        $(this).fadeOut();
    });

    $('.add-member').click(function() {
        var
            parent = $('.modal-block-add-users');

        parent.find('.user-name input').val("");
        parent.find('.user-name input').show();
        parent.find('.redact-user-name').hide();
        parent.find('select#user-role option[value="0"]').prop("selected", true);
        parent.find('input[type="checkbox"]').prop("checked", false);
        parent.find('.item-title h3').html("Добавление пользователей в группу");
        parent.find('.add-memeber-to-group a').html("Добавить");
        parent.find('.add-member-to-group').attr('data-modal-type', "add");
        parent
            .css("display", "flex")
            .hide()
            .fadeIn();
    });

    $(document).on('click', '.add-member-to-group[data-modal-type="add"]', function() {
        add_member();
    });

    $(document).on('click', '.add-member-to-group[data-modal-type="redact"]',function() {
        redact_user($(this).attr('data-user-id'));
    });

    $(document).on('click', '.redact-user', function() {
        var
            id = $(this).attr('data-user-id'),
            parent = $('.modal-block-add-users'),
            name = $(this).parents('tr').find('td:first-child').html(),
            user_info = ajax_query({handler: 'get_user_info_by_group', data: {group_id, user_id: id}}, 'my-group', 'json');

        parent.find('.user-name input').hide();
        parent.find('.redact-user-name').show();
        parent.find('.redact-user-name').html(name);
        parent.find(`select#user-role option[value="${user_info['user_role']}"]`).prop("selected", true);
        if (user_info['objects_id'].length == 1 && user_info['objects_id'][0] == -2)
            parent.find('.check-objects-id input[type="checkbox"]').prop("checked", false);
        else if (user_info['objects_id'].length == 1 && user_info['objects_id'][0] == 0)
            parent.find('input#check_all_objects').prop("checked", true);
        else {
            user_info['objects_id'].forEach(function(item) {
                parent.find(`input[value="${item}"]`).prop('checked', true);
            });
        }

        if (user_info['reports_id'].length == 1 && user_info['reports_id'][0] == -2)
            parent.find('.check-reports-id input[type="checkbox"]').prop("checked", false);
        else if (user_info['reports_id'].length == 1 && user_info['reports_id'][0] == 0)
            parent.find('input#check_all_reports').prop("checked", true);
        else {
            user_info['reports_id'].forEach(function(item) {
                parent.find(`input#reports_${item}`).prop("checked", true);
            });
        }

        parent.find('.item-title h3').html("Редактирование пользователя");
        parent.find('.add-member-to-group a').html("Сохранить");
        parent.find('.add-member-to-group').attr('data-modal-type', "redact");
        parent.find('.add-member-to-group').attr('data-user-id', id);
        parent
            .css("display", "flex")
            .hide()
            .fadeIn();
    });

    $(document).on('click', '.delete-user', function() {
        var
            id = $(this).attr('data-user-id'),
            name = $(this).parents('tr').find('td:first-child').html(),
            delete_row = `<td class="deleted-user" colspan="5"><div>Пользователь ${name} удален.&nbsp;<p class="return-user">Восстановить</p></div></td>`;

        $(this).parents('tr').find('td').hide();
        $(this).parents('tr').append(delete_row);
        deleted_users.push(id);
    });

    $(document).on('click', '.return-user', function() {
        var
            parent = $(this).parents('tr'),
            id = parent.attr('data-user-id'),
            index = deleted_users.indexOf(id);

        if (index > -1)
            deleted_users.splice(index, 1);

        parent.find('td').show();
        parent.find('.deleted-user').remove();
    })

    //удаление при перезагрузке
    $(window).bind('beforeunload', function(e) {
        removeUsers();
        deleted_users = [];
    });

    //удаление при перезагрузке
    $(window).on('beforeunload', function(e) {
        removeUsers();
        deleted_users = [];
    });
});

function removeUsers() {
    if (deleted_users.length > 0)
        var result = ajax_query({handler: 'remove_users', data: {group_id, deleted_users}}, 'my-group', 'json');
}

function add_member() {
    var
        user_name = $('.user-name input').val(),
        status = $('select#user-role option:selected').val(),
        obj_rep = formUserData();

    if (user_name.length == 0)
        $(document).addNotify('Введите имя пользователя.');

    var data = {group_id, user_name, status, objects: obj_rep.objects, reports: obj_rep.reports};

    var result = ajax_query({handler: 'add_member_to_group', data}, 'my-group', 'json');

    if (result.result)
        return setNotice({result: true, notice: 'Пользователь успешно добавлен'}, function() {
            window.location.reload();
        });
    else
        $(document).addNotify(result.notice);
}

function redact_user(user_id) {
    var
        status = $('select#user-role option:selected').val(),
        obj_rep = formUserData();

    var data = {group_id, user_id, status, objects: obj_rep.objects, reports: obj_rep.reports};

    var result = ajax_query({handler: 'redact_member', data: data}, 'my-group', 'json');

    if (result.result)
        return setNotice({result: true, notice: 'Данные успешно измененны.'}, function() {
            window.location.reload();
        });
    else
        $(document).addNotify("Ошибка редактирования пользователя.");
}

function formUserData() {
    var
        objects = [-1],
        reports = [-1];

        // -2 - ни одного отчета/объекта, -1 - все + редактирование, 0 - все без редактирования
    if ($('input#check_all_objects') != undefined) {
        if ($('input#check_all_objects').prop('checked'))
            objects = [0];
        else {
            objects = [];
            $('input.objects-for-user:checked').each(function() {
                objects.push(parseInt($(this).val()));
            });
        }

        if (objects.length == 0) objects.push(-2);
    }

    if ($('input#check_all_objects') != undefined) {
        if ($('input#check_all_reports').prop('checked'))
            reports = [0];
        else {
            reports = [];
            $('input.reports-for-user:checked').each(function() {
                reports.push(parseInt($(this).val()));
            });
        }

        if (reports.length == 0) reports.push(-2);
    }

    return {objects, reports};
}

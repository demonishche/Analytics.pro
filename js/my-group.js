$(document).ready(function() {

    getFavData('group');

    $('.add-group').click(function() {
        $('.modal-block-add-group')
            .css('display', 'flex')
            .hide()
            .fadeIn();
    });

    $('.create-group').click(function() {
        createGroup();
    });

    //удаление/редактирование группы
    $(document).on('click', '.group .show-more', function() {
        var
            id = $(this).parents('.group').attr('data-group-id'),
            name = $(this).parents('.group').find('.title h5').html(),
            delete_card = $('.modal-block-delete'),
            change_card = $('.modal-change-name');

        delete_card.attr('data-group-id', id);
        delete_card.find('.modal-content h4').html('Удалить группу '' + name + ''');
        change_card.attr('data-group-id', id);
        change_card.find('input#name-to-change').val(name);
    });

    //удаление группы
    $(document).on('click', '.delete-group', function() {
        var id = $(this).parents('.modal-block').attr('data-group-id');
        var res = ajax_query({
                handler: 'delete_group',
                data: {group_id: id}
            }, 'my-group', 'json');
        if (res == true) {
            setNotice({
                result: true,
                notice: 'Группа успешно удалена'
            }, function() {
                window.location.reload();
            });
        } else {
            $(document).addNotify('Произошла ошибка при удалении группы.');
        }
        $('.modal-block-delete').fadeOut();
    });

    // изменение имени класса
    $(document).on('click', '.save-changes', function() {
        var
        id = $(this).parents('.modal-block').attr('data-group-id'),
        name = $(this).parents('.modal-block').find('input#name-to-change').val(),
        prev_name = $('.group[data-group-id='' + id + ''] .title h5').html();

        if (name == prev_name || name.length == 0) {
            $(document).addNotify('Вы ввели неверные данные.');
        } else {
            var res = ajax_query({
                handler: 'change_group_name',
                data: {
                    group_id: id,
                    group_name: name
                }
            }, 'my-group', 'json');
            if (res == true) {
                setNotice({
                    result: true,
                    notice: 'Имя группы успешно изменено.'
                }, function() {
                    window.location.reload();
                });
            } else {
                $(document).addNotify('Произошла ошибка при изменении имени группы.');
            }
            $('.modal-change-name').fadeOut();
        }
    });
});

function createGroup() {
    var group_name = $('.group-name input').val(),
        classes = [],
        all_objects = $('input#all_objects').prop('checked'),
        all_reports = $('input#all_reports').prop('checked'),
        check = true;

    if ($('input#check_all_classes').prop('checked'))
        classes.push(0);
    else {
        $('.classes-in-group').each(function() {
            if ($(this).prop('checked'))
                classes.push(parseInt($(this).val()));
        });
    }

    if (classes.length == 0) {
        check = false;
        $(document).addNotify('Выберите классы для группы.');
    }

    if (group_name.length == 0) {
        check = false;
        $(document).addNotify('Введите имя группы.');
    }

    if (check) {
        var result = ajax_query({
            handler: 'create_group',
            data: {
                group_name,
                classes,
                all_objects,
                all_reports
            }
        }, 'my-group', 'json');

        if (result)
            return setNotice({
                result: true,
                notice: 'Группа успешно создана.'
            }, function() {
                window.location.reload();
            });

        return setNotice({
            result: false,
            notice: 'Произошла ошибка при создании группы.'
        }, function() {
            window.location.reload();
        });
    }

}

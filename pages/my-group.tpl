<main>
    <section>
        <div class="block">
            <div class="full">
                <div class="button-block p0">
                        <button class="md-button silver w100 add-group">Добавить группу</button>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="full">
                <div class="block-title text-center">
                    <h4>Мои группы</h4>
                </div>
                {{BLOCK:GROUP_LIST}}
                <div class="block-row">
                    <h3 class="empty">У вас нет групп. Чтобы создать нажмите на кнопку "Добавить группу".</h3>
                </div>
                {{END_BLOCK:GROUP_LIST}}
                <div class="block-row">
                    {{LOOP:GROUP_LIST}}
                    <div class="group" data-group-id="{{LOOP_VAR:GROUP_ID}}">
                        <div class="title">
                            <h5>{{LOOP_VAR:GROUP_NAME}}</h5>
                            <div class="float-right show-more">
                                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                            </div>
                            <div class="float-right favorite not-checked" data-fav-type="{{VAR:FAV_TYPE}}" data-elem-id="{{LOOP_VAR:GROUP_ID}}">
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="content">
                            <div class="info">
                                <div class="author">
                                    {{LOOP_VAR:USER_LOGIN}}
                                </div>
                                <div class="date float-right">
                                    {{LOOP_VAR:CREATE_TIME}}
                                </div>
                            </div>
                        </div>
                        <div class="button-block p0">
                            <a href="/group/?id={{LOOP_VAR:GROUP_ID}}" class="w100">
                                <button class="md-button green w100 b-r-bottom">Открыть</button>
                            </a>
                        </div>
                    </div>
                    {{END_LOOP:GROUP_LIST}}
                </div>
            </div>
        </div>
        <div class="block">
            <div class="full">
                <div class="block-title text-center">
                    <h4>Группы в которых я состою</h4>
                </div>
                {{BLOCK:GROUP_CONSIST_LIST}}
                <div class="block-row">
                    <h3 class="empty">Вы не состоите в других группах.</h3>
                </div>
                {{END_BLOCK:GROUP_CONSIST_LIST}}
                <div class="block-row">
                    {{LOOP:GROUP_CONSIST_LIST}}
                    <div class="group" data-group-id="{{LOOP_VAR:GROUP_ID}}">
                        <div class="title">
                            <h5>{{LOOP_VAR:GROUP_NAME}}</h5>
                            <div class="float-right favorite not-checked" data-fav-type="{{VAR:FAV_TYPE}}" data-elem-id="{{LOOP_VAR:GROUP_ID}}">
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="content">
                            <div class="info">
                                <div class="author">
                                    {{LOOP_VAR:USER_LOGIN}}
                                </div>
                                <div class="date float-right">
                                    {{LOOP_VAR:CREATE_TIME}}
                                </div>
                            </div>
                        </div>
                        <div class="button-block p0">
                            <a href="/group/?id={{LOOP_VAR:GROUP_ID}}" class="w100">
                                <button class="md-button green w100 b-r-bottom">Открыть</button>
                            </a>
                        </div>
                    </div>
                    {{END_LOOP:GROUP_CONSIST_LIST}}
                </div>
            </div>
        </div>
    </section>
</main>

<div class="modal-block modal-block-add-group">
	<div id="modal-add-group">
		<div class="block-title">
            <h4>Создание новой группы</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        {{BLOCK:HAVE_NOT_CLASSES}}
            <div class="modal-content">
                <div class="modal-content-row have_not_class">
    				<h4>Вы не можете создать группу без наличия классов.
                        Чтобы довабить классы перейдите на вкладку "Структуры данных"</h4>
    			</div>
            </div>
        {{END_BLOCK:HAVE_NOT_CLASSES}}
        {{BLOCK:HAVE_CLASSES}}
		<div class="modal-content">
			<div class="modal-content-row group-name">
				<h4>Имя группы</h4><br>
				<input class="input" type="text">
			</div>
			<div class="modal-content-row check-classes-id">
				<h3>Выберите классы: </h3>
				<div>
					<input type="checkbox" value="0" name="check_all_classes" id="check_all_classes">
					<label for="check_all_classes">Все классы</label>
				</div>
				{{LOOP:USER_CLASSES}}
				<div>
					<input type="checkbox" class="classes-in-group" value="{{LOOP_VAR:CLASS_ID}}" id="class_{{LOOP_VAR:CLASS_ID}}" name="class_{{LOOP_VAR:CLASS_ID}}">
					<label for="class_{{LOOP_VAR:CLASS_ID}}">{{LOOP_VAR:CLASS_NAME}}</label>
				</div>
				{{END_LOOP:USER_CLASSES}}
			</div>
			<div class="modal-content-row sec-settings">
				<h3>Дополнительные настройки: </h3>
				<div>
					<input type="checkbox" name="all_objects" id="all_objects">
					<label for="all_objects">Использовать все объекты <span>(Участникам группы будут доступны все объекты)</span></label>
				</div>
				<div>
					<input type="checkbox" name="all_reports" id="all_reports">
					<label for="all_reports">Использовать все отчеты <span>(Участникам группы будут доступны все отчеты)</span></label>
				</div>
			</div>
		</div>
		<div class="button-block text-center">
            <button class="md-button green create-group">Добавить</button>
        </div>
        {{END_BLOCK:HAVE_CLASSES}}
	</div>
</div>

<div class="modal-block modal-block-delete" data-group-id="">
    <div id="modal-delete-group">
        <div class="block-title">
            <h4>Удалить группу</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content">
            <h4>Удалить группу ""</h4>
        </div>
        <div class="button-block text-center">
            <button class="md-button green delete-group">Удалить</button>
        </div>
    </div>
</div>

<div class="modal-block modal-change-name">
    <div id="modal-change-name">
        <div class="block-title">
            <h4>Изменение имени</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content">
            <input class="input" id="name-to-change" type="text" value="">
        </div>
        <div class="button-block text-center">
            <button class="md-button green save-changes">Сохранить</button>
        </div>
    </div>
</div>

<main>
    <section>
        <div class="block">
            <div class="full">
                <div class="block-title text-center">
                    <h4>{{VAR:GROUP_NAME}}</h4>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="full">
                <div class="group-info">
                <div class="left-block">
                    <label>Дата создания</label>
                    <p>
                        {{VAR:CREATE_TIME}}
                    </p>
                </div>
                <div class="invite">
                    {{BLOCK:USER_GROUP_ADMIN}}
                    <div class="button-block p0">
                        <button class="md-button green add-member">Пригласить пользователей</button>
                    </div>
                    {{END_BLOCK:USER_GROUP_ADMIN}}
                </div>
                <div class="admin-info">
                {{BLOCK:USER_GROUP_CREATOR}}
                    <h3>Вы создатель группы</h3>
                {{END_BLOCK:USER_GROUP_CREATOR}}
                {{BLOCK:GROUP_USERS}}
                    <h3>Создатель группы: <span>{{VAR:ADMIN_USERNAME}}</span></h3>
                {{END_BLOCK:GROUP_USERS}}
                </div>
            </div>
            </div>
        </div>
        <div class="block">
            <div class="full">
                {{LOOP:CLASSES_LIST}}
                    <div class="group" data-class-id="{{LOOP_VAR:CLASS_ID}}">
                        <div class="title">
                            <h5>{{LOOP_VAR:CLASS_NAME}}</h5>
                            <div class="float-right favorite not-checked" data-fav-type="class" data-elem-id="{{LOOP_VAR:CLASS_ID}}">
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="content">
                            <div class="info">
                                <div class="author">
                                    {{LOOP_VAR:USER_NAME_CLASS}}
                                </div>
                                <div class="date float-right">
                                    {{LOOP_VAR:CLASS_TIME}}
                                </div>
                            </div>
                        </div>
                        <div class="button-block p0">
                            <a href="/class-reports/?id={{LOOP_VAR:CLASS_ID}}" class="w50">
                                <button class="md-button green w100 b-r-l-bottom">Отчеты</button>
                            </a>
                            <a href="/class-objects/?id={{LOOP_VAR:CLASS_ID}}" class="w50">
                                <button class="md-button green w100 b-r-r-bottom">Открыть</button>
                            </a>
                        </div>
                    </div>
                    {{END_LOOP:CLASSES_LIST}}
            </div>
        </div>
        <div class="block">
            <div class="full">
                <div class="block-title text-center">
                    <h4>Участники группы: <span>{{VAR:GROUP_NAME}}</span></h4>
                </div>
                <div class="block-row">
            <table class="tables data-table">
                <thead>
                    <tr>
                        <th>Логин</th>
                        <th>E-mail</th>
                        <th>Статус</th>
                        <th>Дата вступления</th>
                        {{BLOCK:USER_GROUP_ADMIN}}
                        <th></th>
                        {{END_BLOCK:USER_GROUP_ADMIN}}
                    </tr>
                </thead>
                <tbody>
                    {{BLOCK:GROUP_MEMBERS}}
                    <tr>
                        <td colspan="5" class="empty-users">В группе нету участников.</td>
                    </tr>
                    {{END_BLOCK:GROUP_MEMBERS}}
                    {{BLOCK:INFO_ABOUT_ADMIN}}
                    <tr>
                        <td>
                            {{VAR:USER_ADMIN_NAME}}
                        </td>
                        <td>
                            {{VAR:USER_ADMIN_EMAIL}}
                        </td>
                        <td data-user-role="2">
                            Создатель
                        </td>
                        <td>
                            {{VAR:ENTRY_ADMIN_TIME}}
                        </td>
                        {{BLOCK:USER_GROUP_ADMIN}}
                        <td></td>
                        {{END_BLOCK:USER_GROUP_ADMIN}}
                    </tr>
                    {{END_BLOCK:INFO_ABOUT_ADMIN}}
                    {{LOOP:GROUP_MEMBERS}}
                    <tr data-user-id="{{LOOP_VAR:INVITED_USER_ID}}">
                        <td>
                            {{LOOP_VAR:USER_NAME}}
                        </td>
                        <td>
                            {{LOOP_VAR:USER_EMAIL}}
                        </td>
                        <td data-user-role="{{LOOP_VAR:USER_ROLE}}">
                            {{LOOP_VAR:USER_ROLE_TEXT}}
                        </td>
                        <td>
                            {{LOOP_VAR:ENTRY_TIME}}
                        </td>
                        {{BLOCK:USER_GROUP_ADMIN}}
                        <td class="redact-td">
                            <div>
                                <p class="redact-user" data-user-id="{{LOOP_VAR:INVITED_USER_ID}}">Редактировать</p>
                                <p class="delete-user" data-user-id="{{LOOP_VAR:INVITED_USER_ID}}">Удалить</p>
                            </div>
                        </td>
                        {{END_BLOCK:USER_GROUP_ADMIN}}
                    </tr>
                    {{END_LOOP:GROUP_MEMBERS}}
                </tbody>
            </table>
        </div>
            </div>
        </div>
    </section>
</main>

{{BLOCK:USER_GROUP_ADMIN}}
<div class="modal-block modal-block-add-users">
	<div id="modal-add-group">
        <div class="block-title">
            <h4>Добавление пользователей в группу</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content">
    		<div class="modal-content-row user-name">
    			<h4>Имя пользователя</h4><br>
                <h3 class="redact-user-name"></h3>
    			<input class="input" type="text">
    		</div>
            <div class="modal-content-row user-role">
                <h3>Статус пользователя: </h3>
                <div class="styled-select">
                    <select id="user-role">
                        <option value="0">Пользователь</option>
                        <option value="1">Модератор</option>
                    </select>
                </div>
            </div>
            {{BLOCK:NOT_FREE_OBJECTS}}
    		<div class="modal-content-row check-objects-id">
                <h3>Объекты доступные пользователю:</h3>
    			<div>
    				<input type="checkbox" value="0" name="check_all_objects" id="check_all_objects">
    				<label for="check_all_objects">Все объекты</label>
    			</div>
                {{BLOCK:EMPTY_OBJECT_CLASSES_LIST}}
                    <p class="warning">У Вас еще нету объектов.</p>
                {{END_BLOCK:EMPTY_OBJECT_CLASSES_LIST}}
                {{BLOCK:NOT_EMPTY_OBJECTS_CLASSES_LIST}}
                <div class="classes-list">
                    {{LOOP:CLASSES_OBJECTS}}
                    {{BLOCK:CLASS_WITH_OBJECTS_{{LOOP_VAR:CLASS_ID}}}}
                    <div class="class-objects" data-class-id="{{LOOP_VAR:CLASS_ID}}">
                        <p>Класс: {{LOOP_VAR:CLASS_NAME}}</p>
                        <div class="objects-order-list">
                            {{LOOP:OBJECTS_CLASS_{{LOOP_VAR:CLASS_ID}}}}
                            <div>
                				<input type="checkbox" class="objects-for-user" value="{{LOOP_VAR:OBJ_ID}}" id="object_{{LOOP_VAR:OBJ_ID}}" name="object_{{VAR:OBJ_ID}}">
                				<label for="object_{{LOOP_VAR:OBJ_ID}}">{{LOOP_VAR:OBJ_NAME}}</label>
                			</div>
                            {{END_LOOP:OBJECTS_CLASS_{{LOOP_VAR:CLASS_ID}}}}
                        </div>
                    </div>
                    {{END_BLOCK:CLASS_WITH_OBJECTS_{{LOOP_VAR:CLASS_ID}}}}
                    {{END_LOOP:CLASSES_OBJECTS}}
                </div>
                {{END_BLOCK:NOT_EMPTY_OBJECTS_CLASSES_LIST}}
    		</div>
            {{END_BLOCK:NOT_FREE_OBJECTS}}
            {{BLOCK:NOT_FREE_REPORTS}}
            <div class="modal-content-row check-reports-id">
                <h3>Отчеты доступные пользователю:</h3>
    			<div>
    				<input type="checkbox" value="0" name="check_all_reports" id="check_all_reports">
    				<label for="check_all_reports">Все очеты</label>
    			</div>
                {{BLOCK:EMPTY_REPORTS_CLASSES_LIST}}
                <p class="warning">У Вас еще нету отчетов.</p>
                {{END_BLOCK:EMPTY_REPORTS_CLASSES_LIST}}
                {{BLOCK:NOT_EMPTY_REPORTS_CLASSES_LIST}}
                <div class="classes-list">
                    {{LOOP:CLASSES_REPORTS}}
                    {{BLOCK:CLASS_WITH_REPORTS_{{VAR:CLASS_ID}}}}
                    <div class="class-reports" data-class-id="{{LOOP_VAR:CLASS_ID}}">
                        <p>Класс: {{LOOP_VAR:CLASS_NAME}}</p>
                        <div class="objects-order-list">
                            {{LOOP:REPORTS_CLASS_{{LOOP_VAR:CLASS_ID}}}}
                            <div>
                				<input type="checkbox" class="reports-for-user" value="{{LOOP_VAR:REPORT_ID}}" id="reports_{{LOOP_VAR:REPORT_ID}}" name="reports_{{VAR:REPORT_ID}}">
                				<label for="reports_{{LOOP_VAR:REPORT_ID}}">{{LOOP_VAR:REPORT_NAME}}</label>
                			</div>
                            {{END_LOOP:REPORTS_CLASS_{{LOOP_VAR:CLASS_ID}}}}
                        </div>
                    </div>
                    {{END_BLOCK:CLASS_WITH_REPORTS_{{LOOP_VAR:CLASS_ID}}}}
                    {{END_LOOP:CLASSES_REPORTS}}
                </div>
                {{END_BLOCK:NOT_EMPTY_REPORTS_CLASSES_LIST}}
    		</div>
            {{END_BLOCK:NOT_FREE_REPORTS}}
        </div>
        <div class="button-block text-center">
            <button class="md-button green add-member-to-group">Добавить</button>
        </div>
	</div>
</div>
{{END_BLOCK:USER_GROUP_ADMIN}}

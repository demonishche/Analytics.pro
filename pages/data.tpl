<main>
    <section>
        <div class="block">
            <div class="full">
                <div class="button-block p0">
                        <button class="md-button silver w100 add-class">Добавить класс</button>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="full">
                <div class="block-title text-center">
                    <h4>Мои классы</h4>
                </div>
                {{BLOCK:CLASS_LIST_OF_USER}}
                <div class="block-row">
                    <h3 class="empty">У вас не ни одного класса. Чтобы добавить нажмите на кнопку "Добавить".</h3>
                </div>
                {{END_BLOCK:CLASS_LIST_OF_USER}}
                <div class="block-row">
                    {{LOOP:CLASS_LIST_OF_USER}}
                    <div class="group" data-class-id="{{LOOP_VAR:CLASS_ID}}">
                        <div class="title">
                            <h5>{{LOOP_VAR:CLASS_NAME}}</h5>
                            <div class="float-right show-more">
                                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                            </div>
                            <div class="float-right favorite not-checked" data-fav-type="{{VAR:FAV_TYPE}}" data-elem-id="{{LOOP_VAR:CLASS_ID}}">
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="content">
                            <div class="info">
                                <div class="author">
                                    {{LOOP_VAR:USER_LOGIN}}
                                </div>
                                <div class="date float-right">
                                    {{LOOP_VAR:CLASS_TIME}}
                                </div>
                            </div>
                            <div class="field">
                                <ul>
                                    {{LOOP_INNER:CLASS_FIELDS}}
                                    <li>{{LOOP_VAR:FIELD_NAME}}</li>
                                    {{END_LOOP_INNER:CLASS_FIELDS}}
                                </ul>
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
                    {{END_LOOP:CLASS_LIST_OF_USER}}
                </div>
            </div>
        </div>
        <div class="block">
            <div class="full">
                <div class="block-title text-center">
                    <h4>Классы моих групп</h4>
                </div>
                {{BLOCK:CLASS_LIST_OF_USER_GROUP}}
                <div class="block-row">
                    <h3 class="empty">Вы не состоите в группах</h3>
                </div>
                {{END_BLOCK:CLASS_LIST_OF_USER_GROUP}}
                <div class="block-row">
                    {{LOOP:CLASS_LIST_OF_USER_GROUP}}
                    <div class="group" data-class-id="{{LOOP_VAR:CLASS_ID}}">
                        <div class="title">
                            <h5>{{LOOP_VAR:CLASS_NAME}}</h5>
                            <!-- <div class="float-right show-more">
                                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                            </div> -->
                            <div class="float-right favorite not-checked" data-fav-type="{{VAR:FAV_TYPE}}" data-elem-id="{{LOOP_VAR:CLASS_ID}}">
                                <i class="fa fa-star-o" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="content">
                            <div class="info">
                                <div class="author">
                                    {{LOOP_VAR:USER_LOGIN}}
                                </div>
                                <div class="date float-right">
                                    {{LOOP_VAR:CLASS_TIME}}
                                </div>
                            </div>
                            <div class="field">
                                <ul>
                                    {{LOOP_INNER:CLASS_FIELDS}}
                                    <li>{{LOOP_VAR:FIELD_NAME}}</li>
                                    {{END_LOOP_INNER:CLASS_FIELDS}}
                                </ul>
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
                    {{END_LOOP:CLASS_LIST_OF_USER_GROUP}}
                </div>
            </div>
        </div>
    </section>
</main>

<div class="modal-block modal-block-add-class">
    <div id=''>
        <div class="block-title">
            <h4>Добавление нового класса</h4>
            <div class="close-icon close-modal">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class='modal-content'>
            <p>Имя класса</p>
            <input class='input class-name' type="text" />
            <i class="fa fa-plus-circle add-line w100" aria-hidden="true"></i>
            <ul id="sortable">
                <div class="field-row">
                    <div class="single-field b-r">
                        <div class="top">
                            <i class="fa fa-bars" aria-hidden="true"></i>
                            <input type="text" name="field-name" class="input">
                            <div class="styled-select form-type">
                                <select>
						            <option value="int">Числовой</option>
						            <option value="double">Дробный</option>
						            <option value="string">Текстовый</option>
						            <option value="count" disabled>Подсчет</option>
					        	</select>
                            </div>
                            <i class="fa fa-close" aria-hidden="true"></i>
                        </div>
                        <div class="bottom">
                            <div class="styled-select first-num num">
                                <select>
    				                <option>Не выбрано</option>
    				            </select>
                            </div>
                            <div class="styled-select operations">
                                <select>
					                <option>+</option>
					                <option>-</option>
					                <option>*</option>
					                <option>/</option>
					            </select>
                            </div>
                            <div class="styled-select second-num num">
                                <select>
					                <option>Не выбрано</option>
					            </select>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        <div class="button-block text-center">
            <button class="md-button green create-class">Добавить</button>
        </div>
    </div>
</div>

<div class="modal-block modal-block-delete" data-class-id="">
    <div id=''>
        <div class="block-title">
            <h4>Удалить класс</h4>
            <div class="close-icon close-modal">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class='modal-content'>
            <h4>Удалить класс "Название класса"</h4>
        </div>
        <div class="button-block text-center">
            <button class="md-button green delete-button">Удалить</button>
        </div>
    </div>
</div>
<div class="modal-block modal-class-change" data-class-id="">
    <div id="">
        <div class="block-title">
            <h4>Редактирование класса</h4>
            <div class="close-icon close-modal">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class='modal-content'>
            <p>Имя класса</p>
            <input class='input name-to-change' type="text" />
            <i class="fa fa-plus-circle add-line-redact w100" aria-hidden="true"></i>
            <ul id="class-change-sortable">
                <div class="field-row">
                    <div class="single-field b-r">
                        <div class="top">
                            <i class="fa fa-bars" aria-hidden="true"></i>
                            <input type="text" name="field-name" class="input">
                            <div class="styled-select form-type">
                                <select>
						            <option value="int">Числовой</option>
						            <option value="double">Дробный</option>
						            <option value="string">Текстовый</option>
						            <option value="count" disabled>Подсчет</option>
					        	</select>
                            </div>
                            <i class="fa fa-close" aria-hidden="true"></i>
                        </div>
                        <div class="bottom">
                            <div class="styled-select first-num num">
                                <select>
    				                <option>Не выбрано</option>
    				            </select>
                            </div>
                            <div class="styled-select operations">
                                <select>
					                <option>+</option>
					                <option>-</option>
					                <option>*</option>
					                <option>/</option>
					            </select>
                            </div>
                            <div class="styled-select second-num num">
                                <select>
					                <option>Не выбрано</option>
					            </select>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        <div class="button-block text-center">
            <button class="md-button green save-changes-button">Сохранить</button>
        </div>
    </div>
</div>

<div class="flag">
    <div class="flag-content">
        <p class='out' id="delete">Удалить</p>
        <p class='out' id="redact_class">Редактировать</p>
    </div>
    <div class="arrow"></div>
</div>

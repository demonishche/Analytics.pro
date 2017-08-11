<main>
    <section>
    	<div class="block">
			<div class="full">
				<div class="block-title text-center">
					<h4>{{VAR:CLASS_NAME}}</h4>
				</div>
			</div>
		</div>
		{{BLOCK:GROUP_ADMIN}}
        <div class="block">
			<div class="full">
				<div class="button-block p0">
		             <button class="md-button silver w100 add-report">Добавить отчет</button>
		        </div>
			</div>
		</div>
        {{END_BLOCK:GROUP_ADMIN}}
        <div class="block">
				<div class="full">
					{{BLOCK:GROUP_ADMIN}}
		            {{BLOCK:REPORTS_LIST}}
		                <div class="block-title text-center">
		                    <h4>У вас не ни одного отчета. Чтобы добавить нажмите на кнопку "Добавить отчет".</h4>
		                </div>
		            {{END_BLOCK:REPORTS_LIST}}
		            {{END_BLOCK:GROUP_ADMIN}}
					<div class="block-row">
						{{LOOP:REPORTS_LIST}}
						<div class="group" data-report-id="{{LOOP_VAR:REPORT_ID}}">
							<div class="title">
								<h5>{{LOOP_VAR:REPORT_NAME}}</h5>
								{{BLOCK:GROUP_ADMIN}}
								<div class="float-right show-more">
									<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
								</div>
								{{END_BLOCK:GROUP_ADMIN}}
								<div class="float-right favorite not-checked" data-fav-type="{{VAR:FAV_TYPE}}" data-elem-id="{{LOOP_VAR:REPORT_ID}}">
                                	<i class="fa fa-star-o" aria-hidden="true"></i>
                            	</div>
							</div>
							<div class="content">
								<div class="info">
									<div class="author">
										{{LOOP_VAR:USER_LOGIN}}
									</div>
									<div class="date float-right">
										{{LOOP_VAR:REPORT_TIME}}
									</div>
								</div>
							</div>
							<div class="button-block p0">
								<a href="/report/?id={{LOOP_VAR:REPORT_ID}}" class="w100">
									<button class="md-button green w100 b-r-bottom">Открыть</button>
								</a>
							</div>
						</div>
						{{END_LOOP:REPORTS_LIST}}
					</div>
				</div>
			</div>
    </section>
</main>

{{BLOCK:GROUP_ADMIN}}
<div class="modal-block modal-block-add-report">
    <div id="modal-add-report">
        <div class="block-title">
            <h4>Добавление нового отчёта</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content">
            <div class="modal-content-row report-name">
                <h4>Имя отчета</h4><br>
                <input class="input" type="text">
            </div>
            <div class="modal-content-row report-period">
                <div>
                    <label for="report_period">Период: </label>
                    <div class="styled-select report_period">
                        <select name="report_period" id="report_period">
                            <option value="1">Дневной</option>
                            <option value="2">Недельный</option>
                            <option value="3">Месячный</option>
                            <option value="4">Квартальный</option>
                            <option value="5">Годовой</option>
                        </select>
                    </div>
                </div>
                <div class="use-object-name">
                    <input type="checkbox" name="use-object-name" id="use-object-name">
                    <label for="use-object-name">Разделять объекты</label>
                </div>
            </div>
            <div class="modal-content-row objects-for-report">
                <div class="object-for-report">
                    <input type="checkbox" name="check-object" id="obj0" checked="checked">
                    <label for="obj0">Использовать все объекты</label>
                </div>
                {{LOOP:OBJECTS_FOR_REPORT}}
                <div class="object-for-report">
                    <input type="checkbox" name="check-object" id="obj{{LOOP_VAR:OBJ_ID}}" checked="checked">
                    <label for="obj{{LOOP_VAR:OBJ_ID}}">{{LOOP_VAR:OBJ_NAME}}</label>
                </div>
                {{END_LOOP:OBJECTS_FOR_REPORT}}
            </div>
            <div class="modal-content-row fields-for-report">
                {{LOOP:FIELDS_FOR_REPORT}}
                <div class="field-for-report" data-field-id="{{LOOP_VAR:FIELD_ID}}">
                    <input type="checkbox" checked="checked" name="choosen-field" id="fid{{LOOP_VAR:FIELD_ID}}">
                    <label for="fid{{LOOP_VAR:FIELD_ID}}">{{LOOP_VAR:FIELD_NAME}}</label>
                    <div class="styled-select how_to_calc">
                        <select name="how_to_calc" id="how_to_calc">
                            <option value="summ">Сумма</option>
                            <option value="diff">Разница</option>
                            <option value="last">Последнее значение</option>
                        </select>
                    </div>
                </div>
                {{END_LOOP:FIELDS_FOR_REPORT}}
            </div>
            {{BLOCK:HAVE_TEXT_FIELDS}}
            <div class="modal-content-row text-field">
                <input type="checkbox" name="without-text-field" id="without-text-field">
                <label style="width: 90%;" for="without-text-field">Не использовать текстовые поля</label>
                <div class="styled-select text-field">
                    <select name="text-field" id="text-field">
                        {{LOOP:TEXT_FIELDS}}
                            <option value='fid{{LOOP_VAR:FIELD_ID}}'>{{LOOP_VAR:FIELD_NAME}}</option>
                        {{END_LOOP:TEXT_FIELDS}}
                    </select>
                </div>
            </div>
            {{END_BLOCK:HAVE_TEXT_FIELDS}}
        </div>
        <div class="button-block text-center">
            <button class="md-button green add-report-data">Добавить</button>
        </div>
    </div>
</div>

<div class="modal-block modal-block-delete" data-report-id="">
    <div id="modal-delete-object">
        <div class="block-title">
            <h4>Удалить отчет</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content">
            <h4>Удалить отчет ""</h4>
        </div>
        <div class="button-block text-center">
            <button class="md-button green delete-report">Удалить</button>
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
{{END_BLOCK:GROUP_ADMIN}}

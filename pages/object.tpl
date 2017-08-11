<!-- <div class="load-block">
    <img src="http://i.piccy.info/i9/732f637dae4eca6b3f99e414f4470083/1473757714/3383/1069571/spinner.png" alt="">
</div> -->
<div class="modal-block modal-block-add-object" id="modal-add-object-data">
    <div id="modal-add-object">
        <!-- <div class="item-title">
            <h3>Добавление новых данных</h3>
            <div class="item-closed" onclick="$('.modal-block').fadeOut(); $('.complex-object-data tbody tr').remove();">
                <span class="icon-close"></span>
            </div>
        </div> -->
        <div class="block-title">
            <h4>Добавление новых данных</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content complex">
            <div class="type-of-complex-object">
                <input type="checkbox" value="one-date" name="one-date" id="one-date" checked="checked">
                <label for="one-date">Общая дата</label>
            </div>
            <div class="object-data-item one-date-block" data-object-data-id="row_time" data-field-type="date">
                <p class="object-data-item-name one-date-title">Дата</p>
                <input type="text" class="input one-date-value" name="object-data-date" id="object-data-date"><input class="input one-time-value" type="time">
            </div>
            <div class="complex-object-data-block">
                <table class="complex-object-data data-model">
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <div class="button-add add-object-field" >
                <i class="fa fa-plus-circle add-line w100" aria-hidden="true"></i>
            </div>
        </div>
        <div class="button-block text-center">
            <button class="md-button green" onclick="addData()">Добавить</button>
        </div>
    </div>
</div>
<div class="modal-block modal-block-redact-object" id="modal-redact-object-data">
    <div id="modal-redact-object">
        <div class="block-title">
            <h4>Редактирование данных</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content complex">
            <div class="complex-object-data-redact-block">
                <table class="complex-object-data-redact data-model">
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
        <div class="button-block text-center">
            <button class="md-button green" onclick="redact_data()">Редактировать</button>
        </div>
    </div>
</div>
<div class="modal-block zoom-chart">
    <div id="">
        <div class="block-title">
            <h4>График</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content big-chart">

        </div>
    </div>
</div>

<main>
    <section>
    	<div class="block">
			<div class="full">
				<div class="block-title text-center object-name">
					<h4></h4>
				</div>
			</div>
		</div>
        <div class="block">
			<div class="full">
				<div class="button-block p0">
	                <button class="md-button silver w100 add-object-data" onclick="showModalAdd()">Добавить данные</button>
		        </div>
			</div>
		</div>
		<div class="block empty-block">
			<div class="full">
				<div class="block-title text-center">
					<h4>Объект не содержит данные. Чтобы добавить нажмите на кнопку "Добавить".</h4>
				</div>
			</div>
		</div>
		<div class="block not-empty-object">
			<div class="full chart-block">
				<div class="chart">
	                <div id="schedule">
	                    <div id="container2" style="min-width: 740px; height: 325px;"></div>
	                </div>
                </div>
                <div class="chart-settings">
                    <div class="button-block text-center zoom-chart-button">
			            <button class="md-button green w100"><i class="fa fa-search-plus" aria-hidden="true"></i>Увеличить график</button>
			        </div>
                    <div class="chart-period">
                        <p>Выберите период:</p>
                        <div>
                            <input type="text" name="datepicker-from" id="datepicker-from" class="input datepicker-from" readonly>
                            <label for="datepicker-from"><i class="fa fa-calendar" aria-hidden="true"></i></label>
                            <input type="time" name="time-from" id="time-from" class="input time-from time">
                        </div>
                        <div>
                            <input type="text" name="datepicker-to" id="datepicker-to" class="input datepicker-to" readonly>
                            <label for="datepicker-to"><i class="fa fa-calendar" aria-hidden="true"></i></label>
                            <input type="time" name="time-to" id="time-from" class="input time-to time">
                        </div>
                    </div>
                    <div class="complex chart-fields-setting">
                        <p>Введите параметр поля, по которому построить график:</p>
                        <div class="chart-field-param-setting">
                            <div class="styled-select">
                                <select name="field-name" id="field-name">

                                </select>
                            </div>
                            <input type="text" name="field-prop-name" id="field-prop-name" class="input">
                        </div>
                    </div>
                    <div class="button-block text-center build-chart">
			            <button class="md-button green w100">Построить график</button>
			        </div>
            	</div>
        	</div>
		</div>
		<div class="block">
			<div class="full">
				<div class="not-empty-object nav-data">
		            <div class="search-block">
		                <div class="search-data">
		                    <div class="styled-select chart-data">
		                        <select>
		                    <option value="0">Дата</option>
		                </select>
		                    </div>
		                    <input type="text" id="num-search" class="input search" name="search-text" onkeyup="searchData()">
		                    <input type="text" id="date-search" class="input search" name="search-text">
		                    <i class="fa fa-search search" onClick="searchData()" aria-hidden="true"></i>
		                </div>
		                <i class="fa fa-search open-search" aria-hidden="true"></i>
		                <i class="fa fa-times close-search" aria-hidden="true" style="display: none;"></i>
		            </div>
		            <div class="paginator">
		                <div class="paginator-buttons">
		                    <button id='first' name=''>Начало</button>
		                    <button id='prev' name=''><</button>
		                    <button id='before' name=''>1</button>
		                    <button id="current">2</button>
		                    <button id="after" name="">3</button>
		                    <button id='next' name=''>></button>
		                    <button id="last" name="">Последняя</button>
		                </div>
		                <div class="data-count">
		                    <label for="data-count">Кол-во записей на странице:</label>
		                    <input type="number" id="data-count" class="input" name="data-count" min="1" value="10">
		                </div>
		                <p class="reset-settings" onclick="resetSettings()">Сброс</p>
		            </div>
        		</div>
			</div>
		</div>
		<div class="block not-empty-object">
			<div class="full">
				<div class="config-bar nav-data">
		            <div class="first-config-block">
		                <div class="check-all-block">
		                    <input class="check-all" id="check-all" type="checkbox"><label for="check-all">Выделить все</label>
		                </div>
		                <div class="general-data-block">
		                    <input class="check-general-data" id="check-general-data" type="checkbox" onChange="makeTableComplexFormat();"><label for="check-general-data">Общая дата</label>
		                </div>

		            </div>
        		</div>
			</div>
		</div>
		<div class="block not-empty-object">
			<div class="full table-data">
				<table class="tables data-table">
		            <thead>
		                <tr>
		                    <th></th>
		                    <th data-object-id="date">Дата <i class="fa fa-long-arrow-down sort" aria-hidden="true" onclick="sort(this)"></i><i class="fa fa-long-arrow-up sort sorted_by" aria-hidden="true" onclick="sort(this)"></i></th>
		                </tr>
		            </thead>
		            <tbody>

		            </tbody>
        		</table>
			</div>
		</div>
    </section>
</main>

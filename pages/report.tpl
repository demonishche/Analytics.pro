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
				<div class="block-title text-center report-name">
					<h4></h4>
				</div>
			</div>
		</div>
        <div class="block">
			<div class="full">
				<div class="button-block p0">
	                <button class="md-button silver w100 refresh-report-data">Обновить данные</button>
		        </div>
			</div>
		</div>
		<div class="block">
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
                        </div>
                        <div>
                            <input type="text" name="datepicker-to" id="datepicker-to" class="input datepicker-to" readonly>
                            <label for="datepicker-to"><i class="fa fa-calendar" aria-hidden="true"></i></label>
                        </div>
                    </div>
                    <div class="complex chart-fields-setting">
                        <div class="chart-type-title">
                            <p>Составить граффик по: </p>
                            <div class="styled-select">
                                <select id="chart-type">
                                    <option value="1">Полях</option>
                                    <option value="2">Полю ""</option>
                                    <option value="3">Объектах</option>
                                </select>
                            </div>
                        </div>
                        <div class="chart-set">
                            <div class="chart-setting chart-objects not-type-2 not-chart-3 chart-1 chart-2">
                                <p>Объект: </p>
                                <div class="styled-select">
                                    <select id="chart-objects">
                                        <option class="not-chart-1 all_obj chart-2" value="0">Все объекты</option>
                                    </select>
                                </div>
                            </div>
                            <div class="chart-setting chart-text-field not-type-3 not-chart-2 chart-1 chart-3">
                                <p>Поле: </p>
                                <div class="styled-select">
                                    <select id="chart-text-field">
                                        <!-- <option class="not-chart-3 not-chart-1" value="0">Все значения</option> -->
                                    </select>
                                </div>
                            </div>
                            <div class="chart-setting chart-fields not-chart-1 chart-2 chart-3">
                                <p>Поле: </p>
                                <div class="styled-select">
                                    <select id="chart-fields">

                                    </select>
                                </div>
                            </div>
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
				<div class="nav-data">
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
		<div class="block">
			<div class="full">
				<div class="nav-data">
		            <div class="search-block">
	                    <div class="search-date">
	                        <label for="datepicker-search">Дата: </label>
	                        <input type="text" name="datepicker-search" id="datepicker-search" class="input datepicker-search" readonly>
	                        <label for="datepicker-search"><i class="fa fa-calendar" aria-hidden="true"></i></label>
	                        <i class="fa fa-times reset-search-date" aria-hidden="true"></i>
	                    </div>
	                    <div class="search-objects not-type-2 not-type-1">
	                        <label>Объект: </label>
	                        <div class="styled-select">
	                            <select id="search-objects">
	                                <option value="0">Все объекты</option>
	                            </select>
	                        </div>
	                    </div>
	                    <div class="search-text-field not-type-3 not-type-1">
	                        <label>Поле: </label>
	                        <div class="styled-select">
	                            <select id="search-text-field">
	                                <option value="0">Все значения</option>
	                            </select>
	                        </div>
	                    </div>
	                    <i class="fa fa-search search" onClick="searchData()" aria-hidden="true"></i>
           	 		</div>
        		</div>
			</div>
		</div>
		<div class="block">
			<div class="full">
				<div class="checklist-bar nav-data">
		            <div class="first-config-block">
		                <div class="show-summ-block">
		                    <input class="show-summ" id="show-summ" type="checkbox"><label for="show-summ">Отображать сумму</label>
		                </div>
		                <div class="sort-date-block">
		                    <label>Дата</label>
		                    <i class="fa fa-long-arrow-down sort sorted_by" id="ASC" aria-hidden="true" onClick="sort(this)"></i>
		                    <i class="fa fa-long-arrow-up sort" id="DESC" aria-hidden="true" onClick="sort(this)"></i>
		                </div>
		            </div>
		        </div>
			</div>
		</div>
		<div class="block">
			<div class="full table-data">
				<table class="tables data-table">
		            <thead>
		                <tr>

		                </tr>
		            </thead>
		            <tbody>

		            </tbody>
        		</table>
			</div>
		</div>
    </section>
</main>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

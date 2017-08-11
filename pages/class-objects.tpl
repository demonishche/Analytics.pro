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
		                <button class="md-button silver w100 add-object">Добавить объект</button>
		        </div>
			</div>
		</div>
        {{END_BLOCK:GROUP_ADMIN}}
        <div class="block">
				<div class="full">
					{{BLOCK:GROUP_ADMIN}}
		            {{BLOCK:OBJECTS_LIST}}
		                <div class="block-title text-center">
		                    <h4>У вас не ни одного объекта. Чтобы добавить нажмите на кнопку "Добавить".</h4>
		                </div>
		            {{END_BLOCK:OBJECTS_LIST}}
		            {{END_BLOCK:GROUP_ADMIN}}
					<div class="block-row">
						{{LOOP:OBJECTS_LIST}}
						<div class="group" data-object-id="{{LOOP_VAR:OBJ_ID}}">
							<div class="title">
								<h5>{{LOOP_VAR:OBJ_NAME}}</h5>
								{{BLOCK:GROUP_ADMIN}}
								<div class="float-right show-more">
									<i class="fa fa-ellipsis-v" aria-hidden="true"></i>
								</div>
								{{END_BLOCK:GROUP_ADMIN}}
								<div class="float-right favorite not-checked" data-fav-type="{{VAR:FAV_TYPE}}" data-elem-id="{{LOOP_VAR:OBJ_ID}}">
                                	<i class="fa fa-star-o" aria-hidden="true"></i>
                            	</div>
							</div>
							<div class="content">
								<div class="info">
									<div class="author">
										{{LOOP_VAR:USER_LOGIN}}
									</div>
									<div class="date float-right">
										{{LOOP_VAR:OBJ_TIME}}
									</div>
								</div>
							</div>
							<div class="button-block p0">
								<a href="/object/?id={{LOOP_VAR:OBJ_ID}}" class="w100">
									<button class="md-button green w100 b-r-bottom">Открыть</button>
								</a>
							</div>
						</div>
						{{END_LOOP:OBJECTS_LIST}}
					</div>
				</div>
			</div>
    </section>
</main>

{{BLOCK:GROUP_ADMIN}}
<div class="modal-block modal-block-add-object">
    <div id="">
        <div class="block-title">
            <h4>Добавление нового объекта</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content name">
            <h4>Имя объекта</h4><br>
            <input class="input" type="text">
        </div>
        <div class="modal-content complex">
            <table class="data-model">
                <thead>
                    <tr>

                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <i class="fa fa-plus-circle add-line w100" aria-hidden="true" onClick="$('.complex .data-model tbody').append(complex_object_row_template)"></i>
        </div>
        <div class="button-block text-center">
            <button class="md-button green add-object-data">Добавить</button>
        </div>
    </div>
</div>

<div class="modal-block modal-block-delete" data-object-id="">
    <div id="">
        <div class="block-title">
            <h4>Удалить объект</h4>
            <div class="close-icon">
				<i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
        <div class="modal-content">
            <h4>Удалить объект ""</h4>
        </div>
        <div class="button-block text-center">
            <button class="md-button green delete-object">Удалить</button>
        </div>
    </div>
</div>

<div class="modal-block modal-change-name" data-object-id="">
    <div id="">
        <div class="block-title">
            <h4>Изменить имя</h4>
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

<main>
    <section>
    	<div class="block">
			<div class="full">
				<div class="block-title text-center">
					<h4>Личные данные</h4>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="full">
                <div class="profile-block">
	                <div class="login left-block">
						<label>Ваш логин</label>
						<p>{{VAR:USER_LOGIN}}</p>
	                </div>
	                <div class="new-email center">
	                    <label>E-mail: </label>
						<input id="email" name="email" class="input" type="email" data-pattern="mail" value="{{VAR:USER_EMAIL}}">
						<p id="email" class="error errorMessage"></p>
	                </div>
	                <div class="right">
						<div class="button-block p0">
	                        <button class="md-button green save-email">Изменить e-mail</button>
	                    </div>
	                </div>
            	</div>
            </div>
		</div>
		<div class="block">
			<div class="full">
				<div class="block-title text-center">
					<h4>Изменение пароля</h4>
				</div>
			</div>
		</div>
		<div class="block">
			<div class="full">
                <div class=" profile-block">
	                <div class="password-block curr-password left-block">
						<label for="">Текущий</label> <a id="current" class="float-right show-pass" href="javascript:void(0);">Показать</a>
						<input id="current" class="input" name="current" type="password" value="">
						<p id="current" class="error errorMessage"></p>
	                </div>
	                <div class="new-password center">
						<div class="password-block">
							<label for="">Новый</label> <a id="new" class="float-right show-pass" href="javascript:void(0);">Показать</a>
							<input id="new" class="input" type="password" data-min-length="5" data-max-length="20" name="new" >
							<p id="new" class="error errorMessage"></p>
						</div>
						<div class="password-block">
							<label for="">Повторите пароль</label> <a id="repeat" class="float-right show-pass" href="javascript:void(0);">Показать</a>
							<input id="repeat" class="input" type="password" data-min-length="5" data-max-length="20" name="repeat" data-equal-error-message="Пароли не совпадают." data-equal="new">
							<p id="repeat" class="error errorMessage"></p>
						</div>
	                </div>
	                <div class="right">
						<div class="button-block p0">
	                        <button class="md-button green save-pass">Изменить пароль</button>
	                    </div>
	                </div>
            	</div>
            </div>
		</div>
    </section>
</main>

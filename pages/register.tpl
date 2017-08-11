<section class="forms">
  <div class="title medium">Регистрация</div>
  <div class="form-group">
    <label for="">Логин</label> <br>
    <input id="login" type="text" data-min-length="3" data-max-length="20" name="user_login">
    <p id="login" class="error errorMessage"></p>
  </div>
  <div class="form-group">
    <label for="">E-mail</label> <br>
    <input id="email" type="email" data-pattern="mail" name="user_email">
    <p id="email" class="error errorMessage"></p>
  </div>
  <div class="form-group">
    <label for="">Пароль</label> <a id="current" class="float-right show-pass" href="javascript:void(0);">Показать</a> <br>
    <input id="current" type="password" data-min-length="5" name="user_password">
    <p id="current" class="error errorMessage"></p>
  </div>
  <div class="form-group">
    <label for="">Подтверждение пароля</label> <a id="repeat" class="float-right show-pass" href="javascript:void(0);">Показать</a> <br>
    <input id="repeat" type="password" data-equal="user_password" name="user_password_repeat" data-equal-error-message="Пароли не совпадают.">
    <p id="repeat" class="error errorMessage"></p>
  </div>
  <div class="checkbox">
    <input class="float-left" id="check" type="checkbox" checked> <span>Я согласен с <a href="javascript:void(0);">Условиями предоставления услуг</a></span>
    <p id="check" class="error"></p>
  </div>
</section>
<div class="register-button">
  <a class="reg-btn" href="javascript:void(0);">Зарегистрироваться</a>
</div>

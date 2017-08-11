<section class="forms">
    <form>
        <label for="">E-mail</label> <br>
        <input id="email" type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" name="user_email" autocomplete="on">
        <p id="email" class="error e-email"></p>
        <br>
        <label for="">Пароль</label>
        <a id="current" class="float-right show-pass" href="javascript:void(0);">Показать</a> <br>
        <input id="current" class="password" type="password" data-min-length="5" name="user_password">
        <p class="error e-pass"></p>
    </form>
</section>
<div class="enter-button">
  <a class="enter-btn signin" href="javascript:void(0);">Вход</a>
  <a class="view-btn float-right" href="/reset-password">Не помню пароль</a>
</div>

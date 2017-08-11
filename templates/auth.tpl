<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{VAR:PAGE_TITLE}}</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script src="/core/js/core.js"></script>
  	<script src="/core/js/jQuery.inputCheckPlugin.js"></script>
	<script src="/core/js/jQuery.notifier.js"></script>
	<meta name="viewport" content="width=1200px">
	<link rel="stylesheet" type="text/css" href="/core/css/jQuery.notifier.css" />
	{{VAR:INCLUDES}}
</head>
<body>
	<section class="wrapper">
		<header>
			<a href="/">
				<div class="logo medium">
					АНАЛИТИКА
				</div>
			</a>
			<div class="enter">
				{{BLOCK:REGISTER}}
				<span>Уже зарегистрировались? <a href="/login"> Вход</a></span>
				{{END_BLOCK:REGISTER}}
				{{BLOCK:LOGIN}}
				<span><a href="/register">Регистрация</a></span>
				{{END_BLOCK:LOGIN}}
			</div>
		</header>
		{{VAR:CONTENT}}
	</section>
	<footer>
		<div class="developing">
			<p class="medium">АНАЛИТИКА</p><span> © 2016  Все права защищены</span>
		</div>
	</footer>
</body>
</html>

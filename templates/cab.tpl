<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>{{VAR:PAGE_TITLE}}</title>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
	<script src="/core/js/core.js"></script>
	<script src="/core/js/paginator.js"></script>
	<script src="/core/js/jQuery.inputCheckPlugin.js"></script>
	<script src="/core/js/drop-down-menu.js"></script>
	<script src="/core/js/jQuery.notifier.js"></script>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<link rel="stylesheet" type="text/css" href="/core/css/jQuery.notifier.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"> {{VAR:INCLUDES}}
	<link rel="stylesheet" type="text/css" href="/theme/css/reset.css" />
	<link rel="stylesheet" type="text/css" href="/theme/css/menu.css" />
</head>

<body>
	<menu>
		<div class="logo">
			<a href='/admin-main/users'>
				<label>Аналитика</label>
			</a>
		</div>
		<div class="menu-links">
			<a href="/cab/main">
				<li><i class="fa fa-home" aria-hidden="true"></i> Рабочий стол</li>
			</a>
			<a href="/cab/profile">
				<li><i class="fa fa-id-card-o" aria-hidden="true"></i> Личные данные</li>
			</a>
			<a href="/cab/my-group">
				<li><i class="fa fa-users" aria-hidden="true"></i> Мои группы</li>
			</a>
			<a href="/cab/data">
				<li><i class="fa fa-database" aria-hidden="true"></i> Структуры данных</li>
			</a>
			<a class="logout" onClick="logOut();" href="javascript:void(0);">
				<li><i class="fa fa-sign-out" aria-hidden="true"></i> Выход</li>
			</a>
		</div>
	</menu>
	<!-- Menu block -->
	{{VAR:CONTENT}}

	<!-- <div class="flag">
	    <div class="flag-content">
	        <p class='out' id="delete">Удалить</p>
	        <p class='out' id="change_name">Редактировать</p>
	    </div>
	    <div class="arrow"></div>
	</div> -->
</body>

</html>

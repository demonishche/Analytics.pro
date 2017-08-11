<main>
    <section>
        {{BLOCK:DONT_HAVE_SMTH}}
        <div class="block">
            <div class="full">
                <div class="block-title text-center">
                    <h4>Рабочий стол</h4>
                </div>
                <div class="block-row">
                    <h3 class="empty">У Вас нету ярлыков на робочем столе.</h3>
                </div>
            </div>
        </div>
        {{END_BLOCK:DONT_HAVE_SMTH}}
    	<div class="block">
    		<div class="full">
    			{{BLOCK:HAVE_CLASSES_LIST}}
    			<div class="block-title text-center">
                    <h4>Классы</h4>
                </div>
                {{END_BLOCK:HAVE_CLASSES_LIST}}
				{{LOOP:CLASSES_LIST}}
                    <div class="group" data-class-id="{{LOOP_VAR:CLASS_ID}}">
                        <div class="title">
                            <h5>{{LOOP_VAR:CLASS_NAME}}</h5>
                            <div class="float-right favorite not-checked" data-fav-type="class" data-elem-id="{{LOOP_VAR:CLASS_ID}}">
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
                    {{END_LOOP:CLASSES_LIST}}
    		</div>
    	</div>
    	<div class="block">
    		<div class="full">
    			{{BLOCK:HAVE_REPORTS_LIST}}
    			<div class="block-title text-center">
                    <h4>Отчеты</h4>
                </div>
                {{END_BLOCK:HAVE_REPORTS_LIST}}
				{{LOOP:REPORTS_LIST}}
				<div class="group" data-report-id="{{LOOP_VAR:REPORT_ID}}">
					<div class="title">
						<h5>{{LOOP_VAR:REPORT_NAME}}</h5>
						<div class="float-right favorite not-checked" data-fav-type="report" data-elem-id="{{LOOP_VAR:REPORT_ID}}">
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
    	<div class="block">
    		<div class="full">
    			{{BLOCK:HAVE_OBJECTS_LIST}}
    			<div class="block-title text-center">
                    <h4>Объекты</h4>
                </div>
                {{END_BLOCK:HAVE_OBJECTS_LIST}}
				{{LOOP:OBJECTS_LIST}}
				<div class="group" data-object-id="{{LOOP_VAR:OBJ_ID}}">
							<div class="title">
								<h5>{{LOOP_VAR:OBJ_NAME}}</h5>
								<div class="float-right favorite not-checked" data-fav-type="object" data-elem-id="{{LOOP_VAR:OBJ_ID}}">
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

        <div class="block">
    		<div class="full">
    			{{BLOCK:HAVE_GROUP_LIST}}
    			<div class="block-title text-center">
                    <h4>Группы</h4>
                </div>
                {{END_BLOCK:HAVE_GROUP_LIST}}
				{{LOOP:GROUP_LIST}}
                <div class="group" data-group-id="{{LOOP_VAR:GROUP_ID}}">
                    <div class="title">
                        <h5>{{LOOP_VAR:GROUP_NAME}}</h5>
                        <div class="float-right favorite not-checked" data-fav-type="group" data-elem-id="{{LOOP_VAR:GROUP_ID}}">
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div class="content">
                        <div class="info">
                            <div class="author">
                                {{LOOP_VAR:USER_LOGIN}}
                            </div>
                            <div class="date float-right">
                                {{LOOP_VAR:CREATE_TIME}}
                            </div>
                        </div>
                    </div>
                    <div class="button-block p0">
                        <a href="/group/?id={{LOOP_VAR:GROUP_ID}}" class="w100">
                            <button class="md-button green w100 b-r-bottom">Открыть</button>
                        </a>
                    </div>
                </div>
                {{END_LOOP:GROUP_LIST}}
    		</div>
    	</div>
    </section>
</main>

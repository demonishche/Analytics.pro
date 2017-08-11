{{BLOCK:NE_OBJECTS_LIST}}
{{LOOP:OBJECTS_LIST}}
<div class="item general-item-1" data-object-id="{{VAR:OBJ_ID}}">
  <div class="item-title general-title-1">
    <h3>{{VAR:OBJ_NAME}}</h3>
    <div class="show-more">
      <span class="icon-show_more"></span>
    </div>
  </div>
  <div class="user-info">
    <h3>{{VAR:USER_LOGIN}}</h3> <div class="date">{{VAR:OBJ_TIME}}</div>
  </div>
  <div class="button button-green open-data">
    <a href="javascript:void(0);">Открыть <span class="icon-arrow_big"></span></a>
  </div>
</div>
{{END_LOOP:OBJECTS_LIST}}
{{END_BLOCK:NE_OBJECTS_LIST}}
{{BLOCK:E_OBJECTS_LIST}}
    <div class="empty-block">
        <h3>У вас не ни одного объекта. Чтобы добавить нажмите на кнопку "Добавить".</h3>
    </div>
{{END_BLOCK:E_OBJECTS_LIST}}

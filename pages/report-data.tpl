{{BLOCK:NE_REPORTS_LIST}}
{{LOOP:REPORTS_LIST}}
<div class="item general-item-1" data-report-id="{{VAR:REPORT_ID}}">
  <div class="item-title general-title-1">
    <h3>{{VAR:REPORT_NAME}}</h3>
    <div class="show-more">
      <span class="icon-show_more"></span>
    </div>
  </div>
  <div class="user-info">
    <h3>{{VAR:USER_LOGIN}}</h3> <div class="date">{{VAR:REPORT_TIME}}</div>
  </div>
  <div class="button button-green open-report">
    <a href="javascript:void(0);">Открыть <span class="icon-arrow_big"></span></a>
  </div>
</div>
{{END_LOOP:REPORTS_LIST}}
{{END_BLOCK:NE_REPORTS_LIST}}
{{BLOCK:E_REPORTS_LIST}}
    <div class="empty-block">
        <h3>У вас не ни одного отчета. Чтобы добавить нажмите на кнопку "Добавить".</h3>
    </div>
{{END_BLOCK:E_REPORTS_LIST}}

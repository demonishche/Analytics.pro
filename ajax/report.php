 <?

function new_report($data){
  $Reports = new Reports();
  $result = $Reports->newReport($data['class_id'], $data['report_name'], $data['period'], $data['report_type'], $data['report_objects'], $data['report_fields'], $data['text_field']);
  echo json_encode($result);
}

function delete_report($data){
    $Reports = new Reports();
    echo json_encode($Reports->deleteReport($data['id']));
}

function rename_report($data) {
    $Reports = new Reports();
    echo json_encode($Reports->renameReport($data['report_id'], $data['report_name']));
}

function get_report_settings($data) {
    $Reports = new Reports();
    echo json_encode($Reports->getReportSettings($data['report_id']));
}

function is_report_exsist($data) {
    $Reports = new Reports();
    echo json_encode($Reports->isReportExists($data['report_id']));
}

function get_report_data($data) {
    $Reports = new Reports();
    echo json_encode($Reports->getReportsData($data['where'], $data['order_by'], $data['page_num'], $data['max_row']));
}

function refreshReportData($data) {
    $Reports = new Reports();
    echo json_encode($Reports->calculateReport($data['report_id']));
}

function get_min_max_date($data) {
    $Report = new Reports();
    echo json_encode($Report->getMinMaxDate($data['report_id'], $data['class_id']));
}

function get_report_data_pag($data) {
    $Reports = new Reports();
    echo json_encode($Reports->getReportsDataPag($data['search_arr'], $data['order_by'], $data['page_num'], $data['max_row']));
}

?>

<?

function new_class($data){
    $DS = new DataStructure();
    echo json_encode($DS->newClass($data));
}

function get_class_data($data) {
    $DS = new DataStructure();
    echo json_encode($DS->getClass($data));
}

function change_class_name($data) {
    $DS = new DataStructure();
    echo json_encode($DS->changeClassName($data['class_id'], $data['class_name']));
}

function remove_class($data){
    $DS = new DataStructure();
    echo json_encode($DS->removeClass($data));
}

function update_class_fields($data) {
    $DS = new DataStructure();
    if (isset($data['fields']))
        echo json_encode($DS->updateClassFields($data['class_id'], $data['fields']));
    else echo json_encode(true);
}

function new_object($data) {
    $DS = new DataStructure();
    if (!isset($data['object_template']))
        $data['object_template'] = array();
    echo json_encode($DS->newObject($data['class_id'], $data['name'], $data['object_template']));
}

function change_object_name($data) {
    $DS = new DataStructure();
    echo json_encode($DS->changeObjectName($data['object_id'], $data['object_name']));
}

function remove_object($data){
  $DS = new DataStructure();
  echo json_encode($DS->removeObject($data));
}

function get_fields_list_by_object_id($data) {
  $DS = new DataStructure();
  $class_id = $DS->getClassIdByObjId($data['object_id']);
  echo json_encode($DS->getClassFields($class_id));
}

function get_fields_list($data) {
  $DS = new DataStructure();
  echo json_encode($DS->getClassFields($data['class_id']));
}

function insert_data($data) {
	$DS = new DataStructure();
	echo json_encode($DS->insertObjData($data['object_id'], $data['data']));
}

function redact_data($data) {
	$DS = new DataStructure();
	echo json_encode($DS->redactObjData($data['object_id'], $data['row_id'], $data['data']));
}

function insert_complex_data($data) {
	$DS = new DataStructure();
	$result = true;
	foreach ($data['data'] as $value) {
	  $result = $DS->insertObjData($data['object_id'], $value)["result"];
	}
	echo $result;
}

function get_object_data_array($data) {
  $DS = new DataStructure();
  echo json_encode($DS->getObjDataList($data['object_id'], $data['min_date'], $data['max_date']));
}

function get_object_by_id($data) {
  $DS = new DataStructure();
  echo json_encode($DS->getObjectById($data['object_id']));
}

function get_min_max_obj_date($data) {
  $DS = new DataStructure();
  echo json_encode($DS->getMaxMinObjectDate($data['object_id']));
}

function remove_object_data($data) {
  $DS = new DataStructure();
  echo json_encode($DS->removeObjectData($data['object_id'], $data['data_id']));
}

function get_sort_object_data($data) {
	$_tpl = new GeekTpl();
	$DS = new DataStructure();
	$list_data = $DS->getObjDataListWithSorting($data['search_param'], $data['order_by'], $data['order_method'], $data['page_num'], $data['max_row']);
	$_tpl->setPage($data['tpl_data']);
	if (count($list_data["pag_data"]) != 0) {
	  $_tpl->replaceLoop("OBJECT_DATA_LIST", $list_data["pag_data"]);
      $result = ["obj_data" => $_tpl->getPage(), "buttons" => $list_data["buttons"]];
    }
	else $result = ["obj_data" => json_encode(false), "buttons" => $list_data["buttons"]];

	echo json_encode($result);
}

function get_data_by_param($data) {
	$DS = new DataStructure();
	$list_data = $DS->getObjDataListWithSorting($data['search_param']);
	if (count($list_data) != 0)
		echo json_encode($list_data["pag_data"]);
	else echo json_encode(false);
}

?>

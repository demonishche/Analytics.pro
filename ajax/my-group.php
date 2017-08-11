<?

function create_group($data){
  $Group = new AnalyticsGroup();
  echo json_encode($Group->createGroup($data['group_name'], $data['classes'], $data['all_objects'], $data['all_reports']));
}

function add_member_to_group($data){
  $Group = new AnalyticsGroup();
  echo json_encode($Group->addMemberToGroup($data['group_id'], $data['user_name'], $data['status'], $data['objects'], $data['reports']));
}

function get_role($data) {
    $Group = new AnalyticsGroup();
    echo json_encode($Group->getUserRoleByClassId($data['class_id']));
}

function delete_group($data) {
    $Group = new AnalyticsGroup();
    echo json_encode($Group->deleteGroup($data['group_id']));
}

function change_group_name($data) {
    $Group = new AnalyticsGroup();
    echo json_encode($Group->changeGroupName($data['group_id'], $data['group_name']));
}

function remove_users($data) {
    $Group = new AnalyticsGroup();
    echo json_encode($Group->removeUsers($data['group_id'], $data['deleted_users']));
}

function get_user_info_by_group($data) {
    $Group = new AnalyticsGroup();
    echo json_encode($Group->getUserInfoByGroup($data['group_id'], $data['user_id']));
}

function redact_member($data) {
    $Group = new AnalyticsGroup();
    echo json_encode($Group->redactMember($data['group_id'], $data['user_id'], $data['status'], $data['objects'], $data['reports']));
}

?>

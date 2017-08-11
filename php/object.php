<?
function page_object(&$tpl){
    $id = $_GET['id'];

    $Group = new AnalyticsGroup();
    $DS = new DataStructure();

    if (!$DS->isObjectExists($id))
        header("Location: /data");

    $class_id = $DS->getObjectById($id)[0]['class_id'];

    $user_role = $Group->getUserRoleByClassId($class_id);

    if ($user_role == 0) {
        $user_objects = $Group->getObjectsIdByUser($class_id);
        if ($user_objects == -2 || !in_array($id, $user_objects))
            header("Location: /data");
    }
}
?>

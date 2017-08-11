 <?
  function page_data(&$tpl){
    $DataStructure = new DataStructure();
    $Group = new AnalyticsGroup();


    $group_classes = $Group->getClassesByUser();
    $group_classes = array_unique($group_classes);
    $classes_list_user_group = array();
    foreach ($group_classes as $val)
        $classes_list_user_group[] = $DataStructure->getClass($val);

    $classes_list_user = $DataStructure->getClassesList(getCurrentUserId());
    foreach ($classes_list_user as &$tmp)
        $tmp['class_fields'] = $DataStructure->getClassFields($tmp["class_id"]);

    foreach ($classes_list_user_group as &$tmp)
        $tmp['class_fields'] = $DataStructure->getClassFields($tmp["class_id"]);

    $tpl->replaceLoop("CLASS_LIST_OF_USER", $classes_list_user);
    $tpl->replaceLoop("CLASS_LIST_OF_USER_GROUP", $classes_list_user_group);
    $tpl->replaceVar("FAV_TYPE", "class");
  }
?>

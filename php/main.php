<?
 function page_main(&$tpl){
    $Data = new Reports();
    $Group = new AnalyticsGroup();

    $empty_desctop = true;
    $fav_class = $Data->getFromFav("class");
    $classes = array();
    foreach($fav_class as $val)
        $classes[] = $Data->getClass($val['data_id']);

    $fav_report = $Data->getFromFav("report");
    $reports = array();
    foreach($fav_report as $val)
         $reports[] = $Data->getReport($val['data_id']);

    $fav_obj = $Data->getFromFav("object");
    $objects = array();
    foreach($fav_obj as $val)
        $objects[] = $Data->getObjectById($val['data_id'])[0];

    $fav_group = $Data->getFromFav("group");
    $groups = array();
    foreach($fav_group as $val)
        $groups[] = $Group->getGroupInfo($val['data_id']);

    if (count($classes) == 0)
        $tpl->removeBlock("HAVE_CLASSES_LIST");
    else {
        $tpl->replaceLoop("CLASSES_LIST", $classes);
        $empty_desctop = false;
    }

    if (count($reports) == 0)
        $tpl->removeBlock("HAVE_REPORTS_LIST");
    else {
        $tpl->replaceLoop("REPORTS_LIST", $reports);
        $empty_desctop = false;
    }

    if (count($objects) == 0)
        $tpl->removeBlock("HAVE_OBJECTS_LIST");
    else {
        $tpl->replaceLoop("OBJECTS_LIST", $objects);
        $empty_desctop = false;
    }

    if (count($groups) == 0)
        $tpl->removeBlock("HAVE_GROUP_LIST");
    else {
        $tpl->replaceLoop("GROUP_LIST", $groups);
        $empty_desctop = false;
    }

    if (!$empty_desctop)
        $tpl->removeBlock("DONT_HAVE_SMTH");
 }
?>

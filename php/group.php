<?
function page_group(&$tpl) {

    $id = $_GET['id'];

    $Group = new AnalyticsGroup();
    $DS = new DataStructure();
    $Reports = new Reports();
    $User = new User();

    $user_id = $User->getUserId();
    if (!$Group->isUserConsistInGroup($user_id, $id) && !$Group->isUserCreatorOfGroup($id))
        header("Location: /my-group");
    $group_info = $Group->getGroupInfo($id);
    $group_classes = $Group->getClassesByGroupId($id);
    $tpl->replaceVarArr($group_info, true);
    $user_role = $Group->getUserRoleByGroupId($id);
    $admin_info = $Group->getInfoAboutCreator($id);
    if ($user_role == 1 && $group_info['user_id'] != $user_id) {
        $tpl->removeBlock("USER_GROUP_CREATOR");
        $tpl->replaceVar("ADMIN_USERNAME", $group_info['user_login']);
        $tpl->replaceVarArr($admin_info, true);
        $tpl->removeBlock("GROUP_MEMBERS");
    }
    else if ($user_role == 1 && $group_info['user_id'] == $user_id) {
        $tpl->removeBlock("GROUP_USERS");
        $tpl->removeBlock("INFO_ABOUT_ADMIN");
    }
    else {
        $tpl->removeBlock("USER_GROUP_ADMIN");
        $tpl->removeBlock("USER_GROUP_CREATOR");
        $tpl->replaceVar("ADMIN_USERNAME", $group_info['user_login']);
        $tpl->replaceVarArr($admin_info, true);
        $tpl->removeBlock("GROUP_MEMBERS");
    }
    if ($group_info["free_objects"] == 0 || $group_info["free_reports"] == 0) {
        $classes = array();
        foreach($group_classes as $val)
            $classes[] = $DS->getClass($val);
    }

    if ($user_role == 1 || $group_info['user_id'] == $user_id) {
        if ($group_info["free_objects"] == 1)
            $tpl->removeBlock("NOT_FREE_OBJECTS");
        else {
            $objects_count = 0;
            $tpl->replaceLoop("CLASSES_OBJECTS", $classes);
            foreach($group_classes as $val) {
                $objects = $DS->getObjectListByClassId($val);
                if (count($objects) == 0)
                    $tpl->removeBlock("CLASS_WITH_OBJECTS_".$val);
                else {
                    $tpl->replaceLoop('OBJECTS_CLASS_'.$val, $objects, "", true);
                    $objects_count += count($objects);
                }
            }
            if ($objects_count == 0)
                $tpl->removeBlock("NOT_EMPTY_OBJECTS_CLASSES_LIST");
            else
                $tpl->removeBlock("EMPTY_OBJECT_CLASSES_LIST");
        }


        if ($group_info["free_reports"] == 1)
            $tpl->removeBlock("NOT_FREE_REPORTS");
        else {
            $reports_count = 0;
            $tpl->replaceLoop("CLASSES_REPORTS", $classes, "", true);
            foreach($group_classes as $val) {
                $reports = $Reports->getListOfReports($val);
                if (count($reports) == 0)
                    $tpl->removeBlock("CLASS_WITH_REPORTS_".$val);
                else {
                    $tpl->replaceLoop('REPORTS_CLASS_'.$val, $reports, "", true);
                    $reports_count += count($reports);
                }
            }

            if ($reports_count == 0)
                $tpl->removeBlock("NOT_EMPTY_REPORTS_CLASSES_LIST");
            else
                $tpl->removeBlock("EMPTY_REPORTS_CLASSES_LIST");
        }
    }
    $classes = $Group->getClassById($group_classes);

    $tpl->replaceLoop('CLASSES_LIST', $classes, "", true);

    $user_list = $Group->getGroupUsersList($id);
    foreach ($user_list as $key => $val) {
        if ($val['invited_user_id'] == $user_id) {
            unset($user_list[$key]);
            break;
        }
    }
    $tpl->replaceLoop('GROUP_MEMBERS', $user_list, "", true);
    $tpl->replaceVar("FAV_TYPE", "class");
}
?>

<?
function page_my_group(&$tpl){
    global $User;

    $Group = new AnalyticsGroup();
    $DS = new DataStructure();

    $user_classes = $DS->getClassesList($User->uid);
    if (count($user_classes) != 0) {
        $tpl->replaceLoop("USER_CLASSES", $user_classes);
        $tpl->removeBlock("HAVE_NOT_CLASSES");
    }
    else {
        $tpl->removeBlock("HAVE_CLASSES");
    }


    // $user_created_groups = $Group->getGroups();
    $tpl->replaceLoop("GROUP_LIST", $Group->getGroups());

    // $user_consist_groups = $Group->getUserConsistGroups();
    $tpl->replaceLoop("GROUP_CONSIST_LIST", $Group->getUserConsistGroups());

    $tpl->replaceVar("FAV_TYPE", "group");
    // if($Group->isUserConsistInGroup($User->uid)){
    //     $tpl->removeBlock("USER_NOT_CONSIST_IN_GROUP");
    //     $group_info = $group->getGroupInfo($User->uid);
    //     $user_info = $group->getUserInfo($User->uid);
    //
    //     if($group->isUserGroupAdmin($User->uid)){
    //         $tpl->replaceVarArr($group_info);
    //         $tpl->removeBlock("NOT_USER_GROUP_ADMIN");
    //     } else {
    //         $tpl->replaceVar("GROUP_NAME", $group_info['group_name']);
    //         $tpl->replaceVar("JOIN_TIME", $user_info['join_time']);
    //         $tpl->removeBlock("USER_GROUP_ADMIN");
    //     }
    //     $members_list = $group->getGroupUsersList($group_info['group_name']);
    //     $tpl->replaceLoop("GROUP_MEMBERS", $members_list);
    // } else {
    //         $tpl->removeBlock("USER_CONSIST_IN_GROUP");
    // }
}
?>

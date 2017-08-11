<?
function page_profile(&$tpl){
    global $User;
    $tpl->replaceVarArr($User->getUserDataById($User->uid));
}
?>

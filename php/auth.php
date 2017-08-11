<?
function page_auth(&$tpl) {
    global $Router;
    $page = $Router->getPageByName($Router->getPage());
    $tpl->replaceVar('PAGE_TITLE', $page['page_title']);

    if ($page['page_name'] == "login")
        $tpl->removeBlock("REGISTER");
    else
        $tpl->removeBlock("LOGIN");
}

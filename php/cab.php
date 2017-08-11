<?
function page_cab(&$tpl) {
    global $Router;
    $page = $Router->getPageByName($Router->getPage());
    $tpl->replaceVar('PAGE_TITLE', $page['page_title']);
}

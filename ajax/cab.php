<?
function logout_user($data){
  $User = new User();
  $User->userLoggedOut();
}

function add_to_fav($data) {
    $DS = new DataStructure();
    echo json_encode($DS->addToFav($data['type'], $data['id']));
}

function get_from_fav($data) {
    $DS = new DataStructure();
    echo json_encode($DS->getFromFav($data['type']));
}

function del_from_fav($data) {
    $DS = new DataStructure();
    echo json_encode($DS->deleteFromFav($data['type'], $data['id']));
}

?>

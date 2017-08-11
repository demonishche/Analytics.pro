<?

function new_user($data){
    $user = new User();
    if (json_decode($user->isEmailExists($data['user_email']))->result) {
        echo json_encode(["result" => false]);
        return;
    }
    if ($user->isLoginExists($data['user_login'])["result"]) {
        echo json_encode(["result" => false]);
        return;
    }
    echo $user->newUser($data);
}

function is_email_exists($data){
  $user = new User();
  echo $user->isEmailExists($data);
}

function is_login_exists($data){
  $user = new User();
  echo json_encode($user->isLoginExists($data));
}

function is_user_exists($data){
  $user = new User();

  $result = $user->isUserExists($data);

  if($result['result'] == true){
    if(is_array($auth_result = $user->userLoggedIn($result['user_hash'], $result['user_id']))){
      echo json_encode($auth_result);
    } else {
      unset($result['user_hash']);
      echo json_encode($result);
    }
  } else {
      echo json_encode($result);
  }

}

?>

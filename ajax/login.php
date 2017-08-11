<?
function login($data){
  $data = (array)json_decode($data);
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

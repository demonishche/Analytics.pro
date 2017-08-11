<?php
  function is_email_exists($data){
    $user = new User();
    echo $user->isEmailExists($data['email']);
  }

  function set_user_email($data){
    $user = new User();
    echo json_encode(array('result' => $user->setUserEmail($data['email'])));
  }

  function is_user_exists($data){
    $user = new User();
    $user_data = $user->getUserDataById($user->getUserId());
    $arg = array('user_email' => $user_data['user_email'], 'user_password' => $data['current']);
    $result = $user->isUserExists($arg);
    $result['result'] = !$result['result'];
    echo json_encode($result);
  }

  function set_user_password($data){
    $user = new User();
    $result = $user->setUserHash($data['new_password']);
    if(!is_array($result))
      echo json_encode(array('result' => $result));
    else
      echo json_encode($result);
  }
?>

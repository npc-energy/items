<?php
  include('./connuser.php');

  $username = $_REQUEST['username'];
  $pwd  = $_REQUEST['password'];

  $loginsql = "select * from user where user_name = '$username' and user_pwd = '$pwd' ";

  $res = $mysqli->query($loginsql);

  if($res->num_rows>0){
    echo "<script src='../js/cookie.js'></script>";
    echo "<script>cookie.set('isLogin','true',1);cookie.set('username','$username',1);</script>";
    echo "<script>alert('登陆成功,点击跳转');location.href='../html/index1.html';</script>";
  }else{
    echo "<script>alert('登陆失败,点击跳转');location.href='../html/login.html';</script>";
  }
  $mysqli->close();
?>
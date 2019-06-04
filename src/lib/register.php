<?php
    include('./connuser.php');

    $username = $_REQUEST['username'];
    $pwd  = $_REQUEST['password'];
    $sql = "insert into user(`user_name`,`user_pwd`,`user_email`,`user_sex`)values('$username','$pwd','null',0)";
  
    $res = $mysqli->query($sql);
  
    if($res){
        echo '{"has":true,"status":200}';
    }else{
        echo '{"has":false,"status":200}';
    }
    $mysqli->close();

?>
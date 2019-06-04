<?php
    include('./connuser.php');

    $username = $_REQUEST['username'];
    $sql = "select * from user where user_name='$username'";

    $res = $mysqli->query($sql);

    if($res->num_rows>0){
        echo '{"msg":"手机号已存在","has":true,"status":200}';
    }else{
        echo '{"msg":"手机号可以使用","has":false,"status":200}';
    }

    $mysqli->close();
?>
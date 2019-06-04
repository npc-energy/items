<?php
    header("content-type:text/html;charset=utf-8");
    $mysqli_conf = array(
        'localhost'=>'localhost:3306',
        'db_uname'=>'root',
        'db_pwd'=>'',
        'db'=>'scj'
    );
    $mysqli = @new mysqli($mysqli_conf['localhost'],$mysqli_conf['db_uname'],$mysqli_conf['db_pwd']);

    if($mysqli->connect_errno){
        die('连接错误'.$mysqli->connect_errno);
    }

    $mysqli->query("set names 'utf8';");

    $select_db = $mysqli->select_db($mysqli_conf['db']);

    if(!$select_db){
        die('连接数据库错误'.$mysqli->error);
    }
?>
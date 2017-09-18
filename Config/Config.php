<?php  include "Constant.php"; ?>
<?php

	$db_host=DB_SERVER; 					# Host Name 
	$db_user=DB_USER;	 					# User name
	$db_password=DB_PASSWORD;	 					# Password
	$db_database=DB;			# Databasenae	
	
$today = date('mdyHis');
error_reporting(1);

$link =mysqli_connect($db_host,$db_user,$db_password);
mysqli_set_charset('UTF-8', $link);
mysqli_select_db($link,$db_database);
$sql_details = array(
	'user' =>$db_user,
	'pass' => $db_password,
	'db'   => $db_database,
	'host' => $db_host
);





?>
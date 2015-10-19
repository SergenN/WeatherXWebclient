<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 19-10-2015
 * Time: 15:01
 */

require_once 'includes/init.php';

$user->logOut();
header("Location: login.php");

?>
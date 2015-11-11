<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 19-10-2015
 * Time: 15:01
 */

$requiresLogin = true;
$userLevel = 1;

require_once 'includes/init.php';

if ($user->isLoggedIn()) {
    $user->logOut();
}
header("Location: login.php");

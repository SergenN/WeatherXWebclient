<?php
/**
 * Created by PhpStorm.
 * User: Leon, Sergen
 * Date: 15-10-2015
 * Time: 10:40
 */

require_once 'includes/header.php';

if (!$user->isLoggedIn()){
    header("Location: login.php");
}

?>
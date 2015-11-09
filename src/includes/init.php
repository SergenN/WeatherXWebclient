<?php
/**
 * Created by PhpStorm.
 * User: serge
 * Date: 19-10-2015
 * Time: 03:34
 */

session_start();

spl_autoload_register(function($class){
    require_once  $_SERVER['DOCUMENT_ROOT'] .'/' . $class . '.php';
});

$connection = new \classes\SQLConnection("localhost", "root", "", "weatherxweb");
$user = isset($_SESSION['user']) ? unserialize($_SESSION['user']) : new \classes\User();

if ($requiresLogin && !$user->isLoggedIn()){
    header("Location: login.php");
}

if ($userLevel > $user->getLevel()){

}
<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 19-10-2015
 * Time: 01:30
 */

session_start();

spl_autoload_register(function($class){
   require_once $class . '.php';
});

$connection = new \classes\SQLConnection("localhost", "root", "", "weatherxweb");
$user = isset($_SESSION['user']) ? unserialize($_SESSION['user']) : new \classes\User();


?>
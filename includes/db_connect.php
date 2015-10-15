<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 15-10-2015
 * Time: 10:58
 *
 * This file ensures database connection.
 */


$dbhost = "localhost";
$dbuser = "root";
$dbpassword = "";
$dbdatabase = "weatherxweb";

$link = mysqli_connect($dbhost, $dbuser, $dbpassword, $dbdatabase);

// Check connection
if (!$link) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
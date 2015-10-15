<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 15-10-2015
 * Time: 10:58
 *
 * This file ensures database connection.
 */


$servername = "localhost";
$username = "root";
$password = "";
$db = "weatherxweb";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $db);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 19-10-2015
 * Time: 01:30
 */

if ($requiresLogin && !$user->isLoggedIn()){
    header("Location: login.php");
}

if ($userLevel > $user->getUserLevel()){

}

?>
<!DOCTYPE html>
<html>
    <head lang="en">
        <title>WeatherX - <?php echo $title; ?></title>
        <link rel="stylesheet" href="other/css/bootstrap.min.css">
        <link rel="stylesheet" href="other/css/style.css">
        <link rel="stylesheet" href="other/css/bootstrap-table.css">

        <script type="text/javascript" src="other/js/jquery-2.1.4.min.js"></script>
        <script type="text/javascript" src="other/js/bootstrap-table.js"></script>
    </head>
    <body>
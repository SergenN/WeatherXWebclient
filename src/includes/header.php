<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 19-10-2015
 * Time: 01:30
 */
?>
<!DOCTYPE html>
<html>
    <head lang="en">
        <title>WeatherX - <?php echo $title; ?></title>
        <!--Style sheets-->
        <link rel="stylesheet" href="other/css/bootstrap.min.css">
        <link rel="stylesheet" href="other/css/style.css">
        <link rel="stylesheet" href="other/css/bootstrap-table.min.css">
        <link rel="stylesheet" href="other/css/bootstrap-switch.min.css">
        <link rel="stylesheet" href="other/css/bootstrap-alert.min.css">

        <?php if($user->getTheme() == 'green'){
            echo '<link rel="stylesheet" href="other/css/greenTheme.css">';
        }?>

        <!--Core libraries-->
        <script src="other/js/jquery-2.1.4.min.js"></script>
        <script src="other/js/bootstrap.min.js"></script>

        <!--Dependent libraries-->
        <script src="other/js/bootstrap-table.min.js"></script>
        <script src="other/js/bootstrap-alert.min.js"></script>
        <script src="other/js/bootstrap-switch.min.js"></script>
    </head>
    <body>
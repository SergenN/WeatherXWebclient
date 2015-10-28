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
        <link rel="stylesheet" href="other/css/bootstrap.min.css">
        <script src="other/js/jquery-2.1.4.min.js"></script>
        <link rel="stylesheet" href="other/css/style.css">

        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        <script type="text/javascript">
            // Load the Visualization API library and the piechart library.
            google.load('visualization', '1', {'packages':['corechart']});
            //google.setOnLoadCallback(drawChart);
        </script>
    </head>

    <body>

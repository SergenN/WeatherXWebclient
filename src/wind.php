<?php
/**
 * Created by PhpStorm.
<<<<<<< HEAD
 * User: Leon
 * Date: 19-10-2015
 * Time: 16:26
 */

require_once 'includes/init.php';

if(!$user->isLoggedIn()) {
    header("Location: login.php");
}
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <title>WeatherX</title>
    <link rel="stylesheet" href="other/css/bootstrap.min.css">
</head>
<body>
<div class="container-fluid">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"><span class="glyphicon glyphicon-home"></span>
                <span class="icon-bar"><span class="glyphicon glyphicon-certificate"></span>
                <span class="icon-bar"><span class="glyphicon glyphicon-flag"></span>
            </button>
        </div>
        <div class="container">
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="index.php"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;&nbsp;Home</a></li>
                    <li><a href="temperature.php"><span class="glyphicon glyphicon-certificate"></span> Temperature</a></li>
                    <li><a href="rainfall.php"><span class="glyphicon glyphicon-stats"></span> Rainfall</a></li>
                    <li class="active"><a href="wind.php"><span class="glyphicon glyphicon-flag"></span> Wind</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a><?php echo "Hello ". $user->getName() . "!"; ?></a></li>
                    <li><a href="logout.php">Log out</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="col-md-12">
        <div class="row">
            <div class="col-md-6">
                <p>Hallo! Dit is blok 1! In dit blok komt een pijl die de gemiddelde windrichting moet voorstellen van alle weerstations.</p>
            </div>
            <div class="col-md-6">
                <p>Hallo! Dit is blok 2! In dit blok komt de gemiddelde windsnelheid van alle weerstations.</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <p>Hallo! Dit is blok 3! In it blok komt een tabel met weerstations per regio en hun gemiddelden.</p>
            </div>
        </div>
    </div>
</div>

<!-- </div> -->
<script src="other/js/bootstrap.min.js"></script>
</body>
</html>
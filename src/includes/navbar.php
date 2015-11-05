<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 28-10-2015
 * Time: 17:00
 */
?>

<div class="container">
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li <?php if ($title == "Home") echo ('class="active"'); ?>><a href="index.php"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;&nbsp;Home</a></li>
                    <li <?php if ($title == "Temperature") echo ('class="active"'); ?>><a href="temperature.php"><span class="glyphicon glyphicon-certificate"></span>&nbsp;&nbsp;&nbsp;Temperature</a></li>
                    <li <?php if ($title == "Rainfall") echo ('class="active"'); ?>><a href="rainfall.php"><span class="glyphicon glyphicon-stats"></span>&nbsp;&nbsp;&nbsp;Rainfall</a></li>
                    <li <?php if ($title == "Wind") echo ('class="active"'); ?>><a href="wind.php"><span class="glyphicon glyphicon-flag"></span>&nbsp;&nbsp;&nbsp;Wind</a></li>
                    <li <?php if ($title == "Stations") echo ('class="active"'); ?>><a href="stations.php"><span class="glyphicon glyphicon-record"></span>&nbsp;&nbsp;&nbsp;Stations</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a><?php echo "Hello ". $user->getName() . "!"; ?></a></li>
                    <li><a href="logout.php"><span class="glyphicon glyphicon-off"></span>&nbsp;&nbsp;&nbsp;Log out</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>
</div>

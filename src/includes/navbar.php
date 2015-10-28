<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 28-10-2015
 * Time: 17:00
 */
?>

<div class="container-fluid">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="container">
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav">

                    <li <?php if ($title == "Home") echo ('class="active"'); ?>><a href="index.php"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;&nbsp;Home</a></li>
                    <li <?php if ($title == "Temperature") echo ('class="active"'); ?>><a href="temperature.php"><span class="glyphicon glyphicon-certificate"></span> Temperature</a></li>
                    <li <?php if ($title == "Rainfall") echo ('class="active"'); ?>><a href="rainfall.php"><span class="glyphicon glyphicon-stats"></span> Rainfall</a></li>
                    <li <?php if ($title == "Wind") echo ('class="active"'); ?>><a href="wind.php"><span class="glyphicon glyphicon-flag"></span> Wind</a></li>

                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a><?php echo "Hello ". $user->getName() . "!"; ?></a></li>
                    <li><a href="logout.php">Log out</a></li>
                </ul>
            </div>
        </div>
    </nav>
</div>

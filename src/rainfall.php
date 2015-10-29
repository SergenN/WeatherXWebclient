<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 19-10-2015
 * Time: 16:26
 */

require_once 'includes/init.php';

if(!$user->isLoggedIn()) {
    header("Location: login.php");
}

$title = "Rainfall";
?>
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

<div class="container">

    <div class="page-header">
        <h1>Rainfall in the Pacific and the coastline of Asia</h1>
    </div>

    <div class="row">
        <div class="col-md-6">
            <p>Hallo! Dit is blok 1! In dit blok wordt per land weergegeven hoeveel regen er gemiddeld valt.</p>
            <div id="data_div"></div>
        </div>
        <div class="col-md-6">
            <p>Hallo! Dit is blok 2! In dit blok komt een grafiek met de gemiddelde hoeveelheid regen..</p>
            <div id="curve_div"></div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <p>Hallo! Dit is blok 3! In dit blok komt een tabel met de gemiddelde hoeveelheid regen die valt per weerstation.</p>
            <div id="table_div"></div>
        </div>
        <div class="col-md-6">
            <p>Hallo! Dit is blok 4! In dit blok komt een kaart met het gebied waar gemeten wordt.</p>
            <div id="map_div"></div>
        </div>
    </div>
</div>

    <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['line','table', 'corechart']}]}"></script>
    <script src="other/js/RainfallChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
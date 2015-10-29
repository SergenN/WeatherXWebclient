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

$title = "Wind";
?>

<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

    <div class="container">

        <div class="page-header">
            <h1>Average wind speed and direction worldwide</h1>
        </div>

        <div class="row">
            <div class="col-md-6">
                <p>Hallo! Dit is blok 1! In dit blok komt een pijl die de gemiddelde windrichting moet voorstellen van alle weerstations.</p>
                <div id="arrow_div"></div>
            </div>
            <div class="col-md-6">
                <p>Hallo! Dit is blok 2! In dit blok komt de gemiddelde windsnelheid van alle weerstations.</p>
                <div id="curve_div"></div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <p>Hallo! Dit is blok 3! In it blok komt een tabel met weerstations per regio en hun gemiddelden.</p>

                <table class="table">
                    <tr>
                        <td>Gegroet</td>
                        <td>Hallo</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Moi</td>
                        <td>Bonjour</td>
                        <td>Hello</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['line','table', 'corechart']}]}"></script>
    <script src="other/js/WindChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
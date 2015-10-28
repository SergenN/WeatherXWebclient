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

<?php include_once 'includes/footer.php'; ?>
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

$title = "Rainfall";
?>
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

<div class="container">
    <div class="row">
        <div class="col-md-6">
            <p>Hallo! Dit is blok 1! In dit blok wordt per land weergegeven hoeveel regen er gemiddeld valt.</p>
        </div>
        <div class="col-md-6">
            <p>Hallo! Dit is blok 2! In dit blok komt een grafiek met de gemiddelde hoeveelheid regen.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <p>Hallo! Dit is blok 3! In dit blok komt een tabel met de gemiddelde hoeveelheid regen die valt per weerstation.</p>
        </div>
        <div class="col-md-6">
            <p>Hallo! Dit is blok 4! In dit blok komt een kaart met het gebied waar gemeten wordt.</p>
        </div>
    </div>
</div>

<?php include_once 'includes/footer.php'; ?>
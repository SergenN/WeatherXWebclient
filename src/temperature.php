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

$title = "Temperature";

?>
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

    <div class="col-md-12">
        <div class="row">
            <div class="col-md-6" style="border: 1px solid red;">
                <p>Hallo! Dit is blok 1! In dit blok komen de gemiddelde temperaturen van China en Japan, plus het gemiddelde van die twee gegevens.</p>
            </div>
            <div class="col-md-6" style="border: 1px solid red;">
                <p>Hallo! Dit is blok 2! In dit blok komt een grafiek met de gemiddelde temparaturen.</p>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6" style="border: 1px solid red;">
                <p>Hallo! Dit is blok 3! In dit blok komt een tabel met weerstations.</p>
            </div>
            <div class="col-md-6" style="border: 1px solid red;">
                <p>Hallo! Dit is blok 4! In dit blok komt een kaart met weerstations.</p>
            </div>
        </div>
    </div>

<?php include_once 'includes/footer.php'; ?>
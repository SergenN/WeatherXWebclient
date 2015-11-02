<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 2-11-2015
 * Time: 14:00
 */

require_once 'includes/init.php';

if(!$user->isLoggedIn()) {
    header("Location: login.php");
}

$title = "Map";

?>
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

<iframe src="https://www.google.nl/maps/d/embed?mid=zVQYejBVynvc.k4ad2al67qBc" width="640" height="480"></iframe>

<?php include_once 'includes/footer.php'; ?>
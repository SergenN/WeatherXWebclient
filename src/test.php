<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 2-11-2015
 * Time: 14:00
 */
require_once 'includes/init.php';

$requiresLogin = false;
$userLevel = 0;
$title = "Map";

?>
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

    <div id="map_div"></div>

    <script type="text/javascript" src="other/js/jquery.csv-0.71.min.js"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="other/js/CSVtest.js"></script>


<?php include_once 'includes/footer.php'; ?>
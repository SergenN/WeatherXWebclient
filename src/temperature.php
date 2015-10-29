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
    <div class="container">

        <div class="page-header">
            <h1>Average temperatures in Japan and China</h1>
        </div>

        <div class="row">
            <div class="col-md-6">
                <h3>Averages</h3>
                <div id="data_div"></div>
            </div>
            <div class="col-md-6">
                <h3>Graph</h3>
                <div id="curve_div"></div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <h3>Summary</h3>
                <div id="table_div"></div>
            </div>
            <div class="col-md-6">
                <h3>Map</h3>
                <div id="map_div"></div>
            </div>
        </div>
    </div>


    <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['line','table', 'corechart']}]}"></script>
    <script src="other/js/TemperatureChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
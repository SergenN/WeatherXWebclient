<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 19-10-2015
 * Time: 16:26
 *
 * Note: this page contains data from a single station!
 * This page differs from stations.php
 */

$requiresLogin = true;
$userLevel = 1;
if(isset($_GET['id'])) {
    $id = $_GET['id'];
} else {
    $id = 10010;
}
$title = "Station " .  $id;

require_once 'includes/init.php';
include_once 'includes/header.php';
include_once 'includes/navbar.php';
require 'includes/StationProcessor.php';

?>
<div class="container">

    <div class="page-header">
        <h1><?php echo ucwords(strtolower($name)); ?></h1>
        <h4><?php echo $id;?> - <?php echo ucwords(strtolower($country)); ?></h4>
    </div>

    <div class="row">
        <div class="col-md-6">
            <table class="table">
                <tr>
                    <td><strong>Temperature</strong></td>
                    <td id="TEMP"></td>
                </tr>
                <tr>
                    <td><strong>Air pressure (station level)</strong></td>
                    <td id="STP"></td>
                </tr>
                <tr>
                    <td><strong>Air pressure (sea level)</strong></td>
                    <td id="SLP"></td>
                </tr>
                <tr>
                    <td><strong>Dew point</strong></td>
                    <td id="DEWP"></td>
                </tr>
                <tr>
                    <td><strong>Visibility</strong></td>
                    <td id="VISIB"></td>
                </tr>
            </table>
        </div>

        <div class="col-md-6">
            <table id="dataTable2" class="table">
                <tr>
                    <td><strong>Wind speed</strong></td>
                    <td id="WDSP"></td>
                </tr>
                <tr>
                    <td><strong>Precipitation</strong></td>
                    <td id="PRCP"></td>
                </tr>
                <tr>
                    <td><strong>Amount of snow</strong></td>
                    <td id="SNDP"></td>
                </tr>
                <tr>
                    <td><strong>Cloudiness</strong></td>
                    <td id="CLDC"></td>
                </tr>
                <tr>
                    <td><strong>Wind direction</strong></td>
                    <td id="WNDDIR"></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <h3>Temperature and Dew point</h3>
            <div id="temp_dewp_div"></div>
        </div>

        <div class="col-md-6">
            <h3>Air pressures</h3>
            <div id="airpress_div"></div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <h3>Precipitation and amount of snow</h3>
            <div id="precipitation_div"></div>
        </div>

        <div class="col-md-6">
            <h3>Visibility</h3>
            <div id="visib_div"></div>
        </div>
    </div>

</div>

    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="other/js/StationChart.js"></script>
<?php include_once 'includes/footer.php'; ?>
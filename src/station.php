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

require_once 'includes/init.php';

$requiresLogin = true;
$userLevel = 1;
$id = $_GET['id'];
$title = "Station " .  $id;

require 'includes/station_processor.php';

?>
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>
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
                    <td>21 degrees Celsius</td>
                </tr>
                <tr>
                    <td><strong>Air pressure (station level)</strong></td>
                    <td>1034,5 millibar</td>
                </tr>
                <tr>
                    <td><strong>Air pressure (sea level)</strong></td>
                    <td>1007,5 millibar</td>
                </tr>
                <tr>
                    <td><strong>Dew point</strong></td>
                    <td>-40 degrees Celsius</td>
                </tr>
                <tr>
                    <td><strong>Visibility</strong></td>
                    <td>123,7 kilometers</td>
                </tr>
            </table>
        </div>

        <div class="col-md-6">
            <table class="table">
                <tr>
                    <td><strong>Wind speed</strong></td>
                    <td>10,8 km/h</td>
                </tr>
                <tr>
                    <td><strong>Precipitation</strong></td>
                    <td>11,28 centimeters</td>
                </tr>
                <tr>
                    <td><strong>Amount of snow</strong></td>
                    <td>11,1 centimeters</td>
                </tr>
                <tr>
                    <td><strong>Cloudiness</strong></td>
                    <td>87,4%</td>
                </tr>
                <tr>
                    <td><strong>Wind direction</strong></td>
                    <td>West</td>
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
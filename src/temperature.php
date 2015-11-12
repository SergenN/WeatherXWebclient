<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 19-10-2015
 * Time: 16:26
 */

$requiresLogin = true;
$userLevel = 1;
$title = "Temperature";

require_once 'includes/init.php';
include_once 'includes/header.php';
include_once 'includes/navbar.php';
?>
    <div class="container">

        <div class="page-header">
            <div class="pull-left">
                <h1>Average temperatures below 10 &deg;C in Japan and China</h1>
                <h4>In a range of 5000 kilometer from the center of South Korea</h4>
            </div>
            <div class="pull-right">
                <div class="btn-custom">
                    <a class="btn btn-primary" href="download.php">Download data</a>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <h3>Averages</h3><br>

                <table data-toggle="table" id="averages-table" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                    <thead>
                    <tr>
                        <th data-field="country" data-sortable="true">Country</th>
                        <th data-field="temperature" data-sortable="true">Temperature</th>
                    </tr>
                    </thead>
                </table>

            </div>
            <div class="col-md-6">
                <h3>Graph</h3>
                <div id="curve_div"></div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <h3>Summary</h3>
                <table data-toggle="table" id="events-table" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                    <thead>
                    <tr>
                        <th data-field="name" data-sortable="true">Station</th>
                        <th data-field="country" data-sortable="true">Country</th>
                        <th data-field="temperature" data-sortable="true">Temperature</th>
                    </tr>
                    </thead>
                </table>
                <br>
            </div>
            <div class="col-md-6">
                <h3>Map</h3>
                <br>
                <div id="map_div"></div>
            </div>
        </div>
    </div>


    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="other/js/TemperatureChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
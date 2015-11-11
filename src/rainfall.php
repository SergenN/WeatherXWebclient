<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 19-10-2015
 * Time: 16:26
 */

$requiresLogin = true;
$userLevel = 1;
$title = "Rainfall";

require_once 'includes/init.php';
include_once 'includes/header.php';
include_once 'includes/navbar.php';
?>

<div class="container">
    <div class="page-header">
        <h1 class="pull-left">Rainfall in the Pacific and the coastline of Asia</h1>
        <div class="pull-right">
            <div class="btn-custom">
                <form action="" method="post"><input type="submit" class="btn btn-primary" value="Download data"></form>
            </div>
        </div>
      <div class="clearfix"></div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <h3>Average rainfall near the coastline per country</h3><br>
            <table data-toggle="table" id="events-table-countries" data-height="300" data-pagination="true" data-page-list="[5, 10, 20, 50, 100]">
                <thead>
                <tr>
                    <th data-field="country" data-sortable="true">Country</th>
                    <th data-field="prcp" data-sortable="true">Average rainfall</th>
                </tr>
                </thead>
            </table>
        </div>
        <div class="col-md-6" style="margin-left: -2vw;">
            <h3 style="padding-left: 2vw;">Average rainfall in the area</h3>
            <div id="curve_div"></div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <h3>Average precipitation per weather station</h3>

            <table data-toggle="table" id="events-table-stations" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                <thead>
                <tr>
                    <th data-field="stn" data-sortable="true">Station</th>
                    <th data-field="country" data-sortable="true">Country</th>
                    <th data-field="prcp" data-sortable="true">Rainfall</th>
                </tr>
                </thead>
            </table>
        </div>

        <div class="col-md-6">
            <h3>Map</h3>
            <br>
            <div id="map_div"></div><br>
        </div>
    </div>
</div>

    <!--<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['line', 'corechart']}]}"></script>
    --><script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="other/js/RainfallChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 19-10-2015
 * Time: 16:26
 */

require_once 'includes/init.php';

$requiresLogin = true;
$userLevel = 1;
$title = "Rainfall";
?>
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

<div class="container">

    <div class="page-header">
        <h1>Rainfall in the Pacific and the coastline of Asia</h1>
    </div>

    <div class="row">
        <div class="col-md-6">
            <h3>Average rainfall near the coastline per country</h3><br>
            <table data-toggle="table" id="events-table" data-url="data2.json" data-height="300" data-pagination="true" data-page-list="[5, 10, 20, 50, 100]">
                <thead>
                <tr>
                    <th data-field="country" data-sortable="true">Country</th>
                    <th data-field="wdsp" data-sortable="true">Average rainfall</th>
                </tr>
                </thead>
                <tr>
                    <td>China</td>
                    <td>30 mm</td>
                </tr>
                <tr>
                    <td>Japan</td>
                    <td>30 mm</td>
                </tr>
                <tr>
                    <td>Taiwan</td>
                    <td>30 mm</td>
                </tr>
                <tr>
                    <td>South Korea</td>
                    <td>30 mm</td>
                </tr>
                <tr>
                    <td>Vietnam</td>
                    <td>30 mm</td>
                </tr>
                <tr>
                    <td>Philippines</td>
                    <td>30 mm</td>
                </tr>
            </table>
        </div>
        <div class="col-md-6">
            <h3>Average rainfall in the area</h3>
            <div id="curve_div"></div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <h3>Average rainfall per weather station</h3>

            <table data-toggle="table" id="events-table" data-url="data2.json" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                <thead>
                <tr>
                    <th data-field="stn" data-sortable="true">Station</th>
                    <th data-field="country" data-sortable="true">Country</th>
                    <th data-field="wdsp" data-sortable="true">Average rainfall</th>
                </tr>
                </thead>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
                <tr>
                    <td>De Bilt</td>
                    <td>Netherlands</td>
                    <td>20 km/h</td>
                </tr>
            </table>
        </div>
        <div class="col-md-6">
            <h3>Map</h3>
            <div id="map_div"></div>
        </div>
    </div>
</div>

    <!--<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['line', 'corechart']}]}"></script>
    --><script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="other/js/RainfallChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
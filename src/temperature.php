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
            <h4>Below 10 &deg;C in the range of the center of South Korea</h4>
        </div>

        <div class="row">
            <div class="col-md-6">
                <h3>Averages</h3>
                <table class="table">
                    <tr>
                        <td><strong>China</strong></td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td><strong>Japan</strong></td>
                        <td>10 &deg;C</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><strong>Total area</strong></td>
                        <td>9 &deg;C</td>
                    </tr>
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
                <table data-toggle="table" id="events-table" data-url="data2.json" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                    <thead>
                    <tr>
                        <th data-field="stn" data-sortable="true">Station</th>
                        <th data-field="country" data-sortable="true">Country</th>
                        <th data-field="wdsp" data-sortable="true">Temperature</th>
                    </tr>
                    </thead>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>8 &deg;C</td>
                    </tr>
                </table>

            </div>
            <div class="col-md-6">
                <h3>Map</h3>
                <div id="map_div"></div>
            </div>
        </div>
    </div>


    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="other/js/TemperatureChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
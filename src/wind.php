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
$title = "Wind";
?>

<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

    <div class="container">
        <div class="page-header">
            <h1 class="pull-left">Average wind speed and direction worldwide</h1>
            <div class="pull-right">
                <div class="btn-group">
                    <form action="" method="post"><input type="submit" class="btn btn-primary" value="Download data"></form>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <h3>Average wind direction</h3>
                <div style="padding-top: 10px">
                    <div id="compass">
                        <div id="pointer"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h3>Average wind speed</h3>
                <div id="curve_div"></div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h3>Summary</h3>

                <table data-toggle="table" id="events-table" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                    <thead>
                        <tr>
                            <th data-field="stn" data-sortable="true">Station</th>
                            <th data-field="country" data-sortable="true">Country</th>
                            <th data-field="wdsp" data-sortable="true">Wind speed</th>
                            <th data-field="wnddir" data-sortable="true">Wind direction</th>
                        </tr>
                    </thead>
                </table>
                <br>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="other/js/WindChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
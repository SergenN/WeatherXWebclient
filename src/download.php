<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 11-11-2015
 * Time: 22:29
 */
$userLevel = 1;
$title = "Downloads";
$requiresLogin = true;

require_once 'includes/init.php';
include_once 'includes/header.php';
include_once 'includes/navbar.php';
?>
    <style>
        .table-hover tbody tr:hover > td {
            cursor: pointer;
        }
    </style>

    <div class="container">
        <div class="page-header">
            <h1>Downloads</h1>
            <h4>A table containing all downloadable history files</h4>
        </div>

        <div class="row">
            <div class="col-md-12">
                <table data-toggle="table" data-side-pagination="client" id="events-table" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                    <thead>
                    <tr>
                        <th data-field="name" data-sortable="true">File name</th>
                        <th data-field="day" data-sortable="true">Day</th>
                        <th data-field="month" data-sortable="true">Month</th>
                        <th data-field="year" data-sortable="true">Year</th>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    <script src="other/js/Downloads.js"></script>
<?php include_once 'includes/footer.php'; ?>
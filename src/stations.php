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
$title = "Stations";
?>

<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

    <div class="container">

        <div class="page-header">
            <h1>Stations</h1>
            <h4>A table containing all stations across the globe</h4>
        </div>

        <div class="row">
            <div class="col-md-12">

                <table data-toggle="table" data-side-pagination="client" id="events-table" data-url="includes/StationsProcessor.php" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                    <thead>
                        <tr>
                            <th data-field="stn" data-sortable="true">Station number</th>
                            <th data-field="name" data-sortable="true">Station name</th>
                            <th data-field="country" data-sortable="true">Country</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

<?php include_once 'includes/footer.php'; ?>
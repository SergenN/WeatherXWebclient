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
            <h1>Average wind speed and direction worldwide</h1>
        </div>

        <div class="row">
            <div class="col-md-6">
                <h3>Average wind direction</h3>
                <div style="padding-top: 10px">
                    <div style="background: url('other/img/compass.png') no-repeat; background-size: cover; width: 180px; height: 180px; margin-right: auto; margin-left: auto;">
                    <div id="pointer" style="background: url('other/img/pointer.png') no-repeat center center; background-size: 18% 70%; width: 180px; height: 180px;"></div></div>
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

                <table data-toggle="table" id="events-table" data-url="data2.json" data-height="400" data-search="true" data-pagination="true" data-show-columns="true" data-page-list="[5, 10, 20, 50, 100]">
                    <thead>
                        <tr>
                            <th data-field="stn" data-sortable="true">Station</th>
                            <th data-field="country" data-sortable="true">Country</th>
                            <th data-field="wdsp" data-sortable="true">Wind speed</th>
                            <th data-field="wnddir" data-sortable="true">Wind direction</th>
                        </tr>
                    </thead>
                    <tr>
                        <td>De Bilt</td>
                        <td>Netherlands</td>
                        <td>20 km/h</td>
                        <td>Northwest</td>
                    </tr>
                    <tr>
                        <td>Groningen Ap Eelde</td>
                        <td>Netherlands</td>
                        <td>17 km/h</td>
                        <td>West</td>
                    </tr>
                    <tr>
                        <td>Gegroet</td>
                        <td>Hallo</td>
                        <td>Hoi</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Moi</td>
                        <td>Bonjour</td>
                        <td>Hello</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Gegroet</td>
                        <td>Hallo</td>
                        <td>Hoi</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Moi</td>
                        <td>Bonjour</td>
                        <td>Hello</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Gegroet</td>
                        <td>Hallo</td>
                        <td>Hoi</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Moi</td>
                        <td>Bonjour</td>
                        <td>Hello</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Gegroet</td>
                        <td>Hallo</td>
                        <td>Hoi</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Moi</td>
                        <td>Bonjour</td>
                        <td>Hello</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Gegroet</td>
                        <td>Hallo</td>
                        <td>Hoi</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Moi</td>
                        <td>Bonjour</td>
                        <td>Hello</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Gegroet</td>
                        <td>Hallo</td>
                        <td>Hoi</td>
                        <td>Hoi</td>
                    </tr>
                    <tr>
                        <td>Moi</td>
                        <td>Bonjour</td>
                        <td>Hello</td>
                        <td>Hoi</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <script>
        function bounceAnimate(rot) {
            rotExtra = rot+10;
            rotatePointer(rotExtra, 600);
            rotatePointer(rot, 150)
        }

        function rotatePointer(amount, time){
            $('#pointer').animate({borderSpacing: amount}, {
                step: function (now, fx) {
                    $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                    $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
                    $(this).css('transform', 'rotate(' + now + 'deg)');
                    $(this).css('animation-timing-function', 'linear');
                },
                duration: time
            });
        }
        bounceAnimate(360);
    </script>

    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script src="other/js/WindChart.js"></script>

<?php include_once 'includes/footer.php'; ?>
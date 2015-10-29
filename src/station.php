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

$title = "Station";

?>
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>
<div class="container">

    <div class="page-header">
        <h1>De Bilt</h1>
        <h4>The Netherlands</h4>
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
                    <td><strong>Windspeed</strong></td>
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
            <p>Hier kan een kaart komen.</p>
        </div>

        <div class="col-md-6">
            <p>Hier kan een kaart komen.</p>
        </div>
    </div>
</div>

<?php include_once 'includes/footer.php'; ?>
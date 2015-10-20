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

$winddirection = 2;

/**
 * Translates the amount of degrees to a proper English word
 * TODO: fix amounts
 * TODO: move function to other file/place
 * @param $winddirection
 * @return string
 */
function degreesToText($winddirection) {
    if($winddirection >= 0 && $winddirection <= 360) {
        switch($winddirection) {
            case $winddirection <= 22.5 || $winddirection > 337.5:
                $text = "North";
                break;
            case $winddirection > 22.5  || $winddirection <= 67.5:
                $text = "Northeast";
                break;
            case $winddirection > 67.5 || $winddirection <= 107.5 :
                $text = "East";
                break;
            case $winddirection > 107.5 || $winddirection <= 152.5:
                $text = "Southeast";
                break;
            case $winddirection > 152.5 || $winddirection <= 197.5:
                $text = "South";
                break;
            case $winddirection > 197.5 || $winddirection <= 242.5:
                $text = "Southweat";
                break;
            case $winddirection > 242.5 || $winddirection <= 287.5:
                $text = "West";
                break;
            case $winddirection > 287.5 || $winddirection <= 337.5 :
                $text = "Northwest";
                break;
            default:
                $text = "Unknown";
        }
        return $text;
    }
}
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <title>WeatherX</title>
    <link rel="stylesheet" href="other/css/bootstrap.min.css">
</head>
<body>
<div class="container-fluid">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"><span class="glyphicon glyphicon-home"></span>
                <span class="icon-bar"><span class="glyphicon glyphicon-certificate"></span>
                <span class="icon-bar"><span class="glyphicon glyphicon-flag"></span>
            </button>
        </div>
        <div class="container">
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="index.php"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;&nbsp;Home</a></li>
                    <li><a href="temperature.php"><span class="glyphicon glyphicon-certificate"></span> Temperature</a></li>
                    <li><a href="rainfall.php"><span class="glyphicon glyphicon-stats"></span> Rainfall</a></li>
                    <li><a href="wind.php"><span class="glyphicon glyphicon-flag"></span> Wind</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a><?php echo "Hello ". $user->getName() . "!"; ?></a></li>
                    <li><a href="logout.php">Log out</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="col-md-12">
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
                        <td><strong>Neerslag</strong></td>
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
    </div>
</div>

<!-- </div> -->
<script src="other/js/bootstrap.min.js"></script>
</body>
</html>
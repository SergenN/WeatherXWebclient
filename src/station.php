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

$title = "Stations";

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
<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>
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

<?php include_once 'includes/footer.php'; ?>
<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 21-10-2015
 * Time: 17:08
 */

/**
 * Translates the amount of degrees to a proper English word
 * Used in station.php
 * @param $winddirection
 * @return string
 */
function degreesToText($winddirection) {
    if($winddirection >= 0 && $winddirection <= 360) {
        switch($winddirection) {
            case ($winddirection > 337.5 && $winddirection < 360) || $winddirection <= 22.5:
                $text = "North";
                break;
            case $winddirection > 22.5 && $winddirection <= 67.5:
                $text = "Northeast";
                break;
            case $winddirection > 67.5 && $winddirection <= 112.5 :
                $text = "East";
                break;
            case $winddirection > 112.5 && $winddirection <= 157.5:
                $text = "Southeast";
                break;
            case $winddirection > 157.5 && $winddirection <= 202.5:
                $text = "South";
                break;
            case $winddirection > 202.5 && $winddirection <= 247.5:
                $text = "Southwest";
                break;
            case $winddirection > 247.5 && $winddirection <= 292.5:
                $text = "West";
                break;
            case $winddirection > 292.5 && $winddirection <= 337.5 :
                $text = "Northwest";
                break;
            default:
                $text = "Unknown";
        }
    } else {
        $text = "Unknown";
    }
    return $text;
}

?>
<?php
/**
 * Created by PhpStorm.
 * User: Leon, Sergen
 * Date: 15-10-2015
 * Time: 10:40
 */

$requiresLogin = true;
$userLevel = 1;
$title = "Home";

require_once 'includes/init.php';
include_once 'includes/header.php';
include_once 'includes/navbar.php';

?>

<script src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false" type="text/javascript"></script>
<script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer.js" type="text/javascript"></script>
<div id="map_canvas"></div>
<script src="other/js/Map.js"></script>

<?php include_once 'includes/footer.php'; ?>

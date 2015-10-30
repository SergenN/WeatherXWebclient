<?php
/**
 * Created by PhpStorm.
 * User: Leon, Sergen
 * Date: 15-10-2015
 * Time: 10:40
 */

require_once 'includes/init.php';

$requiresLogin = true;
$userLevel = 1;
$title = "Home";
?>

<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>
<iframe width="100%" height="535vh" frameBorder="0" src="http://umap.openstreetmap.fr/nl/map/untitled-map_56362?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&datalayersControl=true&onLoadPanel=undefined&captionBar=false"></iframe>
<?php include_once 'includes/footer.php'; ?>

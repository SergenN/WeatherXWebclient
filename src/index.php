<?php
/**
 * Created by PhpStorm.
 * User: Leon, Sergen
 * Date: 15-10-2015
 * Time: 10:40
 */

require_once 'includes/init.php';

if(!$user->isLoggedIn()) {
    header("Location: login.php");
}

$title = "Home";
?>

<?php include_once 'includes/header.php'; ?>
<?php include_once 'includes/navbar.php'; ?>

    <div class="row">
            <div class="col-md-12">
                <iframe width="100%" height="700px" frameBorder="0" src="http://umap.openstreetmap.fr/nl/map/untitled-map_56362?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&datalayersControl=true&onLoadPanel=undefined&captionBar=false"></iframe>
            </div>
    </div>

<?php include_once 'includes/footer.php'; ?>

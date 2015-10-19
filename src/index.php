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
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="container">
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">

                        <li class="active"><a href="index.html"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;&nbsp;Home</a></li>
                        <li><a href="test.html">test</a></li>
                        <li><a href="test2.html">test2</a></li>
                        <li><a href="logout">logout</a></li>

                        <li><a href=""><?php echo "HALLO ". $user->getName() . "!"; ?></a></li>
                    </ul>
                </div>
            </div>
        </nav>

<br /> <br /> <br />

        <div class="row">
            <div class="container">
                <div class="col-md-12">
                    <iframe width="100%" height="700px" frameBorder="0" src="http://umap.openstreetmap.fr/nl/map/untitled-map_56362?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&datalayersControl=true&onLoadPanel=undefined&captionBar=false"></iframe>
                </div>
            </div>
        </div>
        <!--<p><a href="http://umap.openstreetmap.fr/nl/map/untitled-map_56362">See full screen</a></p>-->

    </div>
    <script src="../other/js/bootstrap.min.js"></script>
</body>
</html>
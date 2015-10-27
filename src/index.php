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
    <script src="other/js/jquery-2.1.4.min.js"></script>

    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">

        // Load the Visualization API library and the piechart library.
        google.load('visualization', '1', {'packages':['corechart']});
        //google.setOnLoadCallback(drawChart);
    </script>
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
                        <li class="active"><a href="index.php"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;&nbsp;Home</a></li>
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
    </div>

<br /> <br /> <br />

        <div class="row">
                <div class="col-md-12">
                    <iframe width="100%" height="700px" frameBorder="0" src="http://umap.openstreetmap.fr/nl/map/untitled-map_56362?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&datalayersControl=true&onLoadPanel=undefined&captionBar=false"></iframe>
                </div>
        </div>
        <!--<p><a href="http://umap.openstreetmap.fr/nl/map/untitled-map_56362">See full screen</a></p>-->

    <!-- </div> -->
    </div>
    <script src="other/js/bootstrap.min.js"></script>
</body>
</html>

<?php
    //session_destroy();
?>

<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 15-10-2015
 * Time: 10:40
 */

require_once 'includes/header.php';

?>

<!DOCTYPE html>
<html>
<head lang="en">
    <title>Home - WeatherX</title>
    <link rel="stylesheet" href="other/css/bootstrap.min.css">
</head>

<body>
<div class="col-md-6 col-md-offset-3">
    <br>
    <img src="other/img/logo.png" style="display: block; margin-left: auto; margin-right: auto">
    <br>

    <p style="text-align: center">Welcome on WeatherX. Please login to access the weather data from our database.</p><br>

    <form>
        <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input type="email" class="form-control" id="inputEmail" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" id="inputPassword" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-default">Login</button>
        <button type="button" class="btn btn-danger">I lost my credentials</button>
    </form>
</div>

</body>

<?php

include 'includes/footer.php';

?>
</html>
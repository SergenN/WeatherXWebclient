<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 15-10-2015
 * Time: 10:40
 */

require_once 'includes/init.php';

if (isset($_POST['submitLogin'])){
    $user->validateLogin($_POST['email'], $_POST['pass'], $connection);
}

if ($user->isLoggedIn()){
    header("Location: index.php");
}

$title = "Login";

?>
<?php include_once 'includes/header.php'; ?>
    <div class="col-md-6 col-md-offset-3">
        <br>
        <img src="other/img/logo.png" style="display: block; margin-left: auto; margin-right: auto">
        <br>

        <p style="text-align: center">Welcome on WeatherX. Please login to access the weather data from our database.</p><br>

        <form method="post" action="">
            <div class="form-group">
                <label for="inputEmail">Email address</label>
                <input type="email" name="email" class="form-control" id="inputEmail" placeholder="Email">
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" name="pass" class="form-control" id="inputPassword" placeholder="Password">
            </div>
            <button type="submit" name="submitLogin" class="btn btn-default">Login</button>
        </form>
    </div>
<?php include_once 'includes/footer.php'; ?>
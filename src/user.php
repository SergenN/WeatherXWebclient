<?php
/**
 * Created by PhpStorm.
 * User: Leon
 * Date: 19-10-2015
 * Time: 16:26
 */
$requiresLogin = true;
$userLevel = 1;
$title = "User";

require_once 'includes/init.php';

$login = "rekt";

if (!empty($_POST)){
    if(isset($_POST['submitPass'])){
        $login = $user->setPassword($_POST['oldPass'], $_POST['newPass'], $connection);
    }
    if(isset($_POST['themeSubmit'])){
        $active = (isset($_POST['themeCheck']) && $_POST['themeCheck'] == '1') ? true : false;
        $user->setTheme($active, $connection);
    }
}

include_once 'includes/header.php';
include_once 'includes/navbar.php';
?>


<div class="container">
    <div class="page-header">
        <h1>Personal Configuration</h1>
    </div>
    <div class="row">
        <div class="col-md-6">
            <h3>Personal information</h3><br />
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <label for="UID" class="col-md-3 control-label">User ID</label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="UID" value="<?php echo $user->getId(); ?>" disabled>
                    </div>
                </div>
                <div class="form-group">
                    <label for="UNAME" class="col-md-3 control-label">Name</label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="UNAME" value="<?php echo $user->getName(); ?>" disabled>
                    </div>
                </div>
                <div class="form-group">
                    <label for="UMAIL" class="col-md-3 control-label">E-Mail</label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="UMAIL" value="<?php echo $user->getMail(); ?>" disabled>
                    </div>
                </div>
            </form>
            <form id="themeForm" class="form-horizontal" role="form" method="post" action="">
                <div class="form-group">
                    <label for="themeCheck" class="col-md-3 control-label">Green theme</label>
                    <div class="col-md-6">
                        <input type="hidden" name="themeCheck" value="0" />
                        <input type="checkbox" id="themeCheck" value="1" name="themeCheck" <?php $ret = $user->getTheme() == "green" ? "checked" : ""; echo $ret;?>>
                        <input type="submit" id="themeSubmit" name="themeSubmit" style="visibility: hidden;">
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-6">
            <h3>Change your password</h3><br />
            <form class="form-horizontal" role="form" method="post" action="">
                <div id="oldPassDiv" class="form-group has-error has-feedback">
                    <label class="col-md-3 control-label" for="oldPass">Old password</label>
                    <div class="col-md-6">
                        <input type="password" class="form-control" name="oldPass" id="oldPass" aria-describedby="inputError2Status">
                        <span id="oldPassIco" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div id="newPassDiv" class="form-group has-error has-feedback">
                    <label class="col-md-3 control-label" for="newPass">New password</label>
                    <div class="col-md-6">
                        <input type="password" class="form-control" name="newPass" id="newPass" aria-describedby="inputError2Status">
                        <span id="newPassIco" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div id="newPassrDiv" class="form-group has-error has-feedback">
                    <label class="col-md-3 control-label" for="newPassr">New password repeated</label>
                    <div class="col-md-6">
                        <input type="password" class="form-control" name="newPassr" id="newPassr" aria-describedby="inputError2Status">
                        <span id="newPassrIco" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                    </div>
                </div>
                <div>
                    <div class="col-md-offset-3 col-md-6" style="padding-left: 1.3%;">
                        <button type="submit" name="submitPass" id="submitPass" class="btn btn-primary" disabled>Change password</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="other/js/userConfig.js"></script>
<?php include_once 'includes/footer.php'; ?>
<?php
    if ($login == "false"){
        echo '<script type="text/javascript">
            swal("Invalid Password!", "You entered a wrong password.", "error");
        </script>';
    }
    if ($login == "true"){
        echo '<script type="text/javascript">
            swal("Password changed!", "Your password has been changed", "success");
        </script>';
    }
?>


<?php
/**
 * Created by PhpStorm.
 * User: Sergen
 * Date: 20-10-2015
 * Time: 11:18
 */

?>

<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>WebSocket Chat</title>
    <script src="other/js/jquery-2.1.4.min.js"></script>
    <script src="other/js/SocketStream.js"></script>
</head>
<body>
<h1>WebSocket Chat</h1>
<!--<form id="SendMSG">
    <input id="message" type="text" title="bericht"/>
    <input id="submit" type="submit" name="zend" title="verzend"/>
</form>
<script src="other/js/jquery-2.1.4.min.js"></script>
<script>
    var ws = $.websocket("ws://127.0.0.1:8080/", {
        events: {
            message: function(e) { $('#content').append(e.data + '<br>') }
        }
    });
    $('#SendMSG').submit(function(e){
        e.preventDefault();
        ws.send('message', $('#message').val());
        $('#message').val('')
    });
</script>-->
</body>
</html>
<!--
<html lang="en">
<head>
    <title>Node Based Echo</title>
    <script src="other/js/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="other/js/jquery.websocket-0.0.1.js" type="text/javascript"></script>
    <script src="other/js/jquery.json-2.2.min.js" type="text/javascript"></script>
</head>
<body>
<script type="text/javascript">

    // sends a message to the websocket server
    function sendToServer() {
        ws.send('krakenmsgA', '{ messageTextA: ' + $("#echoText").val() + ' }');
        ws.send('krakenmsgB', '{ messageTextB: ' + $('#echoText').val() + ' }');
    }

    // set-up web socket
    var ws = $.websocket("ws://localhost:8080/", "kraken-protocol", {
        open: function () { },
        close: function () { alert('websocket has been closed'); },
        events: {
            krakenmsgA: function (e) { $('#returnText').append(e.data + "<br/>"); },
            krakenmsgB: function (e) { $('#returnText').append(e.data + "<br/>"); }
        }
    });

</script>
<div>
    <div style="float: left; clear: left; padding-top: 2px;">
        Your text:
    </div>
    <div style="float: left; padding-left: 20px;">
        <input type="text" id="echoText" style="width: 150px;" required />
    </div>
    <div style="clear: left;">
        <input type="button" onclick="sendToServer();" value="Send" />
    </div>
    <div id="returnText" style="clear: left; height: 200px; padding-top: 30px;">
    </div>
</div>
</body>
</html>-->


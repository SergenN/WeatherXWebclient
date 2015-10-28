<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>submit demo</title>
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>

<h1>Zend een bericht</h1>
<form id="jqtest">
    <div>
        <input type="text" id="mesg" placeholder="T3k5t Pl0x">
        <input type="submit" value="verzenden">
    </div>
</form>
<br />
<div id="textarea" style=" width: 500px; border: 1px solid blue;">
   <b>Message terminal</b> <br />
</div>

<script>
    var ws = new WebSocket("ws://127.0.0.1:8080/");

    ws.onopen = function() {
        $( "#textarea" ).append('<b style="color:red;">Connectie gemaakt met de server</b><br />');
        ws.send("Hello Server");
    };

    ws.onmessage = function (evt) {
        $( "#textarea" ).append("Server: " + evt.data + "<br />");
    };

    ws.onclose = function() {
        $( "#textarea" ).append('<b style="color:red;">Connectie gesloten</b><br />');
    };

    ws.onerror = function(err) {
        $( "#textarea" ).append('<b style="color:red;">Connectie Afgebroken'+err+'</b><br />');
    };

    $( "#jqtest" ).submit(function( event ) {
        var message = $('#mesg');
        ws.send(message.val());
        $( "#textarea" ).append("You: " + message.val() + "<br />");
        message.val('');
        event.preventDefault();
    });

</script>

</body>
</html>
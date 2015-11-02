/**
 * Created by Leon on 30-10-2015.
 */

/* chart functions */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Seconds', 'Temperature', 'Dew point'],
        ['1',  30, 1],
        ['2',  31, 0],
        ['3',  32, -5],
        ['4',  29, 3],
        ['5',  30, 1],
        ['6',  31, 0],
        ['7',  32, -5],
        ['8',  29, 3]
    ]);

    var options = {
        title: 'Temperatures',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('temp_dewp_div'));

    chart.draw(data, options);
}


/* Table functions */


/* Socket functions */

var socket = new WebSocket("ws://127.0.0.1:8080/");

ws.onopen = function() {
    alert("Opened!");
    ws.send("Hello Server");
};

ws.onmessage = function (evt) {
    var data = evt.data();
};

ws.onclose = function() {
};

ws.onerror = function(err) {

};



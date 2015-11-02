/**
 * Created by Leon on 30-10-2015.
 */

/* chart functions */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Seconds', 'Amount of snow', 'Precipitation'],
        ['1',  30, 28],
        ['2',  31, 30],
        ['3',  29, 29],
        ['4',  33, 29],
        ['5',  33, 30],
        ['6',  32, 28],
        ['7',  33, 27],
        ['8',  31, 30]
    ]);

    var options = {
        title: 'Centimeters',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('precipitation_div'));

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



/**
 * Created by Leon on 30-10-2015.
 */

/* chart functions */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Seconds', 'Visibility'],
        ['1',  30],
        ['2',  34],
        ['3',  35],
        ['4',  34],
        ['5',  33],
        ['6',  32],
        ['7',  35],
        ['8',  33]
    ]);

    var options = {
        title: 'Kilometers',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('visib_div'));

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



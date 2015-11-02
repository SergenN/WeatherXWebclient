/**
 * Created by Leon on 30-10-2015.
 */

/* chart functions */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Seconds', 'Sea level', 'Station level'],
        ['1',  1034.5, 1007.5],
        ['2',  1033, 1008],
        ['3',  1030, 1009.9],
        ['4',  1032, 1008],
        ['5',  1030, 1010],
        ['6',  1031, 1008.3],
        ['7',  1029, 1009],
        ['8',  1028, 1007]
    ]);

    var options = {
        title: 'Millibars',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('airpress_div'));

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



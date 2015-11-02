/**
 * Created by Sergen on 29-10-2015.
 */

/**
 * Created by Sergen on 28-10-2015.
 */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Seconds', 'Temperature'],
        ['1',  30],
        ['2',  31],
        ['3',  32],
        ['4',  29]
    ]);

    var options = {
        title: 'Average temperatures',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_div'));

    chart.draw(data, options);
}

/* Map functions */
google.load("visualization", "1", {packages:["map"]});
google.setOnLoadCallback(drawMap);

function drawMap() {
    var data = google.visualization.arrayToDataTable([
        ['Lat', 'Long', 'Name'],
        [37.4232, -122.0853, 'Work'],
        [37.4289, -122.1697, 'University'],
        [37.6153, -122.3900, 'Airport'],
        [37.4422, -122.1731, 'Shopping']
    ]);

    var map = new google.visualization.Map(document.getElementById('map_div'));
    map.draw(data, {showTip: true});
}


/* Table functions */
function updateRow(dataRow) {

    var table = $('#events-table');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if (value.country == dataRow.country) {
            found = true;
            $table.bootstrapTable('updateRow', {
                index: value.id,
                row: {
                    data1: '',
                    data2: ''
                }
            });
        }
    });

    if (!found) {
        addRow(dataRow);
    }
}

function addRow(dataRow){
    table.bootstrapTable('append', {
        row: {
            data1: '',
            data2: ''
        }
    });
}

/* Socket functions */

var socket = new WebSocket("ws://127.0.0.1:8080/");

ws.onopen = function() {
    alert("Opened!");
    ws.send("Hello Server");
};

ws.onmessage = function (evt) {
    var data = evt.data();
};

ws.onclose = function() {};
ws.onerror = function(err) {};

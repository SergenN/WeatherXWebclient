/**
 * Created by Sergen on 28-10-2015.
 */

var data;
var options;
var chart;

/* Chart functions */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    data = google.visualization.arrayToDataTable([
        ['Seconds', 'Rainfall'],
        ['1',  30],
        ['2',  31],
        ['3',  32],
        ['4',  29]
    ]);

    options = {
        title: 'Average rainfall',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    chart = new google.visualization.LineChart(document.getElementById('curve_div'));

    chart.draw(data, options);
}

/* Map functions */
google.load('visualization', '1', {packages: ['geochart']});
google.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['Country',   'Average rainfall'],
        ['Japan', 36], ['China', -8], ['North Korea', 6], ['South Korea', -24],
        ['Taiwan', 12], ['Vietnam', -3], ['Laos', 3],
        ['Thailand', 28], ['Mongolia', 15],
        ['Myanmar', 4], ['Bangladesh', 35], ['Philippines', 12],
        ['Malaysia', -12], ['Bhutan', 6],
        ['Nepal', -3], ['Indonesia', 12],
        ['Singapore', 26], ['Cambodia', 3]]);

    var options = {
        region: '142', // Azie = 142
        colorAxis: {colors: ['#B2BBCF', '#7287B5', '#225FE3']},
        backgroundColor: '#c7c5c7',
        datalessRegionColor: '#ffffff',
        defaultColor: '#ffffff'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('map_div'));
    chart.draw(data, options);
}

/* Table options */

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
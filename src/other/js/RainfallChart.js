/**
 * Created by Sergen on 28-10-2015.
 */

var rainfallChart, rainfallOptions, rainfallData, regionsChart, regionsOptions, regionsData;
/* Chart functions */
google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(initChart);

function initChart(){

    var rWidth = ($(document).width() / 100) * 35;
    var rHeight = ($(document).height() / 100)  * 30;
    rainfallChart = new google.visualization.LineChart(document.getElementById('curve_div'));
    rainfallOptions = {title: 'Rainfall', curveType: 'function', legend: { position: 'bottom' }, width:rWidth, height:rHeight};
    rainfallData = new google.visualization.DataTable();

    rainfallData.addColumn('number', 'Seconds');
    rainfallData.addColumn('number','Average rainfall (mm)');
    drawChart();
}

function drawChart() {
    rainfallChart.draw(rainfallData, rainfallOptions);
}

/* Map functions */
google.load('visualization', '1', {packages: ['geochart']});
google.setOnLoadCallback(initRegions);

function initRegions(){
    regionsData = google.visualization.arrayToDataTable([
        ['Country',   'Average rainfall'],
        ['Japan', 36], ['China', -8], ['North Korea', 6], ['South Korea', -24],
        ['Taiwan', 12], ['Vietnam', -3], ['Laos', 3],
        ['Thailand', 28], ['Mongolia', 15],
        ['Myanmar', 4], ['Bangladesh', 35], ['Philippines', 12],
        ['Malaysia', -12], ['Bhutan', 6],
        ['Nepal', -3], ['Indonesia', 12],
        ['Singapore', 26], ['Cambodia', 3]]);

    regionsOptions = {
        region: '030', // Azie = 142
        colorAxis: {colors: ['#B2BBCF', '#7287B5', '#225FE3']},
        backgroundColor: '#c7c5c7',
        datalessRegionColor: '#ffffff',
        defaultColor: '#ffffff'
    };

    regionsChart = new google.visualization.GeoChart(document.getElementById('map_div'));
    drawRegionsMap();
}

function drawRegionsMap() {
    regionsChart.draw(regionsData, regionsOptions);
}

/* Table options */

function updateTable(dataRow, stn) {

    var table = stn ? $('#events-table-stations') : $('#events-table-countries');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if ((stn && value.stn == dataRow.stn) || (value.country == dataRow.country)) {
            found = true;
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'prcp',
                value: dataRow.prcp
            });

            table.bootstrapTable('updateCell', {
                index: index,
                field: 'sndp',
                value: dataRow.sndp
            });
        }
    });


    if (!found) {
        addRow(dataRow, stn);
    }
}

function addRow(dataRow, stn){
    row = [];
    if(stn){
        row.push({
            stn: dataRow.name,
            country: dataRow.country,
            prcp: dataRow.prcp,
            sndp: dataRow.sndp
        });
    } else {
        row.push({
            country: dataRow.country,
            prcp: dataRow.prcp,
            sndp: dataRow.sndp
        });
    }

    var table = stn ? $('#events-table-stations') : $('#events-table-countries');
    table.bootstrapTable('append', row);
}

/* Socket functions */

var socket = new WebSocket("ws://127.0.0.1:8080/");

socket.onopen = function() {
    socket.send("GET 890020");
};

socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    updateChart(obj);
    updateTable(obj, true);
};

socket.onclose = function() {};
socket.onerror = function(err) {};

function updateChart(jsonVar){
    rainfallData.addRow([rainfallData.getNumberOfRows()+1, parseFloat(jsonVar.PRCP)]);
    drawChart();
}
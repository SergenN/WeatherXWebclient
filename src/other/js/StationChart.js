/**
 * Created by Sergen on 29-10-2015.
 */
/* chart functions */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

var airPressureChart = new google.visualization.LineChart(document.getElementById('visualization'));
var airPressureData = google.visualization.arrayToDataTable([['Seconds', 'Sea level', 'Station level']]);
var airPressureOptions = {title: 'Millibars', curveType: 'function', legend: { position: 'bottom' }};

var precipitationChart = airPressureChart.clone();
var precipitationData = google.visualization.arrayToDataTable([['Seconds', 'Amount of snow', 'Precipitation']]);
var precipitationOptions = {title: 'Centimeters', curveType: 'function', legend: { position: 'bottom' }};

var dewPointChart = airPressureChart.clone();
var dewPointData = google.visualization.arrayToDataTable([['Seconds', 'Temperature', 'Dew point']]);
var dewPointOptions = {title: 'Temperatures', curveType: 'function', legend: { position: 'bottom' }};

var visibilityChart = airPressureChart.clone();
var visibilityData = google.visualization.arrayToDataTable([['Seconds', 'Visibility']]);
var visibilityOptions = {title: 'Kilometers', curveType: 'function', legend: { position: 'bottom' }};

function drawChart() {
    airPressureChart.draw(airPressureData, airPressureOptions);
    precipitationChart.draw(precipitationData, precipitationOptions);
    dewPointChart.draw(dewPointData, dewPointOptions);
    visibilityChart.draw(visibilityData, visibilityOptions);
}

/* Socket options */

var socket = new WebSocket("ws://127.0.0.1:8080/");
var counter = 0;
ws.onopen = function() {
    ws.send("GET " + getUrlParameter("id"));
};

ws.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data());
    updateCharts(obj);
    counter++;
    if (counter == 0) {
        updateTable(obj);
    }
    if (counter == 10){
        counter = 0;
    }
};

ws.onclose = function() {};
ws.onerror = function(err) {};

/*utils*/

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function updateTable(jsonVar){
    var table = $('#dataTable');
    var table2 = $('#dataTable2');
    table.bootstrapTable('updateRow', {index: 0, row: {TEMP:jsonVar.TEMP}});
    table.bootstrapTable('updateRow', {index: 1, row: {STP:jsonVar.STP}});
    table.bootstrapTable('updateRow', {index: 2, row: {SLP:jsonVar.SLP}});
    table.bootstrapTable('updateRow', {index: 3, row: {DEWP:jsonVar.DEWP}});
    table.bootstrapTable('updateRow', {index: 4, row: {VISIB:jsonVar.VISIB}});
    table2.bootstrapTable('updateRow', {index: 0, row: {WDSP:jsonVar.WDSP}});
    table2.bootstrapTable('updateRow', {index: 1, row: {PRCP:jsonVar.PRCP}});
    table2.bootstrapTable('updateRow', {index: 2, row: {SNDP:jsonVar.SNDP}});
    table2.bootstrapTable('updateRow', {index: 3, row: {CLDC:jsonVar.CLDC}});
    table2.bootstrapTable('updateRow', {index: 4, row: {WNDDIR:jsonVar.WNDDIR}});
}

function updateCharts(jsonVar){
    airPressureData.addRow([airPressureData.getNumberOfRows(), jsonVar.SLP, jsonVar.STP]);
    precipitationData.addRow([precipitationData.getNumberOfRows(), jsonVar.SNDP, jsonVar.PRCP]);
    dewPointData.addRow([[dewPointData.getNumberOfRows(), jsonVar.TEMP, jsonVar.DEWP]]);
    visibilityData.addRow([[visibilityData, jsonVar.VISIB]]);
    drawChart();
}
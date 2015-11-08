/**
 * Created by Sergen on 29-10-2015.
 */

var temperatureChart, temperatureData, temperatureOptions, regionsChart, regionsData, regionsOptions;

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(initChart);

function initChart(){
    temperatureChart = new google.visualization.LineChart(document.getElementById('curve_div'));
    temperatureOptions = {title: 'Average temperature', curveType: 'function', legend: { position: 'bottom' }};
    temperatureData = new google.visualization.DataTable();

    temperatureData.addColumn('number','Seconds');
    temperatureData.addColumn('number','Temperature in degrees Celsius');
    drawChart();
}

function drawChart() {
    temperatureChart.draw(temperatureData, temperatureOptions);
}

function updateCharts(jsonVar){
    temperatureData.addRow([temperatureData.getNumberOfRows()+1, parseFloat(jsonVar.TEMP)]);
    drawChart();
}

/* Map functions */
google.load('visualization', '1', {packages: ['geochart']});
google.setOnLoadCallback(initRegions);

function initRegions(){
    regionsData = new google.visualization.DataTable();
    regionsData.addColumn('string', 'Country');
    regionsData.addColumn('number', 'Temperature');

    regionsData.addRow(['China', 0]);
    regionsData.addRow(['Japan', 0]);
    regionsData.addRow(['Mongolia', 0]);
    regionsData.addRow(['North Korea', 0]);
    regionsData.addRow(['South Korea', 0]);
    regionsData.addRow(['Taiwan', 0]);

    regionsOptions = {
        region: '030', // Azie = 142, Oost-Azië = 030
        colorAxis: {colors: ['#e7fc00', '#F79F23', '#F52222']},
        backgroundColor: '#c7c5c7',
        datalessRegionColor: '#ffffff',
        defaultColor: '#ffffff'
    };

    regionsChart = new google.visualization.GeoChart(document.getElementById('map_div'));
    drawRegionsMap();
}

function drawRegionsMap(regionsData) {
    regionsChart.draw(regionsData, regionsOptions);
}

function updateMap(dataRow) {
    for (var y = 0, maxrows = regionsData.getNumberOfRows(); y < maxrows; y++) {
        if (regionsData.getValue(y, 0) == dataRow.country) {
            regionsData.setValue(y, 1, dataRow.temp);
        }
        drawRegionsMap(regionsData);
    }
}

/* Table functions */
function updateTable(dataRow) {
    var table = $('#events-table');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if (value.country == dataRow.country) {
            found = true;
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'temperature',
                value: dataRow.temp
            });
        }
    });

    if (!found) {
        addRow(dataRow);
    }
}

function addRow(dataRow){
    row = [];
    row.push({
        name: dataRow.name,
        country:dataRow.country,
        temperature: dataRow.temp
    });

    var table = $('#events-table');
    table.bootstrapTable('append', row);
}

/* Socket functions */
var socket = new WebSocket("ws://127.0.0.1:8080/");

socket.onopen = function() {
    // alleen de gemiddelde temperatuur van Japan
    socket.send("GET_COUNTRY JAPAN TEMP AVG");
};

var y = 0;
socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    updateCharts(obj);

    // test for table
    var txt = '{"name":"De Bilt","country":"China","temp":'+ y + '}';
    y++;
    var jsonObject = JSON.parse(txt);
    updateTable(jsonObject);
    updateMap(jsonObject)
};

socket.onclose = function() {};
socket.onerror = function(err) {};
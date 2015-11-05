/**
 * Created by Sergen on 29-10-2015.
 */

/**
 * Created by Sergen on 28-10-2015.
 */

var temperatureChart, temperatureData, temperatureOptions, regionChart, regionData, regionOptions;

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(initChart);

function initChart(){
    temperatureChart = new google.visualization.LineChart(document.getElementById('curve_div'));
    temperatureOptions = {title: 'Average temperature', curveType: 'function', legend: { position: 'bottom' }};
    temperatureData = new google.visualization.DataTable();

    temperatureData.addColumn('number', 'Seconds');
    temperatureData.addColumn('number','Temperature in degrees Celsius');
    drawChart();
}

function drawChart() {
    temperatureChart.draw(temperatureData, temperatureOptions);
}

/* Map functions */
google.load('visualization', '1', {packages: ['geochart']});
google.setOnLoadCallback(initRegionMap);

function initRegionMap() {

    regionChart = new google.visualization.GeoChart(document.getElementById('map_div'));

    regionData = google.visualization.arrayToDataTable([
        ['Country',   'Average temperature'],
        ['China', 20],
        ['Honkong', 10],
        ['Japan', 30],
        ['North korea', 20],
        ['South korea', 20],
        ['Mongolia', 20],
        ['Macao', 10],
        ['taiwan', 50]
    ]);

    regionOptions = {
        region: '030', // Azie = 142
        colorAxis: {colors: ['#e7fc00', '#F79F23', '#F52222']},
        backgroundColor: '#c7c5c7',
        datalessRegionColor: '#ffffff',
        defaultColor: '#ffffff'
    };

    drawMap();
}

function drawMap(){
    regionChart.draw(regionData, regionOptions);
}


/* Table functions */
function updateRow(dataRow) {

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
    socket.send("GET 10620");
};
var y = 0;
socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    updateCharts(obj);

    var txt = '{"name":"De Bilt","country":"China","temp":'+ y + '}';
    y++;
    console.log(y);
    var jsonObject = JSON.parse(txt);
    updateTable(jsonObject);
};

socket.onclose = function() {};
socket.onerror = function(err) {};

function updateCharts(jsonVar){
    temperatureData.addRow([temperatureData.getNumberOfRows()+1, parseFloat(jsonVar.TEMP)]);
    drawChart();
}

function updateTable(jsonVar) {
    updateRow(jsonVar);
}

//maak een array dat ID linkt aan regionmapnr
//krijg region map NR -> match
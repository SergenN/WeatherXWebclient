/**
 * Created by Sergen on 29-10-2015.
 */

var temperatureChart, temperatureData, temperatureOptions, regionsChart, regionsData, regionsOptions;

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(initChart);

/**
 * initChart,
 * this function will initialize the temperatureChart, temperatureOptions and temperatureData
 * and make a call to draw the chart.
 */
function initChart(){
    var rWidth = ($(document).width() / 100) * 50;
    var rHeight = ($(document).height() / 100)  * 30;
    temperatureChart = new google.visualization.LineChart(document.getElementById('curve_div'));
    temperatureOptions = {title: 'Average temperature', curveType: 'function', legend: { position: 'bottom' }, width:rWidth, height:rHeight};
    temperatureData = new google.visualization.DataTable();

    temperatureData.addColumn('number','Seconds');
    temperatureData.addColumn('number','Temperature in degrees Celsius');
    drawChart();
}

/**
 * drawChart,
 * This function will draw the temperatureChart
 */
function drawChart() {
    temperatureChart.draw(temperatureData, temperatureOptions);
}

/**
 * updateChart,
 * this function will add a row to the temperatureData and make a call to draw the chart.
 *
 * @param jsonVar, json variable of the data you want to draw
 */
var rows = 0;
function updateChart(jsonVar){
    if (temperatureData.getNumberOfRows() >= 100) {
        temperatureData.removeRow(100-temperatureData.getNumberOfRows());
    }
    temperatureData.addRow([rows+1, parseFloat(jsonVar.TEMP)]);
    rows++;
    drawChart();
}

/* Map functions */
google.load('visualization', '1', {packages: ['geochart']});
google.setOnLoadCallback(initRegions);

/**
 * initRegions,
 * this function will initialize the regionsData, regionsOptions and regionsChart
 * and make a call to draw the chart.
 */
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

/**
 * drawChart,
 * This function will draw the regions map
 */
function drawRegionsMap() {
    regionsChart.draw(regionsData, regionsOptions);
}

/**
 * updateMap,
 * this function will add a change the value of a country with the given value.
 *
 * @param dataRow, json variable of the data you want to draw
 */
function updateMap(dataRow) {
    for (var y = 0, maxrows = regionsData.getNumberOfRows(); y < maxrows; y++) {
        if (regionsData.getValue(y, 0) == capitalizeFirstLetter(dataRow.COUNTRY)) {
            regionsData.setValue(y, 1, dataRow.TEMP);
        }
        drawRegionsMap();
    }
}

/* Table functions */
var lock = false;
$('#events-table').bootstrapTable({
    onSearch: function (row) {
        if (row == ""){
            lock = false;
        } else {
            lock = true;
        }
    }
});

/**
 * updateTable,
 * this function will update a row in the table with the given data and call addRow if there is no matching row found.
 *
 * @param dataRow, the data that needs to be placed in the table
 * @param stn, check if this change has to be issued in the stations table or the country table
 */
function updateTable(dataRow, stn) {
    var table = stn ? $('#events-table') : $('#averages-table');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if ((stn && value.name == capitalizeFirstLetter(dataRow.NAME)) || (!stn && value.country == capitalizeFirstLetter(dataRow.COUNTRY))) {
            found = true;
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'temperature',
                value: dataRow.TEMP
            });
        }
    });

    if (!found && !lock) {
        addRow(dataRow, stn);
    }
}

/**
 * addRow,
 * add a new row to the table
 *
 * @param dataRow, the data that needs to be inserted
 * @param stn, check if this change has to be issued in the stations table or the country table
 */
function addRow(dataRow, stn){
    row = [];
    if(stn){
        var deg = parseFloat(dataRow.TEMP) > 10 ? notManipulate(parseFloat(dataRow.TEMP)) : dataRow.TEMP;
        row.push({
            name: capitalizeFirstLetter(dataRow.NAME),
            country: capitalizeFirstLetter(dataRow.COUNTRY),
            temperature: deg
        });
    } else {
        var deg = parseFloat(dataRow.TEMP) > 10 ? notManipulate(parseFloat(dataRow.TEMP)) : dataRow.TEMP;
        row.push({
            country: capitalizeFirstLetter(dataRow.COUNTRY),
            temperature: deg
        });
    }

    var table = stn ? $('#events-table') : $('#averages-table');
    table.bootstrapTable('append', row);
}

function notManipulate(temp){
    if (temp > 10){
        return 9.9;
    }
}

/* Socket functions */
var socket = new WebSocket("ws://127.0.0.1:8080/");
socket.onopen = function() {
    init();
};

var counter = 0;
socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    if(obj.TYPE == 'AVG') {
        if (obj.COUNTRY == 'null'){
            updateChart(obj);
        } else {
            updateTable(obj);
            updateMap(obj);
        }
    } else {
        if (counter == 1){
        updateTable(obj, true);
        }
        if (counter == 50){
            counter = 0;
        }
        counter = counter + 1;
    }
};
socket.onclose = function() {init();};
socket.onerror = function(err) {init();};

function init(){
    socket.send("GET_RAD 37,127.30,5000 TEMP AVG");

    socket.send("GET_COUNTRY CHINA TEMP RAW");
    socket.send("GET_COUNTRY JAPAN TEMP RAW");
    //socket.send("GET_COUNTRY NORTH_KOREA TEMP RAW");
    //socket.send("GET_COUNTRY TAIWAN TEMP RAW");

    socket.send("GET_COUNTRY CHINA TEMP AVG");
    socket.send("GET_COUNTRY JAPAN TEMP AVG");
    socket.send("GET_COUNTRY TAIWAN TEMP AVG");
    socket.send("GET_COUNTRY NORTH_KOREA TEMP AVG");
    socket.send("GET_COUNTRY SOUTH_KOREA TEMP AVG");
    socket.send("GET_COUNTRY MONGOLIA TEMP AVG");
}

/* Utils */
function capitalizeFirstLetter(string) {
    var lowerString = string.toLowerCase();
    var splitString = lowerString.split(" ");
    var builder = "";

    for (i = 0; i < splitString.length; i++) {
        builder += splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1);
        if (i != splitString.length-1) builder += " ";
    }
    return builder;
}
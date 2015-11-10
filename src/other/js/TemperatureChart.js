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
 * updateCharts,
 * this function will add a point on the temperatureData and make a call to draw the chart.
 *
 * @param jsonVar, json variable of the data you want to draw
 */
function updateCharts(jsonVar){
    temperatureData.addRow([temperatureData.getNumberOfRows()+1, parseFloat(jsonVar.TEMP)]);
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
        if (regionsData.getValue(y, 0) == dataRow.COUNTRY) {
            regionsData.setValue(y, 1, dataRow.TEMP);
        }
        drawRegionsMap();
    }
}

/* Table functions */
/**
 * updateTable,
 * this function will update a row in the table with the given data and call addRow if there is no matching row found.
 *
 * @param dataRow, the data that needs to be placed in the table
 */
function updateTable(dataRow) {
    var table = $('#events-table');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if (value.country == dataRow.COUNTRY) {
            found = true;
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'temperature',
                value: dataRow.TEMP
            });
        }
    });

    if (!found) {
        addRow(dataRow);
    }
}

/**
 * addRow,
 * add a new row to the table
 *
 * @param dataRow, the data that needs to be inserted
 */
function addRow(dataRow){
    var row = [];
    row.push({
        name: dataRow.STNAME, //dataRow.name,
        country:dataRow.COUNTRY,
        temperature: dataRow.TEMP
    });

    var table = $('#events-table');
    table.bootstrapTable('append', row);
}

/* Socket functions */
var socket = new WebSocket("ws://127.0.0.1:8080/");
socket.onopen = function() {
    socket.send("GET_RAD 37,127.30,5000 TEMP AVG");
    socket.send("GET_COUNTRY CHINA COUNTRY,STNAME,TEMP AVG");
    socket.send("GET_COUNTRY JAPAN COUNTRY,STNAME,TEMP AVG");
    socket.send("GET_RAD 37,127.30,5000 TEMP RAW");
    socket.send("GET_COUNTRY TAIWAN COUNTRY,TEMP AVG");
    //socket.send("GET_COUNTRY NORTH_KOREA COUNTRY,TEMP AVG");
    //socket.send("GET_COUNTRY SOUTH_KOREA COUNTRY,TEMP AVG");
    socket.send("GET_COUNTRY MONGOLIA COUNTRY,TEMP AVG");
};
socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    console.log(obj);

    // test for table
/*    var txt = '{"name":"De Bilt","type":"RAW","country":"China","temp":'+ y + '}';
    y++;
    var jsonObject = JSON.parse(txt);*/

    if(obj.type == 'AVG') {
        updateCharts(obj);
        updateMap(obj);
    } else {
        updateTable(obj);
    }
};
socket.onclose = function() {};
socket.onerror = function(err) {};
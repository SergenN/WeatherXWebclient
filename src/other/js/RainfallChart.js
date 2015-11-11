/**
 * Created by Sergen on 28-10-2015.
 */

var rainfallChart, rainfallOptions, rainfallData, regionsChart, regionsOptions, regionsData;

/* Chart functions */
google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(initChart);

/**
 * initChart,
 * this function will initialize the rainfallChart, rainfallOptions and rainfallData
 * and make a call to draw the chart.
 */
function initChart(){
    var rWidth = ($(document).width() / 100) * 50;
    var rHeight = ($(document).height() / 100)  * 30;
    rainfallChart = new google.visualization.LineChart(document.getElementById('curve_div'));
    rainfallOptions = {title: 'Average rainfall', curveType: 'function', legend: { position: 'bottom' }, width:rWidth, height:rHeight};
    rainfallData = new google.visualization.DataTable();

    rainfallData.addColumn('number','Seconds');
    rainfallData.addColumn('number','Average rainfall (cm)');
    drawChart();
}

/**
 * drawChart,
 * This function will draw the rainfallChart
 */
function drawChart() {
    rainfallChart.draw(rainfallData, rainfallOptions);
}

/**
 * updateChart,
 * this function will add a row to the rainfallData and make a call to draw the chart.
 *
 * @param jsonVar, json variable of the data you want to draw
 */
var rows = 0;
function updateChart(jsonVar){
    if (rainfallData.getNumberOfRows() >= 100) {
        rainfallData.removeRow(100-rainfallData.getNumberOfRows());
    }
    rainfallData.addRow([rows+1, parseFloat(jsonVar.PRCP)]);
    rows++;
    drawChart();
}

/* Map functions */
google.load('visualization', '1', {packages: ['geochart']});
google.setOnLoadCallback(initRegions);

/**
 * initRegions,
 * this function will initialize the regionsData, regionsOptions and regionsData
 * and make a call to draw the regionsMap.
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
        region: '030', // Azie = 142
        colorAxis: {colors: ['#B2BBCF', '#7287B5', '#225FE3']},
        backgroundColor: '#c7c5c7',
        datalessRegionColor: '#ffffff',
        defaultColor: '#ffffff'
    };

    regionsChart = new google.visualization.GeoChart(document.getElementById('map_div'));
    drawRegionsMap();
}

/**
 * drawRegionsMap,
 * This function will draw the regions map.
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
        console.log(dataRow.COUNTRY);
        if (regionsData.getValue(y, 0) == capitalizeFirstLetter(dataRow.COUNTRY)) {
            regionsData.setValue(y, 1, dataRow.PRCP);
            drawRegionsMap();
        }
    }
}

/* Table options */
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
    var table = stn ? $('#events-table-stations') : $('#events-table-countries');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if ((stn && value.stn == capitalizeFirstLetter(dataRow.NAME)) || (!stn && value.country == capitalizeFirstLetter(dataRow.COUNTRY))) {
            found = true;
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'prcp',
                value: dataRow.PRCP
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
        row.push({
            stn: capitalizeFirstLetter(dataRow.NAME),
            country: capitalizeFirstLetter(dataRow.COUNTRY),
            prcp: dataRow.PRCP
        });
    } else {
        row.push({
            country: capitalizeFirstLetter(dataRow.COUNTRY),
            prcp: dataRow.PRCP
        });
    }

    var table = stn ? $('#events-table-stations') : $('#events-table-countries');
    table.bootstrapTable('append', row);
}

/* Socket functions */
var socket = new WebSocket("ws://127.0.0.1:8080/");
socket.onopen = function() {
    init();
};
var counter = 1;
var counterTwo = 1;
socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);

        if (obj.TYPE == 'AVG') {
            if (counter == 1 || counter == 5 || counter == 10 || counter == 15 || counter == 20 || counter == 25) {
                updateMap(obj);
            }
            if (counter == 1) {
                //console.log(obj);
                updateChart(obj);
                updateTable(obj, false);
            }
            if (counter == 25){
                counter = 0;
            }
            counter = counter + 1;
        } else {
            if (counterTwo == 1) {
            updateTable(obj, true);
            }
            if (counterTwo == 50){
                counterTwo = 0;
            }
            counterTwo = counterTwo + 1;
        }


};
socket.onclose = function() {
    init();
};
socket.onerror = function(err) {
    init();
};

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

function init() {
    socket.send("GET_COAST PRCP AVG");
    socket.send("GET_COAST PRCP RAW");
    socket.send("GET_COUNTRY CHINA PRCP AVG");
    socket.send("GET_COUNTRY JAPAN PRCP AVG");
    socket.send("GET_COUNTRY TAIWAN PRCP AVG");
    socket.send("GET_COUNTRY FIJI PRCP AVG");
    socket.send("GET_COUNTRY TUVALU PRCP AVG");
    socket.send("GET_COUNTRY GUAM PRCP AVG");
    socket.send("GET_COUNTRY KIRIBATI PRCP AVG");
    socket.send("GET_COUNTRY INDONESIA PRCP AVG");
    socket.send("GET_COUNTRY BRUNEI PRCP AVG");
    socket.send("GET_COUNTRY SINGAPORE PRCP AVG");
    socket.send("GET_COUNTRY KIRIBATI PRCP AVG");
    socket.send("GET_COUNTRY MARSHALL_ISLANDS PRCP AVG");
    socket.send("GET_COUNTRY WAKE_ISLAND PRCP AVG");
    socket.send("GET_COUNTRY MIDWAY_ISLANDS PRCP AVG");
    socket.send("GET_COUNTRY JOHNSTON_ATOLL PRCP AVG");
    socket.send("GET_COUNTRY NEW_CALEDONIA PRCP AVG");
    socket.send("GET_COUNTRY SOLOMON_ISLANDS PRCP AVG");
    socket.send("GET_COUNTRY COOK_ISLANDS PRCP AVG");
    socket.send("GET_COUNTRY FRENCH_POLYNESIA PRCP AVG");
    socket.send("GET_COUNTRY NORFOLK_ISLAND PRCP AVG");
    socket.send("GET_COUNTRY CHRISTMAS_ISLAND PRCP AVG");
    socket.send("GET_COUNTRY PALAU PRCP AVG");
    socket.send("GET_COUNTRY FEDERATED_STATES_OF_MICRONESIA PRCP AVG");
    socket.send("GET_COUNTRY NORTHERN_MARIANA_ISLANDS PRCP AVG");
    socket.send("GET_COUNTRY WALLIS_AND_FUTUNA PRCP AVG");
    socket.send("GET_COUNTRY PAPUA_NEW_GUINEA PRCP AVG");
    socket.send("GET_COUNTRY PHILIPPINES PRCP AVG");
    socket.send("GET_COUNTRY MONGOLIA PRCP AVG");
    socket.send("GET_COUNTRY NORTH_KOREA PRCP AVG");
    socket.send("GET_COUNTRY SOUTH_KOREA PRCP AVG");

}

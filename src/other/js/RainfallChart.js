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
    rainfallOptions = {title: 'Avrage rainfall', curveType: 'function', legend: { position: 'bottom' }, width:rWidth, height:rHeight};
    rainfallData = new google.visualization.DataTable();

    rainfallData.addColumn('number','Seconds');
    rainfallData.addColumn('number','Average rainfall (mm)');
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
function updateChart(jsonVar){
    rainfallData.addRow([rainfallData.getNumberOfRows()+1, parseFloat(jsonVar.PRCP)]);
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
        if (regionsData.getValue(y, 0) == dataRow.COUNTRY) {
            regionsData.setValue(y, 1, dataRow.PRCP);
            drawRegionsMap();
        }
    }
}

/* Table options */
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
        if ((stn && value.stn == dataRow.STN) || (!stn && value.country == dataRow.COUNTRY)) {
            found = true;
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'prcp',
                value: dataRow.PRCP
            });

            table.bootstrapTable('updateCell', {
                index: index,
                field: 'sndp',
                value: dataRow.SNDP
            });
        }
    });

    if (!found) {
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
            stn: dataRow.STNAME,
            country: dataRow.COUNTRY,
            prcp: dataRow.PRCP,
            sndp: dataRow.SNDP
        });
    } else {
        row.push({
            country: dataRow.COUNTRY,
            prcp: dataRow.PRCP,
            sndp: dataRow.SNDP
        });
    }

    var table = stn ? $('#events-table-stations') : $('#events-table-countries');
    table.bootstrapTable('append', row);
}

/* Socket functions */
var socket = new WebSocket("ws://127.0.0.1:8080/");
socket.onopen = function() {
    /*socket.send("GET_COAST SNDP,PRCP,TYPE AVG");
    socket.send("GET_COAST STNUMBER,COUNTRY,SNDP,PRCP,TYPE RAW");*/
    socket.send("GET_COUNTRY CHINA COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY JAPAN COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY TAIWAN COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY FIJI COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY TUVALU COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY GUAM COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY KIRIBATI COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY INDONESIA COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY BRUNEI COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY SINGAPORE COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY KIRIBATI COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY MARSHALL_ISLANDS COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY WAKE_ISLAND COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY MIDWAY_ISLANDS COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY JOHNSTON_ATOLL COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY NEW_CALEDONIA COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY SOLOMON_ISLANDS COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY COOK_ISLANDS COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY FRENCH_POLYNESIA COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY NORFOLK_ISLAND COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY CHRISTMAS_ISLAND COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY PALAU COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY FEDERATED_STATES_OF_MICRONESIA COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY NORTHERN_MARIANA_ISLANDS COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY WALLIS_AND_FUTUNA COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY PAPUA_NEW_GUINEA COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY PHILIPPINES COUNTRY,STNAME,SNDP,PRCP,TYPE AVG");
};
socket.onmessage = function (evt) {
/*    var txt = '{"name":"De Bilt","type":"AVG","country":"China","prcp":'+ y +',"sndp":'+(y+1)+'}';
    y++;*/
    console.log(evt.data);
    var obj = jQuery.parseJSON(evt.data);
    console.log(obj);
    if (obj.TYPE == 'AVG') {
        updateChart(obj);
        updateMap(obj);
        updateTable(obj, false);
    } else {
        updateTable(obj, true);
    }
};
socket.onclose = function() {};
socket.onerror = function(err) {};

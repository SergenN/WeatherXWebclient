/**
 * Created by Sergen on 28-10-2015.
 */

var rainfallChart, rainfallOptions, rainfallData, regionsChart, regionsOptions, regionsData;

/* Chart functions */
google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(initChart);

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

function drawChart() {
    rainfallChart.draw(rainfallData, rainfallOptions);
}

function updateChart(jsonVar){
    rainfallData.addRow([rainfallData.getNumberOfRows()+1, parseFloat(jsonVar.PRCP)]);
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

function updateMap(dataRow) {
    for (var y = 0, maxrows = regionsData.getNumberOfRows(); y < maxrows; y++) {
        if (regionsData.getValue(y, 0) == dataRow.COUNTRY) {
            regionsData.setValue(y, 1, dataRow.PRCP);
            drawRegionsMap();
        }
    }
}

/* Table options */
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

function addRow(dataRow, stn){
    row = [];
    if(stn){
        row.push({
            stn: dataRow.NAME,
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
    socket.send("GET_COAST SNDP,PRCP,TYPE AVG");
    socket.send("GET_COAST STNUMBER,COUNTRY,SNDP,PRCP,TYPE RAW");
    socket.send("GET_COUNTRY CHINA COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY JAPAN COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY TAIWAN COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY FIJI COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY TUVALU COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY GUAM COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY KIRIBATI COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY INDONESIA COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY BRUNEI COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY SINGAPORE COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY KIRIBATI COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY MARSHALL_ISLANDS COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY WAKE_ISLAND COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY MIDWAY_ISLANDS COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY JOHNSTON_ATOLL COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY NEW_CALEDONIA COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY SOLOMON_ISLANDS COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY COOK_ISLANDS COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY FRENCH_POLYNESIA COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY NORFOLK_ISLAND COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY CHRISTMAS_ISLAND COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY PALAU COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY FEDERATED_STATES_OF_MICRONESIA COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY NORTHERN_MARIANA_ISLANDS COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY WALLIS_AND_FUTUNA COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY PAPUA_NEW_GUINEA COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send("GET_COUNTRY PHILIPPINES COUNTRY,SNDP,PRCP,TYPE AVG");
    socket.send(cmd);
};

/*var y = 0;*/
socket.onmessage = function (evt) {
/*    var txt = '{"name":"De Bilt","type":"AVG","country":"China","prcp":'+ y +',"sndp":'+(y+1)+'}';
    y++;*/
    var obj = jQuery.parseJSON(txt);
    if (obj.type == 'AVG') {
        updateChart(obj);
        updateMap(obj);
        updateTable(obj, false);
    } else {
        updateTable(obj, true);
    }
};

socket.onclose = function() {};
socket.onerror = function(err) {};

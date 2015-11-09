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

    rainfallData.addColumn('number','Seconds');
    rainfallData.addColumn('number','Average rainfall (mm)');
    drawChart();
}

function drawChart() {
    rainfallChart.draw(rainfallData, rainfallOptions);
}

function updateChart(jsonVar){
    rainfallData.addRow([rainfallData.getNumberOfRows()+1, parseFloat(jsonVar.prcp)]);
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
        if (regionsData.getValue(y, 0) == dataRow.country) {
            regionsData.setValue(y, 1, dataRow.prcp);
            drawRegionsMap();
        }
    }
}

/* Table options */
function updateTable(dataRow, stn) {
    var table = stn ? $('#events-table-stations') : $('#events-table-countries');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if ((stn && value.stn == dataRow.stn) || (!stn && value.country == dataRow.country)) {
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
    var row = [];
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
    var cmd = "GET 990170";
    socket.send(cmd);
};

/*var y = 0;*/
socket.onmessage = function (evt) {
/*    var txt = '{"name":"De Bilt","type":"AVG","country":"China","prcp":'+ y +',"sndp":'+(y+1)+'}';
    y++;*/
    var obj = jQuery.parseJSON(evt.data);
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

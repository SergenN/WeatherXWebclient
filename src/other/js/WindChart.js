/**
 * Created by Sergen on 29-10-2015.
 */

var windChart, windOptions, windData;

/* compass functions */
function animateCompass(rot) {
    rotatePointer(rot, 600)
}

function rotatePointer(amount, time){
    $('#pointer').animate({borderSpacing: amount}, {
        step: function (now, fx) {
            $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
            $(this).css('-moz-transform', 'rotate(' + now + 'deg)');
            $(this).css('transform', 'rotate(' + now + 'deg)');
            $(this).css('animation-timing-function', 'linear');
        },
        duration: time
    });
}

/* chart functions */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(initChart);

function initChart(){
    windChart = new google.visualization.LineChart(document.getElementById('curve_div'));
    windOptions = {title: 'Average wind speed', curveType: 'function', legend: { position: 'bottom' }};
    windData = new google.visualization.DataTable();

    windData.addColumn('number', 'Seconds');
    windData.addColumn('number','Wind speed (km/h)');
    drawChart();
}

function drawChart() {
    windChart.draw(windData, windOptions);
}


/* Table functions */

function updateTable(dataRow) {
    var table = $('#events-table');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if (value.stn == dataRow.stn) {
            found = true;
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'wdsp',
                value: dataRow.wdsp
            });
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'wnddir',
                value: dataRow.wnddir
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
        stn: dataRow.name,
        country: dataRow.country,
        wdsp: dataRow.wdsp,
        wnddir: degreesToText(dataRow.wnddir)
    });

    $('#events-table').bootstrapTable('append', row);
}

/* Socket functions */

var socket = new WebSocket("ws://127.0.0.1:8080/");

socket.onopen = function() {
    socket.send("GET 10620");
};

socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    animateCompass(parseFloat(jsonVar.WNDDIR));
    updateCharts(obj);
    updateTable(obj);
};

socket.onclose = function() {};
socket.onerror = function(err) {};

/* updateTable */

function updateCharts(jsonVar){
    windData.addRow([windData.getNumberOfRows()+1, parseFloat(jsonVar.WDSP)]);
    drawChart();
}

function degreesToText(winddirection) {
    if(winddirection >= 0 && winddirection <= 360) {
        if ((winddirection > 337.5 && winddirection < 360) || (winddirection <= 22.5)) {
            return "North";
        }
        if (winddirection > 22.5 && winddirection <= 67.5) {
            return "Northeast";
        }
        if (winddirection > 67.5 && winddirection <= 112.5) {
            return "East";
        }
        if (winddirection > 112.5 && winddirection <= 157.5) {
            return "Southeast";
        }
        if (winddirection > 157.5 && winddirection <= 202.5) {
            return "South";
        }
        if (winddirection > 202.5 && winddirection <= 247.5) {
            return "Southwest";
        }
        if (winddirection > 247.5 && winddirection <= 292.5) {
            return "West";
        }
        if (winddirection > 292.5 && winddirection <= 337.5) {
            return "Northwest";
        }
    }
    return "Unknown";
}
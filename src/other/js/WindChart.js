/**
 * Created by Sergen on 29-10-2015.
 */

var windChart, windOptions, windData;

/* compass functions */
function bounceAnimate(rot) {
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

function updateRow(dataRow) {

    var table = $('#events-table');
    var found = false;

    jQuery.each(table.bootstrapTable('getData'), function (index, value) {
        if (value.country == dataRow.country) {
            found = true;
            $table.bootstrapTable('updateRow', {
                index: value.id,
                row: {
                    data1: '',
                    data2: ''
                }
            });
        }
    });

    if (!found) {
        addRow(dataRow);
    }
}

function addRow(dataRow){
    table.bootstrapTable('append', {
        row: {
            data1: '',
            data2: ''
        }
    });
}

/* Socket functions */

var socket = new WebSocket("ws://127.0.0.1:8080/");

socket.onopen = function() {
    socket.send("GET 10620");
};

socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    updateCharts(obj);
};

socket.onclose = function() {};
socket.onerror = function(err) {};

function updateCharts(jsonVar){
    bounceAnimate(parseFloat(jsonVar.WNDDIR));
    windData.addRow([windData.getNumberOfRows()+1, parseFloat(jsonVar.WDSP)]);
    drawChart();
}

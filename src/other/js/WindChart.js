/**
 * Created by Sergen on 29-10-2015.
 */

/* compass functions */
function bounceAnimate(rot) {
    rotExtra = rot+10;
    rotatePointer(rotExtra, 600);
    rotatePointer(rot, 150)
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
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Seconds', 'Wind speed'],
        ['1',  30],
        ['2',  31],
        ['3',  32],
        ['4',  29]
    ]);

    var options = {
        title: 'Average wind speed',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_div'));

    chart.draw(data, options);
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

ws.onopen = function() {
    ws.send("GET XYZ");
};

ws.onmessage = function (evt) {
    var data = evt.data();
};

ws.onclose = function() {};
ws.onerror = function(err) {};


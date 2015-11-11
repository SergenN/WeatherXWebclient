/**
 * Created by Sergen on 29-10-2015.
 */

var windChart, windOptions, windData;

/* compass functions */
/**
 * animateCompass,
 * this function will rotate the arrow of the compass with a time of 600 milliseconds.
 *
 * @param rot, the degrees the arrow has to rotate
 */
function animateCompass(rot) {
    rotatePointer(rot, 600)
}

/**
 * rotatePointer,
 * this function will rotate the arrow of the compass.
 *
 * @param amount, the degrees the arrow has to rotate
 * @param time, length of the rotation animation in millseconds
 */
function rotatePointer(amount, time){
    $('#pointer').animate({borderSpacing: amount}, {
        step: function (now) {
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

/**
 * initChart,
 * this function will initialize the windChart, windOptions and windData
 * and make a call to draw the chart.
 */
function initChart(){
    windChart = new google.visualization.LineChart(document.getElementById('curve_div'));
    windOptions = {title: 'Average wind speed', curveType: 'function', legend: { position: 'bottom' }};
    windData = new google.visualization.DataTable();

    windData.addColumn('number', 'Seconds');
    windData.addColumn('number','Wind speed (km/h)');
    drawChart();
}

/**
 * drawChart,
 * This function will draw the windChart
 */
function drawChart() {
    windChart.draw(windData, windOptions);
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
                field: 'wdsp',
                value: dataRow.WDSP
            });
            table.bootstrapTable('updateCell', {
                index: index,
                field: 'wnddir',
                value: dataRow.WNDDIR
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
        country: dataRow.COUNTRY,
        wdsp: dataRow.WDSP,
        wnddir: degreesToText(dataRow.WNDDIR)
    });

    $('#events-table').bootstrapTable('append', row);
}

/* Socket functions */

var socket = new WebSocket("ws://127.0.0.1:8080/");
socket.onopen = function() {
    socket.send("GET_WORLD WNDDIR AVG");
    socket.send("GET_WORLD WNDDIR RAW");
    socket.send("GET_WORLD WDSP AVG");
    socket.send("GET_WORLD WDSP RAW");
};
socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    animateCompass(parseFloat(obj.WNDDIR));
    updateCharts(obj);
    updateTable(obj);
};
socket.onclose = function() {};
socket.onerror = function(err) {};

/* updateTable */

/**
 * updateCharts,
 * this function will add a point on the windData and make a call to draw the chart.
 *
 * @param jsonVar, json variable of the data you want to draw
 */
function updateCharts(jsonVar){
    windData.addRow([windData.getNumberOfRows()+1, parseFloat(jsonVar.WDSP)]);
    drawChart();
}

/**
 * degreesToText,
 * convert the degrees of windDirection to text.
 *
 * @param winddirection, the direction in degrees
 * @returns String, direction in letters or "Unknown"
 */
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
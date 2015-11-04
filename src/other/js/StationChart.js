/**
 * Created by Sergen on 29-10-2015.
 */
/* chart functions */

var airPressureChart, airPressureData, airPressureOptions, precipitationChart, precipitationData, precipitationOptions,
    dewPointChart,dewPointData,dewPointOptions,visibilityChart,visibilityData, visibilityOptions;

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(initChart);

function initChart(){
    airPressureChart = new google.visualization.LineChart(document.getElementById('airpress_div'));
    airPressureOptions = {title: 'Millibars', curveType: 'function', legend: { position: 'bottom' }};
    airPressureData = new google.visualization.DataTable();

    airPressureData.addColumn('number', 'Seconds');
    airPressureData.addColumn('number','Sea level (millibar)');
    airPressureData.addColumn('number','Station level (millibar)');

    precipitationChart = new google.visualization.LineChart(document.getElementById('precipitation_div'));
    precipitationOptions = {title: 'Centimeters', curveType: 'function', legend: { position: 'bottom' }};
    precipitationData = new google.visualization.DataTable();

    precipitationData.addColumn('number', 'Seconds');
    precipitationData.addColumn('number','Amount of snow (cm)');
    precipitationData.addColumn('number','Precipitation (cm)');


    dewPointChart = new google.visualization.LineChart(document.getElementById('temp_dewp_div'));
    dewPointOptions = {title: 'Temperatures', curveType: 'function', legend: { position: 'bottom' }};
    dewPointData = new google.visualization.DataTable();

    dewPointData.addColumn('number', 'Seconds');
    dewPointData.addColumn('number','Temperature (&deg;C)');
    dewPointData.addColumn('number','Dew point (&deg;C)');

    visibilityChart = new google.visualization.LineChart(document.getElementById('visib_div'));
    visibilityOptions = {title: 'Kilometers', curveType: 'function', legend: { position: 'bottom' }};
    visibilityData = new google.visualization.DataTable();

    visibilityData.addColumn('number', 'Seconds');
    visibilityData.addColumn('number','Visibility (km)');

    drawChart();
}

function drawChart() {
    airPressureChart.draw(airPressureData, airPressureOptions);
    precipitationChart.draw(precipitationData, precipitationOptions);
    dewPointChart.draw(dewPointData, dewPointOptions);
    visibilityChart.draw(visibilityData, visibilityOptions);
}

/* Socket options */

var socket = new WebSocket("ws://127.0.0.1:8080/");
socket.onopen = function() {
    var cmd = "GET " + getUrlParameter("id");
    socket.send(cmd);
};
var counter = 1;

socket.onmessage = function (evt) {
    var obj = jQuery.parseJSON(evt.data);
    updateCharts(obj);

    alert(counter);
    if (counter == 1){
        updateTable(obj);
    }
    if (counter == 6){
        counter = 0;
    }
    counter = counter + 1;
};

socket.onclose = function() {};
socket.onerror = function(err) {};

/*utils*/

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function updateTable(jsonVar){
    $("#TEMP").html(jsonVar.TEMP +"&deg;C");
    $("#STP").html(jsonVar.STP +" mbar");
    $("#SLP").html(jsonVar.SLP +" mbar");
    $("#DEWP").html(jsonVar.DEWP +"&deg;C");
    $("#VISIB").html(jsonVar.VISIB +" km");
    $("#WDSP").html(jsonVar.WDSP +" km/h");
    $("#PRCP").html(jsonVar.PRCP +" cm");
    $("#SNDP").html(jsonVar.SNDP +" cm");
    $("#CLDC").html(jsonVar.CLDC +"%");
    $("#WNDDIR").html(degreesToText(jsonVar.WNDDIR));
}

function updateCharts(jsonVar){
    myVal1 = parseFloat($.trim());
    myVal2 = parseFloat($.trim())
    airPressureData.addRow([airPressureData.getNumberOfRows()+1, parseFloat(jsonVar.SLP), parseFloat(jsonVar.STP)]);
    precipitationData.addRow([precipitationData.getNumberOfRows()+1, parseFloat(jsonVar.SNDP), parseFloat(jsonVar.PRCP)]);
    dewPointData.addRow([dewPointData.getNumberOfRows()+1, parseFloat(jsonVar.TEMP), parseFloat(jsonVar.DEWP)]);
    visibilityData.addRow([visibilityData.getNumberOfRows()+1, parseFloat(jsonVar.VISIB)]);
    drawChart();
}

var degreesToText = function degreesToText(winddirection) {
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
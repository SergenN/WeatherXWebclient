/**
 * Created by Sergen on 29-10-2015.
 */



/* chart functions */

google.load('visualization', '1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var airPressData = google.visualization.arrayToDataTable([
        ['Seconds', 'Sea level', 'Station level'],
        ['1',  1034.5, 1007.5],
        ['2',  1033, 1008],
        ['3',  1030, 1009.9],
        ['4',  1032, 1008],
        ['5',  1030, 1010],
        ['6',  1031, 1008.3],
        ['7',  1029, 1009],
        ['8',  1028, 1007]
    ]);

    var airPressOptions = {
        title: 'Millibars',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var airPressChart = new google.visualization.LineChart(document.getElementById('airpress_div'));

    airPressChart.draw(airPressData, airPressOptions);

    var precipitationData = google.visualization.arrayToDataTable([
        ['Seconds', 'Amount of snow', 'Precipitation'],
        ['1',  30, 28],
        ['2',  31, 30],
        ['3',  29, 29],
        ['4',  33, 29],
        ['5',  33, 30],
        ['6',  32, 28],
        ['7',  33, 27],
        ['8',  31, 30]
    ]);

    var precipitationOptions = {
        title: 'Centimeters',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var precipitationChart = new google.visualization.LineChart(document.getElementById('precipitation_div'));

    precipitationChart.draw(precipitationData, precipitationOptions);

    var dewpData = google.visualization.arrayToDataTable([
        ['Seconds', 'Temperature', 'Dew point'],
        ['1',  30, 1],
        ['2',  31, 0],
        ['3',  32, -5],
        ['4',  29, 3],
        ['5',  30, 1],
        ['6',  31, 0],
        ['7',  32, -5],
        ['8',  29, 3]
    ]);

    var dewpOptions = {
        title: 'Temperatures',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var dewpChart = new google.visualization.LineChart(document.getElementById('temp_dewp_div'));

    dewpChart.draw(dewpData, dewpOptions);

    var visibData = google.visualization.arrayToDataTable([
        ['Seconds', 'Visibility'],
        ['1',  30],
        ['2',  34],
        ['3',  35],
        ['4',  34],
        ['5',  33],
        ['6',  32],
        ['7',  35],
        ['8',  33]
    ]);

    var visibOptions = {
        title: 'Kilometers',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var visibChart = new google.visualization.LineChart(document.getElementById('visib_div'));

    visibChart.draw(visibData, visibOptions);
}


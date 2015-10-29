/**
 * Created by Sergen on 28-10-2015.
 */

google.load('visualization', '1.1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Seconden', 'Regen'],
        ['1',  30],
        ['2',  31],
        ['3',  32],
        ['4',  29]
    ]);

    var options = {
        title: 'Gemiddelde hoeveelheid regen',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_div'));

    chart.draw(data, options);
}


google.setOnLoadCallback(drawTable);

function drawTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Avg. Rainfall');
    data.addRows([
        ['Nether-lands',  {v: 200, f: '200mm'}],
        ['North Korea',   {v:-50,   f: '-50mm (cuz of kim)'}],
        ['Deutsche Reich!', {v: 150, f: '150mm'}],
        ['China (Town)',   {v: 75,  f: '75mm'}]
    ]);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}

/*
google.load('visualization', '1.1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {

    var button = document.getElementById('change-chart');
    var chartDiv = document.getElementById('chart_div');

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'Month');
    data.addColumn('number', "Average Temperature");

    data.addRows([
        [new Date(2014, 0),  -.5],
        [new Date(2014, 1),   .4],
        [new Date(2014, 2),   .5],
        [new Date(2014, 3),  2.9],
        [new Date(2014, 4),  6.3],
        [new Date(2014, 5),    9],
        [new Date(2014, 6), 10.6],
        [new Date(2014, 7), 10.3],
        [new Date(2014, 8),  7.4],
        [new Date(2014, 9),  4.4],
        [new Date(2014, 10), 1.1],
        [new Date(2014, 11), -.2]
    ]);

    var classicOptions = {
        title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
        width: 900,
        height: 500,
        // Gives each series an axis that matches the vAxes number below.
        series: {
            0: {targetAxisIndex: 0}
        },
        vAxes: {
            // Adds titles to each axis.
            0: {title: 'Temperature (Celsius)'}
        },
        hAxis: {
            ticks: [new Date(2014, 0), new Date(2014, 1), new Date(2014, 2), new Date(2014, 3),
                new Date(2014, 4),  new Date(2014, 5), new Date(2014, 6), new Date(2014, 7),
                new Date(2014, 8), new Date(2014, 9), new Date(2014, 10), new Date(2014, 11)
            ]
        },
        vAxis: {
            viewWindow: {
                max: 30
            }
        }
    };

    function drawClassicChart() {
        var classicChart = new google.visualization.LineChart(chartDiv);
        classicChart.draw(data, classicOptions);
        button.innerText = 'Change to Material';
        button.onclick = drawMaterialChart;
    }

    drawClassicChart();
}*/

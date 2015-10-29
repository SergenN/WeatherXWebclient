/**
 * Created by Sergen on 29-10-2015.
 */

/**
 * Created by Sergen on 28-10-2015.
 */

google.load('visualization', '1.1', {packages: ['line', 'corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Seconds', 'Temperature'],
        ['1',  30],
        ['2',  31],
        ['3',  32],
        ['4',  29]
    ]);

    var options = {
        title: 'Average temperatures',
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
    data.addColumn('number', 'Average temperature');
    data.addRows([
        ['Nether-lands',  {v: 200, f: '200mm'}],
        ['North Korea',   {v:-50,   f: '-50mm (cuz of kim)'}],
        ['Deutsche Reich!', {v: 150, f: '150mm'}],
        ['China (Town)',   {v: 75,  f: '75mm'}]
    ]);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}

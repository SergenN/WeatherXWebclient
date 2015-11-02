/**
 * Created by Sergen on 2-11-2015.
 */

// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["map"]});
google.setOnLoadCallback(drawMap);

// this has to be a global function
function drawMap() {
    // grab the CSV
    $.get("http://goldhill.nl/weatherx.csv", function (csvString) {
        // transform the CSV string into a 2-dimensional array
        var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});

        // this new DataTable object holds all the data
        var data = new google.visualization.arrayToDataTable(arrayData);

/*        var arrayLength = arrayData.length;
        for (var i = 0; i < arrayLength; i++) {
            alert(arrayData[i]);
            //Do something
        }*/

        var map = new google.visualization.Map(document.getElementById('map_div'));
        map.draw(data, {showTip: true});
    });
}
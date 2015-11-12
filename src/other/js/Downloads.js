/**
 * Created by Sergen on 11-11-2015.
 */

$.get("src/includes/DownloadProcess.php").done(function(data){
    var split= data.split(',');
    for(var i=0;i<split.length;i++){
        //GET THE FILENAME FROM THE DIRECTORY
        //EXPECTING FILE TO BE CALLED C:/STUFF/STUFF/STUFF/2015/11/11/WEATHERX.CSV
        var fileArgs = split[i].split("/");
        var fileName = fileArgs[fileArgs.length-1].split(".")[0];
        var day = fileArgs[fileArgs.length-2];
        var month = fileArgs[fileArgs.length-3];
        var year = fileArgs[fileArgs.length-4];

        //MAKE JSON STRING
        var dataString = '{"name":"'+fileName+'","year":"'+ year +'","month":"'+ month +'","day":"'+ day + '"}';
        dataString=jQuery.parseJSON(dataString);
        addRow(dataString);
    }

});

//DIR ARRAY CAN ONLY BE FETCHED USING PHP
//LOOP THRU DIRECTORY ARRAY MAKE SURE ONLY FILES WITH EXTENSION GO HERE
//Get all the files in the specified directory

/**
 * addRow,
 * add a new row to the table
 *
 * @param dataRow, the data that needs to be inserted
 */
function addRow(dataRow){
    var row = [];
    row.push({
        name: dataRow.name,
        year: dataRow.year,
        month: dataRow.month,
        day: dataRow.day
    });
    $('#events-table').bootstrapTable('append', row);
}

$('#events-table').bootstrapTable({
    onClickRow: function (row) {
        var fileLoc =  "/database/"+row.year+"/"+row.month+"/"+row.day+"/"+row.name+".csv";

        var url = window.location.href;
        url = url.replace("download.php", "src/other/data");
        url = url+fileLoc;
        var win = window.open(url, "_blank");
        win.focus();
        //var url = window.location.href;
        //var win = window.open(fileLoc, "_blank");
        //win.focus() //NOT SURE IF THIS IS NEEDED?


    }
});
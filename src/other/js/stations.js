/**
 * Created by Sergen on 4-11-2015.
 */

$('#events-table').bootstrapTable({
    onClickRow: function (row) {
        var url = window.location.href;
        url = url.replace("stations.php", "");
        url = url+"station.php?id="+row.stn;
        var win = window.open(url, "_blank");
        win.focus()
    }
});
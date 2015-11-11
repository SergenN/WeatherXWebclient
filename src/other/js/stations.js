/**
 * Created by Sergen on 4-11-2015.
 *
 * this script is supposed to make table rows on stations.php clickable.
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
/**
 * Created by Sergen on 3-11-2015.
 */

$(document).ready(function(){

    var height = $(document).height();
    var canvas = $("#map_canvas");
    canvas.height(height - 60);
    canvas.width("100%");


    var gmarkers = [];

    var options = {
        zoom: 2,
        center: new google.maps.LatLng(53.2406868, 6.5316302), // centered Zernikeplein
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: false,
        scaleControl: true
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), options);

    $.getJSON( "other/data/stations.json", function( data ) {
        $.each( data, function( key, val ) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(val.latitude, val.longitude),
                map: map,
                title: val.name,
                id: key
            });

            (function(marker, key) {
                google.maps.event.addListener(marker, 'click', function() {
                    var url = window.location.href;
                    url = url.replace("index.php", "");
                    url = url+"station.php?id="+marker.id;
                    var win = window.open(url, "_blank");
                    win.focus();
                });
            })(marker, key);

            gmarkers.push(marker);
        });
        var markerCluster = new MarkerClusterer(map, gmarkers);
    });
});
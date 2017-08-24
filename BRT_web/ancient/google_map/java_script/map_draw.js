/**
 * Created by hong on 2014/4/12.
 * google map test
 */

function MapDraw() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.markers = [];
    }
    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;
    }
    this.Draw = Draw;
    function Draw(color) {
        SetAllMap(null, this.markers);
        this.markers = [];
        var offset = 0;
        for (var index = 0; index < 1000; index++) {
            PolyLine(this.google_map, color, offset, this.markers);
            offset += 0.0001;
        }
        SetAllMap(this.google_map, this.markers);

    }
    // Private member ---------------------------------------------------------
    function PolyLine(google_map, color, offset, markers) {
        var flightPlanCoordinates = [
            new google.maps.LatLng(24.152192356521255 + offset, 120.66416501993444),
            new google.maps.LatLng(24.152329408378336 + offset, 120.6698298453739)
//            new google.maps.LatLng(-18.142599, 178.431),
//            new google.maps.LatLng(-27.46758, 153.027892)
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        markers.push(flightPath);
    }
//    k: 24.155192356521255, B: 120.66416501993444
//    k: 24.155329408378336, B: 120.6698298453739



    function SetAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }


}

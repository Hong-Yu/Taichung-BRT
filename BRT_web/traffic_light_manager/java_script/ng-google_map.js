/**
 * Created by hong on 2014/12/29.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('google.map.service', ['google.map.marker']);
    app.factory('googleMap', ['googleMapMarker',
        function( map_marker ) {
            var service = {};
            var google_map =  CreateMap();

            LocationDisplay(google_map);
//            DialogBox(google_map);

            map_marker.set_google_map(google_map);

            service.DrawLight = function(input_data) {
                map_marker.Draw(input_data);
            };

            service.google_map = google_map;
            return service;
        }]);
})();

function CreateMap() {
    var mapProp = {
        // 24.142417009450703, D: 120.67954659461975,
        center: new google.maps.LatLng(24.142417009450703, 120.67954659461975),
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("googleMap")
        ,mapProp);
    return map;
}

function LocationDisplay(google_map) {
    google.maps.event.addListener(google_map, 'click', function(e) {
        console.log(e.latLng);
    });
}


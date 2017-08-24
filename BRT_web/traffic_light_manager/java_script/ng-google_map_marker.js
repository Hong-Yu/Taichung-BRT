/**
 * Created by hong on 2014/12/30.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('google.map.marker', []);
    app.factory('googleMapMarker', ['httpFactory',
        function(http_service) {
            var service = {};
            var markers_ = [];
            var google_map_ = null;
            service.card_id = null;
            service.intersection_id = null;
            service.set_google_map = function(google_map) {
                google_map_ = google_map;
            };
            service.Draw = function(input_data) {
                for (var row_index = 0; row_index < input_data.length; row_index++) {
                    var data = input_data[row_index];
                    var marker = Line(data.longitude, data.latitude, '#FF0000', data.rotation, data);
                    UpdataEvent(marker, data, http_service);
                    UpdateRotation(marker, data, service);
                    markers_.push(marker);


                }



                console.log('draw line.', markers_);
                SetAllMap(google_map_, markers_);

            // 24.142417009450703, D: 120.67954659461975,
            };


            return service;
        }]);
})();

function SetAllMap(map, markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function Line(center_x, center_y, color, angle, input_data) {
    var length = 0.00007;
    var modify_x = length *  Math.sin(angle / 180.0 * Math.PI);
    var modify_y = length *  Math.cos(angle / 180.0 * Math.PI);
//      console.log("x modify: " + modify_x);
    var y = - modify_y;
    var x = 0 - modify_x;
    // arrow
    return Arrow(center_x, center_y, x, y, color, angle, input_data);
    // line
//    result[1] = StraightLine(center_x, center_y, x, y, color);
}

function Arrow(center_x, center_y, x, y, color, ratation, input_data) {
//    var marker = new google.maps.Marker(
//        {
//            position: new google.maps.LatLng(center_y, center_x),
//            map: map,
//            icon: {
//                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
//                strokeColor: color,
//                scale: 4,
//                rotation: ratation
//            }
//        });
    var lineCoordinates = [
        new google.maps.LatLng(center_y, center_x),
        new google.maps.LatLng(center_y + y, center_x + x),
    ];
    var marker1 = new MarkerWithLabel({
        position: new google.maps.LatLng(center_y, center_x),
//        position: lineCoordinates,
        icon: {
            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
            strokeColor: color,
            scale: 4,
            rotation: ratation
        },
        title: 'traffic light',
        draggable: true,
        raiseOnDrag: true,
        map: map,
        labelContent: ''+ input_data.intersection_id +'-'+ input_data.card_id,
        labelAnchor: new google.maps.Point(22, 0),
        labelClass: "labels", // the CSS class for the label
        labelStyle: {opacity: 0.80}
    });
    return  marker1;
}

function StraightLine(center_x, center_y, x, y, color) {
    var flightPlanCoordinates = [
        new google.maps.LatLng(center_y, center_x),
        new google.maps.LatLng(center_y + y, center_x + x),
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 4.0
    });
    return flightPath;
}

function UpdataEvent(marker, input_data, http_service) {
    google.maps.event.addListener(marker, "mouseup", function (e) {
        var send_data = {};
        send_data.id = input_data.id;
        send_data.rotation = input_data.rotation;
        send_data.longitude = this.position.D;
        send_data.latitude = this.position.k;
        console.log(send_data);
        http_service.TrafficLightUpdate(send_data);
    });
}

function UpdateRotation(marker, input_data, service) {
    google.maps.event.addListener(marker, "mousedown", function (e) {
        service.card_id = input_data.card_id;
        service.intersection_id = input_data.intersection_id;
        service.rotation = input_data.rotation;
        var send_data = {};
        send_data.id = input_data.id;
        send_data.longitude = this.position.D;
        send_data.latitude = this.position.k;
        service.send_data = input_data;

        console.log('update rotation: ', service.card_id);

    });
}
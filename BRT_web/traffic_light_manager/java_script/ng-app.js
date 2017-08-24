/**
 * Created by hong on 2014/11/11.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('traffic.light.manager.app', ['http.service', 'google.map.service', 'google.map.marker']);

    app.controller('LightManagerController', ['$scope', 'httpFactory', 'googleMap', 'googleMapMarker',
        function($scope, http_service, google_map_service, google_map_marker) {
            $scope.http_service = http_service;
            $scope.google_map_marker = google_map_marker;
//        DialogBox(google_map_service.google_map);

            var ReadTrafficLight = function() {
                var promise  = http_service.TrafficLightRead();
                promise.then(function(data) {
                    console.log("traffic light data: ", data);
                    google_map_service.DrawLight(data.data);
                }, function(reason) {});
            };
            ReadTrafficLight();
            $scope.UpdateRotation = function() {
                var rotation = google_map_marker.rotation;

                var send_data = google_map_marker.send_data;
                console.log('send data: ', google_map_marker.rotation);
                send_data.rotation = rotation;
                var promise  = http_service.TrafficLightUpdate(send_data);
                promise.then(function(data) {
//                    console.log("traffic light data: ", data);
//                    google_map_service.DrawLight(data.data);
                }, function(reason) {});
            };
            $scope.love = 'is an open door';




        }]);



    app.directive("mainCanvas", function($compile){
        console.log("html page append !");
        return{
            restrict: 'E',
            templateUrl:'traffic_light_manager/sub_page/main.html'
        }
    });

    app.directive("dialogueBox", ['$compile', 'googleMap', function($compile, google_map_service){
        console.log("dialogue box append !");
        return{
            restrict: 'E',
            link: function(scope, element){
                $.get("traffic_light_manager/sub_page/dialogue_rotation.html", function(data) {
                    var input_box;
                    input_box = document.createElement("div");
                    input_box.className = "dialogue_input_box";
                    input_box.innerHTML = data;
                    var result = $(input_box).appendTo(google_map_service.google_map.getDiv());
                    $compile(result)(scope);
                });
            }
        }
    }]);

    function DialogBox(google_map) {
        $.get('traffic_light_manager/sub_page/dialogue_rotation.html', function(data) {
            AppendBox(google_map, data);

        });
        function AppendBox(google_map, str_html) {
            // remove menu and other box
//         $(".context_menu").remove();
//        $(".dialogue_input_box").remove();
            var input_box;
            input_box = document.createElement("div");
            input_box.className = "dialogue_input_box";
            input_box.innerHTML = str_html;
            var svg = angular.element(input_box);
            $(google_map.getDiv()).append(svg);
            input_box.style.visibility = "visible";
//        var box_width = $(".dialogue_input_box").width();
//        var pos_x = position.x - box_width / 2 + 10;
//        var pos_y = position.y ;
//        $(".dialogue_input_box").css("left", pos_x);
//        $(".dialogue_input_box").css("top", pos_y);
//        // content
//        var domain_lat = $(".dialogue_input_box").find(".latitude");
//        var domain_lng = $(".dialogue_input_box").find(".longitude");
//        domain_lat.text(lat_lng.k.toFixed(6));
//        domain_lng.text(lat_lng.D.toFixed(6));
//        console.log(dialogue_event);
//        dialogue_event.Bind();
        }
    }


})();
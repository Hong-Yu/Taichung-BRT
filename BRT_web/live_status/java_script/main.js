
function LiveStatusMain() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    domain_main.append($('<div id="googleMap" class="google_map" style="width:850px;height:400px;"></div>'));
//    $.get("live_status/sub_page/live_status.html", function(data) {
//        var class_names = ["col-sm-6 col-md-4 previous info_div",
//            "col-sm-6 col-md-4 current info_div",
//            "col-sm-6 col-md-4 next info_div"];
//        for (var div_index = 0; div_index < 3; ++div_index) {
//            var info_div_dir = document.createElement("div");
//            info_div_dir.className = class_names[div_index];
//            $(info_div_dir).append(data);
//            domain_main.append(info_div_dir);
//        }
//
//    })

    // prepare map manager function to set google map on our website.
    var map_manager = new MapManager();
    var google_map = map_manager.Initialize();
    console.log("control position: ", google.maps.ControlPosition.RIGHT_BOTTOM);
    // Draw traffic light on google map.
    var map_draw_light = new MapDrawLight();
    map_draw_light.Initialize();
    map_draw_light.set_google_map(google_map);
    // Draw bus status on google map.
    var map_draw_bus = new MapDrawBus();
    map_draw_bus.Initialize();
    map_draw_bus.set_google_map(google_map);
    // prepare class set for wev socket class.
    var class_set = [];
    class_set[0] = map_draw_light;
    class_set[1] = map_draw_bus;
    // Connect to NodeJs server
    var web_socket = new LiveWebSocket();
    web_socket.Initialize();
    web_socket.set_map_manager(map_manager);
    web_socket.set_class_set(class_set);
//   web_socket.set_map_draw(map_draw);
    web_socket.Connect();

    var map_location = new MapLocationEvent();
    map_location.set_google_map(google_map);
    map_location.set_web_socket(web_socket);
    map_location.Active();


}



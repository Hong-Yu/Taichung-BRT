/**
 * Created by hong on 2014/9/4.
 */
function MapLocationEvent() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
    }
    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;
    }
    this.set_web_socket = set_web_socket;
    function set_web_socket(web_socket) {
        this.web_socket = web_socket;
    }
    this.Active = Active;
    function Active() {
        LocationEvent(this.google_map, this.web_socket);
    }
    // Private member ---------------------------------------------------------
    function LocationEvent(google_map, web_socket) {
//        google.maps.event.addListener(google_map, 'click', function(e) {
//            console.log("Google map location: ",e.latLng);
//        });
        // center_changed dragend
        google.maps.event.addListener(google_map, 'dragend', function() {
            console.log("Google map center change: ", google_map.getCenter());
            RequestLightStatus(web_socket, google_map.getCenter());
        });
    }
}

function RequestLightStatus(web_socket, map_center) {
    var json_data = new Object;
    json_data.FunctionNo = "light_status";
    json_data.MsgTypeNo = "map_center_changed";
    json_data.map_center = map_center;
    web_socket.Send(json_data);
}

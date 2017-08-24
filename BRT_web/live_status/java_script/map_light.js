/**
 * Created by hong on 2014/7/16.
 */
function MapDrawLight() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.markers = [];
//        this.markers_old = [];
//        this.markers_new = [];
    }
    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;
    }
    this.LightStatus = LightStatus;
    function LightStatus(input_data) {
        this.SetAllMap(null, this.markers);
        this.markers = [];
        for (var car_index = 0; car_index < input_data.length; ++car_index) {
            var current_data = input_data[car_index];
            ZoomAssignment(this.google_map, current_data, this.markers);
        }
        this.SetAllMap(this.google_map, this.markers);


    }
    this.Show = Show;
    function Show() {


//        this.SetAllMap(this.google_map, this.markers_new);
//        this.markers_old.length = 0;
//        this.markers_old = this.markers_new.slice(0);

    }
    // Private member ---------------------------------------------------------
    function ZoomAssignment(google_map, input_data, markers) {
        var level = google_map.getZoom();
        console.log(level);
        if (level >= 20) {
            DrawDetailLight(input_data, markers);
        } else if (level < 20 && level >= 18) {
           CreatSingleLight(input_data, markers);
        } else {}
    }
    // single light
    function CreatSingleLight(info, markers) {
        function PushImage(path, lat, lon, markers) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lon),
                icon: {
                    url: path,
                    scale: 2,
                    rotation: 90
                }
            });
            markers.push(marker);
        }
        var longitude = info.longitude;
        var latitude = info.latitude;
//        console.log("long: ", longitude, " lat: ", latitude, ' type: ', info.light);


        var type = info.light;

        var path;
        switch(type) {
            case -1:
                path = "live_status/image/yellow.png";
                break;
            case 0:
                path = "live_status/image/red.png";
                break;
            case 1:
                path = "live_status/image/green.png";
                break;
            case 2:
                path = "live_status/image/yellow.png";
                break;
        }
        PushImage(path, latitude, longitude, markers);
    }
    //
    function DrawDetailLight(info, markers) {
        var longitude = info.longitude;
        var latitude = info.latitude;
        var color_left = TypeToColor(info.detail[0]);
        var color_straight = TypeToColor(info.detail[1]);
        var color_right = TypeToColor(info.detail[2]);
        var rotation = info.rotation;
        var arrow_schema = new ArrowSchema();
        var schema = arrow_schema.schema(longitude, latitude, color_left, color_straight, color_right, rotation);
//   setAllMap(map, schema);
        ArrayPush(schema, markers);
        function ArrayPush(source, destination) {
            for(var index = 0; index < source.length; ++index) {
                destination.push(source[index]);
            }
        }
        function TypeToColor(value) {
            var result = "";
            switch(value) {
                case "0":
                    result = "#FF0000"
                    break;
                case "1":
                    result = "#009900"
                    break;
                case "2":
                    result = "#FFCC00"
                    break;
            }
            return result;
        }
    }
    this.SetAllMap = SetAllMap;
    function SetAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
}
/**
 * Created by hong on 2014/4/12.
 */

function MapIcon() {
    // Public member ----------------------------------------------------------
    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;
    }

    this.Icon = Icon;
    function Icon(lat_lng) {
        this.markers = [];
        this.PushImage("accident/image/accident.png", lat_lng, this.markers);
        this.SetAllMap(this.google_map, this.markers);
    }
    this.Icons = Icons;
    function Icons(web_socket_manager, input_data) {

        this.markers = [];
        for (var icon_index = 0; icon_index < input_data.length; icon_index++) {
            var current_data = input_data[icon_index];
            var lat_lng = new google.maps.LatLng(current_data.latitude, current_data.longitude);
            console.log(lat_lng);
//            this.PushImage("accident/image/accident.png", lat_lng, this.markers);
            InfoWindows(web_socket_manager, this.google_map,  lat_lng, current_data, this.markers);
        }
        this.SetAllMap(this.google_map, this.markers);
//        this.InfoWindows(this.google_map, this.markers);

    }
    this.Clear = Clear;
    function Clear(){
        this.SetAllMap(null, this.markers);
//       this.markers.length = 0;
    }
    // Private member ---------------------------------------------------------
    this.BindCreateAccidentEvent = BindCreateAccidentEvent;
    function BindCreateAccidentEvent(lat_lng) {

    }
    this.PushImage = PushImage;
    function PushImage(path, lat_lng, markers) {
        var marker = new google.maps.Marker({
            position: lat_lng,
            icon: {
                url: path
            }
        });

        markers.push(marker);
    }
    //
    this.InfoWindows = InfoWindows;
    function InfoWindows(web_socket_manager, map, lat_lng, input_data, markers) {
        var str_html="";
        str_html += "<div style=\"width:120px;\">";
        str_html += "<p>車牌:"+ input_data.license_plate +" <\/p>";
        str_html += "<p>路線: "+ input_data.route +"<\/p>";
        str_html += "<p>平均速度: "+ input_data.velocity_avg +"<\/p>";
        str_html += "<p>位置: "+ input_data.latitude +' '+  input_data.longitude +"<\/p>";
        str_html += "<p>接近路口: "+ input_data.intersection_near +"<\/p>";
        str_html += "<p>事故原因: "+ input_data.reason +"<\/p>";
        str_html += "<p>關閉車道數: "+ input_data.lane_closed +"<\/p>";
        str_html += "<\/div>";
        var infowindow = new google.maps.InfoWindow({
            content: str_html,
            width: 50
        });
        var marker = new google.maps.Marker({
            position: lat_lng,
            icon: {
                url: "accident/image/accident.png"
            },
            title: '意外事故'
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
       google.maps.event.addListener(marker, 'rightclick', function() {
          console.log("delete " + input_data.id);
          var delete_data = new Object();
          delete_data.id = input_data.id;
          var json_data = {};
          json_data.FunctionNo = 'accident';
          json_data.MsgTypeNo = 'establish';
          json_data.active = "delete";
          json_data.accident = delete_data;
          web_socket_manager.Send(json_data);
          marker.setMap(null);
       });
        markers.push(marker);

    }
    this.SetAllMap = SetAllMap;
    function SetAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }


}

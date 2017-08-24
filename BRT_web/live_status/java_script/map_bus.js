/**
 * Created by hong on 2014/7/24.
 */
function MapDrawBus() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.markers = [];
    }
    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;
    }
    this.UpdateStatus = UpdateStatus;
    function UpdateStatus(input_data) {
//        console.log("bus data: ", input_data);
        if (typeof input_data === 'undefined') return;
        SetAllMap(null, this.markers);
        this.markers = [];
        for (var bus_index = 0; bus_index < input_data.length; ++bus_index) {
            var bus_data = input_data[bus_index];
            IconWithInfo("bus", bus_data, this.markers);
        }
//        console.log("bus update: ", this.markers);
        SetAllMap(this.google_map, this.markers);
    }

    // Private member ---------------------------------------------------------
    function SetAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    function IconWithInfo(icon_type, bus_data, markers) {
//        bus_data.LocX = 120.66417217254639;
//        bus_data.LocY = 24.15492804181027;
//        bus_data.AvgSpeed = 36.541;
        var str_html="";
        var image_path, title;
        switch(icon_type) {
            case "bus":
                title = '快捷巴士';
                image_path = "live_status/image/bus-icon.png";
                str_html += "<div style=\"width:120px;\">";
                str_html += "<p>行車速度: "+ bus_data.AvgSpeed +" <\/p>";
                str_html += "<\/div>";
                break;
        }
        var lat_lng = new google.maps.LatLng(bus_data.LocY, bus_data.LocX);
        var infowindow = new google.maps.InfoWindow({
            content: str_html,
            width: 50
        });
//        var marker = new google.maps.Marker({
//            position: lat_lng,
//            icon: {
//                url: image_path
//            },
//            title: title
//        });
        var marker1 = new MarkerWithLabel({
            position: lat_lng,
            icon: {
                url: image_path
            },
            title: title,
            draggable: true,
            raiseOnDrag: true,
            map: map,
            labelContent: bus_data.CarNo,
            labelAnchor: new google.maps.Point(22, 0),
            labelClass: "labels", // the CSS class for the label
            labelStyle: {opacity: 0.75}
        });
        google.maps.event.addListener(marker1, 'click', function() {
            infowindow.open(map, marker1);
        });
        markers.push(marker1);

    }
}
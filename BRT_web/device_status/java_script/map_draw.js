/**
 * Created by hong on 2014/4/12.
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
    this.set_location_data = set_location_data;
    function set_location_data(input_data) {
        this.data_reservoir = new DataReservoir();
        var data_reservoir = this.data_reservoir;
        data_reservoir.Initialize(input_data.intersection);
        data_reservoir.set_device_location(input_data);
    }
    this.Draw = Draw;
    function Draw() {
        var location_data = this.data_reservoir.Penstock();
//        console.log("reservoir_data: ", JSON.stringify(location_data));
        IconInfo(location_data, this.google_map, this.markers);
    }
    this.set_status_data = set_status_data;
    function set_status_data(input_data) {
        this.data_reservoir.set_device_status(input_data.status);
        var device_data = this.data_reservoir.Penstock();
        SetAllMap(null, this.markers);
        this.markers = [];
        IconInfo(device_data, this.google_map, this.markers);

    }
    // Private member ---------------------------------------------------------
    function IconInfo(input_data, google_map, markers) {
        var type_set = ["tc", "dsrc", "gps", "ipc"];
        var current_type, current_data;
        for (var type_index = 0; type_index < type_set.length;++type_index) {
            current_type = type_set[type_index];
            current_data = input_data[current_type];
            for (var element_index = 0; element_index < current_data.length; ++element_index) {
                InfoWindows(current_type, current_data[element_index], markers);
            }
        }
        SetAllMap(google_map, markers);
    }

    function InfoWindows(current_type, input_data, markers) {
        var info_html="";
        var image_path, title;
        var is_connect = input_data.is_connect;
        switch(current_type) {
            case "tc":
                title = '號誌控制器';
                if (is_connect)
                    image_path = "device_manager/image/tc-connect.png";
                else
                    image_path = "device_manager/image/tc-disconnect.png";
                info_html += "<div style=\"width:120px;\">";
                info_html += "<p>設備編號: "+ input_data.intersection_id +" <\/p>";
                info_html += "<\/div>";
                IconConstruct(input_data.latitude, input_data.longitude, image_path, title, info_html, markers);
                break;
            case "dsrc":
                title = '短距離通訊';
                var latitude_offset = 0;
                for (var icon_index = 0; icon_index < 2; icon_index++) {
                    latitude_offset += icon_index * 0.0002;
                    is_connect = input_data.is_connect[icon_index];
                    if (is_connect)
                        image_path = "device_status/image/dsrc-connect.png";
                    else
                        image_path = "device_status/image/dsrc-disconnect.png";
                    info_html += "<div style=\"width:120px;\">";
                    info_html += "<p>設備編號: "+ input_data.intersection_id +" <\/p>";
                    info_html += "<\/div>";
                    IconConstruct(input_data.latitude + latitude_offset, input_data.longitude, image_path, title, info_html, markers);
                }

                break;
            case "gps":
                title = '衛星定位';
                if (is_connect)
                    image_path = "device_manager/image/gps-connect.png";
                else
                    image_path = "device_manager/image/gps-disconnect.png";
                info_html += "<div style=\"width:120px;\">";
                info_html += " "+ input_data.intersection_id +" <\/p>";
                info_html += "<\/div>";
                IconConstruct(input_data.latitude, input_data.longitude, image_path, title, info_html, markers);
                break;
            case "ipc":
                title = '電腦';
                if (is_connect)
                    image_path = "device_manager/image/ipc-connect.png";
                else
                    image_path = "device_manager/image/ipc-disconnect.png";
                info_html += "<div style=\"width:120px;\">";
                info_html += "<p>設備編號: "+ input_data.intersection_id +" <\/p>";
                info_html += "<\/div>";
                IconConstruct(input_data.latitude, input_data.longitude, image_path, title, info_html, markers);
                break;

        }

    }
    function IconConstruct(latitude, longitude, image_path, title, info_html, markers) {
//        var lat_lng = new google.maps.LatLng(input_data.latitude, input_data.longitude);
        var lat_lng = new google.maps.LatLng(latitude, longitude);
        var infowindow = new google.maps.InfoWindow({
            content: info_html,
            width: 50
        });
        var marker = new google.maps.Marker({
            position: lat_lng,
            icon: {
                url: image_path
            },
            title: title
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
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

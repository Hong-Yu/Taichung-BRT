/**
 * Created by hong on 2014/4/12.
 */

function MapDraw() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.markers = [];
        this.polylines = [];
        this.markers_new = [];
    }
    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;
    }
    this.set_multifunction = set_multifunction;
    function set_multifunction(multifunction) {
        this.multifunction = multifunction;
    }
    this.set_web_socket = set_web_socket;
    function set_web_socket(web_socket) {
        this.web_socket = web_socket;
    }
    this.MapListener = MapListener;
    function MapListener() {
        var google_map = this.google_map;
        var multifunction = this.multifunction;
        var markers_new = this.markers_new;
        google.maps.event.addListener(google_map, 'click', function(event) {
            var offset = 0.001;
            var lat = event.latLng.k - offset;
            var lng = event.latLng.A + offset - 0.000505;
            var lat_lng =  new google.maps.LatLng(lat, lng);
            DrawIcon(google_map, event.latLng, multifunction, markers_new);
        });
//        this.PushImage("accident/image/accident.png", lat_lng, this.markers);
//        this.SetAllMap(this.google_map, this.markers);
    }
    this.IconInfo = IconInfo;
    function IconInfo(input_data) {
        // clear marks array
        SetAllMap(null, this.markers);
        this.markers = [];

        console.log("input_data", input_data);
        var type_set = ["intersection", "tc", "dsrc", "gps", "ipc"];
        var web_socket = this.web_socket;
        var current_type, current_data;
        for (var type_index = 0; type_index < type_set.length;++type_index) {
            current_type = type_set[type_index];
            current_data = input_data[current_type];
            for (var element_index = 0; element_index < current_data.length; ++element_index) {
                this.InfoWindows(current_type, current_data[element_index], this.markers, web_socket);
            }
        }
        SetAllMap(this.google_map, this.markers);
    }
    this.Pop = Pop;
    function Pop() {
        var marker = this.markers_new.pop();
        marker.setMap(null);

    }
    this.Clear = Clear;
    function Clear(){
        this.SetAllMap(null, this.markers);
//       this.markers.length = 0;
    }
    // Private member ---------------------------------------------------------
    function DrawIcon(google_map, lat_lng, multifunction, markers_new) {
        var image_path = multifunction.get_image_path();
        PushImage(image_path, lat_lng, markers_new);
        SetAllMap(google_map, markers_new);
    }

    this.PushImage = PushImage;
    function PushImage(path, lat_lng, markers) {
        var marker = new google.maps.Marker({
            position: lat_lng,
            icon: {
                url: path,
//            size: new google.maps.Size(50, 50),
                // The origin for this image is 0,0.
                origin: new google.maps.Point(0,0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(15, 15)
            }
        });
        markers.push(marker);
        google.maps.event.addListener(marker, 'rightclick', function() {
            marker.setMap(null);
        });
    }


    //
    this.InfoWindows = InfoWindows;
    function InfoWindows(current_type, input_data, markers, web_socket) {
//        console.log(input_data);
        var str_html="";
        var image_path, title;
        switch(current_type) {
            case "intersection":
                title = '路口';
                image_path = "device_manager/image/intersection.png";
                str_html += "<div style=\"width:120px;\">";
                str_html += "<p>"+ input_data.name +" <\/p>";
                str_html += "<\/div>";
                break;
            case "tc":
                title = '號誌控制器';
                image_path = "device_manager/image/tc-disconnect.png";
                str_html += "<div style=\"width:120px;\">";
                str_html += "<p>設備編號: "+ input_data.intersection_id +" <\/p>";
                str_html += "<\/div>";
                break;
            case "dsrc":
                title = '短距離通訊';
                image_path = "device_manager/image/dsrc-disconnect.png";
                str_html += "<div style=\"width:120px;\">";
                str_html += "<p>設備編號: "+ input_data.intersection_id +" <\/p>";
                str_html += "<\/div>";
                break;
            case "gps":
                title = '衛星定位';
                image_path = "device_manager/image/gps-disconnect.png";
                str_html += "<div style=\"width:120px;\">";
                str_html += " "+ input_data.intersection_id +" <\/p>";
                str_html += "<\/div>";
                break;
            case "ipc":
                title = '電腦';
                image_path = "device_manager/image/ipc-disconnect.png";
                str_html += "<div style=\"width:120px;\">";
                str_html += "<p>設備編號: "+ input_data.intersection_id +" <\/p>";
                str_html += "<\/div>";
                break;


        }
//      console.log(str_html);
        var lat_lng = new google.maps.LatLng(input_data.latitude, input_data.longitude);

        var infowindow = new google.maps.InfoWindow({
            content: str_html,
            width: 50
        });
        var marker = new google.maps.Marker({
            position: lat_lng,
            icon: {
                url: image_path,
                origin: new google.maps.Point(0,0),
                // The anchor for this image is the base of the flagpole at 0,32.
                anchor: new google.maps.Point(15, 15)
            },
            title: title
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
        google.maps.event.addListener(marker, 'rightclick', function() {
            console.log("delete ", input_data);
            var delete_data = new Object();
            delete_data.intersection_id = input_data.intersection_id;
            delete_data.device_type = current_type;
            if(current_type == 'intersection') {
                var message = "您確定要刪除路口 :"+ input_data.intersection_id  +' '+ input_data.name +"\n ";
                message += '這將會一併刪除所有與此路口有關聯的設備與功能\n';
                message += '若此為正在使用中的路口，系統將發生不可預期的錯誤，並有永遠無法修復的可能。';
                if (confirm(message) != true) return;
                http_service.IntersectionDelete(delete_data);
            }
            else {
                var message = "您確定要刪除裝置 "+ current_type +' 編號: '+ input_data.intersection_id;
                if (confirm(message) != true) return;
                http_service.DeviceDelete(delete_data);

            }
//         var json_data = {};
//         json_data.FunctionNo = 600;
//         json_data.MsgTypeNo = 3;
//         json_data.active = "delete";
//         json_data.type = current_type;
//         json_data.content = delete_data;
//         web_socket.Send(json_data);
            marker.setMap(null);
        });
        markers.push(marker);

    }
    function SetAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }


}

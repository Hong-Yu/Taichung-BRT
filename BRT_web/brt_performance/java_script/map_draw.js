/**
 * Created by hong on 2014/4/12.
 */

function MapDraw() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;

    function Initialize() {
        this.polylines = [];
    }
    this.set_google_map = set_google_map;

    function set_google_map(google_map) {
        this.google_map = google_map;
    }
    this.set_route_info = set_route_info;

    function set_route_info(route_info) {
        this.route_info = route_info;
    }
    this.BusStation = BusStation;
    function BusStation(input_data) {
            this.markers = [];
            for (var int_index = 0; int_index < input_data.length; int_index++) {
                var current_data = input_data[int_index];
                var lat = current_data.latitude;
                var lng = current_data.longitude;
                var lat_lng = new google.maps.LatLng(lat, lng);
                var avi_name = current_data.name;
                var avi_id = current_data.intersection_id; // could be changed
                PushImage("brt_performance/image/bus_station.png", lat_lng, this.markers, avi_name, avi_id, this.google_map);
            }
                SetAllMap(this.google_map, this.markers);
        }
        // this.PushImage = PushImage;
    function PushImage(path, lat_lng, markers, avi_name, avi_id, google_map) {
        var str_infoMarker = '';
        str_infoMarker += '<p>AVI: '+avi_name+'</p>';
        var infowindowMarker = new google.maps.InfoWindow({
            content: str_infoMarker,
            width: 100
        });
        var marker = new google.maps.Marker({
            position: lat_lng,
            icon: {
                url: path
            }
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindowMarker.open(google_map, marker);
            console.log("avi clicked");
        });
        markers.push(marker);
    }

    this.RoutePolyline = RoutePolyline;
    function RoutePolyline(avi_section, seq){
        this.lines = [];
        var hold_obj = {};
        var col_name = ['aviGD', 'aviDA', 'aviAH', 'aviHS'];
        for (var int_index = 0; int_index < 4; ++int_index) {
            var prop = col_name[int_index];
                var current_data = avi_section[prop];
                hold_obj[prop]={};
                PushLine(current_data, this.lines, prop, this.google_map);
                hold_obj[prop] = this.lines[int_index];
            }
        SetAllMap(this.google_map, this.lines);
        // console.log(RouteSectionObj);
        switch(seq){
            case 1:
                RouteSectionObj = hold_obj;
                break;
            case 2:
                RouteSectionObj_2 = hold_obj;
                break;
            case 3:
                RouteSectionObj_3 = hold_obj;
                break;
            case 4:
                RouteSectionObj_4 = hold_obj;
                break;
            default:
                console.log('seq err');
                break;
        }
    }
        function PushLine(path, lines, prop, google_map){
            var sectionPath = new google.maps.Polyline({
                    path: path,
                    strokeColor: '#000000',
                    strokeOpacity: 1.0,
                    strokeWeight: 5,
                    name: prop
                    // editable: true
                });
            sectionPath.prototype = new google.maps.OverlayView();
            sectionPath.prototype.draw = function(section, c){
                var s = section;
                s.strokeColor = c;
            };
            sectionPath.prototype.onRemove = function(){};
            google.maps.event.addListener(sectionPath, 'click', function() {
            // infowindowMarker.open(google_map, sectionPath);
            console.log("section clicked toggle table");
            RouteSectionMethod.ToggleNow(sectionPath.name);
            RouteSectionMethod.ToggleTable(sectionPath.name);
            // console.log(sectionPath);
            // sectionPath.prototype.draw(this);
            // console.log(sectionPath);
            // var new_sectionPath = sectionPath;
            // Clear(sectionPath);
            // ReAdd(new_sectionPath, google_map);
        });
            lines.push(sectionPath);
    }

    function Clear(markers) {
        markers.setMap(null);
    }
    function ReAdd(markers, google_map) {
        markers.setMap(google_map);
    }

    this.TravelTimeProcess = TravelTimeProcess;
    function TravelTimeProcess(input_data) {
        $('#time_field').text('更新時間: '+input_data.MsgTime);
        var toggle_name = ToggleFlag;
        if(input_data.Dir === 'East'){
                var col_color = [];
                for(var od_index=0; od_index<4; ++od_index){
                    var od_name = 'OD'+(od_index+1);
                    var current_effic = input_data.BusTravelTime[od_name];
                    col_color[od_index] = EfficientToColor(current_effic);
                }
                var col_name = ['aviGD', 'aviDA', 'aviAH', 'aviHS'];
                for(var color_index=0; color_index<4; ++color_index){
                    var current_sec = col_name[color_index];
                    var current_color = col_color[color_index];
                    var section = RouteSectionObj_4[current_sec];
                    section.prototype.draw(section, current_color);
                    Clear(section);
                    ReAdd(section, this.google_map);
                    if(toggle_name === current_sec){
                        $('#illustration .east_bus')[0].style.stroke = current_color;
                    }
                }

                var col_color = [];
                for(var od_index=0; od_index<4; ++od_index){
                    var od_name = 'OD'+(od_index+1);
                    var current_effic = input_data.CarTravelTime[od_name];
                    col_color[od_index] = EfficientToColor(current_effic);
                }
                var col_name = ['aviGD', 'aviDA', 'aviAH', 'aviHS'];
                for(var color_index=0; color_index<4; ++color_index){
                    var current_sec = col_name[color_index];
                    var current_color = col_color[color_index];
                    var section = RouteSectionObj_3[current_sec];
                    section.prototype.draw(section, current_color);
                    Clear(section);
                    ReAdd(section, this.google_map);
                    if(toggle_name === current_sec){
                        $('#illustration .east_car')[0].style.stroke = current_color;
                    }
                }
            }else{
                var col_color = [];
                for(var od_index=0; od_index<4; ++od_index){
                    var od_name = 'OD'+(od_index+1);
                    var current_effic = input_data.BusTravelTime[od_name];
                    col_color[od_index] = EfficientToColor(current_effic);
                }
                var col_name = ['aviGD', 'aviDA', 'aviAH', 'aviHS'];
                for(var color_index=0; color_index<4; ++color_index){
                    var current_sec = col_name[color_index];
                    var current_color = col_color[color_index];
                    var section = RouteSectionObj_2[current_sec];
                    section.prototype.draw(section, current_color);
                    Clear(section);
                    ReAdd(section, this.google_map);
                    if(toggle_name === current_sec){
                        $('#illustration .west_bus')[0].style.stroke = current_color;
                    }
                }

                var col_color = [];
                for(var od_index=0; od_index<4; ++od_index){
                    var od_name = 'OD'+(od_index+1);
                    var current_effic = input_data.CarTravelTime[od_name];
                    col_color[od_index] = EfficientToColor(current_effic);
                }
                var col_name = ['aviGD', 'aviDA', 'aviAH', 'aviHS'];
                for(var color_index=0; color_index<4; ++color_index){
                    var current_sec = col_name[color_index];
                    var current_color = col_color[color_index];
                    var section = RouteSectionObj[current_sec];
                    section.prototype.draw(section, current_color);
                    Clear(section);
                    ReAdd(section, this.google_map);
                    if(toggle_name === current_sec){
                        $('#illustration .west_car')[0].style.stroke = current_color;
                    }
                }
            }
        }
    function EfficientToColor(num){
        var str_color = '';
        switch(num){
            case 1:
                str_color = '#009933';
                break;
            case 2:
                str_color = '#009933';
                break;
            case 3:
                str_color = '#009933';
                break;
            case 4:
                str_color = '#FF9900';
                break;
            case 5:
                str_color = '#FF9900';
                break;
            case 6:
                str_color = '#FF9900';
                break;
            case 7:
                str_color = '#FF0000';
                break;
            default:
                str_color = '#000000';
                break;
        }
        return str_color;
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
            InfoWindows(web_socket_manager, this.google_map, lat_lng, current_data, this.markers);
        }
        this.SetAllMap(this.google_map, this.markers);
        //        this.InfoWindows(this.google_map, this.markers);

    }



        // Private member ---------------------------------------------------------
    this.BindCreateAccidentEvent = BindCreateAccidentEvent;

    function BindCreateAccidentEvent(lat_lng) {

        }
        // poly line
    this.PushPolyLine = PushPolyLine;

    function PushPolyLine(lat_begin, lng_begin, lat_end, lng_end, color, section_index, route_info, polylines) {
        var flightPlanCoordinates = [
            new google.maps.LatLng(lat_begin, lng_begin),
            new google.maps.LatLng(lat_end, lng_end),
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 1.0,
            strokeWeight: 10
        });
        polylines.push(flightPath);
        google.maps.event.addListener(flightPath, 'click', function() {
            console.log("click");

            route_info.ShowTable(section_index);
            route_info.PaintSketchMap(section_index);
            $("div.route_sketch").show();
        });
        //        flightPath.setMap(map);
    }

    //
    this.InfoWindows = InfoWindows;

    function InfoWindows(web_socket_manager, map, lat_lng, input_data, markers) {
        var str_html = "";
        str_html += "<div style=\"width:120px;\">";
        str_html += "<p>車牌:" + input_data.license_plate + " <\/p>";
        str_html += "<p>描述: " + input_data.statement + "<\/p>";
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
            infowindow.open(map, marker);
        });
        google.maps.event.addListener(marker, 'rightclick', function() {
            console.log("delete " + input_data.id);
            var delete_data = new Object();
            delete_data.id = input_data.id;
            var json_data = {};
            json_data.FunctionNo = 201;
            json_data.MsgTypeNo = 3;
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
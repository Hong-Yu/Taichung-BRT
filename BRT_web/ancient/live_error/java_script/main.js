/**
 * Created by hong on 2014/3/14.
 */
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function LiveErrorMain() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    domain_main.append($('<div id="googleMap" class="google_map" style="width:850px;height:400px;"></div>'));
//    var map = domain_main.find('.google_map').buildGoogleMap().addInfo(
//        '<div class="btn-group btn-group-vertical" style="width:100%;">\
//            <div class="btn btn-success">快捷巴士</div>\
//            <div class="btn btn-success">快捷巴士站</div>\
//            <div class="btn btn-success">優先號誌</div>\
//            <div class="btn btn-success">BRT路線</div>\
//            <div class="btn btn-success">TOD</div>\
//            <div class="btn btn-success">Priority</div>\
//            <div class="btn btn-success">手動</div>\
//        </div>',
//        google.maps.ControlPosition.RIGHT_BOTTOM,
//        {
//            backgroundColor:'silver',
//            width: 130,
//            marginBottom:5,
//            marginRight:5
//        }
//    );
    var mapProp = {
//        center: new google.maps.LatLng(24.136806496426946, 120.68498611450195),
        center: new google.maps.LatLng(24.153130034734478, 120.66694021224976),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true

    };
    map = new google.maps.Map(document.getElementById("googleMap")
        ,mapProp);
    // Mouse listener for location display.
    google.maps.event.addListener(map, 'click', function(e) {
        console.log(e.latLng);
    });
    console.log(map);
    var traffic_marker_set = [];
    pushMark(traffic_marker_set, 24.147589011390476, 120.67361354827881);
    pushMark(traffic_marker_set, 24.153130034734478, 120.66694021224976);
    pushMark(traffic_marker_set, 24.157000124754745, 120.65975189208984);
    function pushMark(marker_set, lat, lng) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            icon:"live_status/image/traffic_light_std.png",
            zIndex: 1
            //animation:google.maps.Animation.BOUNCE
        });
        marker_set.push(marker);
        marker.setMap(map);
    }
    //
//   directionsDisplay = new google.maps.DirectionsRenderer();
    var polylineOptionsActual = new google.maps.Polyline({
        strokeColor: '#0066FF',
        strokeOpacity: 1.0,
        strokeWeight: 10
    });
    directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: polylineOptionsActual});
    directionsDisplay.setMap(map);


    var start = new google.maps.LatLng(24.14060439271139, 120.68169342855981);
    var end = new google.maps.LatLng(24.157000124754745, 120.65975189208984);
    function calRoute(start, end) {
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.TravelMode.DRIVING
        }
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        })
    }
    calRoute(start, end);



    //
    var append_info = {
        Show: function(domain, section_index, type) {
            var pseudo_data = new LiveStatusPseudoData();
            var sections = pseudo_data.get_data();
            var section = sections[section_index];
            for (var info_index = 0; info_index < 6; ++info_index) {
                var html_text = "";
                html_text += "<tr>"
                html_text += "<td>" + section[type][info_index].title +"</td>"
                html_text += "<td>" + section[type][info_index].content +"</td>"
                html_text += "</tr>"
                domain.append(html_text);
            }
        },
        Sketch: function(domain, section_index, strategy) {
            var strVar="";
            switch(strategy) {
                case "standard":
                    strVar += "<a style=\"width:100px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                    strVar += "<a style=\"width:100px\" class=\"btn btn-danger\" role=\"button\">紅燈<\/a>";
                    break;
                case "red_short":
                    strVar += "<a style=\"width:90px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                    strVar += "<a style=\"width:35px\" class=\"btn btn-danger\" role=\"button\">紅燈<\/a>";
                    strVar += "<a style=\"width:45px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                    break;
                case "green_extend":
                    strVar += "<a style=\"width:90px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                    strVar += "<a style=\"width:35px\" class=\"btn btn-success\" role=\"button\">綠燈<\/a>";
                    strVar += "<a style=\"width:45px\" class=\"btn btn-danger\" role=\"button\">紅燈<\/a>";
                    break;
            }

            domain.append(strVar);

        }

    };

    $.get("live_error/sub_page/section_information.html", function(data) {
        AppendInfo(data);

    });

    function AppendInfo(data) {
        for (var section_index = 0; section_index < 3; ++section_index) {

        }
        domain_main.append(data);

    }






//O {k: 24.147589011390476, A: 120.67361354827881, toString: function, j: function, equals: function…}

}



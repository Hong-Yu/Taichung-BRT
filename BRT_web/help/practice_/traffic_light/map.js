/**
 * Created by CCT on 2014/3/28.
 */

function GoogleMapMain() {
   var domain_main;
   domain_main=$('body');
   domain_main.append($('<div id="googleMap" class="google_map" style="width:1024px;height:800px;"></div>'));
   var mapProp = {
//        center: new google.maps.LatLng(24.136806496426946, 120.68498611450195),
      center: new google.maps.LatLng(24.153130034734478, 120.66694021224976),
      zoom: 20,
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
      var path = "image/maeda1.png";
      var img_period = {
         url: path,
         // ize: new google.maps.Size(50, 50),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(100, 100),
         rotation: 90.0
      }
      var marker = new google.maps.Marker({
         position: new google.maps.LatLng(lat, lng),
         icon: {
            url: "image/red.png",
            scale: 2,
            rotation: 90
         },
         zIndex: 1
         //animation:google.maps.Animation.BOUNCE
      });
      marker_set.push(marker);
   }
//   google.maps.event.addListener(map, 'center_changed', function() {
//      console.log("center change");
//      console.log(map.getZoom());
//      console.log(map.getCenter());
//      // 3 seconds after the center of the map has changed, pan back to the
//      // marker.
////      window.setTimeout(function() {
////         map.panTo(marker.getPosition());
////      }, 3000);
//   });

   function PushImage(path, lat, lng, markers) {
      var marker = new google.maps.Marker({
         position: new google.maps.LatLng(lat, lng),
         icon: {
//            url: "image/red.png",
            url: path,
            scale: 2,
            rotation: 90
         }
      });
      markers.push(marker);
   }

//for(var index = 0; index < 500; ++index) {
   var light_positions = [[120.66702336453932, 24.15321487417105],
      [120.66674307369726, 24.153061911968003],
      [120.66707298540223, 24.153373954671455],
      [120.66666797184484, 24.153269940519305],
   ];

//   for(var index = 0; index < 400; ++index) {
      console.log(index);
      var light_set = [];

      var arrow_schema = new ArrowSchema();
      var schema = arrow_schema.schema(light_positions[0][0], light_positions[0][1], "#009900", "#009900", "#009900", 300);
//   setAllMap(map, schema);

      ArrayPush(schema, light_set);
//   }

   var arrow_schema = new ArrowSchema();
   var schema = arrow_schema.schema(light_positions[1][0], light_positions[1][1], "#FF0000", "#FF0000", "#FF0000", 35);
//   setAllMap(map, schema);
   ArrayPush(schema, light_set);


   var arrow_schema = new ArrowSchema();
   var schema = arrow_schema.schema(light_positions[2][0], light_positions[2][1], "#FF0000", "#FF0000", "#FF0000", 230);
//   setAllMap(map, schema);
   ArrayPush(schema, light_set);

   var arrow_schema = new ArrowSchema();
   var schema = arrow_schema.schema(light_positions[3][0], light_positions[3][1], "#009900", "#009900", "#FF0000", 120);
//   setAllMap(map, schema);
   ArrayPush(schema, light_set);

   setAllMap(map, light_set);

   var paths = ["image/green.png", "image/red.png", "image/red.png", "image/red.png"]
   var circles = [];
   for(var index = 0; index < 4; ++index) {
      var current_position = light_positions[index];
      console.log(current_position);

      PushImage(paths[index], current_position[1], current_position[0], circles)
   }
   console.log(circles);


   console.log(light_set);
   google.maps.event.addListener(map, 'zoom_changed', function() {
      setAllMap(null, light_set);
      setAllMap(null, circles);

      var level = map.getZoom();
      if (level >= 20) {
         setAllMap(map, light_set);
      } else if (level < 20 && level >= 18) {
         setAllMap(map, circles);
      }
      else {
         setAllMap(null, light_set);
      }
      console.log(map.getZoom());
   });

   google.maps.event.addListener(map, 'rightclick', function() {
      console.log("right click");



   });
//   rightclick




//   setAllMap(map, traffic_marker_set);
   function setAllMap(map, markers) {
      for (var i = 0; i < markers.length; i++) {
         markers[i].setMap(map);
      }
   }

//   removes the markers from the map
   function clearMarkers() {
      setAllMap(null, traffic_marker_set);
   }

   function ArrayPush(source, destination) {
      for(var index = 0; index < source.length; ++index) {
         destination.push(source[index]);
      }
   }
//   clearMarkers();

}

/**
 * Created by hong on 2014/4/12.
 */

function MapIntersection() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.polylines = [];
   }
   this.set_google_map = set_google_map;
   function set_google_map(google_map) {
      this.google_map = google_map;
   }
   this.set_web_socket = set_web_socket;
   function set_web_socket(web_socket) {
      this.web_socket = web_socket;
   }
   this.Intersection=Intersection;
   function Intersection(input_data) {
      this.markers = [];
      for (var int_index = 0; int_index < input_data.length; int_index++) {
         var current_data = input_data[int_index];
         var lat = current_data.latitude;
         var lng = current_data.longitude;
         var lat_lng = new google.maps.LatLng(lat, lng);
         PushImageWithInfo(current_data, lat_lng, this.web_socket, this.markers);

      }
      this.SetAllMap(this.google_map, this.markers, current_data);
   }


   this.Clear = Clear;
   function Clear(){
      this.SetAllMap(null, this.markers);
//       this.markers.length = 0;
   }
   // Private member ---------------------------------------------------------
   function PushImageWithInfo(input_data, lat_lng, web_socket, markers) {
      var str_html="";
      var image_path, title;
      title = '路口';
      image_path = "live_status/image/intersection.png";
      str_html += "<div style=\"width:120px;\">";
      str_html += "<p>"+ input_data.name +" <\/p>";
      str_html += "<\/div>";

      var infowindow = new google.maps.InfoWindow({
         content: str_html,
         width: 50
      });
      var marker = new google.maps.Marker({
         position: lat_lng,
         icon: {
            url: image_path
//            origin: new google.maps.Point(0,0),
            // The anchor for this image is the base of the flagpole at 0,32.
//            anchor: new google.maps.Point(15, 15)
         },
         title: title
      });
      google.maps.event.addListener(marker, 'click', function() {
         infowindow.open(map, marker);
         RequestLiveStatus(web_socket, input_data.intersection_id);
      });
      markers.push(marker);
   }

   this.SetAllMap = SetAllMap;
   function SetAllMap(map, markers) {
      for (var i = 0; i < markers.length; i++) {
         markers[i].setMap(map);
      }
   }

   function RequestLiveStatus(web_socket, intersection_id) {
      var json_data = {};
      json_data.FunctionNo = 'live_status';
      json_data.MsgTypeNo = 'requesting';
      json_data.intersection_id = intersection_id;
      web_socket.Send(json_data);
   }


}

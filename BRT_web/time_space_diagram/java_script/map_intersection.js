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
   this.set_web_socket = set_web_socket;
   function set_web_socket(web_socket) {
      this.web_socket = web_socket;
   }
   this.Intersection=Intersection;
   function Intersection(input_data) {
      for(var i = 0; i< input_data.length; ++i){
         var current_data = input_data[i];
         var lat = current_data.latitude;
         var lng = current_data.longitude;
         var name = current_data.name;
         var id = current_data.intersection_id;

         var intersecLatLng = new google.maps.LatLng(lat,lng );
      this.insertMap(this.google_map, intersecLatLng,  name, id, this.web_socket);
      }
   }

   this.insertMap = insertMap;
   function insertMap(google_map, intersecLatLng, name, id, web_socket){
         var iconSrc = new google.maps.MarkerImage('time_space_diagram/image/intersection.png');

         var str_html = "";
         str_html += "<div style=\"width:120px;\">";
         str_html += "<p>"+ name +" <\/p>";
         str_html += "<\/div>";
         var infowindow = new google.maps.InfoWindow({
            content: str_html,
            width: 50
         });

         var marker = new google.maps.Marker({
            position : intersecLatLng,
            map : google_map,
            title : name,
            icon : iconSrc
         });
         google.maps.event.addListener(marker, 'click', function(){
            infowindow.open(google_map, marker);
            var label = $('.label1');
            label[0].innerHTML = "";
            label[0].innerHTML = id+" "+name;
            label.attr('id', id);
            $('#tsd_date').val('');
            var domain_time = $("select.time");
            domain_time.empty();
            var str_option ="<option disabled>--請選擇日期-- </option>";
            domain_time.append(str_option);

//            $('#result').empty();
         });
}
}
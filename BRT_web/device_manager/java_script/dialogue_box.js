/**
 * Created by hong on 2014/4/12.
 */
function DialogueBox() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      function Structure(car_id, statement, latitude, longitude) {
         this.car_id = car_id;
         this.statement = statement;
         this.latitude = latitude;
         this.longitude = longitude;
      }
      this.box_data = new Structure(0, 0, 0, 0);
   }
   this.set_google_map = set_google_map;
   function set_google_map(google_map) {
      this.google_map = google_map;
   }
   this.set_coordinate_transfer = set_coordinate_transfer;
   function set_coordinate_transfer(transfer) {
      this.transfer = transfer;
   }
   this.set_dialogue_event = set_dialogue_event;
   function set_dialogue_event(dialogue_event) {
      this.dialogue_event = dialogue_event;
   }
   this.set_web_socket = set_web_socket;
   function set_web_socket(web_socket) {
      this.web_socket = web_socket;
   }
   this.set_map_icon = set_map_icon;
   function set_map_icon(map_icon) {
      this.map_icon = map_icon;
   }
   this.set_multifunction = set_multifunction;
   function set_multifunction(multifunction) {
      this.multifunction = multifunction;
   }
   this.MapListener = MapListener;
   function MapListener() {
      var google_map = this.google_map;
      var multifunction = this.multifunction;
      var transfer = this.transfer;
      var dialogue_event = this.dialogue_event;
      google.maps.event.addListener(google_map, 'click', function(event) {
         var lat = event.latLng.k;
         var lng = event.latLng.D;
         var lat_lng =  new google.maps.LatLng(lat, lng);
         var position = transfer.Transfer(lat_lng);
         console.log(position);
//          DrawIcon(google_map, lat_lng);
         FormBox(google_map, multifunction, position, lat_lng, dialogue_event);
      });

   }
   // Private member ---------------------------------------------------------
   function FormBox(google_map, multifunction, position, lat_lng, dialogue_event, map_icon) {
      var dialogue_path = multifunction.get_dialogue_path();
      $.get(dialogue_path, function(data) {
         AppendBox(data, lat_lng, dialogue_event);

      });
      function AppendBox(str_html, lat_lng, dialogue_event) {
         // remove menu and other box
//         $(".context_menu").remove();
         $(".dialogue_input_box").remove();
         var input_box;
         input_box = document.createElement("div");
         input_box.className = "dialogue_input_box";
         input_box.innerHTML = str_html;
         $(google_map.getDiv()).append(input_box);
         input_box.style.visibility = "visible";
         var box_width = $(".dialogue_input_box").width();
         var pos_x = position.x - box_width / 2 + 10;
         var pos_y = position.y ;
         $(".dialogue_input_box").css("left", pos_x);
         $(".dialogue_input_box").css("top", pos_y);
         // content
         var domain_lat = $(".dialogue_input_box").find(".latitude");
         var domain_lng = $(".dialogue_input_box").find(".longitude");
         domain_lat.text(lat_lng.k.toFixed(6));
         domain_lng.text(lat_lng.D.toFixed(6));
//         // add box button event
//         var box_event = new DialogueBoxEvent();
//         box_event.Initialize();
//         box_event.set_web_socket(web_socket);
//         box_event.set_map_icon(map_icon)
         console.log(dialogue_event);
//         dialogue_event.Unbind();
         dialogue_event.Bind();
      }
   }

}

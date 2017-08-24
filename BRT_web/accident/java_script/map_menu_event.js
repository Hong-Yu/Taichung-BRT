/**
 * Created by hong on 2014/4/12.
 */
function MenuEvent() {
    // Public member ----------------------------------------------------------
    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;

    }
    this.set_lat_lng = set_lat_lng;
    function set_lat_lng(lat_lng) {
        this.lat_lng = lat_lng;
    }
    this.set_position = set_position;
    function set_position(position) {
        this.position = position;
    }
    this.set_web_socket = set_web_socket;
    function set_web_socket(web_socket) {
        this.web_socket = web_socket;
    }

    this.Bind = Bind;
    function Bind() {
        this.BindCreateAccidentEvent(this.google_map, this.lat_lng, this.position, this.web_socket);
       this.CancelEvent(this.google_map);

    }
    this.Unbind = Unbind;
    function Unbind() {
    }
    // Private member ---------------------------------------------------------
    this.BindCreateAccidentEvent = BindCreateAccidentEvent;
    function BindCreateAccidentEvent(google_map, lat_lng, position, web_socket) {
        var domain = $("#menu1").find("div.add_accident");
        domain.click(function(element) {
            var map_icon = new MapIcon();
            SingleIcon(map_icon, google_map, lat_lng);
            InputBox(google_map, position, lat_lng, web_socket, map_icon);
        });
    }
   this.CancelEvent = CancelEvent;
   function CancelEvent(map) {
      google.maps.event.addListener(map, "mousedown", function(event){
         $(".context_menu").remove();
         $(".accident_input_box").remove();
      });

   }

    function SingleIcon(map_icon, google_map, lat_lng) {

        map_icon.set_google_map(google_map);
        map_icon.Icon(lat_lng);
    }
    function InputBox(google_map, position, lat_lng, web_socket, map_icon) {
        var map_box = new DialogueBox();
        map_box.Initialize();
        map_box.set_google_map(google_map);
        map_box.set_position(position);
        map_box.set_lat_lng(lat_lng);
        map_box.set_web_socket(web_socket);
        map_box.set_map_icon(map_icon);
        map_box.InputBox();
    }

}

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
    this.set_position = set_position;
    function set_position(position) {
        this.position = position;
    }
    this.set_lat_lng = set_lat_lng;
    function set_lat_lng(lat_lng) {
        console.log('google map latlng: ', lat_lng);
        this.box_data.latitude = lat_lng.k;
        this.box_data.longitude = lat_lng.D;
    }
    this.set_web_socket = set_web_socket;
    function set_web_socket(web_socket) {
        this.web_socket = web_socket;
    }
    this.set_map_icon = set_map_icon;
    function set_map_icon(map_icon) {
        this.map_icon = map_icon;
    }
    this.InputBox = InputBox;
    function InputBox() {
        FormBox(this.google_map, this.position, this.box_data, this.web_socket, this.map_icon);

    }
    this.DisplayBox = DisplayBox;
    function DisplayBox() {

    }
    // Private member ---------------------------------------------------------
    function FormBox(google_map, position, box_data, web_socket, map_icon) {
        $.get("accident/sub_page/dialogue_box.html", function(data) {
            AppendBox(data, box_data);

        });
        function AppendBox(str_html, box_data) {
            // remove menu and other box
            $(".context_menu").remove();
            $(".accident_input_box").remove();
            var input_box;
            input_box = document.createElement("div");
            input_box.className = "accident_input_box";
            input_box.innerHTML = str_html;
            $(google_map.getDiv()).append(input_box);
            input_box.style.visibility = "visible";
            var box_width = $(".accident_input_box").width();
            var pos_x = position.x - box_width / 2;
            var pos_y = position.y + 5;
            $(".accident_input_box").css("left", pos_x);
            $(".accident_input_box").css("top", pos_y);
            // content
            var domain_lat = $(".accident_input_box").find("p.latitude");
            var domain_lng = $(".accident_input_box").find("p.longitude");
//            console.log(domain_lat.html());
            domain_lat.text(box_data.latitude);
            domain_lng.text(box_data.longitude);
            // add box button event
            var box_event = new DialogueBoxEvent();
            box_event.Initialize();
            box_event.set_web_socket(web_socket);
            box_event.set_map_icon(map_icon)
            box_event.Unbind();
            box_event.Bind();
        }
    }

}

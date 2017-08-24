/**
 * Created by hong on 2014/4/11.
 */
function MapMenu() {
    // Public member ----------------------------------------------------------

    this.Set = Set;
    function Set(google_map, web_socket) {
        this.google_map = google_map;
        this.RightClickListener(this.google_map, web_socket);
//        this.MouseDownListener(this.google_map); // remove menu

    }
    // Private member ---------------------------------------------------------
    // step 1 Add listener for event "rightclick"
    this.RightClickListener = RightClickListener;
    function RightClickListener(map, web_socket) {
        console.log("M10 " + web_socket);
        google.maps.event.addListener(map, "rightclick", function(event){
            ShowMenu(map, event.latLng, web_socket);
        });
    }
    this.MouseDownListener = MouseDownListener;
    function MouseDownListener(map) {
        google.maps.event.addListener(map, "mousedown", function(event){
            $(".context_menu").remove();
           $(".accident_input_box").remove();
        });
    }
    // step 2 body of menu is created in ShowMenu
    function ShowMenu(map, current_position, web_socket) {
        var projection;
        var menu_dir;
        projection = map.getProjection();
        $(".context_menu").remove();
        menu_dir = document.createElement("div");
        menu_dir.className = "context_menu";
        var str_html = '<a id="menu1"><div class="add_accident">於此處建立事故<\/div><\/a>';
//        str_html += '<a id="menu2"><div class="context">取消<\/div><\/a>';
        menu_dir.innerHTML = str_html;
        $(map.getDiv()).append(menu_dir);
        setMenuXY(map, current_position);
        menu_dir.style.visibility = "visible";
        // Add menu listener here
        var menu_listener = new MenuEvent();
        menu_listener.set_google_map(map);
        menu_listener.set_web_socket(web_socket);
        menu_listener.set_lat_lng(current_position);
        var clicked_position = getCanvasXY (map, current_position);
        menu_listener.set_position(clicked_position);
        menu_listener.Bind();
//        console.log(current_position.A);

    }
    // step 3 when menu is cteated we must calculate where to display it,
    // so latlng is converted into appropriate x,y
    function getCanvasXY (map, current_position) {
        var scale = Math.pow(2, map.getZoom());
        console.log(scale);
        var nw = new google.maps.LatLng(
            map.getBounds().getNorthEast().lat(),
            map.getBounds().getSouthWest().lng()
        );
        var world_coordinate_nw = map.getProjection().fromLatLngToPoint(nw);
        var world_coordinate = map.getProjection().fromLatLngToPoint(current_position);
        var position_offset = new google.maps.Point(
            Math.floor((world_coordinate.x - world_coordinate_nw.x) * scale),
            Math.floor((world_coordinate.y - world_coordinate_nw.y) * scale)
        );
        return position_offset;
//        console.log(nw);
//        console.log(world_coordinate_nw);
    }
    // step 4 just to avoid displaying menu outside the map, X and Y coordinates are redefined if necessary
    function setMenuXY(map, current_position) {
        var map_width = $("#googleMap").width();
        var map_height = $("#googleMap").height();
        var menu_width = $(".context_menu").width();
        var menu_height = $(".context_menu").height();
        var clicked_position = getCanvasXY (map, current_position);
                console.log(clicked_position);
        var pos_x = clicked_position.x;
        var pos_y = clicked_position.y;
        // if too close to the map border, decrease position
        $(".context_menu").css("left", pos_x);
        $(".context_menu").css("top", pos_y);
//        console.log(map_width + " " + map_height + " " + menu_width + " " + menu_height);

    }

}

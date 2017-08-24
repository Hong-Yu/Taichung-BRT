/**
 * Created by hong on 2014/4/27.
 */


function CoordinateTransfer() {
   // Public member ----------------------------------------------------------
   this.set_google_map = set_google_map;
   function set_google_map(google_map) {
      this.google_map = google_map;
   }
   this.Transfer = Transfer;
   function Transfer(lat_lng) {
      return GetAdjustXY(this.google_map, lat_lng);
   }
   // Private member ---------------------------------------------------------

   function GetCanvasXY (map, current_position) {
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
   }
   // step 4 just to avoid displaying menu outside the map, X and Y coordinates are redefined if necessary
   function GetAdjustXY(map, current_position) {
      var map_width = $("#googleMap").width();
      var map_height = $("#googleMap").height();
      var menu_width = $(".context_menu").width();
      var menu_height = $(".context_menu").height();
      var clicked_position = GetCanvasXY (map, current_position);
      console.log(clicked_position);
      var pos_x = clicked_position.x;
      var pos_y = clicked_position.y;
      // if too close to the map border, decrease position
//      $(".context_menu").css("left", pos_x);
//      $(".context_menu").css("top", pos_y);
//        console.log(map_width + " " + map_height + " " + menu_width + " " + menu_height);
      var adjust_position = new Object();
      adjust_position.x = pos_x;
      adjust_position.y = pos_y;
      return adjust_position;



   }
}
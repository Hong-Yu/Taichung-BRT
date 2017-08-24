/**
 * Created by CCT on 2014/4/1.
 */
function ArrowSchema() {
   // Public member ----------------------------------------------------------
   this.schema = schema;
   function schema(center_x, center_y, color_right, color_straight, color_left, angle) {
      var schema = [];
      this.Line(center_x, center_y, color_straight, angle, schema);
      var offset_length = 0.00003;
      var offset_x = offset_length *  Math.cos(angle / 180.0 * Math.PI);
      var offset_y = offset_length *  Math.sin(angle / 180.0 * Math.PI);
//      offset_y -= 0.000001;
//      var offset_x = 0.00003;
//      var offset_y = 0.000001;
      var right_x = center_x + offset_x;
      var right_y = center_y - offset_y;
      this.RightLight(right_x, right_y, color_right, angle, schema);
      var left_x = center_x - offset_x;
      var left_y = center_y + offset_y;
      this.LeftLight(left_x, left_y, color_left, angle, schema);
      return schema;

   }
   // Private member ----------------------------------------------------------
   this.Line = Line;
   function Line(center_x, center_y, color, angle, result) {
      var length = 0.00007;
      var modify_x = length *  Math.sin(angle / 180.0 * Math.PI);
      var modify_y = length *  Math.cos(angle / 180.0 * Math.PI);
      console.log("x modify: " + modify_x)
      var y = - modify_y;
      var x = 0 - modify_x;
      // arrow
      result[0] = Arrow(center_x, center_y, color, angle);
      // line
      result[1] = StraightLine(center_x, center_y, x, y, color);
   }
   this.RightLight = RightLight;
   function RightLight(center_x, center_y, color, angle, result) {
      var length_long = 0.00007;
      var length_short = 0.000035;
      var modify_x = length_long *  Math.sin(angle / 180.0 * Math.PI);
      var modify_y = length_long *  Math.cos(angle / 180.0 * Math.PI);
      var x_long = 0 - modify_x;
      var y_long = - modify_y;
      var modify_x = length_short *  Math.sin(angle / 180.0 * Math.PI);
      var modify_y = length_short *  Math.cos(angle / 180.0 * Math.PI);
      var y_short = 0 - modify_x;
      var x_short =  modify_y;
      var arrow_x = center_x + x_short;
      var arrow_y = center_y + y_short;
      result[2] = Arrow(arrow_x, arrow_y, color, angle + 90);
//      marker.setMap(map);
      // line
      var straight_line = [];
      result[3] = StraightLine(center_x, center_y, x_long, y_long, color);
      result[4] = StraightLine(center_x, center_y, x_short, y_short, color);
//      straight_line[0].setMap(map);
//      straight_line[1].setMap(map);
   }
   this.LeftLight = LeftLight;
   function LeftLight(center_x, center_y, color, angle, result) {
      var length_long = 0.00007;
      var length_short = 0.000035;
      var modify_x = length_long *  Math.sin(angle / 180.0 * Math.PI);
      var modify_y = length_long *  Math.cos(angle / 180.0 * Math.PI);
      var x_long = 0 - modify_x;
      var y_long = - modify_y;
      var modify_x = length_short *  Math.sin(angle / 180.0 * Math.PI);
      var modify_y = length_short *  Math.cos(angle / 180.0 * Math.PI);
      var y_short = 0 + modify_x;
      var x_short =  - modify_y;
      var arrow_x = center_x + x_short;
      var arrow_y = center_y + y_short;
      result[5] = Arrow(arrow_x, arrow_y, color, angle + 270);
//      marker.setMap(map);
      // line
      var straight_line = [];
      result[6] = StraightLine(center_x, center_y, x_long, y_long, color);
      result[7] = StraightLine(center_x, center_y, x_short, y_short, color);
//      straight_line[0].setMap(map);
//      straight_line[1].setMap(map);
   }
   this.Arrow = Arrow;
   function Arrow(center_x, center_y, color, ratation) {
      var marker = new google.maps.Marker(
         {
            position: new google.maps.LatLng(center_y, center_x),
            map: map,
            icon: {
               path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
               strokeColor: color,
               scale: 4,
               rotation: ratation
            }
         });
      return  marker;
   }
   this.StraightLine = StraightLine;
   function StraightLine(center_x, center_y, x, y, color) {
      var flightPlanCoordinates = [
         new google.maps.LatLng(center_y, center_x),
         new google.maps.LatLng(center_y + y, center_x + x),
      ];
      var flightPath = new google.maps.Polyline({
         path: flightPlanCoordinates,
         geodesic: true,
         strokeColor: color,
         strokeOpacity: 1.0,
         strokeWeight: 4.0
      });
      return flightPath;
   }

}

/**
 * Created by hong on 2014/4/17.
 * Waiting Animation.
 */

function RouteMapManager() {
    // Public member ----------------------------------------------------------
//    this.RouteMap = RouteMap;
//    function RouteMap(input_data, web_socket) {
//        this.RenewRouteMap(input_data, web_socket);
//    }

   this.Waiting = Waiting;
   function Waiting() {
      this.WaitingAnimation();
   }

    // Private member ----------------------------------------------------------
//    this.RenewRouteMap = RenewRouteMap;
//    function RenewRouteMap(input_data, web_socket) {
//        var domain_route_map = $("div.route_map");
//        var sketch_map = new SketchMap();
//        var route_map = sketch_map.Append(section_number);
//        domain_route_map.empty();
//        domain_route_map.append(route_map);
//    }

   this.WaitingAnimation = WaitingAnimation;
   function WaitingAnimation() {
      var domain_route_map = $("div.route_map");
      domain_route_map.empty();
      var str_html = '<div class="waiting_message" style="padding-top:50px;text-align:center;">';
      str_html += '<p style="font-size:25px;font-weight:bold;color:#FF6600;">等待資料庫連線 請稍後 ...</p></div>';
      domain_route_map.append(str_html);
      // Add animation effect fot waiting connect message.
      function AnimateMessage() {
         var domain_message = $("div.waiting_message");
         var is_detect = true;
         domain_message.fadeToggle(700);
         if(!domain_message.length) {
            is_detect = false;
            return;
         }
         console.log(is_detect);
         setTimeout(arguments.callee, 700);
      }
      AnimateMessage();
   }


}

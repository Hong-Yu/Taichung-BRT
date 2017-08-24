/**
 * Created by hong on 2014/4/17.
 * Modified by Jia on 2014/7/20.
 * Initial Route_Select_List And Listen Change_Event of Route_Select_List.
 */

function InsertManager() {
   // Public member ----------------------------------------------------------
   this.set_input_data = set_input_data;
   function set_input_data(input_data) {
      this.input_data = input_data;
   }

   this.set_web_socket = set_web_socket;
   function set_web_socket(ws) {
      this.web_socket = ws;
   }

   this.RouteList = RouteList;
   function RouteList(input_data) {
      this.InsertRouteList(input_data);
      this.selectRoute(this.web_socket, input_data[0].id);
//      this.InsertIntName(input_data.name);
   }

   this.DrawRoute = DrawRoute;
   function DrawRoute(web_socket){
      this.DrawRouteMap(web_socket);
   }

   this.InsertRouteList = InsertRouteList;
   function InsertRouteList(route_list) {
      var domain_select = $("div.route_list").find("select");
      var option_dir;
      for (var route_index = 0; route_index < route_list.length; ++route_index) {
         var current_route = route_list[route_index];
         option_dir = document.createElement('option');
         option_dir.innerHTML = current_route.name;
         option_dir.setAttribute("mark", current_route.id);
         domain_select.append(option_dir);
//         str_html += '<option selected="selected">' + current_route.name + '</option>'
      }
//      domain_select.append(str_html);
      }

   this.selectRoute = SelectRoute;
   function SelectRoute(websocket, int_id){
      var jsondata = new Object();
      jsondata.FunctionNo = 400;
      jsondata.MsgTypeNo = 3;
      jsondata.route_id = int_id;
      var json = JSON.stringify(jsondata);
      websocket.Send(json);
   }

   this.DrawRouteMap = DrawRouteMap;
   function DrawRouteMap(websocket) {
      var domain_select_action = $("select.form-control");
      domain_select_action.bind("change", listChange);
      function listChange(event){
      var target = event.currentTarget;
      var domain_selected = $(target).find("option:selected");
      var int_id = domain_selected.attr("mark");
         SelectRoute(websocket, int_id);
      }
   }

}

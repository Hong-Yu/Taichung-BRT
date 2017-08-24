/**
 * Created by hong on 2014/4/12.
 */


function RouteWebSocket() {

   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.web_socket = new WebSocket('ws://192.168.1.2:9098');
   }
   this.set_map_manager = set_map_manager;
   function set_map_manager(map_manager) {
      this.map_manager = map_manager;
   }
   this.set_map_draw = set_map_draw;
   function set_map_draw(map_draw) {
      this.map_draw = map_draw;
   }
   this.Connect = Connect;
   function Connect() {
      this.ConnectToServer(this, this.web_socket, this.map_manager, this.map_draw);
   }
   this.Send = Send;
   function Send(json_data){
      var json_string = JSON.stringify(json_data);
      this.web_socket.send(json_string);
   }
   this.Reload = Reload;
   function Reload() {
      RequestRouteData(this.web_socket);

   }
   // Private member ---------------------------------------------------------
   this.ConnectToServer = ConnectToServer;
   function ConnectToServer(web_socket_manager, web_socket, map_manager, map_draw) {
      console.log("web socket");

      web_socket.onopen = function () {
         console.log("web socket open");
         // var request_index = 0;
         // function Request() {
            RequestRouteData(web_socket);
//            if(request_index++ == 1) return;
            // setTimeout(arguments.callee, 3000);
         // }
         // Request();
      };
      web_socket.onerror = function () {
         console.log("web socket error!");
      };
      // web_socket.onclose = function () {
         // console.log("web socket error!");
      // };
      web_socket.onmessage = function (message) {
//      console.log(message.data);
         var data = JSON.parse(message.data);
         DataAssign(data, web_socket_manager, map_manager, map_draw);
      };
   }

   function RequestRouteData(web_socket) {
      var json_data = {};
      json_data.FunctionNo = 500;
      json_data.MsgTypeNo = 1;
      var json = JSON.stringify(json_data);
      web_socket.send(json);
   }

   function DataAssign(input_data, web_socket_manager, map_manager, map_draw) {
      var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
      switch(label){
         case '500-2':
            console.log("receive 500-2");
            console.log(input_data);
            // var google_map = map_manager.get_google_map();
            // var route_info = new RouteSectionInfo();
            // route_info.set_input_data(input_data.route_section);
            // map_draw.set_route_info(route_info);
            // map_draw.BusStation(input_data.int_order);
            TravelTimeObj = {};
            TravelTimeObj = input_data;
            map_draw.TravelTimeProcess(input_data);
            break;
         default:
            console.log("Data not be assigned. "+ label);
            break;
      }
   }



}

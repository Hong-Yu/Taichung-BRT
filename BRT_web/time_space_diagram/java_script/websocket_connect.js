/**
 * Created by Jia on 2014/7/15.
 */
function TimeSpaceWebSocket() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.web_socket = new WebSocket('ws://192.168.1.2:9098');
//      this.web_socket = new WebSocket('ws://192.168.1.186:9000', "echo");
   }
//   this.set_map_manager = set_map_manager;
//   function set_map_manager(map_manager) {
//      this.map_manager = map_manager;
//   }
   this.Connect = Connect;
   function Connect() {
      this.ConnectToServer(this, this.web_socket);
   }
   this.Send = Send;
   function Send(json_data){
      var json_string = JSON.stringify(json_data);
      console.log("Send :"+ json_string);
      this.web_socket.send(json_string);
   }
   this.Reload = Reload;
   function Reload() {
//      RequestPhase(this.web_socket);
   }

   this.ConnectToServer = ConnectToServer;
   function ConnectToServer(web_socket_manager, web_socket) {
      web_socket.onopen = function () {
         console.log("web socket open");
         RequestIntersection(web_socket_manager);
      };
      web_socket.onerror = function () {
         console.log("web socket error!");
      };
      web_socket.onmessage = function (message) {
//      console.log(message.data);
         var data = JSON.parse(message.data);
         DataAssign(data, web_socket_manager);
      };
   }

   function RequestIntersection(web_socket) {
      var json_data = new Object;
      json_data.FunctionNo = 1000;
      json_data.MsgTypeNo = 1;
      web_socket.Send(json_data);
   }

   function DataAssign(input_data, web_socket) {
      var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
      switch(label){
         case '1000-2':
            console.log("socket receive : 1000-2 intersection data.");
            var map_manager = new MapManager();
            var google_map = map_manager.Initialize();
            var map_draw = new MapDraw();
            map_draw.Initialize();
            map_draw.set_google_map(google_map);
            map_draw.set_web_socket(web_socket);
            map_draw.Intersection(input_data.intersection);
            var event_manager = new EventHandle();
            event_manager.Initialize();
            event_manager.set_web_socket(web_socket);
            event_manager.dateListener();
            break;
         case '700-2':
            console.log("socket receive : 700-2 data for select list.");
            console.log(JSON.stringify(input_data));
            var event_manager = new EventHandle();
            event_manager.Initialize();
            event_manager.set_web_socket(web_socket);
            event_manager.time_select_list(input_data.seg_time);
            break;
         case '700-4':
            console.log("socket receive : 700-4 data for tsd.");
            console.log(JSON.stringify(input_data));
            var tsd_canvas = new CanvasDraw();
            tsd_canvas.Initialize();
            tsd_canvas.setCanvas(input_data.intersection, input_data.dir_phase, input_data.tsd_data, input_data.distance_data);
            break;
         default:
            console.log("Data not be assigned.");
            break;
      }
   }
}


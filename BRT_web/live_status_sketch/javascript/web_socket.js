/**
 * Created by hong on 2014/4/12.
 * Modified by Jia on 2014/7/20.
 */


function RouteWebSocket() {

   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.web_socket = new WebSocket('ws://192.168.1.2:9098');
   }
   this.Connect = Connect;
   function Connect() {
      this.ConnectToServer(this, this.web_socket);
   }
   this.Send = Send;
   function Send(json_data){
      this.web_socket.send(json_data);
   }
   this.Reload = Reload;
   function Reload() {
//      RequestRouteData(this.web_socket);
   }
   // Private member ---------------------------------------------------------
   this.ConnectToServer = ConnectToServer;
   function ConnectToServer(web_socket_manager, web_socket) {
      console.log("web socket");

      web_socket.onopen = function () {
         console.log("web socket open");
         var route_id = 1;
         RequestRouteData(web_socket, route_id);
      };
      web_socket.onerror = function () {
         console.log("web socket error!");
      };
      web_socket.onmessage = function (message) {
         var data = JSON.parse(message.data);
         DataAssign(data, web_socket_manager);
      };
   }

   function RequestRouteData(web_socket, route_id) {
      var json_data = {};
      json_data.FunctionNo = 400;
      json_data.MsgTypeNo = 1;
      json_data.route_id = route_id;
      var json = JSON.stringify(json_data);
      web_socket.send(json);
   }

   function DataAssign(input_data, web_socket_manager) {
      var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
      switch(label){
         case '400-2':
            console.log("receive 400-2");
            var routeDraw = new SketchMap();
            routeDraw.SketchInitial();
            routeDraw.set_web_socket(web_socket_manager);
            routeDraw.DrawMap(input_data);
            var event = new EventManager();
            event.set_web_socket(web_socket_manager);
            event.listenTab();
             break;
         case '400-4':
            console.log("receive 400-4");
            var routeInitial = new InsertManager();
            routeInitial.set_web_socket(web_socket_manager);
            routeInitial.RouteList(input_data.routeList);
            routeInitial.DrawRoute(web_socket_manager);
            break;
         case '400-8':
            console.log("receive 400-8 live data for map (3-1)");
            var live_data = new RenewState();
            live_data.Initialize();
            live_data.busData(input_data.status);
             break;
         case '400-0':
            console.log("receive 400-0 live light for map (4-1)");
            var live_light = new RenewLight();
            live_light.Initialize();
            // live_light.intersectionLight(input_data.lightStatus, input_data.cardData);
            live_light.intersectionLight(input_data.LightAll);
            break;
         default:
            console.log("Data not be assigned.");
            break;
      }
   }
}

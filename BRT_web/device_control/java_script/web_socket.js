

function DeviceControlWebSocket() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.web_socket = new WebSocket('ws://192.168.1.2:9098');
   }
   this.Connect = Connect;
   function Connect() {
      ConnectToServer(this, this.web_socket);
   }
   this.Send = Send;
   function Send(json_data){
      var json_string = JSON.stringify(json_data);
      this.web_socket.send(json_string);
   }
   this.Reload = Reload;
   function Reload() {

   }
   // Private member ---------------------------------------------------------
   function ConnectToServer(web_socket_manager, web_socket) {
      console.log("web socket");
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
            console.log("socket receive : 1000-2");
            var intersection = new Intersection();
            intersection.Initialize();
            intersection.set_web_socket(web_socket);
            intersection.Insert(input_data.intersection);
            intersection.Listen();
            var query = new Query();
            query.Initialize();
            query.set_web_socket(web_socket);
            query.Listen();
            break;
         case '201-2':
            break;
          case '201-8':
              console.log(JSON.stringify(input_data));
              var status = new returnStatus();
              status.downStatus(input_data);
              break;
          case '201-9':
              console.log(JSON.stringify(input_data));
              var status = new returnStatus();
              status.downStatus(input_data);
              break;
          case '202-8':
              console.log(JSON.stringify(input_data));
              var status = new returnStatus();
              status.queryStatus(input_data.key, input_data.result);
              break;
         default:
            console.log("Data not be assigned.");
            console.log(input_data);
            break;
      }
   }

}

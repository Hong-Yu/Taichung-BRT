

function WebSocketMiner() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.web_socket = new WebSocket('ws://192.168.1.2:9098');
   }
   this.Connect = Connect;
   function Connect() {
      ConnectToServer(this.web_socket);
   }
   this.Send = Send;
   function Send(json_data){
      var json_string = JSON.stringify(json_data);
       console.log("web socket send: ", json_string);
       this.web_socket.send(json_string);
   }
   this.Reload = Reload;
   function Reload() {

   }
   // Private member ---------------------------------------------------------
   function ConnectToServer(web_socket) {
      console.log("web socket");
      web_socket.onopen = function () {
         console.log("web socket open ?");
//         RequestIntersection(web_socket_manager);
      };
      web_socket.onerror = function () {
         console.log("web socket error!");
      };
      web_socket.onmessage = function (message) {
         var data = JSON.parse(message.data);
         DataAssign(data);
      };
   }


   function DataAssign(input_data) {
      var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
      switch(label){
         case 'history-response':
            console.log("socket receive : history-response");
             var json_string = JSON.stringify(input_data);
//             console.log("--", json_string);
             var table = new InformationTable();
             table.Update(input_data.purpose, input_data.history);
            break;
         default:
            console.log("Data not be assigned: ", label);
            break;
      }
   }

}

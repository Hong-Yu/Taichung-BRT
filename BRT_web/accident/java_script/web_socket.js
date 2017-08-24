/**
 * Created by hong on 2014/4/12.
 */


function AccidentWebSocket() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.web_socket = new WebSocket('ws://192.168.1.2:9098');
    }
    this.set_google_map = set_google_map;
    function set_google_map(google_map) {
        this.google_map = google_map;
    }
    this.Connect = Connect;
    function Connect() {
        this.ConnectToServer(this, this.web_socket, this.google_map);
    }
    this.Send = Send;
    function Send(json_data){
        var json_string = JSON.stringify(json_data);
        this.web_socket.send(json_string);
    }
   this.Reload = Reload;
   function Reload() {
      RequestAccdentData(this.web_socket);

   }
    // Private member ---------------------------------------------------------
    this.ConnectToServer = ConnectToServer;
    function ConnectToServer(web_socket_manager, web_socket, google_map) {
        console.log("web socket");
        web_socket.onopen = function () {
            console.log("web socket open");
            RequestAccdentData(web_socket)
        };
        web_socket.onerror = function () {
            console.log("web socket error!");
        };
        web_socket.onmessage = function (message) {
//      console.log(message.data);
            var data = JSON.parse(message.data);
            DataAssign(data, google_map, web_socket_manager);
        };
    }

    function RequestAccdentData(web_socket) {
        var json_data = {};
        json_data.FunctionNo = 'accident';
        json_data.MsgTypeNo = 'requesting';
        var json = JSON.stringify(json_data);
        web_socket.send(json);
    }

    function DataAssign(input_data, google_map, web_socket_manager) {
        var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
        switch(label){
            case 'accident-response':
                console.log(JSON.stringify(input_data));
                DrawIcon(web_socket_manager, input_data.accident, google_map);
                break;
            default:
                console.log("Data not be assigned.");
                break;
        }
    }

    function DrawIcon(web_socket_manager, input_data, google_map) {
//        console.log(google_map);
//        console.log(input_data);
        var map_icon = new MapIcon();
        map_icon.set_google_map(google_map);
        map_icon.Icons(web_socket_manager, input_data);
    }

}

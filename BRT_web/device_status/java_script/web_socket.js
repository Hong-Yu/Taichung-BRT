/**
 * Created by hong on 2014/4/12.
 */


function DeviceWebSocket() {

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
//   this.Reload = Reload;
//   function Reload() {
//       RequestDeviceData(this.web_socket);
//
//   }
    // Private member ---------------------------------------------------------
    this.ConnectToServer = ConnectToServer;
    function ConnectToServer(web_socket_manager, web_socket, map_manager, map_draw) {
        console.log("web socket");

        web_socket.onopen = function () {
            console.log("web socket open x");
            RequestDeviceData(web_socket);
            var request_index = 0;
            function RequestTimeout() {
                RequestDeviceStatus(web_socket);
                if(++request_index == 100) return;
                setTimeout(arguments.callee, 3000);
            }
            setTimeout(RequestTimeout, 1000);

        };
        web_socket.onerror = function () {
            console.log("web socket error!");
        };
        web_socket.onmessage = function (message) {
//      console.log(message.data);
            var data = JSON.parse(message.data);
            DataAssign(data, web_socket_manager, map_manager, map_draw);
        };
    }

    function RequestDeviceData(web_socket) {
        var json_data = {};
        json_data.FunctionNo = 600;
        json_data.MsgTypeNo = 1;
        var json = JSON.stringify(json_data);
        web_socket.send(json);
    }

    function RequestDeviceStatus(web_socket) {
        var json_data = {};
        json_data.FunctionNo = "device_status";
        json_data.MsgTypeNo = "requesting";
        var json = JSON.stringify(json_data);
        web_socket.send(json);
    }

    function DataAssign(input_data, web_socket_manager, map_manager, map_draw) {
        var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
        switch(label){
            case '600-2':
                console.log("receive 600-2");
//                console.log(JSON.stringify(input_data));
                map_draw.set_location_data(input_data);
                map_draw.Draw();
                break;
            case 'device_status-response':
                console.log("receive device_status-response");
                map_draw.set_status_data(input_data);
//                console.log(JSON.stringify(input_data));
                break;
            default:
                console.log("Data not be assigned.");
                break;
        }
    }



}

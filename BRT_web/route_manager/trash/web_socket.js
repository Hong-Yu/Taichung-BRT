/**
 * Created by hong on 2014/4/12.
 */


function RouteWebSocket() {

    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.web_socket = new WebSocket('ws://192.168.1.2:9098');
    }
    this.set_data_manager = set_data_manager;
    function set_data_manager(data_manager) {
        this.data_manager = data_manager;
    }
    this.Connect = Connect;
    function Connect() {
        this.ConnectToServer(this, this.web_socket, this.data_manager);
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
    function ConnectToServer(web_socket_manager, web_socket, data_manager) {
        console.log("web socket");

        web_socket.onopen = function () {
            console.log("web socket open");
//            RequestRouteData(web_socket)
        };
        web_socket.onerror = function () {
            console.log("web socket error!");
        };
        web_socket.onmessage = function (message) {
//      console.log(message.data);
            var data = JSON.parse(message.data);
            DataAssign(data, web_socket_manager, data_manager);
        };
    }

    function RequestRouteData(web_socket) {
        var json_data = {};
        json_data.FunctionNo = 300;
        json_data.MsgTypeNo = 1;
        var json = JSON.stringify(json_data);
        var send_index = 0;
        var interval = setInterval(function(){
            web_socket.send(json);
            if(++send_index == 1) {
                clearInterval(interval);
            }
        },1);
    }

    function DataAssign(input_data, web_socket_manager, data_manager) {
        var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
        switch(label){
            case '300-2':
                console.log("receive 300-2");
                console.log(JSON.stringify(input_data));
                data_manager.set_input_data(input_data);
                data_manager.RouteMap();
                break;
            default:
                console.log("Data not be assigned.");
                break;
        }
    }



}

/**
 * Created by hong on 2014/11/3.
 */
angular.module('MyApp').factory('WebSocketService', ['$q', '$rootScope', function($q, $rootScope){
    // We return this  object to anything injecting out service
    var service = {};
    // Create out websocket object with the address to the websocket
    var ws = new WebSocket('ws://192.168.1.2:9098');

    ws.onopen = function() {
        console.log("Socket has been opened!");
        function DataRequest() {
            RequestDeviceStatus(ws);
            setTimeout(arguments.callee, 1000);
        }
        DataRequest();

    };

    ws.onmessage = function(message) {
        Listener(message);
    };

    function Listener(message) {
//        console.log("Received data from websocket: ", data.data);
        var data = JSON.parse(message.data);
        service.status = data.status;
        service.receive_time = data.receive_time;
        console.log(service.receive_time);
    }

    return service;
}]);

function RequestDeviceStatus(web_socket) {
    var json_data = {};
    json_data.FunctionNo = "device_status";
    json_data.MsgTypeNo = "requesting";
    var json = JSON.stringify(json_data);
    web_socket.send(json);
}
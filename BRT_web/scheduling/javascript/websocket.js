/**
 * Created by Jia on 2014/10/31.
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
    function Send(data){
        var json_data = JSON.stringify(data);
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
            request_intersection(web_socket);
            running_schedule(web_socket);
            IntersectionsMethod.SetWs(web_socket);
            // ScheduleMethod.SetWs(web_socket);
        };
        web_socket.onerror = function () {
            console.log("web socket error!");
        };
        web_socket.onmessage = function (message) {
            var data = JSON.parse(message.data);
            DataAssign(data, web_socket_manager);
        };
    }

    function running_schedule(web_socket){
        var request = {};
        request.FunctionNo = 'scheduling';
        request.MsgTypeNo = 'query';
        var json_data = JSON.stringify(request);
        web_socket.send(json_data);
    }

    function request_intersection(web_socket){
        var request = {};
        request.FunctionNo = 1000;
        request.MsgTypeNo = 1;
        var json_data = JSON.stringify(request);
        web_socket.send(json_data);
    }

    function DataAssign(input_data, web_socket_manager) {
        var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
        switch(label){
            case '1000-2':
                console.log("receive 1000-2");
                IntersectionsMethod.Setter(input_data.intersection);
                break;
            case 'scheduling-schedules':
                console.log(input_data);
                var sched = new Schedules();
                sched.show_sched(input_data.Schedules);
                ScheduleMethod.Setter(input_data.Schedules);
                ScheduleMethod.SetWs(web_socket_manager);
                break;
            default:
                console.log("Data not be assigned. @scheduling");
                break;
        }
    }
}
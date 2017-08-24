function LiveWebSocket() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.web_socket = new WebSocket('ws://192.168.1.2:9098');
    }
    this.set_map_manager = set_map_manager;
    function set_map_manager(map_manager) {
        this.map_manager = map_manager;
    }
    this.set_class_set = set_class_set;
    function set_class_set(class_set) {
        this.class_set = class_set;
    }
    this.Connect = Connect;
    function Connect() {
        ConnectToServer(this, this.web_socket, this.map_manager, this.class_set);
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
    function ConnectToServer(web_socket_manager, web_socket, map_manager, class_set) {
        console.log("web socket");
        web_socket.onopen = function () {
            console.log("web socket open");
            RequestIntersection(web_socket_manager);
            RequestLightStatus(web_socket_manager, map_manager.get_center());
            RequesBusStatus(web_socket_manager);
        };
        web_socket.onerror = function () {
            console.log("web socket error!");
        };
        web_socket.onmessage = function (message) {
//      console.log(message.data);
            var data = JSON.parse(message.data);
            DataAssign(data, web_socket_manager, map_manager, class_set);
        };
    }

    function RequestIntersection(web_socket) {
        var json_data = new Object;
        json_data.FunctionNo = 1000;
        json_data.MsgTypeNo = 1;
        web_socket.Send(json_data);
    }

    function RequestLightStatus(web_socket, map_center) {
        var json_data = new Object;
        json_data.FunctionNo = "light_status";
        json_data.MsgTypeNo = "requesting";
        json_data.map_center = map_center;
        web_socket.Send(json_data);
    }

    function RequesBusStatus(web_socket) {
        var json_data = new Object;
        json_data.FunctionNo = "bus_status";
        json_data.MsgTypeNo = "requesting";
        web_socket.Send(json_data);
    }

    function DataAssign(input_data, web_socket, map_manager, class_set) {
        var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
        switch(label){
            case '1000-2':
                console.log("socket receive : 1000-2");
                var google_map = map_manager.get_google_map();
                var map_draw = new MapIntersection();
                map_draw.Initialize();
                map_draw.set_google_map(google_map);
                map_draw.set_web_socket(web_socket);
                map_draw.Intersection(input_data.intersection);
//            intersection.Insert(input_data.intersection);
                break;
            case 'live_status-response':
                console.log("socket receive : live_status-response");
                console.log(JSON.stringify(input_data));
                var information_table = new InformationTable();
                information_table.Insert(input_data.status);

                break;
            case 'light_status-response':
                console.log("socket receive : light_status-response");
//              console.log(JSON.stringify(input_data));
                class_set[0].LightStatus(input_data.info);
//                class_set[0].Show();
                break;
            case 'bus_status-response':
                console.log("socket receive : bus_status-response");
//                console.log(JSON.stringify(input_data));
                class_set[1].UpdateStatus(input_data.Contents);
                break;
            default:
                console.log("Data not be assigned.");
                break;
        }
    }

}


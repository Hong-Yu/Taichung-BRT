/**
 * Created by CCT on 2014/2/11.
 */
//var calendar_data = new Object();
function TimePlanWebSocket() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.web_socket = new WebSocket('ws://192.168.1.2:9098');
//      this.web_socket = new WebSocket('ws://192.168.1.186:9000', "echo");
    }
    this.Connect = Connect;
    function Connect() {
        this.ConnectToServer(this, this.web_socket);
    }
    this.Send = Send;
    function Send(json_data){
        var json_string = JSON.stringify(json_data);
//      console.log("Send :"+ json_string);
        this.web_socket.send(json_string);
    }
    this.Reload = Reload;
    function Reload() {
//      RequestRouteData(this.web_socket);
    }
    this.set_muti_class = set_muti_class;
    function set_muti_class(muti_class) {
        this.muti_class = muti_class;
        TimePlanWebSocket.muti_class = muti_class;
    }
    // Private member ---------------------------------------------------------
    this.ConnectToServer = ConnectToServer;
    function ConnectToServer(web_socket_manager, web_socket) {
        console.log("web socket");
        web_socket.onopen = function () {
            console.log("web socket open");
            RequestIntersection(web_socket);
//         RequestPlanData(web_socket_manager);
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
        var json = JSON.stringify(json_data);
        web_socket.send(json);
    }
    function RequestPlanData(web_socket) {
        var json_data = {};
        json_data.FunctionNo = 1;
        json_data.MsgTypeNo = 0;
        json_data.equip_id = 0000;
        web_socket.Send(json_data);
    }
    function DataAssign(input_data, web_socket) {
        DataAssign.animate_progress_bar = DataAssign.animate_progress_bar || new AnimateProgressBar();
        var progress_bar = DataAssign.animate_progress_bar;
        var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
        switch(label){
            case '1000-2':
                console.log("socket receive : 1000-2");
                var intersection = new Intersection();
                intersection.Initialize();
                intersection.set_web_socket(web_socket);
                intersection.Insert(input_data.intersection);
                intersection.Listen();
                break;
            case '1-1':
                console.log("socket receive : 1-1");
                console.log("Segment type: ", JSON.stringify(input_data.day_segtype));
                DataProcess(web_socket, input_data);
                break;
            case '0F-80':
                console.log("socket receive : v3 protocol 0F-80");
                progress_bar.Touch(input_data, 'success');
                break;
            case '0F-81':
                console.log("socket receive : v3 protocol 0F-81");
                progress_bar.Touch(input_data, 'error');
                break;
            case '99-1':
                console.log("receive: " + label);
                progress_bar.Reset(input_data.Total_V3);
                break;
            default:
                console.log("Data not be assigned.", label);
                break;
        }
    }
    function DataProcess(websocket, data) {
        var muti_class = TimePlanWebSocket.muti_class;
        if (typeof DataProcess.is_first_run === "undefined") DataProcess.is_first_run = true;
        console.log("Data process" + DataProcess.is_first_run);
        muti_class.segment_type_conjunct.set_segment_type_data(data.day_segtype.result[0]);
        var segment_type_data = data.day_segtype.result[0];
        var paint_segment_type = new PaintSegmentType();
        paint_segment_type.Initialize(segment_type_data);
        paint_segment_type.Show();
        paint_segment_type.Paint();
        var segment_type_event = new SegmentTypeEvent();
        segment_type_event.Listen();
        var insert_action = new InsertAction();
        insert_action.set_tod_data(data.tod_plan.result);
        insert_action.set_standard_data(data.std_plan.result);
        insert_action.set_priority_data(data.priority_control.result);
        insert_action.set_phase_list(data.phase.result);
        segment_type_event.set_plan_inserter(insert_action);
        var upload_action = new UploadAction();
        upload_action.set_segment_type_conjunct(muti_class.segment_type_conjunct);
        upload_action.set_websocket(websocket);
        upload_action.Listen();
        if (DataProcess.is_first_run) {
            var time_section = new TimeSectionEdit();
            time_section.Add();
            time_section.Delete();
        }
        DataProcess.is_first_run = false;
    }



}






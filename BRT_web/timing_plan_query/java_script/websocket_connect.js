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
      console.log("Send :"+ json_string);
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
        };
        web_socket.onerror = function () {
            console.log("web socket error!");
        };
        web_socket.onmessage = function (message) {
     // console.log(message.data);
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
            case 'result-segtype':
                $('#progress_seg').attr('style', 'width: 100%');
                console.log('receive segtype result');
                console.log(JSON.stringify(input_data.result_seg));
                $('.progress').hide();
                $('#progress_seg').attr('style', 'width: 0%');
                PaintSegType(input_data.result_seg.result[0], web_socket);
                break;
            case 'progress-segtype':
            if(input_data.seg !== 81){
                var seg = input_data.seg;
                // console.log(seg);
                var width = seg*4 +20;
                $('#progress_seg').attr('style', 'width: '+width+'%');
            }
                break;
            case 'result-todplan':
                console.log('receive todplan result');
                console.log(JSON.stringify(input_data));
                PrintTodData(input_data, web_socket);
                break;
            case 'ready-stddata':
                console.log('std data are ready. request now');
                RequestBack(input_data, web_socket);
                break;
            case 'ready-todplan':
                console.log('todplan data are ready. request now');
                RequestBack(input_data, web_socket);
                break;
            case 'ready-controldata':
                console.log('priority control data are ready. request now');
                RequestBack(input_data, web_socket);
                break;
            case 'result-stdplan':
                console.log('receive stdplan result');
                console.log(JSON.stringify(input_data));
                $('#progress_plan').attr('style', 'width: 80%');
                CollectPlan(input_data, web_socket);
                break;
            case 'result-priorityplan':
                console.log('receive priorityplan result');
                console.log(JSON.stringify(input_data));
                $('#progress_plan').attr('style', 'width: 70%');
                CollectPlan(input_data, web_socket);
                break;
            case 'result-phase':
                console.log('receive phase result');
                console.log(JSON.stringify(input_data));
                $('#progress_plan').attr('style', 'width: 90%');
                CollectPlan(input_data, web_socket);
                break;
            default:
                console.log("Data not be assigned.", label);
                break;
        }
    }
    function PaintSegType (input_data, web_socket) {
        if(input_data !=='NoData'){
        $('#table_calendar').show();
        $('.segment_type').show();
        var muti_class = TimePlanWebSocket.muti_class;
        muti_class.segment_type_conjunct.set_segment_type_data(input_data);
        var paint_segment_type = new PaintSegmentType();
        paint_segment_type.Initialize(input_data);
        paint_segment_type.Show();
        paint_segment_type.Paint();
        var segment_type_event = new SegmentTypeEvent();
        segment_type_event.Listen(web_socket);
        }else{
            var calendar = new Calendar();
               calendar.Initialize();
               $('#status_for_db').show();
               $('.segment_type').hide();
               $('#status_for_db').append('<strong>查詢的路口未有資料在資料庫</strong>');
        }
    }
    function PrintTodData (input_data, web_socket){
        $('#plan_table').empty();
        $('#timer_plan').show();
        var insert_action = new InsertAction();
        insert_action.Insert(input_data, web_socket);
    }
    function RequestBack(input_data, web_socket){
        // $('#progress_plan').attr('style', 'width: '+width+'%');
        var request_data={};
        request_data.FunctionNo = 'request';
        request_data.MsgTypeNo = input_data.MsgTypeNo;
        request_data.LCN = input_data.LCN;
        switch (input_data.MsgTypeNo){
            case 'stddata':
                request_data.plan_id = input_data.plan_id;
                request_data.phase_no = input_data.phase_no;
                $('#progress_plan').attr('style', 'width: 60%');
                break;
            case 'controldata':
                request_data.priority_id = input_data.priority_id;
                $('#progress_plan').attr('style', 'width: 40%');
                break;
            case 'todplan':
                request_data.SegmentType = input_data.seg;
                // $('#progress_plan').attr('style', 'width: 40%');
                break;
            default :
                console.log('request undefined.');
                break;
        }
        web_socket.Send(request_data);
    }
    function CollectPlan(input_data, web_socket){
        // $('#progress_plan').attr('style', 'width: '+width+'%');
        StdPlanMethod.setter(input_data.MsgTypeNo, input_data[input_data.MsgTypeNo][0]);
        var data = StdPlanMethod.getter();
        // console.log(data);
        if(data.hasOwnProperty('stdplan') && data.hasOwnProperty('priorityplan') && data.hasOwnProperty('phase')){
            console.log(data);
            var insert_action = new InsertAction();
            insert_action.InsertTable(data, web_socket);
            StdPlanBySegMethod.setter(data.phase.plan_id, data);
            console.log(StdPlanBySeg);
        }
    }
}






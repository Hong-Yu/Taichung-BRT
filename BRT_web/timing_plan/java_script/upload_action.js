/**
 * Created by CCT on 2014/2/19.
 */
function UploadAction() {
    // Public member ----------------------------------------------------------
    // temp routine until segment manager finish.
    this.set_segment_type_conjunct = set_segment_type_conjunct;
    function set_segment_type_conjunct(segment_type_conjunct) {
        this.segment_type_conjunct = segment_type_conjunct;
    }
    this.set_websocket = set_websocket;
    function set_websocket(web_socket) {
        this.web_socket = web_socket;
    }
    this.Listen = Listen;
    function Listen() {
        var domain_upload_database = $("button.timing_plan_upload[destination='database']");
        var domain_upload_tc = $("button.timing_plan_upload[destination='tc']");
        domain_upload_database.unbind('click');
        domain_upload_tc.unbind('click');
        ListenUploadButton(this.web_socket, this.segment_type_conjunct, 'database');
        ListenUploadButton(this.web_socket, this.segment_type_conjunct, 'tc');
    }
    // Private member ---------------------------------------------------------
    function ListenUploadButton(web_socket, segment_type_conjunct, destinaion) {
        console.log("Upload listener ready.");
        if (destinaion == 'database')
            var domain_button = $("button.timing_plan_upload[destination='database']");
        else if (destinaion == 'tc')
            var domain_button = $("button.timing_plan_upload[destination='tc']");

//       var destination = domain_button.attr('destination');

        domain_button.click(function(){
            console.log("Upload ---------- : ");
            var upload_data = new TimingPlanUploadTransfer();
            upload_data.set_segment_type_conjunct(segment_type_conjunct);
            var json_data = upload_data.Package();
            // Disable button to prevent user multiple clicks.
            domain_button.attr('disabled', 'disabled');
            if (destinaion == 'database') {
                Waiting(10, '更新時制計畫至資料庫');
                json_data.FunctionNo = 'timing_plan';
                json_data.MsgTypeNo = 'upload_to_database';
            } else if (destinaion == 'tc') {
                Waiting(10, '下傳至控制器');
            }
            SentTo(json_data, web_socket);

//          Waiting(10, '下傳至控制器');
            function Waiting(interval, express) {
                if (typeof Waiting.timer === 'undefined') {
                    Waiting.timer = interval;
                    Waiting.express = express;
                } else if (Waiting.timer <= 0) {
                    domain_button.removeAttr('disabled');
                    domain_button.text(Waiting.express);
                    Waiting.timer = interval;
                    return;
                }
                domain_button.text("傳輸中請稍後 .. ("+ Waiting.timer +")");
                Waiting.timer--;
                setTimeout(arguments.callee, 1000);
            }
        });
    }

    function SentTo(json, web_socket) {
        web_socket.Send(json);
    }



}








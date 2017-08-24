/**
 * Created by CCT on 2014/5/29.
 */
var route =  require('./route.js');
route.Initialize();
var intersection_getter =  require('./intersection.js');
intersection_getter.Initialize();
var history =  require('./history.js');
var priority_expression =  require('./priority_expression.js');
priority_expression.Initialize();


module.exports = {
    Initialize: function() {
        this.index_table = [];
        this.status = [];
        this.live_light = [];
        this.live_state = [];
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
        route.set_connector(this.con_db);
        route.Select();
        intersection_getter.set_connector(this.con_db);
        intersection_getter.Select(this.index_table, this.status);
        history.set_connector(this.con_db);
    },
    set_sql_generator: function (sql_generator) {
        this.sql_generator = sql_generator;
    },
    UpdateStatus: function(input_data) {
        var intersection_index = this.index_table.indexOf(input_data.LCN);
        // console.log("status update " + intersection_index);
        history.Update(input_data, this.status[intersection_index]);
        UpdateStatus(input_data, this.status[intersection_index]);

    },
    SendStatus: function (web_socket, intersection_id) {
        // Handle different user
        console.log("timer " + web_socket.status_timer);
        if (typeof web_socket.status_timer !== "undefined") {
            console.log("trigger not undefined");
            clearTimeout(web_socket.status_timer);
        }
        var data_manage = this.data_manage;
        // Handle different intersection
        var intersection_set = route.get_intersection_order(intersection_id);
        var status = [];
        for (var status_index = 0; status_index < 3; ++status_index) {
            var intersection_id = intersection_set[status_index];
            var intersection_index = this.index_table.indexOf(intersection_id);
            if (typeof intersection_index !== "undefined" ) {
                status[status_index] = this.status[intersection_index];
            } else {
//                status[status_index] = CreateStatusStructure();
            }
        }
        function CycleStatus() {
//         console.log(web_socket.readyState);
            if(web_socket.readyState == 3) return; // stop when disconnect.
            SendStatus(status, web_socket);
            web_socket.status_timer = setTimeout(arguments.callee, 1000);
        }
        CycleStatus();

    }

};

function UpdateStatus(input_data, status) {
    if (typeof input_data.Strategy !== "undefined") {
        var direction_index = input_data.DIR;
//        status.priority_strategy[direction_index] = input_data.Strategy;
        status.priority_strategy[direction_index] = StrategyDelay(status.priority_strategy[direction_index],
            input_data.Strategy, status.phase_step[0], input_data.stepID);
        status.phase_step[0] = input_data.stepID;
        status.countdown[0] = input_data.stepsec;
        status.car_id[direction_index] = input_data.BRTID;
        status.arrival_time_estimate[direction_index] = input_data.PAtime;
        var receive_time = "" + input_data.HOUR + ":" + input_data.MIN + ":" + input_data.SEC + "";
        var point_index = input_data.Point;
        status.receive_time_p[direction_index][point_index] = receive_time;
    }
    status.priority_status_live = priority_expression.LiveStatus(input_data.ONOff);
//    if (typeof input_data.ONOff !== "undefined") {
//        status.priority_status = input_data.ONOff;
//    }
    // Receive time
    status.receive_time = GetCurrentTime();

}

function SendStatus(status, web_socket) {
    var light_info= new Object();
    light_info.FunctionNo = 105;
    light_info.MsgTypeNo = 1;
    light_info.status = status;
    var json_data = JSON.stringify(light_info);
    web_socket.send(json_data);

}

function GetCurrentTime(){
    var d = new Date();
    var output = d.getFullYear() +'-'+     Makeup(d.getMonth() + 1) +'-';
    output += Makeup(d.getDate()) +" "+    Makeup(d.getHours()) +":";
    output+=  Makeup(d.getMinutes()) +":"+ Makeup(d.getSeconds());
    return output;
    function Makeup(value) {
        var value = (value < 10 ? '0' : '') + value;
        return value;
    }
}

function StrategyDelay(source, destination, phase_step_old, phase_step_new) {
    if (destination == 0 && phase_step_old == phase_step_new)
      return source;
    return destination;

}

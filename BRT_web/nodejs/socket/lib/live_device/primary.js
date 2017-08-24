var async = require('async');

var intersection_data = require("./intersection.js");
var time_reservoir = require("./reservoir_time.js");
var status_reservoir = require("./reservoir_status.js");

module.exports = {
    Initialize: function(ms_connector) {
        this.intersections = [];
        this.intersection_index_table = [];
        Initialize(ms_connector, this.intersections, this.intersection_index_table);

    },
    UpdateStatus: function(input_data) {
        time_reservoir.Update(input_data);
    },
    SendStatus: function(web_socket) {
//        function CycleLight() {
//            if(web_socket.readyState == 3) return; // stop when disconnect.
//            SendToWebsite(web_socket);
//            setTimeout(arguments.callee, 3000);
//        }
//        CycleLight();
        SendToWebsite(web_socket);

    }
};

function Initialize(ms_connector, intersections, index_table) {
    async.series([
        function(callback) {
            //1. Get intersection data.
            intersection_data.Initialize(ms_connector, intersections, index_table, callback);
        },
        function(callback) {
            //2. Build time reservoir.
            time_reservoir.Initialize(index_table, callback);
        },
        function(callback) {
            //3. Build status reservoir.
            status_reservoir.Initialize(index_table, callback);
        },
        function(callback) {
            console.log('intersection length: ', intersections.length);
            Show(intersections, index_table);
            callback(null, 'show complete.');
        }
    ],
        function(err, result) {
//            console.log("Traffic light -- data process -- Error-array :", err);
            console.log("Device status -- primary task :", result);
        }
    );

}

function Show(input_data, index_table) {
    for (var row_index = 0; row_index < input_data.length; ++row_index) {
        console.log('index: ', row_index, ' id: ', index_table[row_index]);
        console.log(input_data[row_index]);
        if (row_index > 0) break;
    }
}


function SendToWebsite(web_socket) {
    var light_info= new Object();
    light_info.FunctionNo = "device_status";
    light_info.MsgTypeNo = "response";
    light_info.MsgTime = GetCurrentTime();
    light_info.status = status_reservoir.get_data();
    light_info.receive_time = time_reservoir.get_data();
//    console.log("Send device_status-response " + GetCurrentTime());
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
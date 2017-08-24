/**
 * Created by hong on 2014/11/7.
 */
var async = require('async');

var intersection =  require('./intersection.js');
var route =  require('./route.js');
var data_processing =  require('./data_processing.js');
var history = require('./history.js');
var bus_arrival = require('./bus_arrival.js');

module.exports = {
    Initialize: function() {
        this.index_table = [];
        this.status_data = [];
        InitializeProcess(this.index_table, this.status_data);
    },
    UpdateStatus: function(input_data) {
        var intersection_index = this.index_table.indexOf(input_data.LCN);
        data_processing.Update(input_data, this.status_data[intersection_index]);
        history.Update(input_data, this.status_data[intersection_index]);
    },
    UpdateBusArrivalTime: function(input_data) {
        bus_arrival.Update(input_data, this.status_data)
    },

    SendStatus: function (web_socket, intersection_id) {
        // Handle different user
        console.log("timer " + web_socket.status_timer);
        if (typeof web_socket.status_timer !== "undefined") {
            console.log("trigger not undefined");
            clearTimeout(web_socket.status_timer);
        }
        // Handle different intersection
        var intersection_set = route.get_intersection_set(intersection_id);
        var status = [];
        for (var status_index = 0; status_index < 3; ++status_index) {
            var intersection_id = intersection_set[status_index];
            var intersection_index = this.index_table.indexOf(intersection_id);
            if (typeof intersection_index !== "undefined" ) {
                status[status_index] = this.status_data[intersection_index];
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

function InitializeProcess(index_table, status_data) {
    async.parallel([
        function(callback) {
            intersection.Initialize(index_table, status_data, callback);
        },
        function(callback) {
            route.Initialize(callback);
        }
    ],
        function(err, result) {
            console.log("live-status intersection index table", JSON.stringify(index_table));

            console.log("Live status -- initialize process: ", result);
        }
    );
}

function SendStatus(status, web_socket) {
    var light_info= new Object();
    light_info.FunctionNo = 'live_status';
    light_info.MsgTypeNo = 'response';
    light_info.status = status;
    var json_data = JSON.stringify(light_info);
    web_socket.send(json_data);

}

//{"FunctionNo":3,"MsgTypeNo":1,"MsgTime":"2014-11-24 11:40:38","immediate":{"resu
//    lt":[{"LCN":2008,"stepID":0,"stepsec":31,"Condition":0,"Strategy":0,"BRTID":"000
//    000000000","RouteID":"00000000","RoadID":"000000000000","DIR":0,"Point":7,"HOUR"
//:0,"MIN":0,"SEC":0,"TSPType":0,"PAtime":0,"PD":0,"Speed":0}]}}
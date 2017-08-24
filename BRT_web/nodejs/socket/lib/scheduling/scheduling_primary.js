/**
 * Created by Jia on 2014/11/3.
 */
var schedule = require('node-schedule');
module.exports = {
    Initialize: function(scheduling_obj) {
        this.scheduling_obj = {};
        this.scheduling_obj = scheduling_obj;
        this.OBJ = {};
    },
    New: function(result, scheduling_name) {
        console.log(JSON.stringify(result));
        create_nodeschedule(scheduling_name, result, this.OBJ);
        this.scheduling_obj.new_schedule(scheduling_name, result);
    },
    Query: function(ws) {
        var schedulesdata = this.scheduling_obj.get_schedule();
        SendToWeb(ws, schedulesdata);
    },
    Delete: function(name, ws) {
        delete_nodeschedule(name, ws, this.OBJ);
        this.scheduling_obj.delete_schedule(name);
    }
};

function create_nodeschedule(name, result, OBJ) {
        try {
    var time_split = result.length;
    OBJ[name] = [];
    for (var t = 0; t < time_split; ++t) {
        var rule = new schedule.RecurrenceRule();
        var time = result[t].time_begin;
        var duration = result[t].interval_min;
        var H = parseInt(time.slice(0, 2));
        var M = parseInt(time.slice(3, 5));
        rule.hour = H;
        rule.minute = M;
        new_(rule, t, duration, result[t].scheduling);
    }

    function new_(rule, t, duration, sche_array) {
            OBJ[name][t] = schedule.scheduleJob(rule, function() {
                var sche_num = sche_array.length;
                for (var i = 0; i < sche_num; ++i) {
                    var send_data = {};
                    send_data.FunctionNo = 'BF';
                    send_data.MsgTypeNo = '11';
                    send_data.LCN = sche_array[i].intersection_id;
                    send_data.Time = duration;
                    send_data.OnOff = sche_array[i].checked;
                    var jsondata = JSON.stringify(send_data);
                    console.log(rule.hour + ":" + rule.minute + " " + jsondata);
                    SendToTC(jsondata);
                }
            });
    }
        } catch (e) {
            console.log(e + ' @scheduling_primary.js');
        }

    console.log(OBJ);
}

function delete_nodeschedule(name, websocket, OBJ) {
    // console.log(OBJ);
    if (OBJ.hasOwnProperty(name)) {
        delete OBJ[name];
    } else {
        console.log('cannot find property and delete it by name: ' + name);
    }
}


function SendToTC(input_data) {
    var dgram = require('dgram');
    var message = new Buffer(input_data);
    var client = dgram.createSocket('udp4');
    var host = "192.168.1.41";
    var port = 10002;
    client.send(message, 0, message.length, port, host, function(err, bytes) {
        console.log(message);
        console.log(err, bytes);
        client.close();
    });
}

function SendToWeb(websocket, schedulesdata) {
    console.log(schedulesdata);
    var resultdata = {};
    resultdata.FunctionNo = 'scheduling';
    resultdata.MsgTypeNo = 'schedules';
    resultdata.Schedules = schedulesdata;
    var json = JSON.stringify(resultdata);
    websocket.send(json);
}
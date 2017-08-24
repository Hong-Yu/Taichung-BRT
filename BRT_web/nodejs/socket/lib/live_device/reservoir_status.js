/**
 * Created by hong on 2014/9/18.
 */
var time_reservoir = require("./reservoir_time.js");

module.exports = {
    Initialize: function(index_table, callback) {
        this.device_status = [];
        this.index_table = index_table;
        Initailize(index_table, this.device_status, callback);
    },
    get_data: function() {
        StatusReflesh(this.index_table, time_reservoir.get_data(), this.device_status);
        return this.device_status;

    }
}

function Initailize(index_table, device_time_diff, callback) {
    for(var intersection_index = 0; intersection_index < index_table.length; ++intersection_index) {
        var intersection_id = index_table[intersection_index];
        var status = 'disconnect';
        var content = new Object();
        var sub_contect = [status, status, status, status];
        content.intersection_id  = intersection_id;
        content.tc  = status;
        content.src  = sub_contect;
        content.gps  = status;
        content.ipc  = status;
        device_time_diff[intersection_index] = content;
    }
    callback(null, 'status reservoir initializing is complete')
}

function StatusReflesh(index_table, time_data, status_data) {
    for(var intersection_index = 0; intersection_index < index_table.length; ++intersection_index) {
        var intersection_id = index_table[intersection_index];
        var current_status_data = status_data[intersection_index];
        var current_time_data = time_data[intersection_index];
//        if (intersection_id == 2021) console.log('raw :', current_time_data);
        var diff_time_data = DiffTime(current_time_data);
//        if (intersection_id == 2021) console.log('modify :', diff_time_data);
        current_status_data.tc  = AlgorithmTC(diff_time_data);
        current_status_data.src  = AlgorithmSRC(diff_time_data);
        current_status_data.gps  = AlgorithmGPS(diff_time_data);
        current_status_data.ipc  = AlgorithmIPC(diff_time_data);
    }
}

function DiffTime(input_data) {
    var diff_time_data = new Object();
    diff_time_data.src = [];
    var current_time = new Date();
    diff_time_data.tc = current_time - input_data.tc;
    diff_time_data.src[0] = current_time - input_data.src[0];
    diff_time_data.src[1] = current_time - input_data.src[1];
    diff_time_data.src[2] = current_time - input_data.src[2];
    diff_time_data.src[3] = current_time - input_data.src[3];
    diff_time_data.gps = current_time - input_data.gps;
    diff_time_data.ipc = current_time - input_data.ipc;
    return diff_time_data;
}

function AlgorithmTC(input_data) {
    if (input_data.tc > 300000) return 'disconnect';
    return 'connect';
}

function AlgorithmSRC(input_data) {
    var src_state = ['disconnect', 'disconnect', 'disconnect', 'disconnect'];
    if (input_data.tc > 300000) return src_state;
    for (var src_index = 0; src_index < src_state.length; src_index++) {
        if (input_data.src[src_index] < 300000)  src_state[src_index] = 'connect';
    }
    return src_state;
}

function AlgorithmGPS(input_data) {
    if (input_data.tc > 300000) return 'disconnect';
    if (input_data.gps > 300000) return 'disconnect';
    return 'connect';
}

function AlgorithmIPC(input_data) {
    if (input_data.tc > 300000) return 'disconnect';
    if (input_data.ipc > 300000) return 'disconnect';
    return 'connect';
}

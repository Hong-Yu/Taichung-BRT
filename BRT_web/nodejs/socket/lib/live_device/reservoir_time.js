/**
 * Created by hong on 2014/9/17.
 */


module.exports = {
    Initialize: function(index_table, callback) {
        this.device_time_diff = [];
        this.index_table = index_table;
        Initailize(index_table, this.device_time_diff, callback);
    },
    Update: function(input_data) {
        Update(this.index_table, input_data, this.device_time_diff);
    },
    get_data: function() {
        return this.device_time_diff;
    }
}

function Initailize(index_table, device_time_diff, callback) {
    for(var intersection_index = 0; intersection_index < index_table.length; ++intersection_index) {
        var intersection_id = index_table[intersection_index];
        var time_out = 100;
        var content = new Object();
        var sub_contect = [time_out, time_out, time_out, time_out];
        content.intersection_id  = intersection_id;
        content.tc  = time_out;
        content.src  = sub_contect;
        content.gps  = time_out;
        content.ipc  = time_out;
//        if (intersection_id == 2021)  content.tc  = 5;
        device_time_diff[intersection_index] = content;
    }
    callback(null, 'time reservoir initializing is complete')
}

function Update(index_table, input_data, device_time_diff) {
    var intersection_index = index_table.indexOf(input_data.LCN);
    var destination_data = device_time_diff[intersection_index];
    var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
    switch(label){
        case '0F-04':
//            console.log("update tc :" + label);
            destination_data.tc = CurrentDate();
            break;
        case 'BF-00':
            if (input_data.SRC1 == 0) destination_data.src[0] = CurrentDate();
            if (input_data.SRC2 == 0) destination_data.src[1] = CurrentDate();
            if (input_data.SRC3 == 0) destination_data.src[2] = CurrentDate();
            if (input_data.SRC4 == 0) destination_data.src[3] = CurrentDate();
            destination_data.ipc = CurrentDate();
            break;
        case 'FF-02':
            destination_data.gps = CurrentDate();
        default:
            console.log("Data not be assigned :" + label);
            break;
    }
//    console.log("Update data: ", impoundment.information[intersection_index]);
    function CurrentDate() {
        return new Date();
    }
}


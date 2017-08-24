
var sql_generator =  require('../sql_generator.js');

//var timing_plan_select = require('./select.js');
//var update_center = require('./update_center.js');

module.exports = {
    Initialize: function() {
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    SelectData: function(command, web_socket) {
        PurposeAssign(this.con_db, command, web_socket);
    }
};

function PurposeAssign(con_db, command, web_socket) {
    var purpose = command.purpose;
//    var time_start = command.start.replace(/-/g, '');
//    var time_end = command.end.replace(/-/g, '');
    var time_start = command.start;
    var time_end = command.end;
    switch(purpose) {
        case 'priority_operate':
            var table_name = "history_priority";
            var column_name = ["user_name", "equip_id", "seg_type", "begin_time", "priority_switch", "operated_date"];
            var time = ["operated_date"];
            break;
        case 'priority_strategy':
            var table_name = "history_strategy";
            var column_name = ["equip_id", "dir", "strategy", "create_time"];
            var time = ["create_time"];
            break;
        case 'trigger_point':
            var table_name = "history_trigger_point";
            var column_name = ["equip_id", "dir", "plate_number", "point", "create_time"];
            var time = ["create_time"];
            break;
        default:
            console.log('history purpose not found.');
            return;
    }
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += "WHERE "+ time +" BETWEEN '"+ time_start +"' AND '"+ time_end +"';";
    console.log(cmd_sql);
    SendToWebsite.web_socket = web_socket;
    ExecuteWithResult(con_db, cmd_sql, purpose, SendToWebsite);
    // "command":{"purpose":"trigger_point","start":"2014-08-01","end":"2014-08-30"}}
//         var function_names = ["priority_operate", "priority_strategy", "trigger_point"];


}

function ExecuteWithResult(con_db, cmd_sql, purpose, callback) {
    var query = con_db.query(cmd_sql);
    query.exec( function( err, res ){
        if( err ){
            console.log('select error: ');
            console.log(err);
            return;
        }else{
//            console.log("Select result: ", JSON.stringify(res));
            callback(purpose, res);
        }
    });
}

function SendToWebsite(purpose, input_data) {
    var web_socket = SendToWebsite.web_socket;
    var output_data = new Object();
    output_data.FunctionNo = "history";
    output_data.MsgTypeNo = "response";
    output_data.purpose = purpose;
    if (purpose == 'priority_operate') {
        PriorityStatement(input_data.result);
        TimedateToString(input_data.result, 'operated_date');
    }
    if (purpose == 'priority_strategy') {
        StrategyStatement(input_data.result);
        DirectionStatement(input_data.result);
        TimedateToString(input_data.result, 'create_time');
    }
    if (purpose == 'trigger_point') {
        DirectionStatement(input_data.result);
        TimedateToString(input_data.result, 'create_time');
    }
    output_data.history = input_data.result;
//         console.log(result);
    var json_string = JSON.stringify(output_data);
    web_socket.send(json_string);
}

function DirectionStatement(input_data) {
    var statements = ['靜宜大學', '火車站'];
    for(var row_index = 0; row_index < input_data.length; ++row_index) {
        var current_row = input_data[row_index];
        current_row.dir = statements[current_row.dir];
    }
}

function PriorityStatement(input_data) {
    var statements = ['定時關閉', "定時開啟"];
    for(var row_index = 0; row_index < input_data.length; ++row_index) {
        var current_row = input_data[row_index];
        current_row.priority_switch = statements[current_row.priority_switch];
    }
}

function StrategyStatement(input_data) {
    var statements = ['--------', '綠燈延長', "綠燈延長"];
    for(var row_index = 0; row_index < input_data.length; ++row_index) {
        var current_row = input_data[row_index];
        current_row.strategy = statements[current_row.strategy];
    }
}

function TimedateToString(input_data, column_name) {
    for(var row_index = 0; row_index < input_data.length; ++row_index) {
        var current_row = input_data[row_index];
        current_row[column_name] = current_row[column_name].toLocaleString();
    }
}

//toDateString();

//case 0:
//priority_strategy = "--------";
//break;
//case 1:
//priority_strategy = "綠燈延長";
//break;
//case 2:
//priority_strategy = "綠燈延長";
//break;

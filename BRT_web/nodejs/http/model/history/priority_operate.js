/**
 * Created by hong on 2014/11/11.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Select : function(input_data, response) {
        SelectProcess(input_data, response);
    }
}

function SelectProcess(input_data, response) {
    var send_data = {};
    async.waterfall([
        function(callback) {
            PriorityOperateSelect(input_data, callback);
        },
        function(arg1, callback) {
            send_data = arg1.result;
            PriorityStatement(send_data);
            response.end(JSON.stringify({ successful: true, data: send_data }));
            callback(null, 'complete.');
        }
    ],
        function(err, result) {
            console.log("priority operated -- select process: ", result);
        }
    );
}

function PriorityOperateSelect(input_data, callback) {
    var table_name = "history_priority";
    var column_name = ["user_name", "equip_id", "seg_type", "begin_time", "priority_switch", "operated_date"];
    var time = ["operated_date"];
    var cmd_sql = "";
    cmd_sql += sql_generator.SelectTop(table_name, column_name, 500);
    cmd_sql += "WHERE "+ time +" BETWEEN '"+ input_data.time_start +"' AND '"+ input_data.time_end +"';";

    sql_generator.ExecuteCallbackResult("Select intersection ", ms_connector, cmd_sql, callback);
}

function PriorityStatement(input_data) {
    var statements = ['定時關閉', "定時開啟"];
    for(var row_index = 0; row_index < input_data.length; ++row_index) {
        var current_row = input_data[row_index];
        current_row.priority_switch = statements[current_row.priority_switch];
    }
}
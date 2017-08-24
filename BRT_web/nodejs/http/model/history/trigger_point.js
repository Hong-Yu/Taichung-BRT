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
            TriggerPointSelect(input_data, callback);
        },
        function(arg1, callback) {
            send_data = arg1.result;
            DirectionStatement(send_data);
            response.end(JSON.stringify({ successful: true, data: send_data }));
            callback(null, 'complete.');
        }
    ],
        function(err, result) {
            console.log("trigger point -- select process: ", result);
        }
    );
}

function TriggerPointSelect(input_data, callback) {
    var table_name = "history_trigger_point";
    var column_name = ["equip_id", "dir", "plate_number", "point", "create_time"];
    var time = ["create_time"];
    var cmd_sql = "";
    cmd_sql += sql_generator.SelectTop(table_name, column_name, 500);
    cmd_sql += "WHERE "+ time +" BETWEEN '"+ input_data.time_start +"' AND '"+ input_data.time_end +"';";
    sql_generator.ExecuteCallbackResult("Select intersection ", ms_connector, cmd_sql, callback);
}

function DirectionStatement(input_data) {
    var statements = ['靜宜大學', '火車站'];
    for(var row_index = 0; row_index < input_data.length; ++row_index) {
        var current_row = input_data[row_index];
        current_row.dir = statements[current_row.dir];
    }
}
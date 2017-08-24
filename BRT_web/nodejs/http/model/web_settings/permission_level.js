/**
 * Created by hong on 2014/12/16.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Select : function(input_data, response) {
        SelectProcess(input_data, response);
    },
    DefaultValue : function(input_data, response) {
        DefaultValueProcess(input_data, response);
    }
};

function DefaultValueProcess(input_data, response) {
    var table_name = 'permission_level';
    var column_name = ['level', "accident", "account_manager", 'brt_performance',
        'device_control', 'device_manager', 'device_status', 'device_status_table',
        'history', 'intersection_info', 'live_status', 'live_status_sketch',
        'phase_lighting', 'phase_modify', 'route_manager', 'scheduling', 'time_space_diagram', 'timing_plan', 'timing_plan_query'];
    var column_type = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1];
    var cmd_sql = "truncate table "+ table_name +' ';
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, DefaultData(100, column_name));
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, DefaultData(10, column_name));
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, DefaultData(1, column_name));
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, DefaultData(0, column_name));
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);
    sql_generator.ExecuteResponse("create device ", ms_connector, cmd_sql, response);
    function DefaultData(level, column_name) {
        var default_data = {};
        var default_value = (level <= 1 ? 0 : 1 );
        for (var col_index = 0; col_index < column_name.length; ++col_index) {
            default_data[column_name[col_index]] = default_value;
        }
        default_data.level = level;
        return default_data;
    }
}


function SelectProcess(input_data, response) {
    async.waterfall([
        function(callback) {
            PermissionLevelSelect(input_data, callback);
        },
        function(arg1, callback) {
            response.end(JSON.stringify({ successful: true, data: arg1.result }));
            callback(null, 'complete.');
        }
    ],
        function(err, result) {
            console.log("permission level -- select process: ", result);
        }
    );
}

function PermissionLevelSelect(input_data, callback) {
    var table_name = "permission_level";
    var column_name = ['level', "accident", "account_manager", 'brt_performance',
        'device_control', 'device_manager', 'device_status', 'device_status_table',
        'history', 'intersection_info', 'live_status', 'live_status_sketch',
        'phase_lighting', 'phase_modify', 'route_manager', 'scheduling', 'time_space_diagram', 'timing_plan', 'timing_plan_query'];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    sql_generator.ExecuteCallbackResult("Select permission level ", ms_connector, cmd_sql, callback);
}


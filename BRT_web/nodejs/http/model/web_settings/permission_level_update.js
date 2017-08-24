/**
 * Created by hong on 2014/12/17.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Update : function(input_data, response) {
        UpdateProcess(input_data, response);
    }
};

function UpdateProcess(input_data, response) {
    var cmd_sql = "";
    cmd_sql += UpdateSql(input_data[1]);
    cmd_sql += UpdateSql(input_data[2]);
    cmd_sql += UpdateSql(input_data[3]);

//    for (var data_index = 0; data_index < input_data.length; ++data_index) {
//        cmd_sql += UpdateSql(input_data[data_index]);
//
//    }
    console.log(cmd_sql);
    sql_generator.ExecuteResponse("Update permission level ", ms_connector, cmd_sql, response);
}

function UpdateSql(input_data) {
    var table_name = 'permission_level';
    var column_name = ['level', "accident", "account_manager", 'brt_performance',
        'device_control', 'device_manager', 'device_status', 'device_status_table',
        'history', 'intersection_info', 'live_status', 'live_status_sketch',
        'phase_lighting', 'phase_modify', 'route_manager', 'scheduling', 'time_space_diagram', 'timing_plan', 'timing_plan_query'];
    var column_type = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0];
    var cmd_sql = "";
    cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
    var primary_key = ["level"];
    var primary_type = [1];
    cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
    cmd_sql += sql_generator.End();
    return cmd_sql;

}
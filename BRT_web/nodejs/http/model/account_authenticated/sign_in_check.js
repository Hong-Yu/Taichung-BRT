/**
 * Created by hong on 2014/12/16.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Check : function(input_data, response) {
        AuthenticatedProcess(input_data, response);
    }
};

function AuthenticatedProcess11(input_data, response) {
    // 1. Select user account
    var table_name = "user_account";
    var column_name = ["email", "password"];
    var column_type = [0, 0];
    var cmd_sql = "";
    cmd_sql += "SELECT ID, level FROM " + table_name + " ";
    cmd_sql += sql_generator.Where(column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
//    cmd_sql += "WHERE email =" + input_data.email + " AND password =" + input_data.password + ";";
    console.log(cmd_sql);
    ExecuteWithResult(ms_connector, response, "user_account");
    function ExecuteWithResult(connector, response, mark) {
        var query = connector.query(cmd_sql);
        query.exec( function( err, res ){
            if(err){
                console.log('select error: ', mark);
                console.log(err);
                return;
            }else{
                console.log(res);
                var isAuthenticated = false;
                if (res.rowcount == 1) isAuthenticated = true;
                response.json({ isAuthenticated: isAuthenticated, account:res.result[0] });
            }
        });
    }
}

function AuthenticatedProcess(input_data, response) {
    async.waterfall([
        function(callback) {
            UserAccountSelect(input_data, callback);
        },
        function(arg1, callback) {
//            console.log('row count: ', arg1.rowcount);
            if (arg1.rowcount == 1) {
                PermissionLevelSelect(arg1.result[0], response);
            } else {
                response.end(JSON.stringify({ successful: false, data: {} }));
            }
            callback(null, 'complete.');
        }
    ],
        function(err, result) {
            console.log("permission level -- select process: ", result);
        }
    );
}

function UserAccountSelect(input_data, callback) {
    // 1. Select user account
    var table_name = "user_account";
    var column_name = ["email", "password"];
    var column_type = [0, 0];
    var cmd_sql = "";
    cmd_sql += "SELECT ID, level FROM " + table_name + " ";
    cmd_sql += sql_generator.Where(column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    sql_generator.ExecuteCallbackResult("Select user account ", ms_connector, cmd_sql, callback);
}

function PermissionLevelSelect(input_data, response) {
    var table_name = "permission_level";
    var column_name = ['level', "accident", "account_manager", 'brt_performance',
        'device_control', 'device_manager', 'device_status', 'device_status_table',
        'history', 'intersection_info', 'live_status', 'live_status_sketch',
        'phase_lighting', 'phase_modify', 'route_manager', 'scheduling', 'time_space_diagram', 'timing_plan', 'timing_plan_query'];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    var primary_key = ["level"];
    var primary_type = [1];
    cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);

    sql_generator.ExecuteResponse("Select permission level ", ms_connector, cmd_sql, response);
}


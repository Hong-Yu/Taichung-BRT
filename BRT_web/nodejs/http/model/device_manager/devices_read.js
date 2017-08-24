/**
 * Created by hong on 2014/12/6.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Do : function(input_data, response) {
        ReadProcess(input_data, response);
    }
}

function ReadProcess(input_data, response) {
    async.parallel([
        function(callback) {
            var table_name = "intersection";
            var column_name = ["intersection_id", "name", "latitude", "longitude"];
            var cmd_sql = "";
            cmd_sql += sql_generator.Select(table_name, column_name);
            cmd_sql += "WHERE longitude is not null AND latitude is not null;";
            sql_generator.ExecuteCallbackResult("select " + table_name, ms_connector, cmd_sql, callback);
        },
        function(callback) {
            // 1. Select tc device
            var table_name = "device_tc";
            var column_name = ["ID", "intersection_id", "latitude", "longitude"];
            var cmd_sql = "";
            cmd_sql += sql_generator.Select(table_name, column_name);
            sql_generator.ExecuteCallbackResult("select " + table_name, ms_connector, cmd_sql, callback);

        },
        function(callback) {
            // 2. Select DSRC device
            var table_name = "device_dsrc";
            var column_name = ["ID", "intersection_id", "latitude", "longitude"];
            var cmd_sql = "";
            cmd_sql += sql_generator.Select(table_name, column_name);
            sql_generator.ExecuteCallbackResult("select " + table_name, ms_connector, cmd_sql, callback);

        },
        function(callback) {
            var table_name = "device_gps";
            var column_name = ["ID", "intersection_id", "latitude", "longitude"];
            var cmd_sql = "";
            cmd_sql += sql_generator.Select(table_name, column_name);
            sql_generator.ExecuteCallbackResult("select " + table_name, ms_connector, cmd_sql, callback);

        },
        function(callback) {
            // 4. Select IPC  device
            var table_name = "device_ipc";
            var column_name = ["ID", "intersection_id", "latitude", "longitude"];
            var cmd_sql = "";
            cmd_sql += sql_generator.Select(table_name, column_name);
            sql_generator.ExecuteCallbackResult("select " + table_name, ms_connector, cmd_sql, callback);

        }
    ],
        //optional callback
        function(err, result) {
            if (typeof err === 'undefined') {
                var result_data = {};
                result_data.intersection = result[0].result;
                result_data.tc = result[1].result;
                result_data.dsrc = result[2].result;
                result_data.gps = result[3].result;
                result_data.ipc = result[4].result;
                response.end(JSON.stringify({ successful: true, data: result_data }));
            } else {
                response.end(JSON.stringify({ successful: false, data: err }));
            }
            console.log("Error-array :", err);
//            console.log("Result-array :", result);
        }
    );
}
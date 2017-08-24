/**
 * Created by hong on 2014/12/6.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Do : function(input_data, response) {
        DeleteProcess(input_data, response);
    }
}

function DeleteProcess(input_data, response) {
    async.series([
        function(callback) {
            DeleteDependenceDevice(input_data, callback);
        },
//        function(callback) {
//            CreateDependenceDevice(con_db, sql_generator, input_data, callback);
//        },
        function(callback) {
            DeleteIntersection(input_data, callback);
        }
    ],
        //optional callback
        function(err, result) {
            response.end(JSON.stringify({ successful: true, data: {} }));
            console.log("Error-array :", err);
            console.log("Result-array :", result);
        }
    );
}

function DeleteDependenceDevice(input_data, callback) {
    var DeivceControl = {
        Delete: function(table_name, callback) {
            var column_name = ["intersection_id"];
            var column_type = [1];
            var cmd_sql = "";
            cmd_sql += sql_generator.Delete(table_name);
            cmd_sql += sql_generator.Where(column_name, column_type, input_data);
            cmd_sql += sql_generator.End();
            console.log(cmd_sql);
            sql_generator.ExecuteCallbackResult("Delete devices ", ms_connector, cmd_sql, callback);
        }
    }
    async.map(["device_tc", "device_dsrc", "device_gps", "device_ipc"], DeivceControl.Delete, function(err, result) {
        console.log("Error map:", err);
        console.log("Result map:", result);
        callback(null, 'device delete complete');

    });
}

function DeleteIntersection(input_data, callback) {
    var table_name = "intersection";
    var column_name = ["intersection_id"];
    var column_type = [1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Delete(table_name);
    cmd_sql += sql_generator.Where(column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    sql_generator.ExecuteCallbackResult("Delete devices ", ms_connector, cmd_sql, callback);
}
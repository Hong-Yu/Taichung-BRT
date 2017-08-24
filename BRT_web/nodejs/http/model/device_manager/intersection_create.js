/**
 * Created by hong on 2014/12/6.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Do : function(input_data, response) {
        CreateProcess(input_data, response);
    }
};

function CreateProcess(input_data, response) {
    async.series([
        function(callback) {
            CreateIntersection(input_data, callback);
        },
        function(callback) {
            CreateDependenceDevice(input_data, callback);
        }
    ],
        //optional callback
        function(err, result) {
            if (typeof err === 'undefined')
                response.end(JSON.stringify({ successful: true, data: result }));
            else
                response.end(JSON.stringify({ successful: false, data: err }));
//            console.log("Error-array :", err);
//            console.log("Result-array :", result);
        }
    );
}

function CreateDependenceDevice(input_data, callback) {
    var DeviceControl = {
        Insert: function(parameter, callback) {
            var table_name = parameter.table_name;
            var offset = parameter.offset;
            var insert_data = new Object();
            insert_data.intersection_id = input_data.intersection_id;
            insert_data.latitude = input_data.latitude;
            insert_data.longitude = parseFloat(input_data.longitude) + offset;
            console.log("offset: ", offset);
            var column_name = ["latitude", "longitude", "intersection_id"];
            var column_type = [1, 1, 1];
            var cmd_sql = "";
            cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, insert_data);
            cmd_sql += sql_generator.End();
            console.log(cmd_sql);
            sql_generator.ExecuteCallbackResult("Insert " + table_name, ms_connector, cmd_sql, callback);
        }
    }
    async.map(
        [{"table_name":"device_tc", "offset":0.0006},
            {"table_name":"device_dsrc", "offset":0.0012},
            {"table_name":"device_gps", "offset":0.0018},
            {"table_name":"device_ipc", "offset":0.0024}], DeviceControl.Insert, function(err, result) {
            console.log("Error map:", err);
            console.log("Result map:", result);
            callback(null, 'device create complete');

        });

}

function CreateIntersection(input_data, callback) {
    var table_name = "intersection";
    var column_name = ["intersection_id", "name", "latitude", "longitude"];
    var column_type = [1, 0, 1, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    sql_generator.ExecuteCallbackResult("Create intersection ", ms_connector, cmd_sql, callback);
}


//function DeleteDependenceDevice(input_data, callback) {
//    var DeivceControl = {
//        Delete: function(table_name, callback) {
//            var column_name = ["intersection_id"];
//            var column_type = [1];
//            var cmd_sql = "";
//            cmd_sql += sql_generator.Delete(table_name);
//            cmd_sql += sql_generator.Where(column_name, column_type, input_data);
//            cmd_sql += sql_generator.End();
//            console.log(cmd_sql);
//            sql_generator.ExecuteCallbackResult("Delete devices ", ms_connector, cmd_sql, callback);
//        }
//    }
//    async.map(["device_tc", "device_dsrc", "device_gps", "device_ipc"], DeivceControl.Delete, function(err, result) {
//        console.log("Error map:", err);
//        console.log("Result map:", result);
//        callback(null, 'device delete complete');
//
//    });
//}

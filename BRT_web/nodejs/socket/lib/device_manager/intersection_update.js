/**
 * Created by hong on 2014/7/18.
 */
var sql_generator =  require('../sql_generator.js');
var async = require('async');

module.exports = {
    Initialize: function() {
        this.sql_generator = sql_generator;
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    Update: function (input_data) {
        Update(this.con_db, this.sql_generator, input_data);
    }
};

function Update(con_db, sql_generator, input_data) {
    async.series([
        function(callback) {
            DeleteDependenceDevice(con_db, sql_generator, input_data, callback);
        },
        function(callback) {
            CreateDependenceDevice(con_db, sql_generator, input_data, callback);
        },
        function(callback) {
            UpdateIntersection(con_db, sql_generator, input_data, callback);
        }
    ],
        //optional callback
        function(err, result) {
            console.log("Error-array :", err);
            console.log("Result-array :", result);
        }
    );

}

function DeleteDependenceDevice(con_db, sql_generator, input_data, callback) {
    var DeivceControl = {
        Delete: function(table_name, callback) {
            var column_name = ["intersection_id"];
            var column_type = [1];
            var cmd_sql = "";
            cmd_sql += sql_generator.Delete(table_name);
            cmd_sql += sql_generator.Where(column_name, column_type, input_data);
            cmd_sql += sql_generator.End();
            console.log(cmd_sql);
            sql_generator.ExecuteCallback("Delete " + table_name, con_db, cmd_sql, callback);
        }
    }
    async.map(["device_tc", "device_dsrc", "device_gps", "device_ipc"], DeivceControl.Delete, function(err, result) {
        console.log("Error map:", err);
        console.log("Result map:", result);
        callback(null, 'device delete complete');

    });
}

function CreateDependenceDevice(con_db, sql_generator, input_data, callback) {
    var DeivceControl = {
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
            sql_generator.ExecuteCallback("Insert " + table_name, con_db, cmd_sql, callback);
        }
    }
    async.map(
        [{"table_name":"device_tc", "offset":0.0006},
        {"table_name":"device_dsrc", "offset":0.0012},
        {"table_name":"device_gps", "offset":0.0018},
        {"table_name":"device_ipc", "offset":0.0024}], DeivceControl.Insert, function(err, result) {
        console.log("Error map:", err);
        console.log("Result map:", result);
        callback(null, 'device create complete');

    });

}

function UpdateIntersection(con_db, sql_generator, input_data, callback) {
    var table_name = "intersection";
    var column_name = ["latitude", "longitude"];
    var column_type = [1, 1];
    var primary_key = ["intersection_id"];
    var primary_type = [1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
    cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
    console.log(cmd_sql);
    sql_generator.ExecuteCallback("update intersection " + table_name, con_db, cmd_sql, callback);

}



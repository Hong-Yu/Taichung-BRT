/**
 * Created by hong on 2014/9/2.
 */
var async = require('async');

var sql_generator =  require('../sql_generator.js');

module.exports = {
    Initialize: function() {
        Array.prototype.clone = function(destination) {
            for (var col_index = 0; col_index < destination.length; ++col_index) {
                this[col_index] = destination[col_index];
            }
        };
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    Build: function(con_db, intersections, intersection_index_table, callback) {
//        console.log("Build traffic light data ...");
        Build(con_db, intersections, intersection_index_table, callback);
    }
};

function Build(con_db, intersections, intersection_index_table, callback) {
    async.series([
        function(callback) {
            //1. Select table to know how many intersection should build.
            SelectIntersectionIndex(con_db, intersection_index_table, callback);
        },
        function(callback) {
            // 2. Select traffic light information, position, rotation etc..
            CreateIntersectionCard(con_db, intersection_index_table, intersections, callback);
        }
    ],
        function(err, result) {
//            console.log("Traffic light -- Error-array :", err);
            console.log("Traffic light -- build -- result array :", result);
            callback(null, 'data initialize complete');
        }
    );
}

function SelectIntersectionIndex(con_db, intersection_index_table, callback) {
    var table_name = "traffic_light";
//    var column_name = ["intersection_id"];
    var cmd_sql = "SELECT DISTINCT intersection_id FROM "+ table_name + " ;";
    ConstructIntersectionIndex.callback = callback;
    ConstructIntersectionIndex.intersection_index_table = intersection_index_table;
    ExecuteWithResult(con_db, cmd_sql, ConstructIntersectionIndex, "Traffic light.");
}

function ConstructIntersectionIndex(input_data) {
    for (var col_index = 0; col_index < input_data.length; ++col_index) {
        var intersection_id = input_data[col_index].intersection_id;
        ConstructIntersectionIndex.intersection_index_table[col_index] = intersection_id;
    }
    ConstructIntersectionIndex.callback(null, 'Intersection index table has been built');
}

function CreateIntersectionCard(con_db, intersection_index_table, intersections, callback) {
    var intersection_index = 0;
    var TrafficLight = {
        Select: function(intersection_id, callback) {
//            var query = con_db.query("Select id, longitude, latitude, intersection_id, card_id, traffic_type, rotation from traffic_light");
            var input_data = new Object();
            input_data.intersection_id = intersection_id;
            var table_name = "traffic_light";
            var column_name = ["card_id", "longitude", "latitude", "rotation"];
            var primary_key = ["intersection_id"];
            var primary_type = [1];
            var cmd_sql = "";
            cmd_sql += sql_generator.Select(table_name, column_name);
            cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
            cmd_sql += sql_generator.End();
            var type = "Traffic-light select";
            var query = con_db.query(cmd_sql);
            query.exec( function( err, res ){
                if( err ){
                    console.log(type + ' error');
                    console.log(err);
                }else{
//                    intersections[intersection_index++] = CompleteLightStructure(res.result);
                    callback(null, CompleteLightStructure(res.result));
                }
            });

        }
    }
    async.map(intersection_index_table, TrafficLight.Select, function(err, result) {
//        console.log("Traffic light -- Error map:", err);
        intersections.clone(result);
        console.log("Traffic light -- Result map:", intersections.length);

        callback(null, 'card information complete');
    });
}

function CompleteLightStructure(source_data) {
    for (var row_index = 0; row_index < source_data.length; ++row_index) {
//        source_data[row_index].is_used = false;
        source_data[row_index].light = -1;
        source_data[row_index].detail = "999";
        source_data[row_index].card_detail = "99999999"
        // Modify rotation angle
        source_data[row_index].rotation += 180;
        if (source_data[row_index].rotation > 360) source_data[row_index].rotation -= 360;
    }
    return source_data;
}

function ExecuteWithResult(con_db, cmd_sql, callback, mark) {
    var query = con_db.query(cmd_sql);
    query.exec( function( err, res ){
        if( err ){
            console.log('select error: ', mark);
            console.log(err);
            return;
        }else{
            callback(res.result);
        }
    });
}
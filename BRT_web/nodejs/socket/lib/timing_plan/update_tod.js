/**
 * Created by hong on 2014/8/5.
 */
var async = require('async');


module.exports = {
    Initialize: function() {
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    set_sql_generator: function (sql_generator) {
        this.sql_generator = sql_generator;
    },
    Update: function(user_name, input_data) {
        console.log("tod table -- update start: ", input_data.length);
        var con_db = this.con_db;
        var sql_generator = this.sql_generator;
        async.series([
            function(callback) {
                UpdateHistory(con_db, sql_generator, input_data, user_name, callback);
            },
            function(callback) {
                UpdateTod(con_db, sql_generator, input_data);
                callback(null, 'Tod table update start.');
            }
        ],
            function(err, result) {
                console.log("Error-array :", err);
                console.log("Result-array :", result);
            }
        );

    }
}

//StdUpdateAssign(con_db, sql_generator, input_data)
function UpdateHistory(con_db, sql_generator, input_data, user_name, callback) {
    var History = {
        Insert: function(input_data, callback) {
            var table_name = get_table_name();
            var column_name = ["begin_time"];
            var primary_key = ["equip_id", "seg_type", "begin_time", "priority_switch"];
            var primary_type = [1, 1, 0, 1];
            var cmd_sql = "";
            cmd_sql += sql_generator.Select(table_name, column_name);
            cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
            cmd_sql += sql_generator.End();
            var type = "Tod select";
            var query = con_db.query(cmd_sql);
            query.exec( function( err, res ){
                if( err ){
                    console.log(type + ' error');
                    console.log(err);
                }else{
                    console.log(type + ' success');
                    var row_count = res.rowcount;
                    switch (row_count) {
                        case 0:
                            input_data.user_name = user_name;
                            HistoryInsert(con_db, sql_generator, input_data, callback);
                            break;
                        case 1:
//                            console.log("Tod history: avoid");
                            callback(null, 'Tod history avoid');
                            break;
                        default:
                            callback(null, 'Tod history undefined');
                            console.log("tod update: row count is undefined: ", res);
                            break;
                    }
                }
            });

        }
    }
    async.map(input_data, History.Insert, function(err, result) {
        console.log("Error map:", err);
        console.log("Result map:", result);
        callback(null, 'Tod history finish.');

    });

}

function HistoryInsert(con_db, sql_generator, input_data, callback) {
    var table_name = "history_priority";
    var column_name = ["user_name", "equip_id", "seg_type", "begin_time", "priority_switch"];
    var column_type = [0, 1, 1, 0, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
    sql_generator.ExecuteCallback("Tod History insert ", con_db, cmd_sql, callback);
}

function get_table_name() {
    return "tod_plan";
}

function UpdateTod(con_db, sql_generator, input_data) {
    async.series([
        function(callback) {
            DeleteTodTable(con_db, sql_generator, input_data, callback);
        },
        function(callback) {
            for (var row_index = 0; row_index < input_data.length; ++row_index) {
                InsertTodTable(con_db, sql_generator, input_data[row_index]);
            }
            callback(null, 'tod insert start.');
        }
    ],
        function(err, result) {
            console.log("Error-array :", err);
            console.log("Result-array :", result);
        }
    );
}

function DeleteTodTable(con_db, sql_generator, input_data, callback) {
    var table_name = "tod_plan";
    var column_name = ["equip_id", "seg_type"];
    var column_type = [1, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Delete(table_name);
    cmd_sql += sql_generator.Where(column_name, column_type, input_data[0]);
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);
    sql_generator.ExecuteCallback("Delete tod table" + table_name, con_db, cmd_sql, callback);

}

function InsertTodTable(con_db, sql_generator, input_data) {
    var table_name = "tod_plan";
    var column_name = ["equip_id", "seg_type", "begin_time", "plan_id", "priority_id", "car_countdown", "ped_countdown", "priority_switch"];
    var column_type = [1, 1, 0, 1, 1, 1, 1, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
//    console.log(cmd_sql);
    sql_generator.Execute("Insert " + table_name, con_db, cmd_sql);

}



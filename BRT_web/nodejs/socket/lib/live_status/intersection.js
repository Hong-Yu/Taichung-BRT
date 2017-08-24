/**
 * Created by hong on 2014/11/7.
 */
var async = require('async');

var mssql = require('../mssql_connector.js');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../sql_generator.js');

module.exports = {
    Initialize: function(index_table, status_data, callback) {
        SelectProcess(index_table, status_data, callback);
    }
};

function SelectProcess(index_table, status_data, callback) {
    async.waterfall([
        function(callback) {
            SelectData(callback)
        },
        function(arg1, callback) {
            CreateIndexTable(arg1.result, index_table, callback);
        },
        function(arg1, callback) {
            CreateStatusData(arg1, status_data, callback);
        }
    ],
        function(err, result) {
//            console.log("Live status -- intersection -- initialize process: ", result);
//            console.log("live-status intersection index table", JSON.stringify(index_table));
            callback(null, 'intersection ready');
        }
    );
}

function SelectData(callback) {
    var table_name = "intersection";
    var column_name = ["intersection_id", "name", "latitude", "longitude"];
//    var column_name = ["intersection_id", "name"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += "WHERE longitude is not null AND latitude is not null;";
    sql_generator.ExecuteCallbackResult("Select intersection ", ms_connector, cmd_sql, callback);
}

function CreateIndexTable(input_data, index_table, callback) {
    for (var intersection_index = 0; intersection_index < input_data.length; ++intersection_index) {
        index_table[intersection_index] = input_data[intersection_index].intersection_id;
    }
    callback(null, input_data);
}

function CreateStatusData(input_data, status_data, callback) {
    for (var section_index = 0; section_index < input_data.length; ++section_index) {
        status_data[section_index] = new Structure(input_data[section_index].latitude, input_data[section_index].longitude);
        status_data[section_index].name = input_data[section_index].name;
    }
    callback(null, status_data);
    function Structure(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.receive_time = "00:00:00";
        this.priority_status_live = "initial";
        this.priority_strategy_live = [-1, -1];
        this.priority_strategy_history = [-1, -1];
        this.priority_strategy_count = [0, 0];
        this.phase_step = [0, 0];
        this.phase = [0, 0];
        this.countdown = [0, 0];
        this.car_id = ["000000000000", "000000000000"];
        this.bus_arrival_number = ["-----", "-----"];
        this.bus_arrival_time = ["--:--", "--:--"];
        this.bus_arrival_station = ["--:--", "--:--"];
        this.receive_time_p = [["--:--", "--:--", "--:--", "--:--", "--:--", "--:--", "--:--"],
            ["--:--", "--:--", "--:--", "--:--", "--:--", "--:--", "--:--"]];
        this.receive_bus_p = [["--:--", "--:--", "--:--", "--:--", "--:--", "--:--", "--:--"],
            ["--:--", "--:--", "--:--", "--:--", "--:--", "--:--", "--:--"]];
    }
}
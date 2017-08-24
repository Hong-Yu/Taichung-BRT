/**
 * Created by hong on 2014/11/7.
 */
var async = require('async');

var mssql = require('../mssql_connector.js');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../sql_generator.js');

module.exports = {
    Initialize: function(callback) {
        this.intersection_order = [];
        SelectProcess(this.intersection_order, callback);
    },
    get_intersection_set: function(intersection_id) {
        var current_intersection_index = this.intersection_order.indexOf(intersection_id);
        var intersection_set = [];
        intersection_set[0] = this.intersection_order[current_intersection_index -1];
        intersection_set[1] = this.intersection_order[current_intersection_index];
        intersection_set[2] = this.intersection_order[current_intersection_index +1];
        console.log('intersection set: ', intersection_set);
        if (typeof intersection_set[0] === 'undefined')  intersection_set[0] = this.intersection_order[current_intersection_index];
        if (typeof intersection_set[2] === 'undefined')  intersection_set[2] = this.intersection_order[current_intersection_index];

        return intersection_set;
    }

};

function SelectProcess(intersection_order, callback) {
    async.waterfall([
        function(callback) {
            SelectData(callback)
        },
        function(arg1, callback) {
            CreateIntersectionOrder(arg1.result, intersection_order, callback);
        }
    ],
        function(err, result) {
//            console.log("Live status -- intersection -- initialize process: ", result);
//            console.log("live-status intersection index table", JSON.stringify(index_table));
            callback(null, 'route ready');
        }
    );
}

function SelectData(callback) {
    var table_name = "route_intersection";
    var column_name = ["ID", "serial_number", "route_id", "intersection_id"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += ' WHERE route_id = 1 ';
    cmd_sql += ' ORDER BY serial_number;';
    sql_generator.ExecuteCallbackResult("Select intersection ", ms_connector, cmd_sql, callback);
}

function CreateIntersectionOrder(input_data, intersection_order, callback) {
    for (var route_index = 0; route_index < input_data.length; route_index++) {
        intersection_order[route_index] = input_data[route_index].intersection_id;
    }
    callback(null, input_data);
}
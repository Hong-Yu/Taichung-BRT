/**
 * Created by hong on 2014/12/30.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Select : function(input_data, response) {
        SelectProcess(input_data, response);
    }
};

function SelectProcess(input_data, response) {
    async.waterfall([
        function(callback) {
            TrafficLightSelect(input_data, callback);
        },
        function(arg1, callback) {
            var send_data = TrafficLightModify(arg1.result);
            response.end(JSON.stringify({ successful: true, data: send_data }));
            callback(null, 'complete.');
        }
    ],
        function(err, result) {
            console.log("traffic light -- select process: ", result);
        }
    );
}

function TrafficLightSelect(input_data, callback) {
    var table_name = "traffic_light";
    var column_name = ['id', 'intersection_id', "card_id", "longitude", "latitude", "rotation"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    sql_generator.ExecuteCallbackResult("Select traffic light ", ms_connector, cmd_sql, callback);
}

function TrafficLightModify(source_data) {
    for (var row_index = 0; row_index < source_data.length; ++row_index) {
        // Modify rotation angle
        source_data[row_index].rotation += 180;
        if (source_data[row_index].rotation > 360) source_data[row_index].rotation -= 360;
    }
    return source_data;
}
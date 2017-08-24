/**
 * Created by hong on 2014/11/11.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Select : function(input_data, response) {
        SelectProcess(input_data, response);
    }
}

function SelectProcess(input_data, response) {
    var send_data = {};
    async.waterfall([
        function(callback) {
            TravelTimeSelect(input_data, callback);
        },
        function(arg1, callback) {
            send_data = arg1;
            response.end(JSON.stringify({ successful: true, data: send_data }));
            callback(null, 'complete.');
        }
    ],
        function(err, result) {
            console.log("travel time -- select process: ", result);
        }
    );
}

function TravelTimeSelect(input_data, callback) {
  var pseudo_data = [];
    for (var row_index = 0; row_index < 10; row_index++) {
        var specific_data = new Object();
        var date  = new Date("November 1, 2014 09:10:00");
        date.setMinutes(row_index * 10);
        specific_data.time = date;
        specific_data.station_start = 'A 站';
        specific_data.station_end = 'F 站';
        specific_data.travel_time = RandomInt(50) + 300;

        pseudo_data[row_index] = specific_data;
    }

    callback(null, pseudo_data);
    function RandomInt(max) {
        return Math.floor(Math.random() * max);
    }

}
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
}

function CreateProcess(input_data, response) {
    var table_name;
    switch(input_data.device_type) {
        case "tc":
            table_name = "device_tc";
            break;
        case "dsrc":
            table_name = "device_dsrc";
            break;
        case "gps":
            table_name = "device_gps";
            break;
        case "ipc":
            table_name = "device_ipc";
            break;
        default:
            console.log("device type not be found.");
            break;
    }
    var column_name = ["latitude", "longitude", "intersection_id"];
    var column_type = [1, 1, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);
    sql_generator.ExecuteResponse("create device ", ms_connector, cmd_sql, response);
}
/**
 * Created by hong on 2014/12/30.
 */
var async = require('async');

var mssql = require('../../lib/mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../../lib/sql_generator.js');

module.exports = {
    Update : function(input_data, response) {
        UpdateProcess(input_data, response);
    }
};

function UpdateProcess(input_data, response) {
    //
    input_data.rotation -= 180;
    if (input_data.rotation < 360) input_data.rotation += 360;
    //
    var table_name = "traffic_light";
    var column_name = ["longitude", "latitude", 'rotation'];
    var column_type = [1, 1, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
    var primary_key = ["id"];
    var primary_type = [1];
    cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);
    sql_generator.ExecuteResponse("Update permission level ", ms_connector, cmd_sql, response);
}


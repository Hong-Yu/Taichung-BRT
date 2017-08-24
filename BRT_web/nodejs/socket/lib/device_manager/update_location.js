/**
 * Created by hong on 2014/7/20.
 */
var sql_generator =  require('../sql_generator.js');

module.exports = {
    Initialize: function() {
        this.sql_generator = sql_generator;
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    Update: function (type, input_data) {
        Update(this.con_db, this.sql_generator, type, input_data);
    }
};

function Update(con_db, sql_generator, type, input_data) {
    var table_name;
    switch(type) {
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
    var column_name = ["latitude", "longitude"];
    var column_type = [1, 1];
    var primary_key = ["intersection_id"];
    var primary_type = [1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
    cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
    console.log(cmd_sql);
    sql_generator.Execute("update device location " + table_name, con_db, cmd_sql);

}
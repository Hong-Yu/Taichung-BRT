/**
 * Created by hong on 2014/8/12.
 */
var sql_generator =  require('../sql_generator.js');


module.exports = {
    Initialize: function() {
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    Update: function(input_data, status){
        Update(this.con_db, input_data, status);
    }
};

function Update(con_db, input_data, status) {
    var insert_data = new Object();
    var direction_index = input_data.DIR;
    if (status.priority_strategy[direction_index] == 0 && input_data.Strategy == 1) {
        insert_data.equip_id = input_data.LCN;
        insert_data.dir = input_data.DIR;
        insert_data.strategy = input_data.Strategy;
        StrategyInsert(con_db, insert_data);
    }
    if (input_data.Point >= 0 && input_data.Point <=6) {
        insert_data.equip_id = input_data.LCN;
        insert_data.dir = input_data.DIR;
        insert_data.plate_number = input_data.BRTID;
        insert_data.point = input_data.Point;
        PointInsert(con_db, insert_data);
    }

}

function StrategyInsert(con_db, input_data) {
    var table_name = "history_strategy";
    var column_name = ["equip_id", "dir", "strategy"];
    var column_type = [1, 1, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
//    console.log(cmd_sql);
    sql_generator.Execute("History strategy insert ", con_db, cmd_sql);
}

function PointInsert(con_db, input_data) {
    var table_name = "history_trigger_point";
    var column_name = ["equip_id", "dir", "plate_number", "point"];
    var column_type = [1, 1, 0, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
//    console.log(cmd_sql);
    sql_generator.Execute("History strategy insert ", con_db, cmd_sql);
}


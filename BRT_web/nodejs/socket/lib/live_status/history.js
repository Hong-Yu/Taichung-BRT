/**
 * Created by hong on 2014/8/12.
 */
var mssql = require('../mssql_connector');
var ms_connector = mssql.get_connector();
var sql_generator =  require('../sql_generator.js');

var trigger_obj = {};

module.exports = {
    Initialize: function() {
    },
    Update: function(input_data, status){
        Update(ms_connector, input_data, status);
//        console.log(input_data);
    }
};

function Update(con_db, input_data, status) {
    // var direction_index = input_data.DIR;
    // if (status.priority_strategy_live[direction_index] == 0 && input_data.Strategy == 1) {
        // insert_data.equip_id = input_data.LCN;
        // insert_data.dir = input_data.DIR;
        // insert_data.strategy = input_data.Strategy;
        // StrategyInsert(con_db, insert_data);
    // }
    var BRTID = input_data.BRTID;
    var LCN = input_data.LCN;
    var DIR = input_data.DIR;
    var Point = input_data.Point;
    var check_timelabel = GetTimeLabel();
    if (input_data.Point >= 0 && input_data.Point <=6) {
        if(trigger_obj.hasOwnProperty(BRTID)){
            if(trigger_obj[BRTID].hasOwnProperty(LCN)){
                if(trigger_obj[BRTID][LCN].hasOwnProperty(DIR)){
                    if(trigger_obj[BRTID][LCN][DIR].hasOwnProperty(Point)){
                        if(trigger_obj[BRTID][LCN][DIR][Point].timelabel !== check_timelabel){
                            trigger_obj[BRTID][LCN][DIR][Point].timelabel = check_timelabel;
                            insertHistory(con_db, input_data);
                        }else{
                            // ignore data
                        }
                    }else{
                    trigger_obj[BRTID][LCN][DIR][Point]={};
                    trigger_obj[BRTID][LCN][DIR][Point].timelabel = check_timelabel;
                    insertHistory(con_db, input_data);
                    }
                }else{
                trigger_obj[BRTID][LCN][DIR]={};
                trigger_obj[BRTID][LCN][DIR][Point]={};
                trigger_obj[BRTID][LCN][DIR][Point].timelabel = check_timelabel;
                insertHistory(con_db, input_data);
                }
            }else{
            trigger_obj[BRTID][LCN]={};
            trigger_obj[BRTID][LCN][DIR]={};
            trigger_obj[BRTID][LCN][DIR][Point]={};
            trigger_obj[BRTID][LCN][DIR][Point].timelabel = check_timelabel;
            insertHistory(con_db, input_data);
            }
        }else{
            trigger_obj[BRTID]={};
            trigger_obj[BRTID][LCN]={};
            trigger_obj[BRTID][LCN][DIR]={};
            trigger_obj[BRTID][LCN][DIR][Point]={};
            trigger_obj[BRTID][LCN][DIR][Point].timelabel = check_timelabel;
            insertHistory(con_db, input_data);
        }
    }
    function insertHistory(con_db, input_data){
        var insert_data = {};
        insert_data.equip_id = input_data.LCN;
        insert_data.dir = input_data.DIR;
        insert_data.plate_number = input_data.BRTID;
        insert_data.point = input_data.Point;
        // insert_data.create_date = GetDate();
        // insert_data.create_hour = GetH();
        PointInsert(con_db, insert_data);
    }
}

function StrategyInsert(con_db, input_data) {
    var table_name = "history_strategy";
    var column_name = ["equip_id", "dir", "strategy"];
    var column_type = [1, 1, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
   // console.log(cmd_sql);
    // sql_generator.Execute("History strategy insert ", con_db, cmd_sql);
}

function PointInsert(con_db, input_data) {
//    console.log(trigger_obj);
    var table_name = "history_trigger_point";
    var column_name = ["equip_id", "dir", "plate_number", "point"];
    var column_type = [1, 1, 0, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
//   console.log(cmd_sql);
    // sql_generator.Execute("History strategy insert ", con_db, cmd_sql);
   var query = con_db.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log('history insert error');
                console.log(err);
            }else{
                console.log('history insert success');
            }
        });
}

function GetTimeLabel(){
    var d = new Date();
    var time_string = ''+ d.getFullYear()+ Makeup(d.getMonth() + 1);
    time_string += Makeup(d.getDate()) +''+    Makeup(d.getHours());
    var time_int = parseInt(time_string);
    return time_int;
    function Makeup(value) {
        var value = (value < 10 ? '0' : '') + value;
        return value;

    }
}

function GetDate() {
    var str_date = "";
    var d = new Date();
    // var y = d.getFullYear().toString();
    // var m = (d.getMonth() + 1).toString();
    var date = d.getDate().toString();
    var z = "0";
    // if (m.length == 1) {
        // var c = m;
        // m = z.concat(c);
    // }
    if (date.length == 1) {
        var c = date;
        date = z.concat(c);
    }
    str_date = date;
    return str_date;
}

function GetH() {
    var str_time = "";
    var d = new Date();
    var h = d.getHours().toString();
    // var min = d.getMinutes().toString();
    // var s = d.getSeconds().toString();
    var z = "0";
    if (h.length == 1) {
        var c = h;
        h = z.concat(c);
    }
    // if (min.length == 1) {
        // var c = min;
        // min = z.concat(c);
    // }
    // if (s.length == 1) {
        // var c = s;
        // s = z.concat(c);
    // }
    str_time = h;
    return str_time;
}

// function GetDateTime () {
    // var str_datetime = '';
    // var d = new Date();
// }
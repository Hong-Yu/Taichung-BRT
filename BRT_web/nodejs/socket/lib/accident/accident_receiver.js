
var async = require('async');
var sql_generator =  require('../sql_generator.js');
var web_socket_state =  require('../websocket_state.js');


module.exports = {
    Initialize: function() {
    },
    DataBase: function(active, web_socket, input_data) {
        DataAssign(active, this.con_db, web_socket, input_data);
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    SelectData: function(web_socket) {
        SelectProcess(this.con_db, web_socket);
    }


};

function DataAssign(active, connector, web_socket, input_data) {
    switch(active){
        case 'insert':
            console.log("Accident insert");
            InsertProcess(connector, web_socket, input_data);
            break;
        case 'delete':
            console.log("Accident delete");
            DeleteFrom(connector, input_data);
            break;
        case 'select':
            console.log("Accident select");
            break;
        default:
            console.log("Data not be assigned.");
            break;
    }
}

function InsertProcess(connector, web_socket, input_data) {
    async.waterfall([
        function(callback) {
            Insert(connector, input_data, callback);
        },
        function(arg1, callback) {
            Select(connector, web_socket, callback);
        },
        function(arg1, callback) {
            console.log('accident data number: ', arg1.rowcount);
            SentToWebsite(web_socket, arg1, callback);
        }
    ],
        function(err, result) {
            console.log("Accident establish -- insert process: ", result);
        }
    );
}

function SelectProcess(connector, web_socket) {
    async.waterfall([
        function(callback) {
            Select(connector, web_socket, callback);
        },
        function(arg1, callback) {
            console.log('accident data number: ', arg1.rowcount);
            SentToWebsite(web_socket, arg1, callback);
        }
    ],
        function(err, result) {
            console.log("Accident establish -- select process: ", result);
        }
    );
}


function Insert(connector, input_data, callback) {
    var table_name = "accident_statement";
    var column_name = ["latitude", "longitude", "license_plate", "route", "velocity_avg", "intersection_near", "reason", "lane_closed"];
    var column_type = [1, 1, 0, 0];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);
    sql_generator.ExecuteCallback("Insert accident ", connector, cmd_sql, callback);
}


function DeleteFrom(connector, input_data) {
//    console.log(input_data);
    var table_name = "accident_statement";
    var column_name = ["id"];
    var column_type = [1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Delete(table_name);
    cmd_sql += sql_generator.Where(column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);
    sql_generator.Execute("Delete accident ", connector, cmd_sql);
}

function Select(connector, web_socket, callback) {
    var cmd_sql = "";
    cmd_sql += "Select ID, latitude, longitude, license_plate, route, velocity_avg, intersection_near, reason, lane_closed ";
    cmd_sql += "from accident_statement";
    sql_generator.ExecuteCallbackResult("Select accident ", connector, cmd_sql, callback);
}

function SentToWebsite(web_socket, output_data, callback) {
    var result = new Object();
    result.FunctionNo = 'accident';
    result.MsgTypeNo = 'response';
    result.accident = output_data.result;
    var json_string = JSON.stringify(result);
    if(web_socket_state.IsConnect(web_socket)) {
        web_socket.send(json_string);
        callback(null, 'Sending accident data completed successfully.');
    } else {
        callback(null, 'Sending accident data fail.');
    }
}



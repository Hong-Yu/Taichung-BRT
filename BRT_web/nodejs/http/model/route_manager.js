/**
 * Created by hong on 2014/10/29.
 */
var async = require('async');

var mssql = require('../lib/mssql_connector');
var ms_connector = mssql.get_connector();
// sql smart generator
var sql_generator =  require('../lib/sql_generator.js');

module.exports = {
    Initialize : function(ms_connector, sql_generator) {
    },
    Manipulate : function(act, input_data, response) {
      console.log("route-manager-- act: ", act, " input data: ", input_data);
        switch(act) {
            case 'routes-add':
                RoutesAdd(input_data, response);
                break;
            case 'routes-select':
                RoutesSelect(response);
                break;
            case 'routes-delete':
                RoutesDelete(input_data, response);
                break;
            case 'route-select':
                RouteSelectProcess(input_data, response);
                break;
            case 'route-update':
                RouteUpdateProcess(input_data, response);
                break;
            default:
                console.log("route manager act not defined.");
                break;
        }
    }
}

function RoutesAdd(input_data, response) {
    var table_name = "route_list";
    var column_name = ["name", "color", "intersection_max"];
    var column_type = [0, 0, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);
    sql_generator.Execute("Insert route ", ms_connector, cmd_sql);
    response.end(JSON.stringify({ successful: true, message: "Insert successful" }));

}

function RoutesSelect(response) {
    var table_name = "route_list";
    var cmd_sql = "";
    cmd_sql += "SELECT * FROM " + table_name + " ";
    sql_generator.ExecuteResponse("select route list ", ms_connector, cmd_sql, response);
}

function RoutesDelete(input_data, response) {
    var table_name = "route_list";
    var cmd_sql = "";
    cmd_sql += sql_generator.Delete(table_name);
    cmd_sql += "WHERE ID = " + input_data.route_id + " ";
    console.log(cmd_sql);
    sql_generator.ExecuteResponse("delete route list ", ms_connector, cmd_sql, response);
}


// select process -------------------------------------------------------------
function RouteSelectProcess(input_data, response) {
    var send_data = {};
    async.waterfall([
        function(callback) {
            IntersectionSelect(callback);
        },
        function(arg1, callback) {
            send_data.intersection = arg1.result;
            RouteIntersectionSelect(input_data, callback);
        },
        function(arg1, callback) {
            send_data.route_intersection = arg1.result;
            response.end(JSON.stringify({ successful: true, data: send_data }));
            callback(null, 'complete.');
        }
    ],
        function(err, result) {
            console.log("Route manager -- select process: ", result);
        }
    );
}

function IntersectionSelect(callback) {
    var table_name = "intersection";
    var column_name = ["intersection_id", "name", "latitude", "longitude", "serial_number"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += "WHERE longitude is not null AND latitude is not null;";
    sql_generator.ExecuteCallbackResult("Select intersection ", ms_connector, cmd_sql, callback);
}

function RouteIntersectionSelect(input_data, callback) {
    var table_name = "route_intersection";
    var column_name = ["ID", "serial_number", "route_id", "intersection_id"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    var column_name_ = ["route_id"];
    var column_type_ = [1];
    cmd_sql += sql_generator.Where(column_name_, column_type_, input_data);
    cmd_sql += sql_generator.End();
    console.log(cmd_sql);
    sql_generator.ExecuteCallbackResult("Select intersection ", ms_connector, cmd_sql, callback);
}
// update process -------------------------------------------------------------
function RouteUpdateProcess(input_data, response) {
    var send_data = {};
    async.series([
        function(callback) {
            RoutesUpdate(input_data.route_list, callback);
        },
        function(callback) {
            RouteDelete(input_data, callback);
        },
        function(callback) {
            RouteInsert(input_data, callback);
            response.end(JSON.stringify({ successful: true, data: send_data }));
            callback(null, 'complete.');
        }
    ],
        function(err, result) {
            console.log("Route manager -- update process: ", result);
        }
    );
}

function RoutesUpdate(input_data, callback) {
    var table_name = "route_list";
    var column_name = ["name", "color", "intersection_max"];
    var column_type = [0, 0, 1];
    var cmd_sql = "";
    cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
    var primary_key = ["ID"];
    var primary_type = [1];
    cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
    console.log(cmd_sql);
    sql_generator.ExecuteCallbackResult("Update route list ", ms_connector, cmd_sql, callback);
}

function RouteDelete(input_data, callback) {
    var table_name = "route_intersection";
    var cmd_sql = "";
    cmd_sql += sql_generator.Delete(table_name);
    cmd_sql += "WHERE route_id=" + input_data.route_list.ID + " ";
    console.log(cmd_sql);
    sql_generator.ExecuteCallbackResult("Remove route intersection ", ms_connector, cmd_sql, callback);
}

function RouteInsert(input_data, callback) {
            var sections_data = input_data.route_intersection;
        var table_name = "route_intersection";
        var column_name = ["serial_number", "route_id", "intersection_id"];
        var column_type = [1, 1, 1];
        for(var section_index = 0; section_index < sections_data.length; ++section_index) {
            var current_data = sections_data[section_index];
            var cmd_sql = "";
            cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, current_data);
            cmd_sql += sql_generator.End();
            console.log(cmd_sql);
            sql_generator.ExecuteCallbackResult("Insert route intersection ", ms_connector, cmd_sql, callback);
        }
}

//function Update(connector, sql_generator, input_data) {
//    var list_data = input_data.route_list;
//    // 1. Route_list
//    var table_name = "route_list";
//    var column_name = ["name", "color", "intersection_max"];
//    var column_type = [0, 0, 1];
//    var cmd_sql = "";
//    cmd_sql += sql_generator.Update(table_name, column_name, column_type, list_data);
//    //     Update: function(table_name, column_name, column_type, input_data)
//    //    Where: function(primary_key, primary_type, input_data) {
//    var primary_key = ["ID"];
//    var primary_type = [1];
//    cmd_sql += sql_generator.Where(primary_key, primary_type, list_data);
//    console.log(cmd_sql);
//    sql_generator.Execute("Update route list ", connector, cmd_sql);
//    // 2. Remove Route Intersection
//    var table_name = "route_intersection";
//    var cmd_sql = "";
//    cmd_sql += sql_generator.Delete(table_name);
//    cmd_sql += "WHERE route_id=" + input_data.route_list.ID + " ";
//    console.log(cmd_sql);
//    sql_generator.ExecuteWithFunction("Remove route intersection ", connector, cmd_sql, InsertRouteIntersection);
//    // 3. Insert Route Intersection
//    function InsertRouteIntersection() {
//        // 3. Insert Route Intersection
//        var sections_data = input_data.route_intersection;
//        var table_name = "route_intersection";
//        var column_name = ["serial_number", "route_id", "intersection_id"];
//        var column_type = [1, 1, 1];
//        for(var section_index = 0; section_index < sections_data.length; ++section_index) {
//            var current_data = sections_data[section_index];
//            var cmd_sql = "";
//            cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, current_data);
//            cmd_sql += sql_generator.End();
//            console.log(cmd_sql);
//            sql_generator.Execute("Insert route intersection ", connector, cmd_sql);
//        }
//    }
//}


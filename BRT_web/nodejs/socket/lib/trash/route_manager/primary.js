/**
 * Created by hong on 2014/4/17.
 */

module.exports = {
    Initialize: function() {
        this.traffic_light = new Object();
    },
    Input: function(active, input_data) {
        DataAssign(active, this.con_db, this.sql_generator, input_data);
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    // sql_generator
    set_sql_generator: function (sql_generator) {
        this.sql_generator = sql_generator;
    },
    Output: function(web_socket) {
        Select(this.con_db, this.sql_generator, web_socket);
    }

};

function Select(connector, sql_generator, web_socket) {
    var result = new Object();
    var select_index = 0;
    // 1. Intersection
    var table_name = "intersection";
    var column_name = ["intersection_id", "name", "latitude", "longitude", "serial_number"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += "WHERE longitude is not null AND latitude is not null;";
   ExecuteWithResult(connector, result, SendToWebsite, "intersection", web_socket);
    // 2. Route_list
    var table_name = "route_list";
    var column_name = ["ID", "name", "color", "intersection_max"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    ExecuteWithResult(connector, result, SendToWebsite, "route_list", web_socket);
    // 3. Route_section
    var table_name = "route_intersection";
    var column_name = ["ID", "serial_number", "route_id", "intersection_id"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    ExecuteWithResult(connector, result, SendToWebsite, "route_intersection", web_socket);
    //
    function ExecuteWithResult(connector, result, call_function, mark, web_socket) {
        var query = connector.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log('select error: ', mark);
                console.log(err);
                return
            }else{
                ++select_index;
                call_function(res.result, mark, result, select_index, web_socket);
            }
        });
    }
}

function SendToWebsite(input_data, mark, result, select_index, web_socket) {
    result[mark] = input_data;
//    console.log(select_index);
    if(select_index == 3 ) {
        console.log("Ready to send");
        result.FunctionNo = 300;
        result.MsgTypeNo = 2;
        console.log(result);
        var json_string = JSON.stringify(result);
        web_socket.send(json_string);
    }
}

function DataAssign(active, connector, sql_generator, input_data) {
    switch(active){
        case 'insert':
            console.log("route insert");
//            Insert(connector, sql_generator, input_data);
            break;
        case 'delete':
            console.log("route delete");
//            DeleteFrom(connector, sql_generator, input_data);
            break;
        case 'update':
            console.log("route update");
            Update(connector, sql_generator, input_data);
            break;
        default:
            console.log("Data not be assigned.");
            break;
    }
    function Update(connector, sql_generator, input_data) {
        var list_data = input_data.route_list;
        // 1. Route_list
        var table_name = "route_list";
        var column_name = ["name", "color", "intersection_max"];
        var column_type = [0, 0, 1];
        var cmd_sql = "";
        cmd_sql += sql_generator.Update(table_name, column_name, column_type, list_data);
        //     Update: function(table_name, column_name, column_type, input_data)
        //    Where: function(primary_key, primary_type, input_data) {
        var primary_key = ["ID"];
        var primary_type = [1];
        cmd_sql += sql_generator.Where(primary_key, primary_type, list_data);
        console.log(cmd_sql);
        sql_generator.Execute("Update route list ", connector, cmd_sql);
        // 2. Remove Route Intersection
        var table_name = "route_intersection";
        var cmd_sql = "";
        cmd_sql += sql_generator.Delete(table_name);
        cmd_sql += "WHERE route_id=" + input_data.route_list.ID + " ";
        console.log(cmd_sql);
        sql_generator.ExecuteWithFunction("Remove route intersection ", connector, cmd_sql, InsertRouteIntersection);
        // 3. Insert Route Intersection
        function InsertRouteIntersection() {
            // 3. Insert Route Intersection
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
                sql_generator.Execute("Insert route intersection ", connector, cmd_sql);
            }
        }


    }
}



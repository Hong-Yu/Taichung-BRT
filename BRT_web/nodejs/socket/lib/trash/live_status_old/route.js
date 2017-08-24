/**
 * Created by hong on 2014/7/14.
 */
var sql_generator =  require('../sql_generator.js');


module.exports = {
    Initialize: function() {
        this.intersection_order = [];
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    Select: function(){
        SelectRouteIntersection(this.con_db, this.intersection_order);

    },

    get_intersection_order: function(intersection_id) {
//        console.log("Order of intersection. ?");
//        console.log(this.intersection_order);
        var current_intersection_index = this.intersection_order.indexOf(intersection_id);
        var intersection_set = [];
        intersection_set[0] = this.intersection_order[current_intersection_index -1];
        intersection_set[1] = this.intersection_order[current_intersection_index];
        intersection_set[2] = this.intersection_order[current_intersection_index +1];
//        console.log(intersection_set);
        return intersection_set;
    }

};

function SelectRouteIntersection(con_db, intersection_order) {
    // 3. Route_section
    var table_name = "route_intersection";
    var column_name = ["ID", "serial_number", "route_id", "intersection_id"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    ExecuteWithResult(con_db, "route_intersection", intersection_order);
    //
    function ExecuteWithResult(con_db, mark, intersection_order) {
        var query = con_db.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log('select error: ', mark);
                console.log(err);
                return
            }else{
//                console.log('Route: ', res.result);
                for (var route_index = 0; route_index < res.result.length; route_index++) {
                    intersection_order[route_index] = res.result[route_index].intersection_id;
                }
            }
        });
    }
}
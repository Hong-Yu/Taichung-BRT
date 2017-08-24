/**
 * Created by hong on 2014/9/17.
 */
var sql_generator =  require('../sql_generator.js');


module.exports = {
    Initialize: function(ms_connector, intersections, index_table, callback) {
        Initialize(ms_connector, intersections, index_table, callback);
    }
};

function Initialize(ms_connector, intersections, index_table, callback) {
    var table_name = "intersection";
    var column_name = ["intersection_id", "name", "latitude", "longitude"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += "WHERE longitude is not null AND latitude is not null;";
    ExecuteWithResult(ms_connector, cmd_sql);
    function ExecuteWithResult(ms_connector, cmd_sql) {
        var query = ms_connector.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log('select error: ', mark);
                console.log(err);
            }else{
                CopyIntersection(res.result, intersections, index_table);
                callback(null, 'intersection data selecting is complete.');
            }
        });
    }
}

function CopyIntersection(source, destination, index_table) {
    for(var intersection_index = 0; intersection_index < source.length; ++intersection_index) {
        var intersection_id = source[intersection_index].intersection_id;
        destination[intersection_index] = source[intersection_index];
        index_table[intersection_index] = intersection_id;
    }
}
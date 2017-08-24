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
    Select: function(intersections, status){
        SelectFrom(this.con_db, intersections, status);
    }
};

function SelectFrom(connector, intersections, status) {
    var table_name = "intersection";
    var column_name = ["intersection_id", "name"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += "WHERE longitude is not null AND latitude is not null;";
    ExecuteWithResult(connector, PrepareIntersection, "intersection", intersections, status);

    function ExecuteWithResult(connector, call_function, mark, intersections, status) {
        var query = connector.query(cmd_sql);
        query.exec( function( err, res ){
            if( err ){
                console.log('select error: ', mark);
                console.log(err);
                return;
            }else{
                call_function(res.result, intersections, status);
            }
        });
    }
    function PrepareIntersection(input_data, intersections, status) {
        for (var intersection_index = 0; intersection_index < input_data.length; ++intersection_index) {
            intersections[intersection_index] = input_data[intersection_index].intersection_id;
        }
        for (var section_index = 0; section_index < intersections.length; ++section_index) {
            status[section_index] = CreateStatusStructure();
            status[section_index].name = input_data[section_index].name;
        }
        console.log("live-status intersection index table", JSON.stringify(intersections));
    }
}


function CreateStatusStructure() {
    var result;
    function Structure(receive_time, priority_status_live, priority_strategy, phase_step, countdown,
                       car_id, arrival_time, arrival_time_estimate, receive_time_p) {
        this.receive_time = receive_time;
        this.priority_status_live = priority_status_live;
        this.priority_strategy = priority_strategy;
        this.phase_step = phase_step;
        this.countdown = countdown;
        this.car_id = car_id;
        this.arrival_time = arrival_time;
        this.arrival_time_estimate = arrival_time_estimate;
        this.receive_time_p = receive_time_p;
    }
    var receive_time = "00:00:00";
    var priority_status_live = "initial";
    var priority_strategy = [-1, -1];
    var phase_step = [0, 0];
    var countdown = [0, 0];
    var car_id = ["000000000000", "000000000000"];
    var arrival_time = ["--:--", "--:--"];
    var arrival_time_estimate = ["--:--", "--:--"];
    var receive_time_p = [["--:--", "--:--", "--:--", "--:--", "--:--", "--:--", "--:--"],
        ["--:--", "--:--", "--:--", "--:--", "--:--", "--:--", "--:--"]];


    result = new Structure(receive_time, priority_status_live, priority_strategy, phase_step, countdown,
        car_id, arrival_time, arrival_time_estimate, receive_time_p);
    return result;
}


var timing_plan_select = require('./select.js');
var update_center = require('./update_center.js');

module.exports = {
    Initialize: function() {
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
    },
    set_sql_generator: function (sql_generator) {
        this.sql_generator = sql_generator;
    },
    Input: function(input_data) {
        var data_segment_type = input_data.day_segtype.result[0];
        console.log("user name--: ", input_data.user_name);
//        console.log("Segment type: ", data_segment_type);

        update_center.set_connector(this.con_db);
        update_center.set_sql_generator(this.sql_generator);
        update_center.Std(input_data.std_plan.result);
        update_center.Tod(input_data.user_name, input_data.tod_plan.result);
        update_center.Priority(input_data.priority_control.result);

        update_center.SegmentType(input_data.day_segtype.result[0]);
    },
    Output: function(web_socket, equip_id) {
        timing_plan_select.set_connector(this.con_db);
        timing_plan_select.set_sql_generator(this.sql_generator);
        timing_plan_select.Select(web_socket, equip_id);
    }
};

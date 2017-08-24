/**
 * Created by CCT on 2014/6/16.
 */
// Timing plan update center
// ============================================================================
var update_tod = require('./update_tod.js');
var update_std = require('./update_std.js');
var update_priority = require('./update_priority.js');
var update_segment_type = require('./update_segment_type.js');


module.exports = {
   Initialize: function() {
   },
   set_connector: function (con_db) {
      this.con_db = con_db;
   },
   set_sql_generator: function (sql_generator) {
      this.sql_generator = sql_generator;
   },
   SegmentType: function (plan_data) {
      update_segment_type.set_connector(this.con_db);
      update_segment_type.set_sql_generator(this.sql_generator);
      update_segment_type.Update(plan_data);
   },
   Tod: function (user_name, plan_data) {
       if (typeof plan_data === 'undefined' || plan_data.length == 0) return;
       update_tod.set_connector(this.con_db);
       update_tod.set_sql_generator(this.sql_generator);
       update_tod.Update(user_name, plan_data);
   },
   Std: function (plan_data) {
       if (typeof plan_data === 'undefined' || plan_data.length == 0) return;
       update_std.set_connector(this.con_db);
      update_std.set_sql_generator(this.sql_generator);
      update_std.Update(plan_data);
   },
   Priority: function (plan_data) {
       if (typeof plan_data === 'undefined' || plan_data.length == 0) return;
       update_priority.set_connector(this.con_db);
      update_priority.set_sql_generator(this.sql_generator);
      update_priority.Update(plan_data);

   },
   Receive: function () {
   },
   get_connector: function () {
      return this.con_db;
   }
};




/**
 * Created by CCT on 2014/6/16.
 */
module.exports = {
   Initialize: function() {
   },
   set_connector: function (con_db) {
      this.con_db = con_db;
   },
   set_sql_generator: function (sql_generator) {
      this.sql_generator = sql_generator;
   },
   Update: function(input_data) {
      console.log("priority table -- update start: ", input_data.length);
      for (var row_index = 0; row_index < input_data.length; ++row_index) {
         PriorityUpdateAssign(this.con_db, this.sql_generator, input_data[row_index]);
      }
   }
}

function PriorityUpdateAssign(con_db, sql_generator, input_data) {
   var table_name = get_table_name();
   var column_name = ["priority_id"];
   var primary_key = ["equip_id", "priority_id"];
   var primary_type = [1, 1];
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
   cmd_sql += sql_generator.End();
   var type = "Priority select";
   var query = con_db.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log(type + ' error');
         console.log(err);
      }else{
         console.log(type + ' success');
         var row_count = res.rowcount;
         switch (row_count) {
            case 0:
               PriorityInsert(con_db, sql_generator, input_data);
               break;
            case 1:
               PriorityUpdate(con_db, sql_generator, input_data);
               break;
            default:
               console.log("priority update: update column is still lacking");
               break;
         }
      }
   });
}

function PriorityInsert(con_db, sql_generator, input_data) {
   var table_name = get_table_name();
   var column_name = get_column_name();
   var column_type = get_column_type();
   var cmd_sql = "";
   cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
//   console.log("Priority insert :");
//   console.log(cmd_sql);
   sql_generator.Execute("Priority insert ", con_db, cmd_sql);
}

function PriorityUpdate(con_db, sql_generator, input_data) {
   var table_name = get_table_name();
   var column_name = get_column_name();
   var column_type = get_column_type();
   var cmd_sql = "";
   cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
   cmd_sql += "WHERE equip_id = "+ input_data.equip_id +" AND priority_id = "+ input_data.priority_id +";";
//   console.log("priority update :");
//   console.log(cmd_sql);
   sql_generator.Execute("priority update ", con_db, cmd_sql);
}

function get_table_name() {
   return "priority_control";
}

function get_column_name() {
   var column_name = ["equip_id", "priority_id", "past_east", "past_west", "door_trigger_up",
      "door_trigger_down", "headway_up", "headway_down", "lowspeed"];
   var col_index = 7;
   col_index = SequentialName(col_index, "percentage_east", column_name);
   col_index = SequentialName(col_index, "percentage_west", column_name);
   return column_name;
   function SequentialName(col_index, prefix, array) {
      for (var index = 1; index < 7; ++index) {
         array[col_index++] = prefix + index;
      }
      return col_index;
   }
}

function get_column_type() {
   var column_type = [];
   ConstantArray(49, 1, column_type);
   column_type[2] = 0;
   return column_type;
   function ConstantArray(max, value, array) {
      for (var index = 0; index < max; ++index) {
         array[index] = value;
      }
   }
}
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
      console.log("Std table -- update start: ", input_data.length);
      for (var row_index = 0; row_index < input_data.length; ++row_index) {
         StdUpdateAssign(this.con_db, this.sql_generator, input_data[row_index]);
      }
   }
}

function StdUpdateAssign(con_db, sql_generator, input_data) {
   var table_name = get_table_name();
   var column_name = ["plan_id"];
   var primary_key = ["equip_id", "plan_id"];
   var primary_type = [1, 1];
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += sql_generator.Where(primary_key, primary_type, input_data);
   cmd_sql += sql_generator.End();
   var type = "Std select";
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
               StdInsert(con_db, sql_generator, input_data);
               break;
            case 1:
               StdUpdate(con_db, sql_generator, input_data);
               break;
            default:
               console.log("std update: update column is still lacking");
               break;
         }
      }
   });
}

function StdInsert(con_db, sql_generator, input_data) {
   var table_name = get_table_name();
   var column_name = get_column_name();
   var column_type = get_column_type();
   var cmd_sql = "";
   cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
//   console.log("Std insert :");
//   console.log(cmd_sql);
   sql_generator.Execute("Std insert ", con_db, cmd_sql);
}

function StdUpdate(con_db, sql_generator, input_data) {
   var table_name = get_table_name();
   var column_name = get_column_name();
   var column_type = get_column_type();
   var cmd_sql = "";
   cmd_sql += sql_generator.Update(table_name, column_name, column_type, input_data);
   cmd_sql += "WHERE equip_id = "+ input_data.equip_id +" AND plan_id = "+ input_data.plan_id +";";
//   console.log("std update :");
//   console.log(cmd_sql);
   sql_generator.Execute("std update ", con_db, cmd_sql);
}

function get_table_name() {
   return "std_plan";
}

function get_column_name() {
   var column_name = ["equip_id", "plan_id", "phase_no", "cycletime", "time_offset"];
   SequencialName("allred", 6, column_name);
   SequencialName("yellow", 6, column_name);
   SequencialName("g", 6, column_name);
   SequencialName("pgflash", 6, column_name);
   SequencialName("pred", 6, column_name);
   SequencialName("ming", 6, column_name);
   SequencialName("maxg", 6, column_name);
   return column_name;
   function SequencialName(name, length, column_name) {
      var begin = column_name.length;
      var end = begin + length;
      var value = 0;
      for(var col_index = begin; col_index < end; ++col_index){
         column_name[col_index] = name + ++value;
      }
   }
}

function get_column_type() {
   var column_type = [1, 1, 0, 1, 1,
      1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1,
   ];
   return column_type;
}
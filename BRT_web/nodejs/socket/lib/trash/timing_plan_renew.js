/**
 * Created by CCT on 2014/3/7.
 */

// tools.js
// renew
// ========
module.exports = {
   Initialize: function() {
      this.ms_require = require( "node-mssql-connector" );
      this.con_db = MSDataBaseConnect(this.ms_require);
   },
   SegmentType: function (plan_data) {
      console.log("Segment type table -- update");
   },
   Tod: function (plan_data) {
      console.log("Tod table -- renew");
      RenewTod(this.con_db, plan_data);
   },
   Std: function (plan_data) {
      console.log("Std table -- update");
      UpdateStd(this.con_db, plan_data);
   },
   Priority: function (plan_data) {
      console.log("Priority type table -- update");
   },
   Receive: function () {
      Printf();
   },
   get_connector: function () {
      return this.con_db;
   }
};

function RenewTod(con_db, plan_data) {

//   INSERT INTO table_name
//   VALUES (value1,value2,value3,...);
   var table_name = "tod_plan";
   var column_name = ["equip_id", "seg_type", "begin_time", "plan_id", "priority_id", "car_countdown", "ped_countdown", "priority_switch"];
   var primary_key = ["equip_id", "seg_type"];

   Delete(table_name, primary_key, plan_data);

   function Insert(table_name, column_name, plan_data) {
      var cmd_sql = "";
      cmd_sql += "INSERT INTO " + table_name + " ";
      cmd_sql += "VALUES (";
      for (var col_index = 0; col_index < column_name.length; ++col_index) {
         var current_name = column_name[col_index];
         if (col_index == 2) {
            cmd_sql += "'" + plan_data[current_name] + "'";
         } else {
            cmd_sql += plan_data[current_name];
         }
         if (col_index == (column_name.length - 1)) {
            cmd_sql += " ";
         } else {
            cmd_sql += ", ";
         }
      }
      cmd_sql += "); ";
      Execute("Insert", cmd_sql);
   }
   function Delete(table_name, primary_key, plan_data) {
      var cmd_sql = "";
      cmd_sql += "DELETE FROM " + table_name + " ";
      for (var col_index = 0; col_index < primary_key.length; ++col_index) {
         var current_key = primary_key[col_index];
         if (col_index == 0) {
            cmd_sql += "WHERE " + current_key + "=" + plan_data[0][current_key] + " ";
         } else {
            cmd_sql += "AND " + current_key + "=" + plan_data[0][current_key] + " ";
         }
      }
      cmd_sql += "; ";
      var type = "Delete" ;
      var query = con_db.query(cmd_sql);
      query.exec( function( err, res ){
         if( err ){
            console.log(type + ' error');
            console.log(err);
         }else{
            console.log(type + ' success');
            for (var data_index = 0; data_index < plan_data.length; ++data_index) {
               Insert(table_name, column_name, plan_data[data_index]);
            }

         }
      });
   }
   function Execute(type, cmd_sql) {
      var query = con_db.query(cmd_sql);
      query.exec( function( err, res ){
         if( err ){
            console.log(type + ' error');
            console.log(err);
         }else{
            console.log(type + ' success');
            console.log(err);
         }
      });

   }

   function Update(result_set, plan_data) {
      for (var row_index = 0; row_index < result_set.length;++row_index) {
         var cmd_sql = "UPDATE [brt].[dbo].[tod_plan] ";
         cmd_sql += "SET begin_time='" + plan_data.result[row_index].begin_time + "' ";
         cmd_sql += "WHERE equip_id =" + result_set[row_index].equip_id + " ";
         cmd_sql += "AND begin_time ='" + result_set[row_index].begin_time + "' ";
         cmd_sql += "AND seg_type =" + result_set[row_index].seg_type + ";";
         console.log(cmd_sql);
         var query = con_db.query(cmd_sql);
         query.exec( function( err, res ){
            if( err ){
               console.log('Day update Error');
               console.log(err);
               return
            }else{
               console.log('Day update success');
//               console.log(res);
            }
         });
      }
   }
}

function UpdateStd(con_db, plan_data) {
//   console.log(plan_data);
//   UpdateUniquePlan(con_db, plan_data[0]);
   var table_name = "std_plan";
   var column_name = ["plan_id"];
   var primary_key = ["equip_id"];
   var primat_type = [1];
   var sql_select = Select(table_name, column_name, primary_key, primat_type, plan_data);
   console.log(sql_select);
   var query = con_db.query(sql_select);
   query.exec( function( err, res ){
      if( err ){
         console.log('std update Error');
         console.log(err);
         return
      }else{
         console.log('std update - select success');
         for (var plan_index = 0; plan_index < res.result.length; ++plan_index) {
            if (plan_index >= plan_data.length) break;
            var plan_id = res.result[plan_index].plan_id;
            console.log(plan_id);
            UpdateUniquePlan(con_db, plan_data[plan_index], plan_id);
         }
         console.log(res.result.length + " " + plan_data.length + " ");
         for (var plan_index = res.result.length; plan_index < plan_data.length; ++plan_index) {
            var plan_id = plan_data[plan_index].plan_id;
            console.log(plan_id);
//            UpdateUniquePlan(con_db, plan_data[plan_index], plan_id);
            Insert(con_db, plan_data[plan_index]);
         }
      }
   });
//   SELECT column_name,column_name
//   FROM table_name;
   function Select(table_name, column_name, primary_key, primat_type, plan_data) {
      var cmd_sql = "";
      cmd_sql += SQL.Select(table_name, column_name);
      cmd_sql += SQL.Where(primary_key, primat_type, plan_data);
      cmd_sql += SQL.End();
      return cmd_sql;
   }
   function Insert(con_db, plan_data) {
      var table_name = "std_plan";
      var column_name = ["equip_id", "plan_id", "phase_no", "cycletime", "time_offset", ""];
      var primary_key = ["equip_id"];
      var col_index = 5;
      col_index = SequentialName(col_index, "allred", column_name);
      col_index = SequentialName(col_index, "yellow", column_name);
      col_index = SequentialName(col_index, "g", column_name);
      col_index = SequentialName(col_index, "pred", column_name);
      col_index = SequentialName(col_index, "pgflash", column_name);
      col_index = SequentialName(col_index, "ming", column_name);
      col_index = SequentialName(col_index, "maxg", column_name);
      var column_type = [];
      ConstantArray(49, 1, column_type);
      column_type[2] = 0;
      var cmd_sql = "";
//      console.log(plan_data);
      cmd_sql += SQL.InsertInto(table_name, column_name, column_type, plan_data);
      cmd_sql += SQL.End();
      SQL.Execute("Insert std ", con_db, cmd_sql);
//      console.log(cmd_sql);
      function SequentialName(col_index, prefix, array) {
         for (var index = 1; index < 7; ++index) {
            array[col_index++] = prefix + index;
         }
         return col_index;
      }
      function ConstantArray(max, value, array) {
         for (var index = 0; index < max; ++index) {
            array[index] = value;
         }
      }
   }
}

function UpdateUniquePlan(con_db, plan_data, plan_id) {
   console.log("std single row");
   var unique_data = plan_data;
   var cmd_sql = "UPDATE [brt].[dbo].[std_plan] ";
   cmd_sql += "SET ";
   cmd_sql += "phase_no ='" + unique_data.phase_no + "', ";
   cmd_sql += EqualityStringMaker(unique_data, "allred", "allred");
   cmd_sql += EqualityStringMaker(unique_data, "yellow", "yellow");
   cmd_sql += EqualityStringMaker(unique_data, "g", "g");
   cmd_sql += EqualityStringMaker(unique_data, "pred", "pred");
   cmd_sql += EqualityStringMaker(unique_data, "pgflash", "pgflash");
   cmd_sql += EqualityStringMaker(unique_data, "ming", "ming");
   cmd_sql += EqualityStringMaker(unique_data, "maxg", "maxg");
   cmd_sql += "time_offset =" + unique_data.time_offset + " ";
   cmd_sql += "WHERE equip_id =" + plan_data.equip_id + " ";
   cmd_sql += "AND plan_id =" + plan_id + ";";
//   console.log(cmd_sql);
   SQL.Execute("update", con_db, cmd_sql);
   function EqualityStringMaker(data, destination_name, child_name) {
      var cmd_sql = "";
      for (var index = 0; index < 6; ++index) {
         var source_name = child_name + (index + 1);
         cmd_sql += "" + destination_name + (index + 1) + "=" + data[source_name] + ", ";
      }
      return cmd_sql;
   }
}

var MSDataBaseConnect = function (MSSQLConnector) {
   var con_db = new MSSQLConnector( {
      connection: {
         userName: "sa",
         password: "adminks1679@cct",
         server: "192.168.1.9",
         options: {
            database: "brt"
         }
      }
   });
   var query = con_db.query("Select name from intersection");
   query.exec( function( err, res ){
      if( err ){
         console.log('Require error\n');
         console.log(err);
         return
      }else{
//         console.log(res);
         console.log('database connect success,\n');
      }
   });
   return con_db;
}

function Printf() {
   console.log("Hello update ---\n");
}

var SQL = {
   Select: function(table_name, column_name) {
      var cmd_sql = "";
      cmd_sql += "SELECT ";
      for (var col_index = 0; col_index < column_name.length; ++col_index) {
         var current_name = column_name[col_index];
         cmd_sql += "" + current_name + "";
         if (col_index == (column_name.length - 1)) {
            cmd_sql += " ";
         } else {
            cmd_sql += ", ";
         }
      }
      cmd_sql += "FROM " + table_name + " ";
      return cmd_sql
   },
   Where: function(primary_key, primat_type, plan_data) {
      var cmd_sql = "";
      for (var col_index = 0; col_index < primary_key.length; ++col_index) {
         var current_key = primary_key[col_index];
         if (col_index == 0) {
            cmd_sql += "WHERE " + current_key + "=";
            if (primat_type[col_index])  cmd_sql += plan_data[0][current_key] + " ";
            else cmd_sql +="'" +  plan_data[0][current_key] + "' ";
         } else {
            cmd_sql += "AND " + current_key + "=";
            if (primat_type[col_index])  cmd_sql += plan_data[0][current_key] + " ";
            else cmd_sql +="'" +  plan_data[0][current_key] + "' ";
         }
      }
      return cmd_sql
   },
   InsertInto: function(table_name, column_name, column_type, plan_data) {
//      INSERT INTO Customers (CustomerName, City, Country)
//      VALUES ('Cardinal', 'Stavanger', 'Norway');
      var cmd_sql = "";
      cmd_sql += "INSERT INTO " + table_name;
      cmd_sql += " ("
      for (var col_index = 0; col_index < column_name.length; ++col_index) {
         cmd_sql += column_name[col_index];
         if (col_index == (column_name.length - 1)) {
            cmd_sql += " ";
         } else {
            cmd_sql += ", ";
         }
      }
      cmd_sql += ") "
      cmd_sql += "VALUES (";
      for (var col_index = 0; col_index < column_name.length; ++col_index) {
         var current_name = column_name[col_index];
         if (column_type[col_index])  cmd_sql += plan_data[current_name] + " ";
         else cmd_sql +="'" +  plan_data[current_name] + "' ";

         if (col_index == (column_name.length - 1)) {
            cmd_sql += " ";
         } else {
            cmd_sql += ", ";
         }
      }
      cmd_sql += ") ";
      return cmd_sql
   },
   Update: function(table_name, column_name) {
      var cmd_sql = "";
      return cmd_sql
   },
   End: function() {
      var cmd_sql = "; ";
      return cmd_sql
   },
   Execute: function(type, con_db, cmd_sql) {
      var query = con_db.query(cmd_sql);
      query.exec( function( err, res ){
         if( err ){
            console.log(type + ' error');
            console.log(err);
         }else{
            console.log(type + ' success');
         }
      });
   }

}

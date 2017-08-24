//Device manager 2014 4/28 hong-yu chen
var intersection_update = require("./intersection_update");
intersection_update.Initialize();
var update_location = require("./update_location");
update_location.Initialize();
module.exports = {
   Initialize: function() {
   },
   set_connector: function (con_db) {
      this.con_db = con_db;
       intersection_update.set_connector(con_db);
       update_location.set_connector(con_db);
   },
   set_sql_generator: function (sql_generator) {
      this.sql_generator = sql_generator;
   },
   set_selector: function (selector) {
      this.selector = selector;
   },
   Input: function(active, type, input_data) {
      DataAssign(active, type, this.con_db, this.sql_generator, input_data);
   },
   Output: function(web_socket) {
      this.selector.Select(web_socket);
   }
};

function DataAssign(active, type, connector, sql_generator, input_data) {
   switch(active){
      case 'insert':
         console.log("Device insert");
         Insert(type, connector, sql_generator, input_data);
         break;
      case 'delete':
         console.log("Device delete");
         DeleteFrom(type, connector, sql_generator, input_data);
         break;
      case 'select':
         console.log("Device select");
         break;
//      case 'update':
//         console.log("Device update");
//         Update(connector, sql_generator, input_data);
//         break;
       // intersection
       case 'intersection-update':
           console.log("Device manager: intersection-update");
           intersection_update.Update(input_data);
           break;
        case 'location-update':
            console.log("Device manager: location-update");
            update_location.Update(type, input_data);
            break;
      default:
         console.log("Data not be assigned.");
         break;
   }
}

function Insert(type, connector, sql_generator, input_data) {
   var table_name, column_name, column_type;
   switch(type) {
      case "avi":
         table_name = "device_avi";
         column_name = ["latitude", "longitude", "address"];
         column_type = [1, 1, 0];
         break;
      case "controller":
         table_name = "device_controller";
         column_name = ["latitude", "longitude", "address", "intersection_id"];
         column_type = [1, 1, 0, 1];
         break;
      case "trigger_point":
         table_name = "device_trigger_point";
         column_name = ["latitude", "longitude"];
         column_type = [1, 1];
         break;
      default:
         console.log("Data type not be found.");
         break;
   }
   var cmd_sql = "";
   cmd_sql += sql_generator.InsertInto(table_name, column_name, column_type, input_data);
   cmd_sql += sql_generator.End();
   console.log(cmd_sql);
   sql_generator.Execute("Insert device ", connector, cmd_sql);
}

function DeleteFrom(type, connector, sql_generator, input_data) {
   var table_name;
   switch(type) {
      case "avi":
         table_name = "device_avi";
         break;
      case "controller":
         table_name = "device_controller";
         break;
      case "trigger_point":
         table_name = "device_trigger_point";
         break;
      default:
         console.log("Data type not be found.");
         break;
   }
   var column_name = ["id"];
   var column_type = [1];
   var cmd_sql = "";
   cmd_sql += sql_generator.Delete(table_name);
   cmd_sql += sql_generator.Where(column_name, column_type, input_data);
   cmd_sql += sql_generator.End();
   console.log(cmd_sql);
//   sql_generator.Execute("Delete device ", connector, cmd_sql);

}




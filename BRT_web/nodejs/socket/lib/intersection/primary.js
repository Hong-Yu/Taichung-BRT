/**
 * Created by CCT on 2014/5/5.
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
   Output: function(web_socket) {
      SelectFrom(this.con_db, this.sql_generator, web_socket);
   }
};

function SelectFrom(connector, sql_generator, web_socket) {
   var result = new Object();
   var select_index = 0;
   // 0. Select intersection
   var table_name = "intersection";
   var column_name = ["intersection_id", "name", "latitude", "longitude"];
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += "WHERE longitude is not null AND latitude is not null;";
   ExecuteWithResult(connector, result, SendToWebsite, "intersection", web_socket);

   function ExecuteWithResult(connector, result, call_function, mark, web_socket) {
      var query = connector.query(cmd_sql);
      query.exec( function( err, res ){
         if( err ){
            console.log('select error: ', mark);
            console.log(err);
            return;
         }else{
            ++select_index;
            call_function(res.result, mark, result, select_index, web_socket);
         }
      });
   }
   function SendToWebsite(input_data, mark, result, select_index, web_socket) {
      result[mark] = input_data;
      if(select_index == 1) {
         console.log("Ready to send");
         result.FunctionNo = 1000;
         result.MsgTypeNo = 2;
//         console.log(result);
         var json_string = JSON.stringify(result);
         web_socket.send(json_string);
      }
   }
}



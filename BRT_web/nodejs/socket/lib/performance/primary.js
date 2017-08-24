/**
 * Created by hong on 2014/4/22.
 * Modified by Jia on 2014/12/10.
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
   set_route_separator: function (route_separator) {
      this.route_separator = route_separator;
   },
   Output: function(web_socket) {
      // Select(this.con_db, this.sql_generator, this.route_separator, web_socket);
      function CycleStatus3() {
                  if(web_socket.readyState == 3) return; // stop when disconnect.
                  SendToWebsite(web_socket);
                  web_socket.status_timer = setTimeout(arguments.callee, 5000);
               }
                  CycleStatus3();
         // SendToWebsite(web_socket);
      // setInterval(function(){
         // SendToWebsite(web_socket);
      // }, 5000);
   }
};

function SendToWebsite(web_socket) {
   var result={};
      result.CarTravelTime = TravelTimeMaker('car');
      result.BusTravelTime = TravelTimeMaker('bus');
   var dir = '';
   var dir_num = Math.floor(Math.random()*2);
   if(dir_num ===0){
      dir = 'East';
   }else{
      dir = 'West';
   }
   result.Dir = dir;
   var str_time = '';
   var d = new Date();
   str_time = d.toTimeString();
   result.MsgTime = str_time;
      console.log("Ready to send @performance");
      result.FunctionNo = 500;
      result.MsgTypeNo = 2;
//      console.log(result);
      var json_string = JSON.stringify(result);
      try{
         web_socket.send(json_string);
      }catch(e){
         console.log('error @ performance. '+e);
      }
}

function TravelTimeMaker(traffic_string) {
   var result = {};
   var section_1 = 0;
   var section_2 = 0;
   var section_3 = 0;
   var section_4 = 0;

   var sentfrom = '';
   switch(traffic_string){
      case 'car':
         section_1 = Math.floor(Math.random()*3+1);
         section_2 = Math.floor(Math.random()*3+3);
         section_3 = Math.floor(Math.random()*3+3);
         section_4 = Math.floor(Math.random()*4+4);
         sentfrom = 'CHSC';
         break;
      case 'bus':
         section_1 = Math.floor(Math.random()*2+1);
         section_2 = Math.floor(Math.random()*3+2);
         section_3 = Math.floor(Math.random()*3+2);
         section_4 = Math.floor(Math.random()*4+3);
         sentfrom = 'HRC';
         break;
      default:
         console.log('err @ section data maker.');
         break;
   }
   result = {
      OD1: section_1,
      OD2: section_2,
      OD3: section_3,
      OD4: section_4,
      // MsgTime: str_time,
      // Dir: dir,
      SentFrom: sentfrom
   };
//    console.log(result);
   return result;
}



function Select(connector, sql_generator, route_separator, web_socket) {
   var result = new Object();
   var select_index = 0;
   // 1. Intersection with order
   var table_name = "route_intersection";
   var column_name = ["intersection.intersection_id", "intersection.name", "intersection.latitude", "intersection.longitude"];
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += "INNER JOIN intersection ";
   cmd_sql += "ON route_intersection.intersection_id = intersection.intersection_id ";
   cmd_sql += "WHERE route_intersection.route_id = 1";
   console.log(cmd_sql);
   ExecuteWithResult(connector, result, route_separator, SendToWebsite, "int_order", web_socket);

   //
   function ExecuteWithResult(connector, result, route_separator, call_function, mark, web_socket) {
      var query = connector.query(cmd_sql);
      query.exec( function( err, res ){
         if( err ){
            console.log('select error: ', mark);
            console.log(err);
            return
         }else{
            ++select_index;
            call_function(res.result, mark, result, select_index, route_separator, web_socket);
         }
      });
   }
}
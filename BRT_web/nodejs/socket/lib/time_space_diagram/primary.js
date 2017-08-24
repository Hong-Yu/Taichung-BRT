/**
 * Created by CCT on 2014/8/11.
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
   request_seg: function(web_socket, id, date){
      request_segtype(this.con_db, web_socket, id, date);
   },
   request_plan: function(web_socket, this_intersection, next1, next2){
      requestPlan(this.con_db, web_socket, this_intersection, next1, next2);
   }
};

function request_segtype(connector, web_socket, id, date){
   var result_seg={};
   var result={};
   var id = parseInt(id);
   var d = new Date(date);
   var week =d.getDay();
   var week_name="";
   switch (week){
      case 0:
         week_name="sun";
         break;
      case 1:
         week_name="mon";
         break;
      case 2:
         week_name="tue";
         break;
      case 3:
         week_name="wed";
         break;
      case 4:
         week_name="thu";
         break;
      case 5:
         week_name="fri";
         break;
      case 6:
         week_name="sat";
         break;
      default:
         week_name="err";
         break;
   }
   var cmd_sql = "";
   cmd_sql += "SELECT equip_id, "+week_name+" FROM [brt].[dbo].[day_segtype] ";
   cmd_sql += " WHERE  equip_id ="+ id +" OR equip_id ="+ (id+1) +" OR equip_id ="+ (id+2);
   // console.log(cmd_sql);
   var query = connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('select error: timeSpaceDiagram -- request_segtype\n');
         console.log(err);
         return
      }else{
         result_seg = res.result;

         var cmd_sql = "";
         cmd_sql += "SELECT equip_id, plan_id, begin_time, priority_switch FROM [brt].[dbo].[tod_plan]";
         cmd_sql += " WHERE seg_type ="+result_seg[0][week_name]+" AND equip_id ="+id;
         cmd_sql += " OR seg_type ="+result_seg[1][week_name]+" AND equip_id ="+(id+1);
         cmd_sql += " OR seg_type ="+result_seg[2][week_name]+" AND equip_id ="+(id+2);
         console.log(cmd_sql);
         var query = connector.query(cmd_sql);
         query.exec( function( err, res ){
            if( err ){
               console.log('select error: timeSpaceDiagram -- request_segtype -- plain_id\n');
               console.log(err);
               return
            }else{
               result.FunctionNo = 700;
               result.MsgTypeNo = 2;
               result.date = date;
               result.seg_time = res.result;
               console.log(result_seg);
               var json_string = JSON.stringify(result);
               web_socket.send(json_string);
            }
         });
      }
   });
}

function requestPlan(connector, web_socket, intersection, next1, next2) {
   var select_index = 0;
   // 1. intersection name
   var result = new Object();
   var cmd_sql = "";
   cmd_sql += "SELECT intersection_id ,name FROM brt.dbo.intersection ";
   cmd_sql += "WHERE intersection_id ="+ intersection.id +" OR intersection_id ="+ next1.id +" OR intersection_id ="+ next2.id;
   // console.log(cmd_sql);
   ExecuteWithResult(connector, result, SendToWebsite, "intersection", web_socket);

   // 2. direction and sub_phase
   var cmd_sql = "";
   cmd_sql += "SELECT intersection_id, dir, sub_phase FROM brt.dbo.card_direction_blue ";
   cmd_sql += "WHERE  intersection_id ="+ intersection.id +" OR intersection_id ="+ next1.id +" OR intersection_id ="+ next2.id;
   // console.log(cmd_sql);
   ExecuteWithResult(connector, result, SendToWebsite, "dir_phase", web_socket);

   // 3. Data for tsd search by plan_id
   var cmd_sql = "";
   cmd_sql += "SELECT [equip_id],[plan_id],[allred1],[allred2],[allred3],[allred4],[allred5],[allred6],[allred7],[allred8],";
   cmd_sql += "[yellow1],[yellow2],[yellow3],[yellow4],[yellow5],[yellow6],[yellow7],[yellow8],";
   cmd_sql += "[g1],[g2],[g3],[g4],[g5],[g6],[g7],[g8],";
   cmd_sql += "[cycletime],[time_offset] FROM [brt].[dbo].[std_plan]";
   cmd_sql += " WHERE equip_id="+intersection.id+" AND plan_id="+intersection.plan_id;
   cmd_sql += " OR equip_id="+ next1.id +" AND plan_id="+next1.plan_id+" OR equip_id="+ next2.id +" AND plan_id="+next2.plan_id;
   // console.log(cmd_sql);
   ExecuteWithResult(connector, result, SendToWebsite, "tsd_data", web_socket);
   // 4. Distance between intersection
   var cmd_sql = "";
   cmd_sql += "SELECT length_distance FROM brt.dbo.intersection_length ";
   cmd_sql += "WHERE intersection_id ="+ next1.id +" OR intersection_id ="+ next2.id;
   console.log(cmd_sql);
   ExecuteWithResult(connector, result, SendToWebsite, "distance_data", web_socket);
   //
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
}

function SendToWebsite(input_data, mark, result, select_index, web_socket) {
   result[mark] = input_data;
   if(select_index == 4) {
      result.FunctionNo = 700;
      result.MsgTypeNo = 4;
      console.log(result);
      var json_string = JSON.stringify(result);
      web_socket.send(json_string);
   }
}
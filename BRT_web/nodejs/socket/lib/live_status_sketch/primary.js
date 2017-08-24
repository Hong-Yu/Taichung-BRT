/**
 * Created by CCT on 2014/4/21.
 * Modified by Jia on 2014/7/20.
 */
var LightDataObj = {};
module.exports = {
   Initialize: function(con_db) {
      var CardDirectionObj = {};
      // select direction_card data for live light
      //CardDirectionObj={};
      CardDirectionObj = initial_select(con_db);
      this.CardDirectionObj = CardDirectionObj;
      //console.log(CardDirectionObj);
   },
   set_connector: function (con_db) {
      this.con_db = con_db;
   },
   set_sql_generator: function (sql_generator) {
      this.sql_generator = sql_generator;
   },
   Initial: function(web_socket) {
      selectInitial(this.con_db, this.sql_generator, web_socket);
   },
   Output: function(web_socket, route_id) {
      Select(this.con_db, this.sql_generator, web_socket, route_id);
   },
   UpdateState: function(input_data){
      var state = set_state(input_data);
      this.state = state;
      function set_state(input_data){
         var state={};
         state = input_data;
         return state;
      }
  },
   LightSketch: function(input_data){
      // var light =LightProcess(this.con_db, input_data);
      var light = LightProcessSpectial(this.CardDirectionObj, input_data);
      var equip_id = input_data[0].equip_id;
//      console.log(equip_id);
      LightDataObj[equip_id] = {};
      LightDataObj[equip_id] = light;
      // this.Light = light;
      this.Light = LightDataObj;
      // console.log(JSON.stringify(this.Light));
   },
   SendStatus: function(web_socket){
      var state = this.state;
      SendStatusTo(web_socket, state);
   },
   SendLight: function(web_socket){
      var Lightdata= new Object();
      Lightdata.FunctionNo = 400;
      Lightdata.MsgTypeNo = 0;
      // Lightdata.lightStatus = this.Light.directionData;
      // Lightdata.cardData = this.Light.lightData;
      Lightdata.LightAll = this.Light;
      var json_data = JSON.stringify(Lightdata);
      web_socket.send(json_data);
}
};

function selectInitial(connector, sql_generator, web_socket){
   var result = new Object();
   var table_name = "route_list";
   var column_name = ["ID", "name", "color", "intersection_max"];
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   // console.log(cmd_sql);

   var query = connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('Select Error: live_sketch initialize\n');
         console.log(err);
         return
      }else{
         result.FunctionNo = 400;
         result.MsgTypeNo = 4;
         result.routeList =res.result;
//         console.log(result);
         var json_string = JSON.stringify(result);
         web_socket.send(json_string);
      }
   });
}

function Select(connector, sql_generator, web_socket, route_id) {
   var routeId = route_id;
   var result = new Object();
   var select_index = 0;
   // 1. Intersection with order
   var table_name = "route_intersection";
   var column_name = ["intersection.name", "intersection.intersection_id"];
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += "INNER JOIN intersection ";
   cmd_sql += "ON route_intersection.intersection_id = intersection.intersection_id ";
   cmd_sql += "WHERE route_intersection.route_id = "+routeId+" ORDER BY route_intersection.serial_number";
   // console.log(cmd_sql);
   ExecuteWithResult(connector, result, SendToWebsite, "int_order", web_socket);
   // 2. Route_list
   var table_name = "route_list";
   var column_name = ["ID", "name", "color", "intersection_max"];
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += "WHERE ID = " + routeId;
   // console.log(cmd_sql);
   ExecuteWithResult(connector, result, SendToWebsite, "route_list", web_socket);
   var cmd_sql = "";
   cmd_sql += "SELECT intersection_id FROM brt.dbo.route_intersection";
   cmd_sql += " WHERE route_id = '"+routeId+"' ORDER BY serial_number";
   // console.log(cmd_sql);
   ExecuteWithResult(connector, result, SendToWebsite, "equipment_order", web_socket);

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
//    console.log(select_index);
   if(select_index == 3) {
      console.log("Ready to send");
      result.FunctionNo = 400;
      result.MsgTypeNo = 2;
//      console.log(result);
      var json_string = JSON.stringify(result);
      web_socket.send(json_string);
   }
}

function LightProcess(connector,inputdata){
   var result= new Object();
   var cmd_sql = "";
   cmd_sql += "SELECT dir, card, sub_phase FROM [brt].[dbo].[card_direction_blue] ";
   cmd_sql += "WHERE intersection_id ="+inputdata[0].equip_id;
   // console.log(cmd_sql);
   var query = connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('select error: sketch -- LightProcess\n');
         console.log(err);
         return
      }else{
         result.directionData = res.result;
         result.lightData = inputdata;
         this.result = result;
      }
   });
   return this.result;
}

function LightProcessSpectial(CardDirectionObj, input_data){
   var light_obj = {};
   var equip = input_data[0].equip_id;
   var equip_dir0 = equip+'-'+'0';
   var equip_dir1 = equip+'-'+'1';
   var direcdata = [];
   light_obj.lightData = input_data;
   direcdata[0] = CardDirectionObj[equip_dir0];
   direcdata[1]= CardDirectionObj[equip_dir1];
   light_obj.directionData = direcdata;
   return light_obj;
}


function SendStatusTo(web_socket, status) {
   var info_for_sketch= new Object();
   info_for_sketch.FunctionNo = 400;
   info_for_sketch.MsgTypeNo = 8;
   info_for_sketch.status = status;
   var json_data = JSON.stringify(info_for_sketch);
   web_socket.send(json_data);
}

function initial_select(con_db){
   var result= {};
   this.result = result;
   var cmd_sql = "";
   cmd_sql += "SELECT intersection_id, dir, card, sub_phase FROM [brt].[dbo].[card_direction_blue]";
//   cmd_sql += "WHERE intersection_id ="+inputdata[0].equip_id;
   // console.log(cmd_sql);
   var query = con_db.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('select error: sketch -- initial_select\n');
         console.log(err);
      }else{
//         result = res.result;
         //console.log('Initial select Card_Direction data for blue line: '+res.result);
         var temp = res.result;
         for(var r=0; r< temp.length; ++r){
            var prop_name = temp[r].intersection_id+'-'+temp[r].dir;
            result[prop_name] = {};
            result[prop_name] = temp[r];
         }
//         result.lightData = inputdata;
         this.result = result;
//         console.log(this.result);
      }
   });
   return this.result;
}
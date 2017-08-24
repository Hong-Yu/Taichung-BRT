/**
 * Created by Jia on 2014/7/15.
 */
//var phase_no = "01";

module.exports = {
   Initialize: function() {
   },
   set_connector: function (con_db) {
      this.con_db = con_db;
   },
   set_sql_generator: function (sql_generator) {
      this.sql_generator = sql_generator;
   },
   Output: function(web_socket, phase_no, LCN) {
       selectDown(this.con_db, this.sql_generator,web_socket, phase_no, LCN);
   },
   select_data: function(web_socket, phase_no) {
      selectFrom(this.con_db, this.sql_generator, web_socket, phase_no);
   },
   select_phase: function(web_socket, phase_no){
      selectPhase(this.con_db, this.sql_generator, web_socket, phase_no);
   },
   update_phase: function(web_socket, phase_no, phasedata){
      updatePhase(this.con_db, this.sql_generator, web_socket, phase_no, phasedata);
   },
    Input: function(input_data){
        SendToTC(input_data);
    }
};
function SendToTC(input_data) {
    var dgram = require('dgram');
    var message = new Buffer(input_data);
    var client = dgram.createSocket('udp4');
    var host = "192.168.1.41";
    var port = 10002;
    client.send(message, 0, message.length, port, host, function(err, bytes){
        console.log(message);
        console.log(err, bytes);
        client.close();
    })
}

function selectPhase(connector, sql_generator, web_socket, phase_no){
   var result = new Object();
   var table_name = "phase_light";
   var column_name = ["r1", "y1", "g1", "g1_left", "g1_dir", "g1_right", "pg1", "pgf1", "pr1",
      "r2", "y2", "g2", "g2_left", "g2_dir", "g2_right", "pg2", "pgf2", "pr2",
      "r3", "y3", "g3", "g3_left", "g3_dir", "g3_right", "pg3", "pgf3", "pr3",
      "r4", "y4", "g4", "g4_left", "g4_dir", "g4_right", "pg4", "pgf4", "pr4",
      "r5", "y5", "g5", "g5_left", "g5_dir", "g5_right", "pg5", "pgf5", "pr5",
      "r6", "y6", "g6", "g6_left", "g6_dir", "g6_right", "pg6", "pgf6", "pr6"];
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += "WHERE phase_no = '"+ phase_no +"'";
   console.log(cmd_sql);

   var query = connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('select error: phase-lighting selectPhase\n');
         console.log(err);
         return
      }else{
         result.FunctionNo = 203;
         result.MsgTypeNo = 3;
         result.phase_no = phase_no;
         result.phasedata = res.result;
//         console.log(result);
         var json_string = JSON.stringify(result);
         web_socket.send(json_string);
//         console.log('database connect success,\n');
      }
   });
}

function selectFrom(connector, sql_generator, web_socket, phase_no) {
   var result = new Object();
   var cmd_sql = "";
       cmd_sql +="SELECT phase_no, phase_name, phase_total, phase_step";
       cmd_sql +=" FROM phase";

   var query = connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('select error: phase-lighting\n');
         console.log(err);
         return
      }else{
         result.FunctionNo = 203;
         result.MsgTypeNo = 5;
         result.phase = res.result;
//         console.log(result);
         var json_string = JSON.stringify(result);
         web_socket.send(json_string);
//         console.log('database connect success,\n');
      }
   });
   selectPhase(connector, sql_generator, web_socket, phase_no);
}

//update DB and send result
function updatePhase(connector, sql_generator, web_socket, phase_no, phasedata){
   var result = new Object();
   var table_name = "[brt].[dbo].[phase_light]";
   var cmd_sql ="";
   for(var s = 0; s < phasedata.length; ++s){
   cmd_sql += " UPDATE " +table_name ;
   cmd_sql += " SET r1="+ phasedata[s].r1 + ", y1=" +phasedata[s].y1+", g1=" +phasedata[s].g1+", g1_left=" +phasedata[s].g1_left+", g1_dir="
      +phasedata[s].g1_dir+", g1_right=" +phasedata[s].g1_right+", pg1=" +phasedata[s].pg1+", pgf1=" +phasedata[s].pgf1+", pr1=" +phasedata[s].pr1
      +", r2="+ phasedata[s].r2 + ", y2=" +phasedata[s].y2+", g2=" +phasedata[s].g2+", g2_left=" +phasedata[s].g2_left+", g2_dir="
      +phasedata[s].g2_dir+", g2_right=" +phasedata[s].g2_right+", pg2=" +phasedata[s].pg2+", pgf2=" +phasedata[s].pgf2+", pr2=" +phasedata[s].pr2
      +", r3="+ phasedata[s].r3 + ", y3=" +phasedata[s].y3+", g3=" +phasedata[s].g3+", g3_left=" +phasedata[s].g3_left+", g3_dir="
      +phasedata[s].g3_dir+", g3_right=" +phasedata[s].g3_right+", pg3=" +phasedata[s].pg3+", pgf3=" +phasedata[s].pgf3+", pr3=" +phasedata[s].pr3
      +", r4="+ phasedata[s].r4 + ", y4=" +phasedata[s].y4+", g4=" +phasedata[s].g4+", g4_left=" +phasedata[s].g4_left+", g4_dir="
      +phasedata[s].g4_dir+", g4_right=" +phasedata[s].g4_right+", pg4=" +phasedata[s].pg4+", pgf4=" +phasedata[s].pgf4+", pr4=" +phasedata[s].pr4
      +", r5="+ phasedata[s].r5 + ", y5=" +phasedata[s].y5+", g5=" +phasedata[s].g5+", g5_left=" +phasedata[s].g5_left+", g5_dir="
      +phasedata[s].g5_dir+", g5_right=" +phasedata[s].g5_right+", pg5=" +phasedata[s].pg5+", pgf5=" +phasedata[s].pgf5+", pr5=" +phasedata[s].pr5
      +", r6="+ phasedata[s].r6 + ", y6=" +phasedata[s].y6+", g6=" +phasedata[s].g6+", g6_left=" +phasedata[s].g6_left+", g6_dir="
      +phasedata[s].g6_dir+", g6_right=" +phasedata[s].g6_right+", pg6=" +phasedata[s].pg6+", pgf6=" +phasedata[s].pgf6+", pr6=" +phasedata[s].pr6;
   cmd_sql += " WHERE step="+ (s+1) + " AND phase_no='"+ phase_no+"'";
   }
   console.log(cmd_sql);

   var query = connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('UPDATE error: phase-lighting\n');
         console.log(err);
         return
      }else{
         result.FunctionNo = 203;
         result.MsgTypeNo = 7;
         var json_string = JSON.stringify(result);
         web_socket.send(json_string);
      }
   });
}
function selectDown(connector, sql_generator, web_socket, phase_no, lcn){
    var result = new Object();
    var table_name = "phase_light";
    var column_name = ["r1", "y1", "g1", "g1_left", "g1_dir", "g1_right", "pg1", "pgf1", "pr1",
        "r2", "y2", "g2", "g2_left", "g2_dir", "g2_right", "pg2", "pgf2", "pr2",
        "r3", "y3", "g3", "g3_left", "g3_dir", "g3_right", "pg3", "pgf3", "pr3",
        "r4", "y4", "g4", "g4_left", "g4_dir", "g4_right", "pg4", "pgf4", "pr4",
        "r5", "y5", "g5", "g5_left", "g5_dir", "g5_right", "pg5", "pgf5", "pr5",
        "r6", "y6", "g6", "g6_left", "g6_dir", "g6_right", "pg6", "pgf6", "pr6"];
    var cmd_sql = "";
    cmd_sql += sql_generator.Select(table_name, column_name);
    cmd_sql += "WHERE phase_no = '"+ phase_no +"'";

    var query = connector.query(cmd_sql);
    query.exec( function( err, res ){
        if( err ){
            console.log('select error: phase-lighting selectDown\n');
            console.log(err);
            return
        }else{

            result.FunctionNo = 203;
            result.MsgTypeNo = 9;
            result.Time = new Date();
            result.LCN = lcn;
            result.phase_no = phase_no;
            result.phase_data = res.result;
            console.log(JSON.stringify(result));
            var json_string = JSON.stringify(result);
            web_socket.send(json_string);
        }
    });
}
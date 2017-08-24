/**
 * Created by hong on 2014/6/4.
 * Modify by Jia on 2014/9/10.
 */

module.exports = {
   Initialize : function(ms_connector, sql_generator) {
      this.ms_connector = ms_connector;
      this.sql_generator = sql_generator;
   },
   PhaseList : function(response) {
      PhaseList(this.ms_connector, this.sql_generator, response);
   },
   PhaseUpdate : function(input_data, response) {
      for (var data_index = 0; data_index < input_data.length; ++data_index) {
         phase_new_phase(this.ms_connector, this.sql_generator, input_data[data_index], response);
      }
   },
   PhaseDelete : function(input_data, response){
      phaseDelete(this.ms_connector, this.sql_generator, input_data, response);
   },
   PhaseRenew : function(input_data, response){
      phaseRenew(this.ms_connector, this.sql_generator, input_data, response);
   },
   PhaseRenewStep : function(input_data, response){
      phaseRenewStep(this.ms_connector, this.sql_generator, input_data, response);
   }
};


function PhaseList(ms_connector, sql_generator, response) {
   var table_name = "phase";
   var cmd_sql = "";
   cmd_sql += "SELECT * FROM " + table_name + " ";
   var success = new Successful();
   success.set_response(response);
   var fail = new Fail();
   fail.set_response(fail);
   sql_generator.ExecuteWith("select user account ", ms_connector, cmd_sql, success, fail);
   function Successful() {
      this.set_response =set_response;
      function set_response(response) {
         this.response = response;
      }
      this.set_result = set_result;
      function set_result(result) {
         this.result = result;
      }
      this.Response = Response;
      function Response() {
         response.json({ successful: true, phase: this.result.result });
      }
   }
   function Fail() {
      this.set_response = set_response;
      function set_response(response) {
         this.response = response;
      }
      this.set_error = set_error;
      function set_error(error) {
         this.error = error;
      }
      this.Response = Response;
      function Response() {
         // response.json({ successful: false, message: err });
      }
   }
}

function phase_new_phase(ms_connector, sql_generator, input_data, response){
   var phase_step = parseInt(input_data.phase_step);
   var phase_total = parseInt(input_data.phase_total);
   var cmd_sql = "";
   cmd_sql += "INSERT INTO [brt].[dbo].[phase] ([phase_no], [phase_name], [phase_total], [phase_step]) ";
   cmd_sql += " VALUES ('"+input_data.phase_no+"', '"+input_data.phase_name+"', "+phase_total+", "+phase_step+") ";
   sql_generator.Execute('Phase Insert,', ms_connector, cmd_sql);
   var cmd_sql_step = '';
      cmd_sql_step += "INSERT INTO [brt].[dbo].[phase_light] ([phase_no],[step],[g1],[g1_dir],[g1_left],[g1_right],[y1],[r1],[pg1],[pgf1]" +
         ",[g2],[g2_dir],[g2_left],[g2_right],[y2],[r2],[pg2],[pgf2],[g3],[g3_dir],[g3_left],[g3_right],[y3],[r3],[pg3],[pgf3]" +
         ",[g4],[g4_dir],[g4_left],[g4_right],[y4],[r4],[pg4],[pgf4],[g5],[g5_dir],[g5_left],[g5_right],[y5],[r5],[pg5],[pgf5]" +
         ",[g6],[g6_dir],[g6_left],[g6_right],[y6],[r6],[pg6],[pgf6],[pr1],[pr2],[pr3],[pr4],[pr5],[pr6]) VALUES ";
   for(var index=1; index<=phase_step; ++index){
      // console.log(index, phase_step);
      if(index === phase_step){
         cmd_sql_step+=" ('"+input_data.phase_no+"',"+index+",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)";
      }else{
         cmd_sql_step+=" ('"+input_data.phase_no+"',"+index+",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),";
      }
   }
  console.log(cmd_sql_step);
   var query = ms_connector.query(cmd_sql_step);
   query.exec( function( err, res ){
      if( err ){
         console.log('new_phase error: phase-modify phase_new_phase\n');
         console.log(err);
         response.json({ successful: false, message: err });
         return;
      }else{
         console.log('new_phase success: phase-modify phase_new_phase\n');
         response.json({ successful: true, message: "Renew successful" });
      }
   });
}

function phaseDelete(ms_connector, sql_generator, input_data, response){
   var cmd_sql = "";
   cmd_sql += 'DELETE FROM [brt].[dbo].[phase] ';
   cmd_sql += "WHERE phase_no='"+input_data+"' ";
   cmd_sql += ' DELETE FROM [brt].[dbo].[phase_light] ';
   cmd_sql += "WHERE phase_no='"+input_data+"'";
//   console.log(cmd_sql);
   var query = ms_connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('delete error: phase-modify phaseDelete\n');
         console.log(err);
         response.json({ successful: false, message: err });
         return
      }else{
         console.log('delete success: phase-modify phaseDelete\n');
         response.json({ successful: true, message: "Delete successful" });
      }
   });
}

function phaseRenew(ms_connector, sql_generator, input_data, response){
   var phase_step = parseInt(input_data[4]);
   var phase_total = parseInt(input_data[3]);
   var cmd_sql = "";
   cmd_sql += "UPDATE phase SET phase_name = '"+input_data[2]+"', ";
   cmd_sql += "phase_total="+phase_total+", phase_step="+ phase_step;
   cmd_sql += " WHERE phase_no='"+input_data[1]+"'";
//   console.log(cmd_sql);
   var query = ms_connector.query(cmd_sql);
   query.exec( function( err, res ){
      if( err ){
         console.log('renew error: phase-modify phaseRenew\n');
         console.log(err);
         response.json({ successful: false, message: err });
         return
      }else{
         console.log('renew success: phase-modify phaseRenew\n');
         response.json({ successful: true, message: "Renew successful" });
      }
   });
}

function phaseRenewStep(ms_connector, sql_generator, input_data, response){
   var phase_step = parseInt(input_data[4]);
   var phase_total = parseInt(input_data[3]);
   var cmd_sql = "";
   cmd_sql += "UPDATE brt.dbo.phase SET phase_name = '"+input_data[2]+"', ";
   cmd_sql += "phase_total="+phase_total+", phase_step="+ phase_step;
   cmd_sql += " WHERE phase_no='"+input_data[1]+"' ";
   cmd_sql += " DELETE FROM brt.dbo.phase_light WHERE phase_no='"+input_data[1]+"' ";
   sql_generator.Execute('Phase Update and Phase_step Delete,', ms_connector, cmd_sql);
   var cmd_sql_step ='';
      cmd_sql_step += "INSERT INTO [brt].[dbo].[phase_light] ([phase_no],[step],[g1],[g1_dir],[g1_left],[g1_right],[y1],[r1],[pg1],[pgf1]" +
         ",[g2],[g2_dir],[g2_left],[g2_right],[y2],[r2],[pg2],[pgf2],[g3],[g3_dir],[g3_left],[g3_right],[y3],[r3],[pg3],[pgf3]" +
         ",[g4],[g4_dir],[g4_left],[g4_right],[y4],[r4],[pg4],[pgf4],[g5],[g5_dir],[g5_left],[g5_right],[y5],[r5],[pg5],[pgf5]" +
         ",[g6],[g6_dir],[g6_left],[g6_right],[y6],[r6],[pg6],[pgf6],[pr1],[pr2],[pr3],[pr4],[pr5],[pr6]) VALUES ";
   for(var index=1; index<=phase_step; ++index){
      if(index === phase_step){
         cmd_sql_step+=" ('"+input_data[1]+"',"+index+",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0) ";
      }else{
         cmd_sql_step+=" ('"+input_data[1]+"',"+index+",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),";
      }
   }
//   console.log(cmd_sql_step);
   var query = ms_connector.query(cmd_sql_step);
   query.exec( function( err, res ){
      if( err ){
         console.log('renew error: phase-modify phaseRenew\n');
         console.log(err);
         response.json({ successful: false, message: err });
         return
      }else{
         console.log('renew success: phase-modify phaseRenew\n');
         response.json({ successful: true, message: "Renew successful" });
      }
   });
}
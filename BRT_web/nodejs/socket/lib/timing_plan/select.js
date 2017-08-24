/**
 * Created by CCT on 2014/4/29.
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
   Select: function(web_socket, equipment_id) {
      SelectFrom(this.con_db, this.sql_generator, web_socket, equipment_id);
   }
};

function SelectFrom(connector, sql_generator, web_socket, equipment_id) {
   var result = new Object();
   var select_index = 0;
   // 1. Select std plan
   var table_name = "std_plan";
   var column_name = ["equip_id", "plan_id", "phase_no", "cycletime", "time_offset"];
   SequencialName("allred", 8, column_name);
   SequencialName("yellow", 8, column_name);
   SequencialName("g", 8, column_name);
   SequencialName("pgflash", 8, column_name);
   SequencialName("pred", 8, column_name);
   SequencialName("ming", 8, column_name);
   SequencialName("maxg", 8, column_name);
   var cmd_sql = "";
   cmd_sql += sql_generator.Select(table_name, column_name);
   cmd_sql += "WHERE equip_id =" + equipment_id + ";";
   ExecuteWithResult(connector, result, SendToWebsite, "std_plan", web_socket);
   // 2. Select segment type.
   var table_name = "day_segtype";
   var cmd_sql = "SELECT * FROM " + table_name + " ";
   cmd_sql += "WHERE equip_id =" + equipment_id + ";";
//   console.log(cmd_sql);
   ExecuteWithResult(connector, result, SendToWebsite, "day_segtype", web_socket);
   // 3. Select tod plan.
   var table_name = "tod_plan";
   var cmd_sql = "";
   cmd_sql += "SELECT * FROM " + table_name + " ";
   cmd_sql += "WHERE equip_id =" + equipment_id + ";";
   ExecuteWithResult(connector, result, SendToWebsite, "tod_plan", web_socket);
   // 4. Select phase ps. equipment id is not available here.
   var table_name = "phase";
   var cmd_sql = "SELECT * FROM " + table_name + ";";
   ExecuteWithResult(connector, result, SendToWebsite, "phase", web_socket);
   // 5. Select priority parameter.
   var table_name = "priority_control";
   var cmd_sql = "SELECT * FROM " + table_name + " ";
   cmd_sql += "WHERE equip_id =" + equipment_id + ";";
   ExecuteWithResult(connector, result, SendToWebsite, "priority_control", web_socket);

   function SequencialName(name, length, column_name) {
      var begin = column_name.length;
      var end = begin + length;
      var value = 0;
      for(var col_index = begin; col_index < end; ++col_index){
         column_name[col_index] = name + ++value;
      }
   }
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
//            call_function(res.result, mark, result, select_index, web_socket);
            call_function(res, mark, result, select_index, web_socket);
         }
      });
   }
}

function SendToWebsite(input_data, mark, result, select_index, web_socket) {
   result[mark] = input_data;
//    console.log(select_index);
   if(select_index == 5) {
      console.log("Ready to send");
      result.FunctionNo = 1;
      result.MsgTypeNo = 1;
       if (result.day_segtype.rowcount == 0) result.day_segtype.result[0] = SegmantTypeDataConstruct();
//      console.log(result);
      var json_string = JSON.stringify(result);
      web_socket.send(json_string);
   }
}

function SegmantTypeDataConstruct() {
    var segment_type_data = new Object;
    var week_days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat",
        "even_sun", "even_mon", "even_tue", "even_wed", "even_thu", "even_fri", "even_sat"];
    for (var day_index = 0; day_index < week_days.length; ++day_index) {
        segment_type_data[week_days[day_index]] = 1;
    }
    segment_type_data.sun = 2;
    for (var type_index = 1; type_index <= 13; ++type_index) {
        var name_start = 'spc' + type_index + '_startdate';
        var name_end = 'spc' + type_index + '_enddate';
        segment_type_data[name_start] = "2014-01-01";
        segment_type_data[name_end] = "2014-01-01";
    }
    return segment_type_data;
}


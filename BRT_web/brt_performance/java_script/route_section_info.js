/**
 * Created by CCT on 2014/4/23.
 */

var RouteSectionObj = {};
var RouteSectionObj_2 = {};
var RouteSectionObj_3 = {};
var RouteSectionObj_4 = {};
var TravelTimeObj = {};
var ToggleFlag = '';

var RouteSectionMethod = {
   ToggleNow:function(name){
      ToggleFlag = name;
   },
   ToggleTable: function(section){
      $('div.waiting_message').hide();
      $('div.route_sketch').show();
      $('table.info_table').show();
      var name_begin = '';
      var name_end = '';
      switch(section){
         case 'aviGD':
            name_begin = '國際街口';
            name_end = '東大路口';
            break;
         case 'aviDA':
            name_begin = '東大路口';
            name_end = '安和路口';
            break;
         case 'aviAH':
            name_begin = '安和路口';
            name_end = '惠來路口';
            break;
         case 'aviHS':
            name_begin = '惠來路口';
            name_end = '篤信街口';
            break;
         default:
            console.log('toggle table error.');
            break;
      }
      $('.name_begin').text(name_begin);
      $('.name_end').text(name_end);
      $('#illustration .east_bus')[0].style.stroke = '#66CCFF';
      $('#illustration .east_car')[0].style.stroke = '#000000';
      $('#illustration .west_bus')[0].style.stroke = '#0000FF';
      $('#illustration .west_car')[0].style.stroke = '#000000';
   }
};


function RouteSectionInfo() {
   // Public member ----------------------------------------------------------

   this.set_input_data =set_input_data;
   function set_input_data(input_data) {
      this.input_data = input_data;
   }
   this.ShowTable =ShowTable;
   function ShowTable(section_index) {
      $("div.waiting_message").empty();
      $("table.info_table").show();
      console.log(section_index);
      this.InsertToTable(this.input_data[section_index]);
   }
   this.PaintSketchMap =PaintSketchMap;
   function PaintSketchMap(section_index){
      this.ColorSketchMap(this.input_data[section_index]);

   }

   // Private member ---------------------------------------------------------
   this.InsertToTable =InsertToTable;
   function InsertToTable(section_data) {
      var text_set = [];
      text_set[0] = section_data.begin_name;
      text_set[1] = section_data.travel_time_fwd[0];
      text_set[2] = section_data.travel_time_fwd[1];
      text_set[3] = section_data.travel_time_fwd[2];
      text_set[4] = section_data.end_name;
      text_set[5] = section_data.travel_time_rev[0];
      text_set[6] = section_data.travel_time_rev[1];
      text_set[7] = section_data.travel_time_rev[2];
      text_set[8] = section_data.distance;
      text_set[9] = section_data.tt_total_fwd[0];
      text_set[10] = section_data.tt_total_fwd[1];
      text_set[11] = section_data.tt_total_fwd[2];
      text_set[12] = section_data.distance;
      text_set[13] = section_data.tt_total_rev[0];
      text_set[14] = section_data.tt_total_rev[1];
      text_set[15] = section_data.tt_total_rev[2];
      var domain_info_body = $("table.info_table").find("div.info_body");
      for (var element_index = 0; element_index < domain_info_body.length; element_index++) {
         var target = domain_info_body[element_index];
         $(target).text(text_set[element_index]);
      }
   }
   this.ColorSketchMap = ColorSketchMap;
   function ColorSketchMap(section_data) {
      $("div.route_sketch").find("div.name_begin").text(section_data.begin_name);
      $("div.route_sketch").find("div.name_end").text(section_data.end_name);

   }




}

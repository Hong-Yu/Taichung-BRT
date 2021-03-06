/**
 * Created by CCT on 2014/5/5.
 */
function Intersection() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      // do something here ...
   }
   this.set_web_socket = set_web_socket;
   function set_web_socket(web_socket) {
      this.web_socket = web_socket;
   }
   this.Insert = Insert;
   function Insert(input_data) {
      this.InsertSelectList(input_data);
//      this.RequestPlanData(this.web_socket);
   }
   this.Listen = Listen;
   function Listen() {
      ListenChange(this.web_socket);
   }

   // Private member ----------------------------------------------------------
   this.InsertSelectList = InsertSelectList;
   function InsertSelectList(input_data) {
      var domain_intersection = $("div.intersection select");
      var option_dir;
      for (var data_index = 0; data_index < input_data.length; ++data_index) {
         var current_data = input_data[data_index];
         option_dir = document.createElement('option');
         option_dir.innerHTML = "  " + LengthMakeUp(current_data.intersection_id) + " " + current_data.name ;
         option_dir.setAttribute("mark", current_data.intersection_id);
         domain_intersection.append(option_dir);
      }
      // display equipment id to page content.
      var int_id = $("div.intersection select").find("option:selected").attr("mark");
      $("span.equipment_id").text(LengthMakeUp(int_id));
   }
   this.ListenChange = ListenChange;
   function ListenChange(web_socket) {
      var domain_intersection = $("div.intersection select");
      domain_intersection.bind("change", Intersection_change);
      function Intersection_change(event) {
         $('.status ').children().remove();
         var target = event.currentTarget;
         var domain_select = $(target).find("option:selected");
         var int_id = domain_select.attr("mark");
         $("span.equipment_id").text(LengthMakeUp(int_id));
         console.log(int_id);
         $('#current_section').empty();
         $('#current_section').text('目前所選設備編號: '+int_id);
         $('#query_result').empty();
      }
   }
   function LengthMakeUp(value) {
      var text = value.toString();
      if (value < 10) text = "000" + value;
      else if (value < 100) text = "00" + value;
      else if (value < 1000) text = "0" + value;
      return text;
   }
//   this.RequestPlanData = RequestPlanData;
//   function RequestPlanData(web_socket) {
//      var domain_select = $("select.intersection").find("option:selected");
//      console.log(web_socket);
//      var equip_id = domain_select.attr("mark");
//      var json_data = {};
//      json_data.FunctionNo = 1;
//      json_data.MsgTypeNo = 0;
//      json_data.equip_id = equip_id;
////      var json = JSON.stringify(json_data);
//      web_socket.Send(json_data);
//      RefreshPartPage();
//   }
   function RefreshPartPage() {
      HideTableAll();
      function HideTableAll() {
         for (var table_index = 0; table_index < 32; table_index++) {
            var table_id = '#timing_plan_table' + (table_index + 1);
            var domain = $(table_id);
            if (domain.length == 0) continue;
            domain.css("display", "none");
         }
      }
   }


}

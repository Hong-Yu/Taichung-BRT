/**
 * Created by CCT on 2014/5/5.
 */
function Intersection() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
   }
   this.set_web_socket = set_web_socket;
   function set_web_socket(web_socket) {
      this.web_socket = web_socket;
   }
   this.Insert = Insert;
   function Insert(input_data) {
      this.InsertSelectList(input_data);
      // this.RequestPlanData(this.web_socket);

   }
   this.Listen = Listen;
   function Listen() {
      this.ListenChange(this.web_socket);

   }

   // Private member ----------------------------------------------------------
   this.InsertSelectList = InsertSelectList;
   function InsertSelectList(input_data) {
      var domain_intersection = $("select.intersection");
      var str_opt = "<option disabled selected>請選擇路口</option>";
      domain_intersection.append(str_opt);
      var option_dir;
      for (var data_index = 0; data_index < input_data.length; ++data_index) {
         var current_data = input_data[data_index];
         option_dir = document.createElement('option');
         option_dir.innerHTML = current_data.intersection_id+' '+current_data.name;
         option_dir.setAttribute("mark", current_data.intersection_id);
         domain_intersection.append(option_dir);
      }
   }
   this.ListenChange = ListenChange;
   function ListenChange(web_socket) {
      var domain_intersection = $("select.intersection");
      domain_intersection.bind("change", Intersection_change);
      function Intersection_change(event) {
         var target = event.currentTarget;
         var domain_select = $(target).find("option:selected");
         var int_id = domain_select.attr("mark");
         // console.log(int_id);
         // RequestPlanData(web_socket);
         var data_from = $('#data_from_form :input[name="data_from"]:checked').val();
         console.log(data_from);
         if(data_from === 'TC'){
           QuerySegType(web_socket);
         }else if(data_from === 'DB'){
           QueryFromDB(web_socket);
         }
         $('#status_for_db').hide();
         $('#connect_fail').hide();
        $('#table_calendar').hide();
        $('#timer_plan').hide();
        $('.segment_type').hide();
        $('#plan_table').empty();
         $('.progress').show();
         $('#progress_seg').attr('style', 'width: 20%');
         CheckTimeout();

      function QuerySegType(web_socket){
        var json_data={};
        json_data.FunctionNo ='query';
        json_data.MsgTypeNo ='segtype';
        json_data.LCN =int_id;
        // var json = JSON.stringify(json_data);
        // console.log(json);
        web_socket.Send(json_data);
      }
      function QueryFromDB(web_socket){
        var json_data={};
        json_data.FunctionNo ='query';
        json_data.MsgTypeNo ='fromdb';
        json_data.LCN =int_id;
        // var json = JSON.stringify(json_data);
        console.log(json_data);
        web_socket.Send(json_data);
      }
      function CheckTimeout(){
       setTimeout(function (){
           var success_count =$('#progress_seg')[0].attributes[6].value;
           if(success_count === 'width: 20%'){
            $('.progress').hide();
            $('#connect_fail').show();
               console.log('Time out: web socket');
           }else{}
       }, 60000);
      }
      }
   }
//    this.RequestPlanData = RequestPlanData;
//    function RequestPlanData(web_socket) {
//       var domain_select = $("select.intersection").find("option:selected");
// //      console.log(web_socket);
//       var equip_id = domain_select.attr("mark");
//       var json_data = {};
//       json_data.FunctionNo = 1;
//       json_data.MsgTypeNo = 0;
//       json_data.equip_id = equip_id;
// //      var json = JSON.stringify(json_data);
//       web_socket.Send(json_data);
//       RefreshPartPage();
//    }
   function RefreshPartPage() {
      $("#plan_table").find("select.phase_list").empty();
      HideTableAll();
      function HideTableAll() {
         for (var table_index = 0; table_index < 32; table_index++) {
            var table_id = '#timing_plan_table' + (table_index + 1);
            var domain = $(table_id);
            if (domain.length == 0) continue;
            domain.css("display", "none");
         }
      }
       // Clear animated bar
       $('#centerview').find("div.progress-striped").empty();
       var html = '<option>Waiting To Connect to Server ...</option>';
       $('#centerview').find("select.form-control").empty().append(html);

   }


}

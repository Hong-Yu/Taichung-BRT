/**
 * Created by hong on 2014/6/9.
 */
function TimingPlanMain() {
   var domain_main;
   domain_main=$('#centerview').empty();
   $.get("timing_plan/sub_page/main.html", function(data) {
      domain_main.prepend(data);
      PrimaryDataProcess();
   });
   function PrimaryDataProcess() {
//      calendar.Initialize();
      var timing_plan_table = new TimingPlanTable();
      timing_plan_table.Initialize(32);

      var segment_type_conjunct = new SegmentTypeConjunct();
      segment_type_conjunct.Initialize();
      var muti_class = new Object();
      muti_class.segment_type_conjunct = segment_type_conjunct;
       var calendar = new Calendar();
       calendar.Initialize();
       calendar.set_segment_class(segment_type_conjunct);
       calendar.Listener();
      var web_socket = new TimePlanWebSocket();
      web_socket.Initialize();
      web_socket.set_muti_class(muti_class);
      web_socket.Connect();

   }
}
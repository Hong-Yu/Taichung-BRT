/**
 * Created by CCT on 2014/2/20.
 */
function PhaseLightingMain() {
   var domain_main;
   domain_main=$('#centerview').empty();
   $.get("phase_lighting/sub_page/table1.html", function(data) {
      domain_main.prepend(data);
      PrimaryDataProcess();
   });
   function PrimaryDataProcess() {
      var web_socket = new PhaseLightingWebSocket();
      web_socket.Initialize();
      web_socket.Connect();
   }
}
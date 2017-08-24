/**
 * Created by CCT on 2014/2/20.
 */
function TimeSpaceMain() {
   var domain_main;
   domain_main=$('#centerview').empty();

   $.get("time_space_diagram/sub_page/main.html", function(data) {
      domain_main.append($('<div id="googleMap" class="google_map" style="width:850px;height:400px;"></div>'));
      domain_main.append(data);
      PrimaryDataProcess();
   });

   function PrimaryDataProcess() {

      var map_manager = new MapManager();
      var google_map = map_manager.Initialize();

      var web_socket = new TimeSpaceWebSocket();
      web_socket.Initialize();
      web_socket.Connect();
   }
}

/**
 * Created by CCT on 2014/4/30.
 */
function DeviceInformationMain() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   $.get("device_manager/sub_page/main.html", function(data) {
      domain_main.prepend(data);
      PrimaryDataProcess();
   });
   function PrimaryDataProcess() {
      // multifunction manager
      var map_manager = new MapManager();
      var google_map = map_manager.Initialize();
      // map draw
      var map_draw = new MapDraw();
      map_draw.Initialize();
      map_draw.set_google_map(google_map);
      // Establish websocket connector to server side.
      var web_socket = new DeviceWebSocket();
      web_socket.Initialize();
      web_socket.set_map_draw(map_draw);
      web_socket.Connect();
       $("div.device_connect_status").bind("change", function() {
           console.log("selector has been changed");
       });
   }
}
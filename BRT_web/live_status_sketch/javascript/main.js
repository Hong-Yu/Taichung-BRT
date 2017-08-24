function LiveSketchMain() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   $.get("live_status_sketch/sub_page/main.html", function(data) {
      domain_main.prepend(data);
      RouteMapWaiting();
      PrimaryDataProcess();
   });


   function RouteMapWaiting(){
      var route_manager = new RouteMapManager();
      route_manager.Waiting();

   }
   function PrimaryDataProcess() {
      // Connect to NodeJs server
      var web_socket = new RouteWebSocket();
      web_socket.Initialize();
      web_socket.Connect();
   }
}
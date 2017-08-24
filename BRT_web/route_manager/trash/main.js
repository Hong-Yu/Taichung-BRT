

function RouteManagerMain() {
//   var domain_main;
//   domain_main=$('#centerview').empty().css('background-color','transparent');
//   $.get("route_manager/sub_page/main.html", function(data) {
//      RoadNumberSet();
//      domain_main.prepend(data);
//
//   });
    RouteMapWaiting();
//    EventListener();

   function RouteMapWaiting(){
      var route_manager = new RouteMapManager();
      route_manager.Waiting();

   }
   function EventListener() {
      var insert_manager = new InsertManager();
      // Connect to NodeJs server
      var web_socket = new RouteWebSocket();
      web_socket.Initialize();
      web_socket.set_data_manager(insert_manager);
      web_socket.Connect();

      var event = new EventManager();
      event.set_data_manager(insert_manager);
      event.Bind();
      // Upload listener
      var upload = new UploadManager();
      upload.set_connector(web_socket);
      upload.Listen();

   }

   function RoadNumberSet() {
      var array = [];
      for (var road_index = 0; road_index < 20; ++road_index) {

         array[road_index] = Math.floor((Math.random()*100)+1);
      }
      console.log(array);
   }


}

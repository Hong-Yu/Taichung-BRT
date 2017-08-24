/**
 * Created by hong on 2014/4/26.
 */

function DeviceManagerMain() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   $.get("device_manager/sub_page/main.html", function(data) {
      domain_main.prepend(data);
      PrimaryDataProcess();
   });

   function PrimaryDataProcess() {
      // multifunction manager
      var multifunction = new MultifunctionManager();
      multifunction.Initialize();
      // The major role of Tool bar event function is to listen tool bar button and
      // trigger corresponding event.
      var tool_event = new ToolBarEvent();
      tool_event.set_multifunction(multifunction);

      var map_manager = new MapManager();
      var google_map = map_manager.Initialize();
      map_manager.set_tool_bar_event(tool_event);
      map_manager.ToolBar();
      // map draw
      var map_draw = new MapDraw();
      map_draw.Initialize();
      map_draw.set_google_map(google_map);
      map_draw.set_multifunction(multifunction);
      map_draw.MapListener();
       // http service
       http_service.set_map_draw(map_draw);
       http_service.DevicesRead();
      // Dialogue collector
      var dialogue_collect = new DialogueCollector();
      dialogue_collect.Initialize();
      var dialogue_event = new DialogueBoxEvent();
      dialogue_event.set_collect(dialogue_collect);
      dialogue_event.set_map_draw(map_draw);
      // prepare coordinate transfer function to help getting web position from google
      // map lat lng coordinate.
      var coordinate_transfer = new CoordinateTransfer();
      coordinate_transfer.set_google_map(google_map);
      // listen on map and trigger dialogue box.
      var dialogue_box = new DialogueBox();
      dialogue_box.set_google_map(google_map);
      dialogue_box.set_multifunction(multifunction);
      dialogue_box.set_coordinate_transfer(coordinate_transfer);
      dialogue_box.set_dialogue_event(dialogue_event);
      dialogue_box.MapListener();
   }
}

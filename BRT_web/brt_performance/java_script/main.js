/**
 * Created by hong on 2014/4/11.
 */

var gobal_avi_obj = {};
var avi_section = {};
var avi_section_2 = {};
var avi_section_3 = {};
var avi_section_4 = {};

function PerformanceMain() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
   $.get("brt_performance/sub_page/main.html", function(data) {
      domain_main.prepend(data);
      gobal_avi_obj = DataInitial();
      avi_section = SectionInitial(0);
      avi_section_2 = SectionInitial(5);
      avi_section_3 = SectionInitial(-5);
      avi_section_4 = SectionInitial(-10);
      PrimaryDataProcess(gobal_avi_obj, avi_section, avi_section_2, avi_section_3, avi_section_4);
      // PrimaryDataProcess_2();
   });

function DataInitial(){
   var avi_obj = [];
   for(var a=0; a<5; ++a){
      avi_obj[a]={};
      avi_obj[a].intersection_id = 9001+a;
      switch(a){
         case 0:
         avi_obj[a].latitude = '24.183357';
         avi_obj[a].longitude = '120.593000';
         avi_obj[a].name = '國際街口';
         break;
         case 1:
         avi_obj[a].latitude = '24.182986';
         avi_obj[a].longitude = '120.602447';
         avi_obj[a].name = '東大路口';
         break;
         case 2:
         avi_obj[a].latitude = '24.178654';
         avi_obj[a].longitude = '120.624517';
         avi_obj[a].name = '安和路口';
         break;
         case 3:
         avi_obj[a].latitude = '24.165937';
         avi_obj[a].longitude = '120.643845';
         avi_obj[a].name = '惠來路口';
         break;
         case 4:
         avi_obj[a].latitude = '24.149087';
         avi_obj[a].longitude = '120.672092';
         avi_obj[a].name = '篤信街口';
         break;
         default:
         console.log('error brt_performance DataInitial');
         break;
      }
   }
   console.log(avi_obj);
   return avi_obj;
}

function SectionInitial(vec){
   var section_obj={};
   var vector = 0.0001 * vec;
   // polyline between section
   for(var s=0; s<4; ++s){
      switch(s){
         case 0: //國際街>東大路 GD
         section_obj.aviGD = [];
         section_obj.aviGD = [
            new google.maps.LatLng(24.183357+vector, 120.593000+vector), //origin
            new google.maps.LatLng(24.182804+vector, 120.593812+vector),
            new google.maps.LatLng(24.182466+vector, 120.594815+vector),
            new google.maps.LatLng(24.182251+vector, 120.595722+vector),
            new google.maps.LatLng(24.182055+vector, 120.597337+vector),
            new google.maps.LatLng(24.182085+vector, 120.598823+vector),
            new google.maps.LatLng(24.182315+vector, 120.600174+vector),
            new google.maps.LatLng(24.182535+vector, 120.601258+vector),
            new google.maps.LatLng(24.182986+vector, 120.602447+vector) //destination
         ];
         // section_obj.origin = '24.183357, 120.593000';
         // section_obj.destination = '24.182986, 120.602447';
         break;
         case 1: //東大路>安和路 DA
         section_obj.aviDA = [];
         section_obj.aviDA = [
            new google.maps.LatLng(24.182986+vector, 120.602447+vector), //origin
            new google.maps.LatLng(24.183530+vector, 120.605431+vector),
            new google.maps.LatLng(24.184220+vector, 120.608478+vector),
            new google.maps.LatLng(24.184558+vector, 120.610265+vector),
            new google.maps.LatLng(24.184431+vector, 120.612378+vector),
            new google.maps.LatLng(24.183775+vector, 120.614090+vector),
            new google.maps.LatLng(24.181250+vector, 120.619148+vector),
            new google.maps.LatLng(24.179442+vector, 120.622856+vector),
            new google.maps.LatLng(24.178654+vector, 120.624517+vector) //destination
         ];
         // section_obj.origin = '24.182986, 120.602447';
         // section_obj.destination = '24.178654, 120.624517';
         break;
         case 2: //安和路>惠來路 AH
         section_obj.aviAH = [];
         section_obj.aviAH = [
            new google.maps.LatLng(24.178654+vector, 120.624517+vector), //origin
            new google.maps.LatLng(24.176090+vector, 120.629670+vector),
            new google.maps.LatLng(24.174495+vector, 120.632073+vector),
            new google.maps.LatLng(24.170726+vector, 120.637137+vector),
            new google.maps.LatLng(24.168130+vector, 120.640754+vector),
            new google.maps.LatLng(24.165937+vector, 120.643845+vector) //destination
         ];
         // section_obj.origin = '24.178654, 120.624517';
         // section_obj.destination = '24.165937, 120.643845';
         break;
         case 3: //惠來路>篤信街 HS
         section_obj.aviHS = [];
         section_obj.aviHS = [
            new google.maps.LatLng(24.165937+vector, 120.643845+vector), //origin
            new google.maps.LatLng(24.162391+vector, 120.649949+vector),
            new google.maps.LatLng(24.153452+vector, 120.666114+vector),
            new google.maps.LatLng(24.152027+vector, 120.668371+vector),
            new google.maps.LatLng(24.149087+vector, 120.672092+vector) //destination
         ];
         // section_obj.origin = '24.165937, 120.643845';
         // section_obj.destination = '24.149087, 120.672092';
         break;
         default:
         console.log('error brt_performance SectionInitial');
         break;
      }
   }
return section_obj;
}

   function PrimaryDataProcess(gobal_avi_obj, avi_section, avi_section_2, avi_section_3, avi_section_4) {
      // prepare map manager function to set google map on our website.
      var map_manager = new MapManager();
      var google_map = map_manager.Initialize();
      map_manager.Legend();
      // Draw map function have many tool to draw something on our map.
      var map_draw = new MapDraw();
      map_draw.Initialize();
      map_draw.set_google_map(google_map);
      // map_draw.RouteSection(avi_section, gobal_avi_obj);
      map_draw.RoutePolyline(avi_section, 1);
      map_draw.RoutePolyline(avi_section_2, 2);
      map_draw.RoutePolyline(avi_section_3, 3);
      map_draw.RoutePolyline(avi_section_4, 4);
      map_draw.BusStation(gobal_avi_obj);
      // Connect to NodeJs server
      var web_socket = new RouteWebSocket();
      web_socket.Initialize();
      web_socket.set_map_manager(map_manager);
      web_socket.set_map_draw(map_draw);
      web_socket.Connect();

   }

   function PrimaryDataProcess_2() {
      // prepare map manager function to set google map on our website.
      var map_manager = new MapManager();
      var google_map = map_manager.Initialize();
      map_manager.Legend();
      // Draw map function have many tool to draw something on our map.
      var map_draw = new MapDraw();
      map_draw.Initialize();
      map_draw.set_google_map(google_map);
      // map_draw.BusStation(gobal_avi_obj);
      // Connect to NodeJs server
      var web_socket = new RouteWebSocket();
      web_socket.Initialize();
      web_socket.set_map_manager(map_manager);
      web_socket.set_map_draw(map_draw);
      web_socket.Connect();

   }

}

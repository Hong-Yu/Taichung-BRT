/**
 * Created by CCT on 2014/1/20.
 */
var map;
function initialize()
{
   var mapProp = {
      center:new google.maps.LatLng(24.807, 120.968),
      zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP
   };
   map = new google.maps.Map(document.getElementById("googleMap")
      ,mapProp);
   // Creating a shadow
   var shadow = new google.maps.MarkerImage('../image/period110.png', null, null, new google.maps.Point(16,35));
   var img_maeda = {
      url:"../image/maeda3.png",
      size: new google.maps.Size(25, 25),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(-400, 0)
   }
   var marker = new google.maps.Marker({
      position:new google.maps.LatLng(24.8119833, 120.9644500),
      icon:img_maeda,
      animation:google.maps.Animation.BOUNCE,
      shadow: shadow

   });
   marker.setMap(map);
   // polyline
   var points = new Array();
   points[0] = new google.maps.LatLng(24.8046000, 120.9701167);
   points[1] = new google.maps.LatLng(24.8129000, 120.9638000);
   points[2] = new google.maps.LatLng(24.8138167, 120.9630333);
   var myTrip = [ points[0], points[1], points[2]];
   var flightPath = new google.maps.Polyline({
      path:myTrip,
      strokeColor:"#009900",
      strokeOpacity:0.5,
      strokeWeight:6
   });
   //flightPath.setMap(map);
   var myCity = new google.maps.Circle ({
      center: new google.maps.LatLng(24.8089500, 120.9668000),
      radius:20,
      strokeColor:"#0000FF",
      strokeOpacity:0.8,
      strokeWeight:2,
      fillColor:"#0000FF",
      fillOpacity:0.4
   } );
   //myCity.setMap(map);

   var strVar="";
   strVar += "<table border=\"1\" style=\"width:110px;height:100px;text-align:left;\">";
   strVar += "    <tr>";
   strVar += "        <th>時差<\/th>";
   strVar += "        <td>0<\/td>";
   strVar += "    <\/tr>";
   strVar += "    <tr>";
   strVar += "        <th> 週期<\/th>";
   strVar += "        <td> 160<\/td>";
   strVar += "    <\/tr>";
   strVar += "    <tr>";
   strVar += "        <th> 第一時相<\/th>";
   strVar += "        <td> 80<\/td>";
   strVar += "    <\/tr>";
   strVar += "    <tr>";
   strVar += "        <th> 第二時相<\/th>";
   strVar += "        <td> 80<\/td>";
   strVar += "    <\/tr>";
   strVar += "    <\/table>";



   var infowindow = new google.maps.InfoWindow(
      {
         content:strVar,
         center: new google.maps.LatLng(24.8089500, 120.9668000)
      }
   );

   //infowindow.open(map,marker1);
}

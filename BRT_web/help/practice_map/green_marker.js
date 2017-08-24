/**
 * Created by CCT on 2014/1/29.
 */
function MarkerGreen () {
   var period_marker_set = [];
   var phase_data;
   var click_mark;
   $.get("src/phase_information.json", SetMarker);
   function SetMarker (data, status) {
      phase_data = data;
      var latitude, longitude, period;
      latitude = 24.799;
      longitude = 120.958;
      pushMark(period_marker_set, latitude, longitude, 0, 5);
      pushMark(period_marker_set, latitude, longitude, 100, 50);
      latitude =  24.81195;
      longitude = 120.9644833;
      pushMark(period_marker_set, latitude, longitude, -10, 50);
      pushMark(period_marker_set, latitude, longitude, 110, 5);
      latitude =  24.80985;
      longitude = 120.9773      ;
      pushMark(period_marker_set, latitude, longitude, -30, 5);
      pushMark(period_marker_set, latitude, longitude, 110, 50);





   }
   function pushMark(marker_set, lat, lng, x, y) {
      var path = "../image/green30.png";
      var img_period = {
         url: path,
         // ize: new google.maps.Size(50, 50),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(x, y)
      }
      // var img_period = new google.maps.MarkerImage(path, null, null, new google.maps.Point(0,20));
      var marker = new google.maps.Marker({
         position:new google.maps.LatLng(lat, lng),
         icon:img_period,
         zIndex: 2
         // animation:google.maps.Animation.BOUNCE
      });
      marker_set.push(marker);
      marker.setMap(map);
   }
}
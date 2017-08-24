/**
 * Created by CCT on 2014/1/24.
 */
function MarkerPeriod () {
   var period_marker_set = [];
   var phase_data;
   var click_mark;
   $.get("src/phase_information.json", SetMarker);
   function SetMarker (data, status) {
      phase_data = data;
      var latitude, longitude, period;
      for (var mark_index = 0; mark_index < 17; mark_index++) {
         latitude = data.ordinaryPeakAm[mark_index].latitude;
         longitude = data.ordinaryPeakAm[mark_index].longitude;
         period = data.ordinaryPeakAm[mark_index].period;
         //console.log(latitude, longitude);
         pushMark(period_marker_set, latitude, longitude, period);
      }
   }
   function pushMark(marker_set, lat, lng, period) {
      var path = "../image/period" + period + ".jpg";
      var img_period = {
         url: "../image/110.png",
         //ize: new google.maps.Size(50, 50),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(0, 5)
      }
      //var img_period = new google.maps.MarkerImage(path, null, null, new google.maps.Point(0,20));
      var marker = new google.maps.Marker({
         position:new google.maps.LatLng(lat, lng),
         icon:img_period,
         zIndex: 2
         //animation:google.maps.Animation.BOUNCE
      });
      marker_set.push(marker);
      marker.setMap(map);
   }
}

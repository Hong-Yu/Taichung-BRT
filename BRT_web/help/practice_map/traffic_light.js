/**
 * Created by CCT on 2014/1/23.
 */
function DivInfoClear () {
   var phase_info_pane = $('#phase_info_pane').empty();
}

function trafficLight () {
   var traffic_marker_set = [];
   var phase_info_pane = $('#phase_info_pane').empty();
   var phase_data;
   var click_mark;
   function SetMarker (data, status) {
      phase_data = data;
      var latitude, longitude;
      for (var mark_index = 0; mark_index < 17; mark_index++) {
         latitude = data.ordinaryPeakAm[mark_index].latitude;
         longitude = data.ordinaryPeakAm[mark_index].longitude;
         //console.log(latitude, longitude);
         pushMark(traffic_marker_set, latitude, longitude);

      }
      infoDiv(traffic_marker_set, data);
      //var x = $("#phase_info_pane").find("td").;
      //console.log("maeda" + traffic_marker_set.length);
      //console.log(x);
   }

   $.get("src/phase_information.json", SetMarker);
   function pushMark(marker_set, lat, lng) {
       var marker = new google.maps.Marker({
         //position:new google.maps.LatLng(24.8089500, 120.9668000),
         position:new google.maps.LatLng(lat, lng),
         icon:"image/rsz_1traffic_lights.png",
         zIndex: 1
         //animation:google.maps.Animation.BOUNCE
      });
      marker_set.push(marker);
      marker.setMap(map);
   }

   function infoDiv(marker_set, data) {
      //var marker;
      for (var marker_index = 0; marker_index < marker_set.length; ++marker_index) {
         //marker = marker_set[marker_index];
         attachSecertMessage(marker_set[marker_index], marker_index);
         //console.log(data.ordinaryPeakAm[marker_index].chineseName);
      }
   }

// Attach a message div about detail information of traffic light.
   function attachSecertMessage(marker, index) {
      function loadStatus(responseTxt, statueTxt, xhr) {
         if (statueTxt == "success") {
            var time_current = document.getElementById("time-interval").value;
            var data_current;
            // This switch choose time interval that user selected.
            switch (time_current) {
               case "ordinary_peak_am":
                  data_current = phase_data.ordinaryPeakAm[index];
                  break;
               case "ordinary_peak_pm":
                  data_current = phase_data.ordinaryPeakPm[index];
                  break;
               case "ordinary":
                  data_current = phase_data.ordinary[index];
                  break;
               case "holiday":
                  data_current = phase_data.holiday[index];
                  break;
               case "holiday_peak":
                  data_current = phase_data.holidayPeak[index];
                  break;
            }
            console.log("Maeda 1 :" + data_current.period);
            document.getElementById("phase-info-title").innerHTML = data_current.chineseName;
            document.getElementById("phase-info-diff").innerHTML = data_current.difference;
            document.getElementById("phase-info-period").innerHTML = data_current.period;

            document.getElementById("phase-info-phase1").innerHTML = data_current.phase0;
            document.getElementById("phase-info-phase2").innerHTML = data_current.phase1;
            document.getElementById("phase-info-phase3").innerHTML = data_current.phase2;
            document.getElementById("phase-info-phase4").innerHTML = data_current.phase3;
         }

      }
      function LoadPhase() {
         //console.log("Maeda 1 :" + index);
         $("#phase_info_pane").load("sub_page/information_phase.html", loadStatus);
//         //$.get("demo_test.txt", GetAlert);
      }
      google.maps.event.addListener(marker, 'click', LoadPhase);
   }


}
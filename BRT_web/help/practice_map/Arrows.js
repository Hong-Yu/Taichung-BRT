/**
 * Created by CCT on 2014/1/28.
 */

function Arrows () {
   $.get("src/phase_information.json", SetMarker);
   var latitude = [];
   var longitude = [];
   function SetMarker (data, status) {
      var order = []
      for (var index = 0; index < 5; ++index) {
         latitude[index] = data.ordinaryPeakAm[5 - index].latitude;
         longitude[index] = data.ordinaryPeakAm[5 - index].longitude;
         //latitude[1] = data.ordinaryPeakAm[0].latitude;
         //longitude[1] = data.ordinaryPeakAm[0].longitude;
      }
      // pushMark(period_marker_set, latitude, longitude, period);
      // Define a symbol using a predefined path
      // supplied by Google Maps JavaScript API.
      var lineSymbol = {
         path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
      };
      // Create the polyline and add the symbol via the 'icons' property.
      var point = [];
      for (var index = 0; index < 5; ++index) {
         point[index] = new google.maps.LatLng(latitude[index], longitude[index])
      }
      var lineCoordinates = [
         point[0], point[1], point[2], point[3], point[4]
      //new google.maps.LatLng(latitude[1], longitude[1])
   ];
      console.log("Arrow" + latitude[0] + "-" + longitude[0]);

      SetLine (lineCoordinates);
      line.setMap(map);
   }
}

function Arrows2 () {
   $.get("src/phase_information.json", SetMarker);
   var latitude = [];
   var longitude = [];
   function SetMarker (data, status) {
      var order = []
      for (var index = 0; index < 6; ++index) {
         latitude[index] = Number(data.ordinaryPeakAm[index].latitude);;
         longitude[index] =  Number(data.ordinaryPeakAm[index].longitude) ;
         latitude[index] += 0.0002;
         longitude[index] -= 0.0002;
      }
      console.log(longitude);
      var point = [];
      for (var index = 0; index < 6; ++index) {
         point[index] = new google.maps.LatLng(latitude[index], longitude[index])
      }
      var lineCoordinates = [
         point[0], point[1], point[2], point[3], point[4], point[5]
      ];
      SetLine (lineCoordinates);
   }
}
function Arrows3 () {
   ArrowsX ("forward", 14, 16);
   ArrowsX ("backward", 14, 16);
   ArrowsX ("forward", 6, 10);
   ArrowsX ("backward", 6, 10);
}


function ArrowsX (type, section_start, section_end) {
   $.get("src/phase_information.json", SetMarker);
   var latitude = [];
   var longitude = [];
   function SetMarker (data, status) {
      var order = []
      var position_index = 0;
      var separate = 0.0002;
      switch (type) {
         case "forward": {
            console.log("forward");
            for (var index = section_start; index <= section_end; ++index) {
               latitude[position_index] = Number(data.ordinaryPeakAm[index].latitude);
               longitude[position_index] =  Number(data.ordinaryPeakAm[index].longitude) ;
               latitude[position_index] -= separate;
               longitude[position_index] += separate;
               ++position_index;
            }
            break;
         }
         case "backward": {
            console.log("backward");
            for (var index = section_end; index >= section_start; --index) {
               console.log(index);
               latitude[position_index] = Number(data.ordinaryPeakAm[index].latitude);
               longitude[position_index] =  Number(data.ordinaryPeakAm[index].longitude) ;

               latitude[position_index] += separate;
               longitude[position_index] -= separate;
               ++position_index;
            }
            break;
         }
      }

      console.log(longitude);
      var point = [];
      var point_total = section_end - section_start + 1;
      for (var index = 0; index < 3; ++index) {
         point[index] = new google.maps.LatLng(latitude[index], longitude[index])
      }
      SetLine (point);
   }
}

function SetLine (lineCoordinates) {
   var symbolOne = {
      path: 'M  0,1 0,-1 1,0',
      strokeColor: '#F00',
      fillColor: '#F00',
      fillOpacity: 1
   };
   var line = new google.maps.Polyline({
      path: lineCoordinates,
      icons: [{
         icon: symbolOne,
         offset: '100%'
      },{
         icon: symbolOne,
         offset: '50%'
      },{
         icon: symbolOne,
         offset: '75%'
      },{
         icon: symbolOne,
         offset: '25%'
      }
      ],
      strokeColor:"#006600",
      strokeOpacity:0.8,
      strokeWeight:6,
      map:map
   });

}

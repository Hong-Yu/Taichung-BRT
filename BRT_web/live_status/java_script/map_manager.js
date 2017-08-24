/**
 * Created by CCT on 2014/4/9.
 */

function MapManager() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.google_map;
      this.google_map = CreateMap();
//       LocationDisplay(this.google_map);
      return this.google_map;
   }
   this.get_google_map = get_google_map;
   function get_google_map() {
      return this.google_map;
   }
    this.get_center = get_center;
    function get_center() {
        return this.google_map.getCenter();
    }
   this.Reset = Reset;
   function Reset() {
//      this.SetAllMap(null, this.markers);
//            this.markers.length = 0;
//      this.markers = [];
   }
   // Private member ---------------------------------------------------------
   function CreateMap() {
      var mapProp = {
//         center: new google.maps.LatLng(24.153130034734478, 120.66694021224976),
//         zoom: 14,
         center: new google.maps.LatLng(24.153130034734478, 120.66694021224976),
         zoom: 16,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         disableDefaultUI: true
      };
      map = new google.maps.Map(document.getElementById("googleMap")
         ,mapProp);
      return map;
   }
    //Mouse listener on google map to display location .
    function LocationDisplay(google_map) {
        google.maps.event.addListener(google_map, 'click', function(e) {
            console.log("Google map location: ",e.latLng);
        });
        // center_changed dragend
        google.maps.event.addListener(google_map, 'dragend', function() {
            console.log("Google map center change: ", google_map.getCenter());
        });
    }
}

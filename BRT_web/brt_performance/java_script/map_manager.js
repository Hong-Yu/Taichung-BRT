/**
 * Created by CCT on 2014/4/9.
 */

function MapManager() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        this.google_map;
        this.google_map = this.CreateMap();
        this.markers = [];
        this.LocationDisplay(this.google_map);
        return this.google_map;
    }
    this.get_google_map = get_google_map;
    function get_google_map() {
        return this.google_map;
    }
    this.Legend = Legend;
    function Legend() {
       var google_map = this.google_map;
       $.get("brt_performance/sub_page/legend.html", function(data){
          AppendLegend(google_map, data);

       });
    }
    this.Show = Show;
    function Show() {
        this.SetAllMap(this.google_map, this.markers);
    }
    this.Reset = Reset;
    function Reset() {
        this.SetAllMap(null, this.markers);
        this.markers = [];

    }
    // Private member ---------------------------------------------------------
    this.CreateMap = CreateMap;
    function CreateMap() {
        var mapProp = {
            center: new google.maps.LatLng(24.171071, 120.632330),
            zoom: 13,
//            A: 120.67556625750512
//            k: 24.145010950338797
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        map = new google.maps.Map(document.getElementById("googleMap")
            ,mapProp);
        return map;
    }
    //Mouse listener on google map to display location .
    this.LocationDisplay = LocationDisplay;
    function LocationDisplay(google_map) {
        google.maps.event.addListener(google_map, 'click', function(e) {
            console.log(e.latLng);
        });
    }
   // Append legend
   function AppendLegend(google_map, html) {
      $(google_map.getDiv()).append(html);

   }

    // single light
    this.SetAllMap = SetAllMap;
    function SetAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }



}

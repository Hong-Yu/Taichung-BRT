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
   this.set_tool_bar_event = set_tool_bar_event;
   function set_tool_bar_event(tool_bar_event) {
      this.tool_bar_event = tool_bar_event;
   }
    this.ToolBar = ToolBar;
    function ToolBar() {
       var google_map = this.google_map;
        var bar_event = this.tool_bar_event;
       $.get("device_manager/sub_page/tool_bar.html", function(data){
          AppendToolBar(google_map, bar_event, data);

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
            center: new google.maps.LatLng(24.154811, 120.66399),
            zoom: 17,
            //"測試路口", latitude: "24.154811", longitude: "120.66399"}

            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        map = new google.maps.Map(document.getElementById("googleMap")
            ,mapProp);
        return map;
    }
    //Mouse listener for location display.
    this.LocationDisplay = LocationDisplay;
    function LocationDisplay(google_map) {
        google.maps.event.addListener(google_map, 'click', function(e) {
            console.log(e.latLng);
        });
    }
   // Append legend
   function AppendToolBar(google_map, bar_event, html) {
      $(google_map.getDiv()).append(html);
       bar_event.set_google_map(google_map);
       bar_event.Bind();
   }

    // single light
    this.SetAllMap = SetAllMap;
    function SetAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }



}

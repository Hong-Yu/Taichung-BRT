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
        return this.google_map;
    }

    this.Menu = Menu;
    function Menu() {
//        var menu = new MapMenu();
//        menu.Set(this.google_map);

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
            center: new google.maps.LatLng(24.153130034734478, 120.66694021224976),
            zoom: 14,
//         center: new google.maps.LatLng(24.153130034734478, 120.66694021224976),
//         zoom: 20,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        map = new google.maps.Map(document.getElementById("googleMap")
            ,mapProp);
        return map;
    }
    // single light

    //
    this.SetAllMap = SetAllMap;
    function SetAllMap(map, markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }



}

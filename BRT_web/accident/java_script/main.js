/**
 * Created by hong on 2014/4/11.
 */

var map;
var g_map_manager;

function AccidentMain() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    domain_main.append($('<div style="width:850px;height:20px;"></div>'));
    domain_main.append($('<div id="googleMap" class="google_map" style="width:850px;height:700px;"></div>'));
    g_map_manager = new MapManager();
    var google_map = g_map_manager.Initialize();
    //
    // Connect to NodeJs server
    var web_socket = new AccidentWebSocket();
    web_socket.Initialize();
    web_socket.set_google_map(google_map)
    web_socket.Connect();

    var menu = new MapMenu();
    menu.Set(google_map, web_socket);
}


//CREATE TABLE accident_statement (
//    ID int IDENTITY(1,1) PRIMARY KEY,
//    latitude float,
//    longitude float,
//    license_plate nvarchar(50),
//    route nvarchar(50),
//    velocity_avg nvarchar(50),
//    intersection_near nvarchar(50),
//    reason nvarchar(50),
//    lane_closed int,
//    statement nvarchar(MAX)
//)

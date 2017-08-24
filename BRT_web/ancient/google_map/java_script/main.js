/**
 * Created by hong on 2014/9/30.
 */
function GoogleMapMain() {
    var domain_main;
    domain_main=$('#centerview').empty().css('background-color','transparent');
    $.get("device_manager/sub_page/main.html", function(data) {
        domain_main.prepend(data);
        PrimaryDataProcess();
    });
    function PrimaryDataProcess() {
        // multifunction manager
        var map_manager = new MapManager();
        var google_map = map_manager.Initialize();
        // map draw
        var map_draw = new MapDraw();
        map_draw.Initialize();
        map_draw.set_google_map(google_map);
        function Draw() {
            if (typeof Draw.color === 'undefined') Draw.color = 'ff0000';
            if (Draw.color == 'ff0000') Draw.color = '00ff00';
            else if (Draw.color == '00ff00') Draw.color = '0000ff';
            else if (Draw.color == '0000ff') Draw.color = 'ff0000';
            map_draw.Draw(Draw.color);
            console.log('poly line:');
            setTimeout(arguments.callee, 1000);
        }
        Draw();
        // Establish websocket connector to server side.

    }
}
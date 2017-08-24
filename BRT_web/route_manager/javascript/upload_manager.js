/**
 * Created by hong on 2014/4/17.
 */

function UploadManager() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
//        this.UploadListener();
    }
    this.set_connector = set_connector;
    function set_connector(web_socket) {
        this.connector = web_socket;

    }
    this.Listen = Listen;
    function Listen() {
        this.UploadListener(this.connector);
    }
    // Private member ----------------------------------------------------------
    this.UploadListener = UploadListener;
    function UploadListener(connector) {
        var domain = $("button.upload_route");
        domain.bind("click", {connector:connector}, UploadRoute);

    }
    function UploadRoute(event) {
        var result = new Object();
        result.FunctionNo = 300;
        result.MsgTypeNo = 3;
        result.active = "update";

//        var table_name = "route_list";
//        var column_name = ["ID", "name", "color", "intersection_max"];
//        var table_name = "route_intersection";
//        var column_name = ["ID", "serial_number", "route_id", "intersection_id"];

        function RouteList(ID, name, color, intersection_max) {
            this.ID = ID;
            this.name = name;
            this.color = color;
            this.intersection_max = intersection_max;
        }
        var domain_nsection = $("form.add_route").find("input.section_number");
        var domain_color = $("form.add_route").find("input.color");
        var ID = $("#select_route").val();
        var name = $("form.add_route").find("input.name").val();
        var color = domain_color.val();
        var intersection_max = domain_nsection.val();
        result.route_list = new RouteList(ID, name, color, intersection_max);
        //
        result.route_intersection = [];
        function RouteIntersection(serial_number, route_id, intersection_id) {
            this.serial_number = serial_number;
            this.route_id = route_id;
            this.intersection_id = intersection_id;
        }

        var domain_select = $("div.route_map").find("select.crossroad_select");
        var section_total = domain_select.length;

        for (var section_index = 0; section_index < section_total; ++section_index) {
            var target = domain_select[section_index];
            var serial_number = section_index;
            var route_id = ID;
            var intersection_id = $(target).find("option:selected").attr("mark");
            result.route_intersection[section_index] =  new RouteIntersection(serial_number, route_id, intersection_id);
        }



//        event.data.connector.Send(result);
        console.log(result);
        var post_data = result;
        $.post( "http://192.168.1.2:8888/route-manager?act=route-update", post_data)
            .done(function( data ) {
                console.log(data);
            });



    }


}

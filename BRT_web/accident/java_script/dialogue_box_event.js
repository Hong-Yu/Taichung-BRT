/**
 * Created by hong on 2014/4/12.
 */
function DialogueBoxEvent() {
// Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        function Structure(latitude, longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }
        this.box_data = new Structure(0, 0);
    }
    this.set_web_socket = set_web_socket;
    function set_web_socket(web_socket) {
        this.web_socket = web_socket;
        console.log("M1 " + web_socket);
    }
    this.set_map_icon = set_map_icon;
    function set_map_icon(map_icon) {
        this.map_icon = map_icon;
    }
    this.Bind = Bind;
    function Bind() {
        this.SubmitListener(this.box_data, this.web_socket, this.map_icon);
        this.CancelListener(this.map_icon);
    }
    this.Unbind = Unbind;
    function Unbind() {
        var domain = $(".accident_input_box").find("button");
        domain.unbind("click");
    }
// Private member ---------------------------------------------------------
    this.SubmitListener = SubmitListener;
    function SubmitListener(box_data, web_socket, map_icon) {
        function Submit() {
           // collect information ftom dialogue box
            var domain = $(".accident_input_box");
            box_data.license_plate = domain.find("input.license_plate").val();
            box_data.route = domain.find("input.route").val();
            box_data.velocity_avg = domain.find("input.velocity_avg").val();
            box_data.intersection_near = domain.find("input.intersection_near").val();
            box_data.reason = domain.find("input.reason").val();
            box_data.lane_closed = parseInt(domain.find("input.lane_closed").val());
            box_data.latitude = parseFloat(domain.find("p.latitude").html());
            box_data.longitude = parseFloat(domain.find("p.longitude").html());
            console.log(box_data);
            // prepare data for submit to server
            var json_data = {};
            json_data.FunctionNo = "accident";
            json_data.MsgTypeNo = "establish";
            json_data.active = "insert";
            json_data.accident = box_data;
            web_socket.Send(json_data);
           // remove dialogue box
           $(".accident_input_box").remove();
//           map_icon.Clear();
//           setTimeout(web_socket.Reload(), 1000);
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
           web_socket.Reload();

        }
        var domain = $(".accident_input_box").find("button.submit");
        domain.bind("click", Submit);
    }
    this.CancelListener = CancelListener;
    function CancelListener(map_icon) {
        function Cancel() {
            $(".accident_input_box").remove();
            map_icon.Clear();

        }
        var domain = $(".accident_input_box").find("button.cancel");
        domain.bind("click", Cancel);
    }

}

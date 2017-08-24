/**
 * Created by hong on 2014/7/24.
 */
var data_reservoir = require("./data_reservoir.js");
data_reservoir.Initialize();

//var bus_data;

module.exports = {
    Initialize: function() {
//        this.bus_data = new Object();
    },
    UpdateStatus: function(input_data) {
//        bus_data = input_data;
        data_reservoir.UpdateBusStatus(input_data);
    },
    SendStatus: function(web_socket) {
        function CycleLight() {
            if(web_socket.readyState == 3) return; // stop when disconnect.
            SendToWebsite(web_socket, data_reservoir.getBusData());
            setTimeout(arguments.callee, 2000);
        }
        CycleLight();
    }
};

function SendToWebsite(web_socket, send_data) {
    send_data.FunctionNo = "bus_status";
    send_data.MsgTypeNo = "response";
    var json_data = JSON.stringify(send_data);
    web_socket.send(json_data);
}
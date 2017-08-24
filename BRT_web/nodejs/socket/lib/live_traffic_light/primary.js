/**
 * Created by HongYu on 2014/4/9.
 * Modified by HongYu on 2014/9/1
 */

var data_process = require("./data_process.js");
data_process.Initialize();
module.exports = {
    Initialize: function() {
    },
    set_connector: function (con_db) {
        this.con_db = con_db;
        data_process.set_connector(this.con_db);
        data_process.Build();
    },
    Receive: function () {
    },
    UpdateStatus: function(input_data) {
        data_process.Update(input_data);
//        UpdateStatus(this.con_db, this.light_converter, input_data, this.data_manage);
    },
    SendStatus: function(web_socket) {
        function CycleLight() {
            if(web_socket.readyState == 3) return; // stop when disconnect.
            SendToWebsite(web_socket, web_socket.map_center);
            setTimeout(arguments.callee, 2000);
        }
        CycleLight();
    }
};

function SendToWebsite(web_socket, map_center) {
    var light_info= new Object();
    light_info.FunctionNo = "light_status";
    light_info.MsgTypeNo = "response";
    light_info.MsgTime = GetCurrentTime();
    light_info.info = data_process.get_live_light(map_center);
    var json_data = JSON.stringify(light_info);
    web_socket.send(json_data, function ack(error){
       console.log('light send error;');
    });
}

function GetCurrentTime(){
    var d = new Date();
    var output = d.getFullYear() +'-'+     Makeup(d.getMonth() + 1) +'-';
    output += Makeup(d.getDate()) +" "+    Makeup(d.getHours()) +":";
    output+=  Makeup(d.getMinutes()) +":"+ Makeup(d.getSeconds());
    return output;
    function Makeup(value) {
        var value = (value < 10 ? '0' : '') + value;
        return value;
    }
}

function RandomLight() {
    function Structure(intersection_id, equip_id, card_id, traffic_type, light, detail, rotation, longitude, latitude) {
        this.intersection_id = intersection_id;
        this.equip_id = equip_id;
        this.card_id = card_id;
        this.traffic_type = traffic_type;
        this.light = light;
        this.detail = detail;
        this.rotation = rotation;
        this.longitude = longitude;
        this.latitude = latitude;
    }
    var intersection_id = 1;
    var equip_id = 1;
    var card_id = 1;
    var traffic_type = 1;
    var light = Math.floor((Math.random()*3));
    var right = Math.floor((Math.random()*3));
    var straight = Math.floor((Math.random()*3));
    var left = Math.floor((Math.random()*3));
    var detail = "" + left + straight + right;
    var rotation = 270;
    var longitude = traffic_info.info[0].longitude;
    var latitude = traffic_info.info[0].latitude;
}

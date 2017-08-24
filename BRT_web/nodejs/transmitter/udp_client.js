
/**
 * Created by hong on 2014/5/26.
 */
var dgram = require('dgram');

var status_data_device = require('./status_data_device');
var status_data_bus = require('./status_data_bus');
var status_data_tc = require('./status_data_tc');


module.exports = {
    Initialize: function() {
        var client = dgram.createSocket('udp4');
//        var host = "192.168.1.2";
    var host = "192.168.1.2";
        var port = 7776;
        this.client = client;
        this.host = host;
        this.port = port;
    },
    Send: function(input_data) {
        console.log(input_data);
        var message = new Buffer(input_data);
        Send(this.client, this.host, this.port, message);
    },
    AutoSend: function() {
        var client = this.client;
        var host = this.host;
        var port = this.port;
        var repeat_index = 0;
        function Repeat() {
//            var input_data = status_data_device.get_data_tc();
//            Send(client, host, port, input_data);
//            var input_data = status_data_device.get_data_src();
//            Send(client, host, port, input_data);
//            var input_data = status_data_device.get_data_gps();
//            Send(client, host, port, input_data);
//            var input_data = status_data_bus.get_data_bus(repeat_index);
//            Send(client, host, port, input_data);
//            var input_data = status_data_bus.get_bus_arrival_time();
//            Send(client, host, port, input_data);
            var input_data = status_data_tc.get_data_tc();
            Send(client, host, port, input_data);
            setTimeout(arguments.callee, 1000);
            repeat_index++;
        }
        Repeat();

    }
};

function Send(client, host, port, input_data) {
    console.log(input_data);
    var message = new Buffer(input_data);
    console.log("host: " + host + " port: " + port + " client: " + client);
    client.send(message, 0, message.length, port, host, function(err, bytes){
        console.log("Send information --- error: ",err , " bytes: ", bytes);
    })
}


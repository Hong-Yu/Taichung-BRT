/**
 * Created by hong on 2014/5/26.
 */
var dgram = require('dgram');

module.exports = {
    Initialize: function() {
        var client = dgram.createSocket('udp4');
        var host = "192.168.1.41";
//    var host = "192.168.1.2";
        var port = 10002;
        this.client = client;
        this.host = host;
        this.port = port;
    },
    Send: function(input_data) {
        console.log(input_data);
        var message = new Buffer(input_data);
        Send(this.client, this.host, this.port, message);
    }
};

function Send(client, host, port, message) {
    console.log("host: " + host + " port: " + port + " client:" + client);
    client.send(message, 0, message.length, port, host, function(err, bytes){
        console.log("Send information --- error: ",err , " bytes: ", bytes);
//        console.log(message);
//        console.log(err, bytes);
//        client.close();
    })
}
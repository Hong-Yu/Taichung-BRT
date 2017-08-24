var receiver_timing_plan = require('./receiver_timing_plan');

// UDP server 10002 -- live status
module.exports = {
    Initialize: function() {
        Listen();
    },
    Maeda: function() {
    }
};


function Listen() {
    var PORT_client_tc = 10002;
    var HOST_client_tc = '192.168.1.41';

    var dgram_client_tc = require('dgram');
    var server = dgram_client_tc.createSocket('udp4');

    server.on('listening', function() {
        var address = server.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    });

    server.on('message', function(message, remote) {
        //      console.log(remote.address + ':' + remote.port +' - ' + message);
        var input_data = JSON.parse(String(message));
        DataAssign(input_data);
    });
    server.bind(PORT_client_tc, HOST_client_tc);
}

function DataAssign(input_data) {
    var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
    switch (label) {
        case '2-0':
            console.log("Receive 2-0");
            receiver_timing_plan.Send();
            break;
        case '4-1':
            console.log("Receive 4-1");
            break;
        case 'BF-02':
            console.log("Receive BF-02");
            break;
        default:
            console.log("Data not be assigned :" + label);
            break;
    }
}

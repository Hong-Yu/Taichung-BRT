/**
 * Created by CCT on 2014/5/29.
 */
var data_validated = require('./data_validation/primary.js');
var live_status = require("./live_status/primary.js");

// UDP server 7776 -- live status
module.exports = {
    Initialize: function() {
        this.function_set = [];
    },
    set_live_status: function(live_status) {
        this.function_set[0] = live_status;
    },
    set_live_light: function(live_light) {
        this.function_set[1] = live_light;
    },
    set_live_device: function(live_device) {
        this.function_set[2] = live_device;
    },
    set_live_bus: function(live_bus) {
        this.function_set[3] = live_bus;
    },
    set_live_status_sketch: function(live_sketch) {
        this.function_set[4] = live_sketch;
    },
    set_live_steps: function(live_steps) {
        this.function_set[5] = live_steps;
    },
    Start: function() {
        var function_set = this.function_set;
        function CountDown(sec) {
            CountDown.sec = CountDown.sec || sec;
            CountDown.sec--;
            console.log('UDP server waiting ', CountDown.sec);
            if (CountDown.sec == 0) {
                console.log('UDP server starting');
                Listen(function_set);
                return;
            }
            setTimeout(arguments.callee, 1000);

        }
        CountDown(7);

    }
};


function Listen(function_set) {
    var PORT_client_tc = 7776;
    var HOST_client_tc = '192.168.1.2';

    var dgram_client_tc = require('dgram');
    var server = dgram_client_tc.createSocket('udp4');

    server.on('listening', function() {
        var address = server.address();
        console.log('UDP Server listening on ' + address.address + ":" + address.port);
    });

    server.on('message', function(message, remote) {
        //      console.log(remote.address + ':' + remote.port +' - ' + message);
        var input_data = JSON.parse(String(message));
        DataAssign(input_data, function_set);
    });
    server.bind(PORT_client_tc, HOST_client_tc);
}

function DataAssign(input_data, function_set) {
    var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
    switch (label) {
        case '3-1':
            var is_valid = data_validated.LiveStatus(input_data.immediate.result[0]);
//            if (!is_valid) break;
//            console.log("Receive 3-1");
            //         console.log(JSON.stringify(input_data));
            function_set[0].UpdateStatus(input_data.immediate.result[0]);
            function_set[4].UpdateState(input_data.immediate.result[0]);
            // function_set[5].UpdateSteps(input_data.immediate.result[0]);
            break;
        case '4-1':
            //console.log("Receive 4-1");
//if (input_data.Lightstate.result.LCN == 2040)
            //console.log(JSON.stringify(input_data));
            function_set[1].UpdateStatus(input_data.Lightstate.result);
            function_set[4].LightSketch(input_data.Lightstate.result);
            break;
        case 'BF-02':
            console.log("Receive BF-02");
            //         console.log(JSON.stringify(input_data));
//            function_set[0].UpdateStatus(input_data);
            break;
        case '0F-04':
            console.log("Receive 0F-04");
            function_set[2].UpdateStatus(input_data);
            break;
        case 'BF-00':
            console.log("Receive BF-00", JSON.stringify(input_data));
            function_set[2].UpdateStatus(input_data);
            break;
        case 'FF-02':
            function_set[2].UpdateStatus(input_data);
            break;
        case '105-3':
         //   console.log();
         //            console.log('105-3 ', JSON.stringify(input_data));
            function_set[3].UpdateStatus(input_data);
            break;
        case '104-3':
            live_status.UpdateBusArrivalTime(input_data);
            break;
        default:
            console.log("Data not be assigned :" + label);
            break;
    }
}

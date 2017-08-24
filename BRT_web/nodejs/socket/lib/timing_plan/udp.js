/**
 * Created by CCT on 2014/5/5.
 */
var dgram = require('dgram');

module.exports = {
   Initialize: function(web_socket) {
      UDPListen(web_socket);
   },
   Listening: function(web_socket) {
//   var server = dgram_client_tc.createSocket('udp4');
      this.server = dgram.createSocket('udp4');
      UDPListen(web_socket, this.server, this.query_tc);
   },
   Close :function() {
      if (typeof this.server !== "undefined") {
         this.server.close();
      }
   },
   set_connector: function (con_db) {
      this.con_db = con_db;
   },
   set_sql_generator: function (sql_generator) {
      this.sql_generator = sql_generator;
   },
   Input: function(input_data) {
      SendToTC(input_data);
   },
    set_QueryTC: function(query_tc){
        this.query_tc = query_tc;
    }
};

function SendToTC(input_data) {
   var dgram = require('dgram');
   var message = new Buffer(input_data);
   var client = dgram.createSocket('udp4');
   var host = "192.168.1.41";
   var port = 10002;
   client.send(message, 0, message.length, port, host, function(err, bytes){
      console.log(message);
      console.log(err, bytes);
      client.close();
   })
}

function UDPListen(web_socket, server, query_tc) {
   var PORT_client_tc = 7777;
   var HOST_client_tc = '192.168.1.2';
//   var dgram_client_tc = require('dgram');
//   var server = dgram_client_tc.createSocket('udp4');

   server.on('listening', function () {
      var address = server.address();
      console.log('UDP Server listening on ' + address.address + ":" + address.port);
//      console.log("Current websocket ready state: " + web_socket.readyState);

   });

   server.on('message', function (message, remote) {
//      console.log("message on websocket ready state: " + web_socket.readyState);
      var data = JSON.parse(String(message));
      DataAssign(data, web_socket, query_tc);
   });
   server.bind(PORT_client_tc, HOST_client_tc);
}

function DataAssign (input_data, web_socket, query_tc) {
   var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
   switch(label){
      case '3-1':
//         console.log("Receive 3-1");
         break;
      case '4-1':
//         console.log("Receive 4-1");
         break;
      case '0F-04':
         break;
       case '0F-C5':
           query_device(input_data);
           break;
       case '0F-C2':
           query_device(input_data);
           break;
       case '0F-C4':
           query_device(input_data);
           break;
       case '5F-C0':
           query_device(input_data);
           break;
       case '0F-C3':
           query_device(input_data);
           break;
       case '0F-C0':
           query_device(input_data);
           break;
       case '50-C5':
           query_device(input_data);
           break;
       case '50-C4':
           query_device(input_data);
           break;
       case '5F-EF':
           query_device(input_data);
           break;
       case '5F-C6':
           query_tc.SegData(input_data);
           break;
       case '5F-C7':
           query_tc.SegData(input_data);
           break;
       case 'BF-C2':
           query_tc.TodPriority(input_data);
           break;
       case 'BF-C3':
           query_tc.PlanData(input_data);
           break;
       case '5F-C4':
           query_tc.PlanData(input_data);
           break;
       case '5F-C5':
           query_tc.PlanData(input_data);
           break;
      case "99-1" :
         console.log("Receive 99-1");
         console.log(input_data);
         var send_data = JSON.stringify(input_data);
         var ready_state = web_socket.readyState;
         if (ready_state == 1) {
            web_socket.send(send_data);
         } else {
            console.log("websocket connect error, ready state: " + ready_state);
         }
         break;
      case '0F-80':
         console.log("Receive: " + label);
//         console.log(input_data);
         try {
            var send_data = JSON.stringify(input_data);
         } catch(error) {
            console.log(error);
         }
         var ready_state = web_socket.readyState;
         if (ready_state == 1) {
             try {
                 web_socket.send(send_data);
             } catch(error) {
                 console.log(error);
             }
         } else {
            console.log("websocket connect error, ready state: " + ready_state);
         }
           if (input_data.CommandID =="5F2F"){
               var Tc= new Object();
               Tc.FunctionNo = 203;
               Tc.MsgTypeNo = 90;
               Tc.key = input_data.key;
               Tc.LCN = input_data.LCN;
               console.log( JSON.stringify(Tc));
               var json_data = JSON.stringify(Tc);
               try {
                   web_socket.send(json_data);
               } catch(error) {
                   console.log(error);
               }
           }
           if (input_data.CommandID =="BF11"||input_data.CommandID =="5014"||input_data.CommandID =="5015"||input_data.CommandID =="0F10"||input_data.CommandID =="0F15"||input_data.CommandID =="0F12"||input_data.CommandID =="0F14"||input_data.CommandID =="5F10"||input_data.CommandID =="5F3F"){
               var control = {};
               control.FunctionNo = 201;
               control.MsgTypeNo = 8;
               control.LCN = input_data.LCN;
               control.CommandID = input_data.CommandID;
               control.key = input_data.key;
               console.log( JSON.stringify(control));
               var json_data = JSON.stringify(control);
               try {
                   web_socket.send(json_data);
               } catch(error) {
                   console.log(error);
               }
           }
         break;

       case '0F-81':
           console.log("Receive: " + label);
           if (web_socket.readyState == 1) {
               var send_data = JSON.stringify(input_data);
               web_socket.send(send_data);
           } else {
               console.log("websocket connect error, ready state: " + web_socket.readyState);
           }
           if (input_data.CommandID =="5F2F") {
               var Tc= new Object();
               Tc.FunctionNo = 203;
               Tc.MsgTypeNo = 91;
               Tc.key = input_data.key;
               Tc.LCN = input_data.LCN;
               console.log( JSON.stringify(Tc));
               var json_data = JSON.stringify(Tc);
               try {
                   web_socket.send(json_data);
               } catch(error) {
                   console.log(error);
               }
           }
           if (input_data.CommandID =="BF11"||input_data.CommandID =="5014"||input_data.CommandID =="5015"||input_data.CommandID =="0F10"||input_data.CommandID =="0F15"||input_data.CommandID =="0F12"||input_data.CommandID =="0F14"||input_data.CommandID =="5F10"||input_data.CommandID =="5F3F"){
               var control = {};
               control.FunctionNo = 201;
               control.MsgTypeNo = 9;
               control.LCN = input_data.LCN;
               control.CommandID = input_data.CommandID;
               control.key = input_data.key;
               console.log( JSON.stringify(control));
               var json_data = JSON.stringify(control);
               try {
                   web_socket.send(json_data);
               } catch(error) {
                   console.log(error);
               }
           }
           break;
       case '0F-91':
           var control = {};
           control.FunctionNo = 201;
           control.MsgTypeNo = 8;
           control.LCN = input_data.LCN;
           control.CommandID = input_data.key;
           console.log( JSON.stringify(control));
           var json_data = JSON.stringify(control);
           try {
               web_socket.send(json_data);
           } catch(error) {
               console.log(error);
           }
           break;
      default:
         console.log("Data not be assigned :" + label);
         break;
   }
    function query_device(input_data) {
        var query_result = {};
        query_result.FunctionNo = 202;
        query_result.MsgTypeNo = 8;
        query_result.key = input_data.key;
        query_result.LCN = input_data.LCN;
        query_result.result = input_data;
        // console.log(JSON.stringify(query_result));
        var json_data = JSON.stringify(query_result);
        try {
            web_socket.send(json_data);
        } catch(error) {
            console.log(error);
        }
    }
}


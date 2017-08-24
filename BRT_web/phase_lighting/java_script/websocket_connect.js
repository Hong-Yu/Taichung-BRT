/**
 * Created by Jia on 2014/7/15.
 */
function PhaseLightingWebSocket() {
   // Public member ----------------------------------------------------------
   this.Initialize = Initialize;
   function Initialize() {
      this.web_socket = new WebSocket('ws://192.168.1.2:9098');
//      this.web_socket = new WebSocket('ws://192.168.1.186:9000', "echo");
   }
   this.Connect = Connect;
   function Connect() {
      this.ConnectToServer(this, this.web_socket);
   }
   this.Send = Send;
   function Send(json_data){
      var json_string = JSON.stringify(json_data);
      console.log("Send :"+ json_string);
      this.web_socket.send(json_string);
   }
   this.Reload = Reload;
   function Reload() {
   }

   this.ConnectToServer = ConnectToServer;
   function ConnectToServer(web_socket_manager, web_socket) {
      console.log("web socket");
      web_socket.onopen = function () {
         console.log("web socket open");
         RequestIntersection(web_socket);
         var phasenno = '01';
         RequestPhaseinitial(web_socket, phasenno);
      };
      web_socket.onerror = function () {
         console.log("web socket error!");
      };
      web_socket.onmessage = function (message) {
//      console.log(message.data);
         var data = JSON.parse(message.data);
         DataAssign(data, web_socket_manager);
      };
   }

   function RequestPhaseinitial(web_socket, phasenno) {
      var json_data = new Object();
      json_data.FunctionNo =203;
      json_data.MsgTypeNo =4;
      json_data.phase_no =phasenno;
      var json = JSON.stringify(json_data);
      web_socket.send(json);
   }

   function RequestIntersection(web_socket){
      var json_data = new Object;
      json_data.FunctionNo = 1000;
      json_data.MsgTypeNo = 1;
      var json = JSON.stringify(json_data);
      web_socket.send(json);
   }

   function DataAssign(input_data, web_socket) {
      var label = input_data.FunctionNo.toString() + "-" + input_data.MsgTypeNo.toString();
      switch(label){
         case '1000-2':
            console.log("receive : 1000-2");
            var tc = new eventListen();
            tc.Initialize();
            tc.intersection(input_data.intersection);
            break;
         case '203-3':
            console.log("receive : 203-3");
            console.log(JSON.stringify(input_data));
            var sett = new setTable();
            sett.Initialize();
            sett.set_web_socket(web_socket);
            sett.Insert(input_data.phasedata);
            sett.setButton();
            var intter =new eventListen();
            intter.Initialize(input_data);
            intter.set_web_socket(web_socket);
            intter.Updata(web_socket);
            break;
         case '203-5':
            console.log("receive : 203-5");
            console.log(JSON.stringify(input_data));
            var intersection =new eventListen();
            intersection.set_web_socket(web_socket);
            intersection.Insert(input_data.phase);
            intersection.Listen();
            intersection.data_to_TC(web_socket);
             break;
         case '203-7':
            console.log("receive : 203-7 update DB SUCCESS");
            var status = new returnStatus();
            status.Initialize();
            status.updateDB();
            break;
         case '203-9':
              console.log("receive : 203-9");
             var send_data = input_data;
             send_data.FunctionNo =3;
             send_data.MsgTypeNo =0;
             web_socket.Send(input_data);
             $('#p_bar_width').attr('style', 'width: 65%');
                setTimeout(function (){
                  if($('#p_bar_width').attr('style')=='width: 65%'){
                      $('#p_bar').remove();
                      var success_info =$('.phase');
                      var str_alert ="";
                      str_alert +='<div class="alert alert-warning" role="alert"><strong>下傳時相至 '+send_data.LCN+' 失敗，未收到回應</strong></div>';
                      success_info.append(str_alert);
                      $("button.phaseToTC").removeAttr('disabled');
                  }else{
                      $("button.phaseToTC").removeAttr('disabled');
                  }
                }, 15000);
             break;
          case '203-90':
              console.log("receive : 203-90 Send to TC SUCCESS");
              console.log(JSON.stringify(input_data));
              var tc_return = new returnStatus();
              tc_return.updateTC(input_data);
              break;
          case '203-91':
              console.log("receive : 203-91 Send to TC FAILED");
              var tc_return2 = new returnStatus();
              tc_return2.updateTC(input_data);
              break;
         default:
            console.log("Data not be assigned.");
            break;
      }
   }
}


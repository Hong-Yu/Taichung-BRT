/**
 * Created by hong on 2014/5/26.
 */
function UploadEvent() {
    // Public member ----------------------------------------------------------
    this.Initialize = Initialize;
    function Initialize() {
        ListenButton(this.web_socket);
    }
    this.set_web_socket = set_web_socket;
    function set_web_socket(web_socket) {
        this.web_socket = web_socket;
    }
// Private member ---------------------------------------------------------
    function ListenButton(web_socket) {
        var function_names = ["priority_active", "countdown_walker", "countdown_car", "reset", "set_password", "set_date", "set_period","set_light_cycle","set_step_cycle","set_pattern","set_communication"];
        var function_name, select_text;
        for (var function_index = 0; function_index < function_names.length; ++function_index) {
            function_name = function_names[function_index];
            select_text = "button." +  function_name;
//            console.log(select_text);
            $(select_text).bind("click", {function_name:function_name, web_socket:web_socket}, UploadAssign);
        }
    }
    function UploadAssign(event) {
        var output_data = new Object();
        var fun_no, msg_no, current_time, equipment_id, value, duration;
        equipment_id = $("div.intersection select").find("option:selected").attr("mark");
        switch(event.data.function_name) {
            case "priority_active":
                fun_no = "BF";
                msg_no = "11";
                current_time = GetCurrentTime();
                value = 1;
                duration = $("tr.priority_active").find("input").val();
                if(parseInt(duration) <256 && parseInt(duration) >=0){
                    output_data.Time = parseInt(duration);
                    send_to_tc(output_data);
                }else{
                    alert('請輸入1~255分鐘或輸入0為永久。');
                }
                break;
            case "reset":
                fun_no = "0F";
                msg_no = "10";
                current_time = GetCurrentTime();
                output_data.Reset = 82;
                send_to_tc(output_data);
                break;
            case "set_password":
                fun_no = "0F";
                msg_no = "15";
                current_time = GetCurrentTime();
                var passo = $("tr.set_password").find("input").val();
                if(passo.length ===6){
                output_data.Password = passo;
                send_to_tc(output_data);
                }else{
                    alert('請輸入6位數字密碼。');
                }
                break;
            case "set_date":
                fun_no = "0F";
                msg_no = "12";
                current_time = GetCurrentTime();
                var date = new Date();
                output_data.Year = date.getFullYear()-1911;
                output_data.Mouth = date.getMonth()+1;
                output_data.Day = date.getDate();
                var day_of_week = date.getDay();
                if (day_of_week === 0) day_of_week= 7;
                output_data.Week = day_of_week;
                output_data.Hour = date.getHours();
                output_data.Min = date.getMinutes();
                output_data.Sec = date.getSeconds();
                send_to_tc(output_data);
                break;
            case "set_period":
                fun_no = "0F";
                msg_no = "14";
                current_time = GetCurrentTime();
                output_data.HardwareCycle = $(".periodform :radio:checked")[0].value;
                send_to_tc(output_data);
                break;
            case "countdown_walker":
                fun_no = "50";
                msg_no = "14";
                current_time = GetCurrentTime();
                var domain_walker = $('#countdown_walker');
                if(domain_walker[0].checked === true){
                    output_data.SetOnOff = 0;
                    send_to_tc(output_data);
                }else if(domain_walker[0].checked === false){
                    output_data.SetOnOff = 1;
                    send_to_tc(output_data);
                }
                console.log(output_data);
                break;
            case "countdown_car":
                fun_no = "50";
                msg_no = "15";
                current_time = GetCurrentTime();
                var domain_car = $('#countdown_car');
                if(domain_car[0].checked === true){
                    output_data.SetOnOff = 0;
                    send_to_tc(output_data);
                }else if(domain_car[0].checked === false){
                    output_data.SetOnOff = 1;
                    send_to_tc(output_data);
                }
                break;
            case "set_light_cycle":
                fun_no = "5F";
                msg_no = "3F";
                current_time = GetCurrentTime();
                output_data.TransmitType = 1;
                output_data.TransmitCycle = parseInt($(".periodform_light :radio:checked")[0].value);
                send_to_tc(output_data);
                break;
            case "set_step_cycle":
                fun_no = "5F";
                msg_no = "3F";
                current_time = GetCurrentTime();
                output_data.TransmitType = 2;
                output_data.TransmitCycle = parseInt($(".periodform_step :radio:checked")[0].value);
                send_to_tc(output_data);
                break;
            case "set_pattern":
                fun_no = "5F";
                msg_no = "10";
                current_time = GetCurrentTime();
                output_data.ControlStrategy = parseInt($(".pattern_form option:selected").val());
                var effect_t = parseInt($("tr.set_pattern th.pattern_time :input").val());
                if(effect_t <256 && effect_t >=0){
                    output_data.EffectTime = effect_t;
                    send_to_tc(output_data);
                }else{
                    alert('請輸入1~255分鐘或輸入0為永久。');
                }
                break;
            case "set_communication":
                fun_no = "0F";
                msg_no = "11";
                current_time = GetCurrentTime();
                send_to_tc(output_data);
                break;
        }

function send_to_tc(output_data){
        var before_count = $('div.status div').size();

        output_data.FunctionNo = fun_no;
        output_data.MsgTypeNo = msg_no;
        output_data.MsgTime = current_time;
        output_data.LCN = equipment_id;
        output_data.OnOff = value;
        var web_socket = event.data.web_socket;
        web_socket.Send(output_data);
        console.log(JSON.stringify(output_data));
       setTimeout(function (){
           var success_count =$('div.status div').size();
           if(success_count==before_count){
               var success_info =$('div.status');
               var str_alert ="";
           str_alert +='<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert">' +
               '<span aria-hidden="true">&times;</span><span class="sr-only"></span></button><strong>下傳 '+fun_no+msg_no+' 至 '+output_data.LCN+' 失敗，未收到任何回應。</strong>(請確認連線狀態。)</div>';
               success_info.append(str_alert);
               console.log('Time out @UploadEvent');
           }else{}
       }, 60000);
   }
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
}

//密碼設定：
//{
//    "FunctionNo":"0F",
//    "MsgTypeNo":"15",
//    "MsgTime":"2014-04-30 18:04:45",
//    "LCN":1234,
//    "Password":"000000"   //必須為0~9之數字
//}
//
//日期設定：
//{
//    "FunctionNo":"0F",
//    "MsgTypeNo":"12",
//    "MsgTime":"2014-04-30 18:04:45",
//    "LCN":1234,
//    "Year":103,    //國曆，整數，範圍0-255
//    "Mouth":6,     //整數，範圍1-12
//    "Day":30,      //整數，範圍1-31
//    "Week":1,      //星期，整數，範圍1-7
//    "Hour":11,     //整數，範圍0-23
//    "Min":3,       //整數，範圍0-59
//    "Sec":20       //整數，範圍0-59
//}
//
//對時103年6月30日星期一11點3分20秒
//
//週期設定：
//{
//    "FunctionNo":"0F",
//    "MsgTypeNo":"14",
//    "MsgTime":"2014-04-30 18:04:45",
//    "LCN":1234,
//    "HardwareCycle":3
//    //共有六種數字可填，0~5
//    //0：停止傳送、1：1秒、2：2秒、3：5秒、4：1分鐘、5：5分鐘
//}
//

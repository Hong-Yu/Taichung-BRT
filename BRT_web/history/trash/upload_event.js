/**
 * Created by hong on 2014/5/26.
 */
function UploadEvent() {
    // Public member ----------------------------------------------------------

    this.set_web_socket = set_web_socket;
    function set_web_socket(web_socket) {
        this.web_socket = web_socket;
    }
    this.Listen = Listen;
    function Listen() {
        ListenOptionButton();
        ListenSearchButton(this.web_socket);
    }
// Private member ---------------------------------------------------------
    function ListenOptionButton() {
        var function_names = ["priority_operate", "priority_strategy", "trigger_point"];
        var label, select_text;
        for (var function_index = 0; function_index < function_names.length; ++function_index) {
            label = function_names[function_index];
            select_text = "button." +  label;
            $(select_text).bind("click", {label:label}, MarkLabel);
        }
    }
    function MarkLabel(event) {
        var label = event.data.label;
        $('div.option_zone.history').attr('selected_type', label);
    }
    function ListenSearchButton(web_socket) {
        console.log("web socket", web_socket);
        $('button.history_search').bind("click", {web_socket:web_socket}, UploadAssign);
    }
    function UploadAssign(event) {
        var output_data = new Object();
        var command = new Object();
        command.purpose = $('div.option_zone.history').attr('selected_type');
        command.start = $('input.date.start').val() +" "+ $('div.time_start pre').text();
        command.end = $('input.date.end').val() +" "+ $('div.time_end pre').text();
        output_data.FunctionNo = "history";
        output_data.MsgTypeNo = "requesting";
        output_data.MsgTime = GetCurrentTime();
        output_data.command = command;
//        console.log(JSON.stringify(output_data));
        var web_socket = event.data.web_socket;
        web_socket.Send(output_data);
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

//where operated_date between '2014-08-13 00:00:00.000' and '2014-08-14 23:59:59.997'


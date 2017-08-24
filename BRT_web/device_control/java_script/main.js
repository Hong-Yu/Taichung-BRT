/**
 * Created by CCT on 2014/3/11.
 */

function DeviceControlMain() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
    $.get("device_control/subpage/main.html", function(data) {
        domain_main.prepend(data);
        $.fn.bootstrapSwitch.defaults.size = 'small';
        $.fn.bootstrapSwitch.defaults.onColor = 'info';
        $.fn.bootstrapSwitch.defaults.onText = '開啟';
        $.fn.bootstrapSwitch.defaults.offText = '關閉';
        $("[name='my-checkbox']").bootstrapSwitch();
        PrimaryDataProcess();
    });

    function PrimaryDataProcess() {
        var web_socket = new DeviceControlWebSocket();
        web_socket.Initialize();
        web_socket.Connect();
        var upload_event = new UploadEvent();
        upload_event.set_web_socket(web_socket);
        upload_event.Initialize();
    }
}
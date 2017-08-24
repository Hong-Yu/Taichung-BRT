function SchedulingMain() {
   var domain_main;
   domain_main=$('#centerview').empty().css('background-color','transparent');
    $.get("scheduling/sub_page/main.html", function(data) {
        domain_main.prepend(data);
        $("[name='my-checkbox']").bootstrapSwitch();
        PrimaryDataProcess();
    });

    function PrimaryDataProcess() {
        var web_socket = new RouteWebSocket();
        web_socket.Initialize();
        web_socket.Connect();
        PageControl.WSetting(web_socket);
//        var upload_event = new UploadEvent();
//        upload_event.set_web_socket(web_socket);
//        upload_event.Initialize();
    }
}
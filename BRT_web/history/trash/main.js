/**
 * Created by hong on 2014/8/1.
 */
function HistoryMain() {
    var domain_main;
    domain_main=$('#centerview').css('background-color','transparent');
    $.get("history/sub_page/main.html", function(data) {
//        myApp.directive( 'test', function ( $compile ) {
//        var newElement = $compile(data)($scope);
        domain_main.append(data);


        PrimaryDataProcess();
    });
    function PrimaryDataProcess() {
        var web_socket = new WebSocketMiner();
        web_socket.Initialize();
        web_socket.Connect();
        var upload_event = new UploadEvent();
        upload_event.set_web_socket(web_socket);
        upload_event.Listen();

    }
}
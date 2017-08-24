/**
 * Created by hong on 2014/11/3.
 */
var myApp = angular.module('MyApp', []);

myApp.controller('deviceList', ['WebSocketService', '$scope', function(web_socket, $scope){
    function DataDisplay() {
        if(typeof web_socket.status !== 'undefined'){
//            console.log(web_socket.status[20]);
            $scope.intersectoin = web_socket.status[0].intersection_id;
            $scope.devices = web_socket.status;
            $scope.devices_receive_time = web_socket.receive_time;


        }
        $scope.$apply();

        setTimeout(arguments.callee, 1000);
    }
    DataDisplay();
    $scope.StringTransfer = function(input_string) {
        var result = {};
        switch (input_string) {
            case 'connect':
                result.text = '連線中';
                result.class = 'success';
                break;
            case 'disconnect':
                result.text = '斷線';
                result.class = 'danger';
                break;
            default:
                result.text = '異常';
                break;
        }
        return result;
    }

}]);


myApp.directive("mainCanvas", function($compile){
    console.log("main append !");
    return{
        restrict:'E',
        link: function(scope, element){
            $.get("device_status_table/sub_page/main.html", function(data) {
                var result = $(data).appendTo(element);
                $compile(result)(scope);
            });
        }
    }
});
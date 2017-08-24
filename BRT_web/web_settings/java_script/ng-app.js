/**
 * Created by hong on 2014/11/11.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('web.settings.app', ['http.service']);

    app.controller('WebSettingsController', ['$scope', 'httpFactory', function($scope, http_service) {
        $scope.http_service = http_service;
        $scope.permission_data =  {};
        $scope.ReadPermissionData = function() {
            var promise  = http_service.PermissionLevelRead();
            promise.then(function(data) {
                console.log("permission data: ", data);
                $scope.permission_data = data.data;
            }, function(reason) {});
        };
        $scope.ReadPermissionData();
        $scope.function_names = ["事故建立", "帳號管理", 'BRT績效',
            '控制器參數設定', '路口設備管理', '設備連線狀態-地圖', '設備連線狀態-列表',
            '歷史紀錄', '路口資訊', '即時狀態-地圖', '即時狀態-簡圖',
            '時相步階設定', '時相內容修改', '路線管理', '排程管理', '時空圖', '時制計畫設定', '時制計畫查詢'];
        $scope.column_name = ["accident", "account_manager", 'brt_performance',
            'device_control', 'device_manager', 'device_status', 'device_status_table',
            'history', 'intersection_info', 'live_status', 'live_status_sketch',
            'phase_lighting', 'phase_modify', 'route_manager', 'scheduling', 'time_space_diagram', 'timing_plan', 'timing_plan_query'];
        $scope.CreateDefaultValue = function() {
            var promise  = http_service.PermissionLevelDefault();
            promise.then(function() {
                $scope.ReadPermissionData();
            }, function(reason) {});
        };

//        $scope.Fetch = function() {
//            var method = 'POST';
//            var url = 'http://192.168.1.2:8888/history';
//            var params = {purpose:this.purpose};
//            var command = new Object();
//            command.time_start = $('input.date.start').val() +" "+ $('div.time_start pre').text();
//            command.time_end = $('input.date.end').val() +" "+ $('div.time_end pre').text();
//            var deferred = http.fetch(method, url, params, command);
//            var promise = deferred.promise;
//            promise.then(function(data) {
//                console.log("history data: ", data);
//                $scope.history_data = data.data;
//                if ($scope.isPurpose('travel_time')) ChartLine($scope.history_data);
//            }, function(reason) {
//                console.log("Failed:  ", reason);
//
//            });
//
//        }




    }]);



    app.directive("mainCanvas", function($compile){
        console.log("html page append !");
        return{
            restrict: 'E',
            templateUrl:'web_settings/sub_page/main.html'
        }
    });
})();
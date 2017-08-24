/**
 * Created by hong on 2014/10/29.
 */
// Append
//var formApp = angular.module('route.form.app', ['ui.bootstrap']);



modalApp.controller('RouteForm', ['$scope', '$http', '$templateCache',
    function($scope, $http, $templateCache){
        $http({method: 'GET', url: 'http://192.168.1.2:8888/route-manager', params: {act:'routes-select'}, data: {}, cache: $templateCache}).
            success(function(data, status) {
                $scope.status = status;
                $scope.routes = data.data.result;
                console.log("response -- status: ", status, " data: ", data);
            }).
            error(function(data, status) {
                $scope.data = data || "Request failed";
                $scope.status = status;
                console.log("response -- status: ", status, " data: ", data);

            });

        $scope.getScoreData = function(selected_route){
            console.log("get route selected: ", selected_route);
            var domain_route_map = $("div.route_map").empty();
            $http({method: 'POST', url: 'http://192.168.1.2:8888/route-manager', params: {act:'route-select'}, data: {route_id:selected_route}, cache: $templateCache}).
                success(function(data, status) {
//                    $scope.status = status;
//                    $scope.routes = data.data.result;
                    console.log("response -- status: ", status, " data: ", data);
                    var insert_manager = new InsertManager();
                    var input_data = data.data;
                    input_data.route = $scope.routes[selected_route -1];
                    insert_manager.set_input_data(input_data);
                    insert_manager.RouteMap();
                    var event = new EventManager();
                    event.set_data_manager(insert_manager);
                    event.Bind();
                    var upload = new UploadManager();
                    upload.Listen();

                }).
                error(function(data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                    console.log("response -- status: ", status, " data: ", data);

                });

//            ScoreDataService.getScoreData(score).then(function (result) {
//                $scope.ScoreData = result;
//            }, function (result) {
//                alert("Error: No data returned");
//            });
        };

    }]);


//modalApp.directive("formDynamic", function($compile){
//    console.log("route form append !");
//    return{
//        link: function(scope, element){
//            $.get("route_manager/sub_page/route_form.html", function(data) {
//                var result = $(data).appendTo(element);
//                $compile(result)(scope);
//            });
//        }
//    }
//});
//
//modalApp.directive("routeMapForms", ["$timeout", function($timeout){
//    $timeout(function() {
//        console.log('update with timeout fired');
//    }, 1000);
//    return{
//        restrict: 'E',
//        templateUrl: 'route_manager/sub_page/main.html'
//    };
//
//
//}]);
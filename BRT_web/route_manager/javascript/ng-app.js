/**
 * Created by hong on 2014/11/5.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('route.manager.app', ['http.service', 'ui-bootstrap-modal']);

    app.controller('RouteForm', ['$scope', '$http', '$templateCache', 'httpFactory',
        function($scope, $http, $templateCache, http){
            $scope.ReadRoutes = function() {
                var deferred = http.fetch('POST', {act:'routes-select'}, {});
                deferred.promise.then(function(data) {
                    $scope.routes = data.data.result;
                    console.log('Read routes successful. ', $scope.routes.length)
                }, function(reason) {
                    console.log('Read routes failed.')
                });
            };
            $scope.ReadRoutes();

            $scope.CreateRoute = function(post_data) {
                $http({method: 'POST', url: 'http://192.168.1.2:8888/route-manager', params: {act:'routes-add'}, data: post_data, cache: $templateCache}).
                    success(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
                        $scope.ReadRoutes();
                    }).
                    error(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
                    });
            };
            $scope.current_route_id = null;

            $scope.DeleteRoute = function() {
                if($scope.current_route_id == null) {
                    confirm('沒有路線被選擇!');
                    return;
                }
                var route_index = 0;
                for (;route_index < $scope.routes.length; ++route_index) {
                    if ($scope.routes[route_index].id == $scope.current_route_id) break;
                }
                var route_id = $scope.current_route_id;
                console.log('route_index: ', route_index);
                var message = "您確定要刪除路線 :"+ $scope.routes[route_index].name +"";
                if (confirm(message) != true) return;
                $http({method: 'POST', url: 'http://192.168.1.2:8888/route-manager', params: {act:'routes-delete'}, data: {route_id:route_id}, cache: $templateCache}).
                    success(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
//                        $scope.ReadRoutes();
//                        $scope.getScoreData(1);
                        location.reload();
                    }).
                    error(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
                    });
            };





            $scope.getScoreData = function(selected_route){
                console.log("get route selected: ", selected_route);
                $scope.current_route_id = selected_route;
                var domain_route_map = $("div.route_map").empty();
                $http({method: 'POST', url: 'http://192.168.1.2:8888/route-manager', params: {act:'route-select'}, data: {route_id:selected_route}, cache: $templateCache}).
                    success(function(data, status) {
//                    $scope.status = status;
//                    $scope.routes = data.data.result;
                        console.log("response -- status: ", status, " data: ", data);
                        var insert_manager = new InsertManager();
                        var input_data = data.data;
                        input_data.route = CurrentRoute($scope.routes, selected_route);
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


            };

        }]);

    function CurrentRoute(route_data, route_id) {
        var route_index = 0;
        for (;route_index < route_data.length; ++route_index) {
            if (route_data[route_index].id == route_id) return route_data[route_index] ;
        }
        return {};
    }


    app.directive("mainCanvas", function($compile){
        console.log("html page append !");
        return{
            restrict: 'E',
            link: function(scope, element){
                $.get("route_manager/sub_page/main.html", function(data) {
                    var result = $(data).appendTo(element);
                    $compile(result)(scope);
                });
            }
        }
    });


})();
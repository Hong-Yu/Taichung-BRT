/**
 * Created by hong on 2014/10/27.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('http.service', []);

    app.factory('httpFactory', ['$http', '$templateCache', '$q',
        function( $http, $templateCache, $q) {
            var service = {};
            service.fetch = function(method, url, params, data) {
                service.code = null;
                service.response = null;
                console.log("method: ", method);
                console.log("url: ", url);
                console.log("params: ", params);
                console.log("data: ", data);
                service.deferred = $q.defer();

                $http({method: method, url: url, params: params, data: data, cache: $templateCache}).
                    success(function(data, status) {
                        service.status = status;
                        service.data = data;
                        console.log("response -- status: ", status, " data: ", data);
                        service.deferred.resolve(data);
                    }).
                    error(function(data, status) {
                        service.data = data || "Request failed";
                        service.status = status;
                        console.log("response -- status: ", status, " data: ", data);
                        service.deferred.reject(data);
                    });
                return service.deferred;
            };

//            $scope.updateModel = function(method, url, data) {
//                $scope.method = method;
//                $scope.url = url;
//                $scope.data = data;
//                console.log($scope);
//                $scope.fetch();
//            };
            return service;
        }]);
})();



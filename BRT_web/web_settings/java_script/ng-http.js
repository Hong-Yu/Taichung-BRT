/**
 * Created by hong on 2014/10/27.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('http.service', []);
    app.factory('httpFactory', ['$http', '$templateCache', '$q',
        function( $http, $templateCache, $q) {
            var service = {};
            service.message = null;
            service.mytime = new Date();

            service.PermissionLevelDefault = function() {
                var deferred = $q.defer();
                $http({method: 'POST', url: 'http://192.168.1.2:8888/web-settings', params: {act:'permission_level_default'}, data: {}, cache: $templateCache}).
                    success(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
                        service.message = '還原預設值成功'; service.mytime = new Date();
                        deferred.resolve(data);
                    }).
                    error(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
            service.PermissionLevelRead = function() {
                var deferred = $q.defer();
                $http({method: 'POST', url: 'http://192.168.1.2:8888/web-settings', params: {act:'permission_level_read'}, data: {}, cache: $templateCache}).
                    success(function(data, status) {
                        service.status = status;
                        service.data = data;
                        console.log("response -- status: ", status, " data: ", data);
                        deferred.resolve(data);
                    }).
                    error(function(data, status) {
                        service.data = data || "Request failed";
                        service.status = status;
                        console.log("response -- status: ", status, " data: ", data);
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
            service.PermissionLevelUpdate = function(update_data) {
                var deferred = $q.defer();
                console.log('update data: ', update_data);
                $http({method: 'POST', url: 'http://192.168.1.2:8888/web-settings', params: {act:'permission_level_update'}, data: update_data, cache: $templateCache}).
                    success(function(data, status) {
                        service.status = status;
                        service.data = data;
                        console.log("response -- status: ", status, " data: ", data);
                        service.message = '資料表更新成功'; service.mytime = new Date();
                        deferred.resolve(data);
                    }).
                    error(function(data, status) {
                        service.data = data || "Request failed";
                        service.status = status;
                        console.log("response -- status: ", status, " data: ", data);
                        deferred.reject(data);
                    });
                return deferred.promise;
            };
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


            return service;
        }]);
})();



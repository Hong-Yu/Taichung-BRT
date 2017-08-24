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

            service.TrafficLightRead = function() {
                var deferred = $q.defer();
                $http({method: 'POST', url: 'http://192.168.1.2:8888/light-manager', params: {act:'traffic_light_read'}, data: {}, cache: $templateCache}).
                    success(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
//                        service.message = '號誌燈資訊讀取完畢'; service.mytime = new Date();
                        deferred.resolve(data);
                    }).
                    error(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
                        deferred.reject(data);
                    });
                return deferred.promise;
            };

            service.TrafficLightUpdate = function(input_data) {
                var deferred = $q.defer();
                $http({method: 'POST', url: 'http://192.168.1.2:8888/light-manager', params: {act:'traffic_light_update'}, data: input_data, cache: $templateCache}).
                    success(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
//                        service.message = '號誌燈資訊讀取完畢'; service.mytime = new Date();
                        deferred.resolve(data);
                    }).
                    error(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
                        deferred.reject(data);
                    });
                return deferred.promise;
            };

            return service;
        }]);
})();



/**
 * Created by hong on 2014/10/27.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('http.service', []);
    app.factory('httpService', ['$http', '$templateCache', '$q',
        function( $http, $templateCache, $q) {
            var service = {};
            service.message = null;
            service.mytime = new Date();
            service.sign_in_successful = null;
            service.sign_in_error = false;

            service.SignIn = function(is_cookie, user_data) {
                var deferred = $q.defer();
                $http({method: 'POST', url: 'http://192.168.1.2:8888/account-authenticate', params: {act:'sign_in'}, data: user_data, cache: $templateCache}).
                    success(function(data, status) {
                        console.log("response -- status: ", status, " data: ", data);
                        service.sign_in_successful = data.successful;
                        if (!is_cookie)
                            service.sign_in_error = !data.successful;
                        service.message = ''; service.mytime = new Date();
                        if (data.successful)
                            deferred.resolve(data);
                        else
                            deferred.reject(data);
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



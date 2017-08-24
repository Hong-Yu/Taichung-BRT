/**
 * Created by hong on 2014/11/11.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('home.page.app', ['http.service', 'cookie.service']);

    app.controller('HomePageController', ['$scope', 'httpService', 'cookieService', function($scope, http_service, cookie_service) {
        $scope.http_service = http_service;
        $scope.user_data = {};
        $scope.user_data.email = cookie_service.Read('username');
        $scope.user_data.password = cookie_service.Read('password');
        $scope.permission_data = {};

        $scope.SignIn = function(is_cookie) {
            var promise  = http_service.SignIn(is_cookie, $scope.user_data);
            promise.then(function(data) {
                $scope.permission_data = data.data.result[0];
                console.log("permission data A: ", $scope.permission_data);
                // write to cookie
                var user_data = $scope.user_data;
                cookie_service.Write('username', user_data.email);
                cookie_service.Write('password', user_data.password);
            }, function(reason) {});
        };
        $scope.SignIn(true);
        $scope.Permission = function(function_name) {
            return $scope.permission_data[function_name];
        };
        $scope.isDeveloper = function() {
            return $scope.permission_data.level == 100;
        };
        $scope.SignOut = function() {
            $scope.user_data = {};
            http_service.sign_in_successful = null;
            http_service.sign_in_error = false;
            var div = document.getElementById('centerview');
            while(div.firstChild){
                div.removeChild(div.firstChild);
            }
            cookie_service.Write('username', '');
            cookie_service.Write('password', '');
        };
    }]);



    app.directive("mainCanvas", function(){
        console.log("main page append !");
        return{
            restrict: 'E',
            templateUrl:'user_system/sub_page/home_page.html'
        }
    });
})();
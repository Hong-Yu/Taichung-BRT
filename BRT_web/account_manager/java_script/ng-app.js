/**
 * Created by hong on 2014/11/11.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('account.manager.app', ['http.service', 'ui-bootstrap-modal']);

    app.controller('AccountList', ['$scope', 'httpFactory', function($scope, http) {
        $scope.purpose = 'account_list';
        $scope.account_list = null;
        $scope.is_signup_successful = true;
        $scope.setPurpose = function(value) {
            this.purpose = value;
            console.log('purpose: ', this.purpose);
            $scope.history_data = null;
        };
        $scope.isPurpose = function(purpose) {
            return this.purpose == purpose;
        };
        $scope.Fetch = function(params, post_data) {
            console.log("fetch: ");
            var method = 'POST';
            var url = 'http://192.168.1.2:8888/account_manager';
            var deferred = http.fetch(method, url, params, post_data);
            var promise = deferred.promise;
            promise.then(function(data) {
                console.log('fetch successful.')
            }, function(reason) {
                console.log("Failed:  ", reason);
            });
            return promise;
        };

        $scope.AccountList = function () {
            var promise = $scope.Fetch({act:'account_list'}, {});
            promise.then(function(data) {
                $scope.account_list = data.data.result;
            });
            $scope.purpose = 'account_list';
        };

        (function(){
            console.log('anonymous self-invoking function');
            $scope.AccountList();
        })();

        $scope.Level = function(value) {
            var permission_statement = '';
            switch(value) {
                case 10:
                    permission_statement = '系統管理員';
                    break;
                case 1:
                    permission_statement = '一般使用者';
                    break;
                case 0:
                    permission_statement = '訪客';
                    break;
            }
            return permission_statement;
        };

        $scope.sign_up_data = new SignUpData();
        $scope.SignUp = function () {
            var promise = $scope.Fetch({act:'account_sign_up'}, $scope.sign_up_data);
            promise.then(function(data) {
                if (data.successful) {
                    $scope.AccountList();
                } else {
                    $scope.is_signup_successful = false;
                }
            });
        };
        $scope.setSignUpLevel = function (value) {
            $scope.sign_up_data.level = value;
        };
        $scope.isSignUpLevel = function (value) {
            return $scope.sign_up_data.level == value;
        };
        $scope.AccountDelete = function (account) {
            var message = "您確定要刪除帳號 :"+ account +"";
            if (confirm(message) != true) return;
            var send_data = {};
            send_data.email = account;
            var promise = $scope.Fetch({act:'account_delete'}, send_data);
            promise.then(function(data) {
                if (data.successful) {
                    $scope.AccountList();
                } else {
//                    $scope.is_signup_successful = false;
                }
            });
        };
        $scope.AccountUpdate = function (send_data) {
            var promise = $scope.Fetch({act:'account_update'}, send_data);
            promise.then(function(data) {
                if (data.successful) {
                    $scope.AccountList();
                } else {
//                    $scope.is_signup_successful = false;
                }
            });
        };

    }]);

    function SignUpData() {
        this.email = null;
        this.password = null;
        this.level = 1;
    }

    app.directive("mainCanvas", function(){
        console.log("main page append !");
        return{
            restrict: 'E',
            templateUrl:'account_manager/sub_page/main.html'
        }
    });
})();
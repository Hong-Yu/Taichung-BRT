/**
 * Created by hong on 2014/10/22.
 */
(function(){ // anonymous self-invoking function

    var myApp = angular.module('history.time.picker', ['ui.bootstrap']);
    myApp.controller('TimepickerDemoCtrl', function ($scope) {
        $scope.mytime = new Date();
        var hour = $scope.mytime.getHours();
        $scope.mytime.setHours(hour - 1);
        $scope.mytime.setMinutes(0);
//    console.log('Time Date: ', $scope.mytime);
        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };

        $scope.changed = function () {
            var hour = $("input[ng-model='hours']").val() + " " + $("input[ng-model='minutes']").val() + " "+ $("td[ng-show='showMeridian'] button").text();
            console.log('Time changed to: ' + hour);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };
    });

    myApp.controller('TimepickerEnd', function ($scope) {
        $scope.mytime = new Date();

        $scope.mytime.setMinutes(0);

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

    });


})();
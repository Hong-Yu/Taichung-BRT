/**
 * Created by hong on 2014/11/11.
 */
(function(){ // anonymous self-invoking function
    var app = angular.module('history.app', ['history.time.picker', 'http.service']);

    app.controller('HistoryForm', ['$scope', 'httpFactory', function($scope, http) {
        $scope.mytime = new Date();
        $scope.purpose = null;
        $scope.history_data = null;
        $scope.setPurpose = function(value) {
            this.purpose = value;
            console.log('purpose: ', this.purpose);
            $scope.history_data = null;
        }
        $scope.isPurpose = function(purpose) {
            return this.purpose == purpose;
        }
        $scope.Fetch = function() {
            var method = 'POST';
            var url = 'http://192.168.1.2:8888/history';
            var params = {purpose:this.purpose};
            var command = new Object();
            command.time_start = $('input.date.start').val() +" "+ $('div.time_start pre').text();
            command.time_end = $('input.date.end').val() +" "+ $('div.time_end pre').text();
            var deferred = http.fetch(method, url, params, command);
            var promise = deferred.promise;
            promise.then(function(data) {
                console.log("history data: ", data);
                $scope.history_data = data.data;
                if ($scope.isPurpose('travel_time')) ChartLine($scope.history_data);
            }, function(reason) {
                console.log("Failed:  ", reason);

            });

        }




    }]);

    function ChartLine(input_data) {
        var data = {
            labels: [],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor : "rgba(151,187,205,0.2)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };
        for (var row_index = 0; row_index < input_data.length; row_index++) {
            data.datasets[0].data[row_index] = input_data[row_index].travel_time;
            data.labels[row_index] = new Date(input_data[row_index].time).toLocaleTimeString();
//            console.log(  );
        }
        var ctx = document.getElementById("myChart").getContext("2d");
        window.myLine = new Chart(ctx).Line(data, {
            responsive: true
        });
    }




    app.directive("mainCanvas", function($compile){
        console.log("html page append !");
        return{
            restrict: 'E',
            templateUrl:'history/sub_page/main.html'
        }
    });
})();
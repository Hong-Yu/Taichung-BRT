/**
 * Created by hong on 2014/10/27.
 */

var modalApp = angular.module('ui-bootstrap-modal', ['ui.bootstrap']);
modalApp.controller('ModalDemoCtrl', [ '$scope', '$modal', '$log',  function ( $scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3', 'item99'];

    $scope.open = function (size, CreateRoute) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                CreateRoute: function () {
                    return CreateRoute;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

modalApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, $templateCache, CreateRoute) {

//    $scope.items = items;
//    $scope.selected = {
//        item: $scope.items[0]
//    };
    $scope.review = {name:'', color:'', intersection_max:null};
    $scope.is_valid = true;

    $scope.ok = function (is_valid) {
        $scope.is_valid = is_valid;
        if (is_valid) {
            CreateRoute($scope.review);
            $modalInstance.close($scope.review);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

// Append
modalApp.directive("modalAdd", function($compile){
//    console.log("dynamic: ");
    return{
        restrict:'E',
        link: function(scope, element){
            $.get("route_manager/sub_page/modal_route_add.html", function(data) {
                var template = data;
                var linkFn = $compile(template);
                var content = linkFn(scope);
                element.append(content);
            });
        }
    }
});


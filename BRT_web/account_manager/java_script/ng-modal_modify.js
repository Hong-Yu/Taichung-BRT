/**
 * Created by hong on 2014/10/27.
 */

var modalApp = angular.module('ui-bootstrap-modal', ['ui.bootstrap']);
modalApp.controller('ModalDemoCtrl', [ '$scope', '$modal', '$log',  function ( $scope, $modal, $log) {

    $scope.open = function (size, input_data, AccountUpdate) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                account: function () {
                    return input_data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
//                    console.log('modify data:', selectedItem);
            AccountUpdate(selectedItem);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
}]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

modalApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, $http, $templateCache, account) {

    $scope.modify_data = jQuery.extend(true, {}, account);
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
    $scope.setLevel = function (value) {
        $scope.modify_data.level = value;
    };
    $scope.isLevel = function (value) {
        return $scope.modify_data.level == value;
    };

    $scope.ok = function () {
        $modalInstance.close($scope.modify_data);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

modalApp.directive("accountModifyModal", function($compile){
    return{
        restrict:'E',
        link: function(scope, element){
            $.get("account_manager/sub_page/modal_modify.html", function(data) {
                var template = data;
                var linkFn = $compile(template);
                var content = linkFn(scope);
                element.append(content);
            });
        }
    }
});


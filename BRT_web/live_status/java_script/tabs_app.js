/**
 * Created by hong on 2014/10/24.
 */

var myApp = angular.module('ui.bootstrap.demo', ['ui.bootstrap']);


//myApp.controller('TabsDemoCtrl', function ($scope) {
//    $scope.tabs = [
//        { title:'Dynamic Title 1', content:'Dynamic content 1' },
//        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
//    ];
//
//    $scope.alertMe = function() {
//        setTimeout(function() {
//            alert('You\'ve selected the alert tab!');
//        });
//    };
//});

myApp.controller("PanelController", function(){
    this.tab = 1;
    this.selectTab = function(setTab) {
        console.log("select: ", setTab);
        this.tab = setTab;
    }
    this.isSelected = function(checkTab) {
        return this.tab === checkTab;
    }

});



myApp.directive("statusDynamic", function($compile){
    console.log("dynamic: ");
    return{
        link: function(scope, element){
            $.get("live_status/sub_page/live_status.html", function(data) {
                var class_names = ["col-sm-6 col-md-4 previous info_div",
                    "col-sm-6 col-md-4 current info_div",
                    "col-sm-6 col-md-4 next info_div"];
                for (var div_index = 0; div_index < 3; ++div_index) {
                    var info_div_dir = document.createElement("div");
                    info_div_dir.className = class_names[div_index];
                    $(info_div_dir).append(data);
//                    domain_main.append(info_div_dir);
                    var template = info_div_dir;
                    var linkFn = $compile(template);
                    var content = linkFn(scope);
                    element.append(content);
                }

            });
        }
    }
});


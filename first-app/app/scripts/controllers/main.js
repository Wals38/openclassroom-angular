'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */

var app = angular.module('angularApp');

app.controller('MainCtrl', function ($scope) {
    console.log('MainCtrl okay');

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.name = "Walid";
});

app.controller('BilletCtrl', function($scope) {
	$scope.todayDate = new Date();

	$scope.articles = [
		{'name' : 'Téléphone sans fil',
		'quantity' : 1,
		'price' : '39.99'
		}, {
		'name' : 'Chargeur iPhone5',
		'quantity' : 1,
		'price' : '29.99'
	}];


	$scope.total = function() {
		console.log('function total okay')
		var total = 0;
		for (var i = 0; i < $scope.articles.length; i++) {
			total += $scope.articles[i].price * $scope.articles[i].quantity;
		}
		return total;
	};

	function calculateDiscount (newValue, oldValue, scope) {
		$scope.discount = (newValue > 100) ? newValue * 0.10 : 0;
	}

	$scope.finalTotal = function () {
		return $scope.total() - $scope.discount;
	};

	$scope.$watch($scope.total, calculateDiscount);

});

app.controller("DirectivesCtrl", function($scope, factoryExample, sericeExample){
    $scope.expanders = [
        {title: 'Titre 1',
         text: 'Contenu 1'},
        {title: 'Titre 2',
         text: 'Contenu 2'},
        {title: 'Titre 3',
         text: 'Contenu 3'}
    ];
    $scope.var1 = factoryExample.service1();
    $scope.var2 = sericeExample.service2();
    console.log($scope.var1);
});

app.directive("accordeon", function(){
    return{
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: "<div ng-transclude></div>",
        controller: function(){
            var expanders = [];
            this.gotOpened = function(selectedExpander){
                expanders.forEach(function(expander){
                    if(selectedExpander != expander){
                        expander.showMe = false;
                    }
                });
            };
            this.addExpander = function(expander){
                expanders.push(expander);
            };
        }
    };
});

app.directive("expander", function(){
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?accordeon',
        scope: {title: '=expanderTitle'},
        template: '<div>' +
        '<div class="title" ng-click="toggle()">{{title}}</div>' +
        '<div class="body" ng-show="showMe" ng-transclude></div>' +
        '</div>',
        link: function(scope, element, attrs, accordionController){
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle(){
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            };
        }
    };
});

app.factory('factoryExample', function() {
    return{
        service1: function(){
            return 'Service impaire : Okay !';
        }
    }
});

app.service('sericeExample', function() {
    this.service2 = function() {
        return 'Service paire : Okay !';
    }
});
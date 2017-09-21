'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/directives', {
        templateUrl: 'views/directives.html'
      })
      .when('/filtres', {
        templateUrl: 'views/filtres.html'
      })
      .when('/infinity', {
        templateUrl: 'views/infinity.html'
      })
      .otherwise({redirectTo: 'url'}); 
  });

'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myappApp
 */
 angular.module('myApp', ['ngMaterial'])
 .config(function($mdThemingProvider) {
   $mdThemingProvider.theme('default')
   .primaryPalette('pink')
   .accentPalette('orange');
 });

'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('PartyCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //$scope.$digest();
//    doc.getModel().getRoot().addEventListener(
//      gapi.drive.realtime.EventType.OBJECT_CHANGED, 
//      function(event) {
//        if (!event.isLocal) {
//          $rootScope.$digest();
//        }
//      });
    
    
  });

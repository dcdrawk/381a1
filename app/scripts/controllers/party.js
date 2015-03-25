'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('PartyCtrl', function ($scope, $log, $location) {
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
    $scope.target = $location.search()['userId'];
    $log.debug($location.search()['userId'] + 'WAGH');
    $scope.init = function () {
    // check if there is query in url
    // and fire search in case its value is not empty
        $log.debug('WJDIAOJWDAIODJAIOJDA');
        startRealtime();
    };
  });

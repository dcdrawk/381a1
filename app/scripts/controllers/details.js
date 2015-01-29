'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('DetailsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.details = {
      name: '',
      race: '',
      subrace: '',
      class: '',
      background: '',
      alignment: '',
      experience: '',
      level: ''
    };

    $scope.characterClasses = ['Select a Class', 'Warrior', 'Rogue', 'Mage'];
    $scope.selectedItem = $scope.characterClasses[0];

  });

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
    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '' ,
      company: 'Google' ,
      address: '1600 Amphitheatre Pkwy' ,
      city: 'Mountain View' ,
      state: 'CA' ,
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode : '94043'
    };

    $scope.characterClasses = ['Select a Class', 'Warrior', 'Rogue', 'Mage'];
    $scope.selectedItem = $scope.characterClasses[0];

  });

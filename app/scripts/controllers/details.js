'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('DetailsCtrl', function ($scope, $log) {
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
    $scope.races = ['Select a Race', 'Dwarf', 'Elf', 'Halfling', 'Human'];
    $scope.subraces = ['None available'];
    $scope.characterClasses = ['Select a Class', 'Cleric', 'Fighter', 'Rogue', 'Wizard'];
    $scope.backgrounds = ['Select a Background', 'Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier'];
    $scope.alignment = ['Select an Alignment', 'Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil','Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'];

    $scope.testarray = [{ 'value': 222, 'text': '1st' }, { 'value': 2, 'text': '2nd' }];

    $scope.selectedRace = $scope.races[0];
    $scope.selectedSubrace = $scope.subraces[0];
    $scope.selectedClass = $scope.characterClasses[0];
    $scope.selectedBackground = $scope.backgrounds[0];
    $scope.selectedAlignment = $scope.alignment[0];



    $scope.updateSubrace = function() {
      if($scope.selectedRace === 'Dwarf'){
        $log.debug('Dwarf race selected');
        $scope.subraces = ['Select a Subrace', 'Hill Dwarf', 'Mountain Dwarf'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
      if($scope.selectedRace === 'Elf'){
        $log.debug('Elf race selected');
        $scope.subraces = ['Select a subrace', 'High Elf', 'Wood Elf'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
      if($scope.selectedRace === 'Halfling'){
        $log.debug('Halfling race selected');
        $scope.subraces = ['Select a subrace', 'Lightfoot', 'Stout'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
      if($scope.selectedRace === 'Human'){
        $log.debug('Human race selected');
        $scope.subraces = ['None Available'];
        $scope.selectedSubrace = $scope.subraces[0];
      }
    };
    // Calculates the character's level based on the experience entered
    $scope.calculateLevel = function() {
      if(this.characterExp >= 0){ $scope.characterLevel = '1'; }
      if(this.characterExp >= 300){ $scope.characterLevel = '2'; }
      if(this.characterExp >= 900){ $scope.characterLevel = '3'; }
      if(this.characterExp >= 2700){ $scope.characterLevel = '4'; }
      if(this.characterExp >= 6500){ $scope.characterLevel = '5'; }
      if(this.characterExp >= 14000){ $scope.characterLevel = '6'; }
      if(this.characterExp >= 23000){ $scope.characterLevel = '7'; }
      if(this.characterExp >= 34000){ $scope.characterLevel = '8'; }
      if(this.characterExp >= 48000){ $scope.characterLevel = '9'; }
      if(this.characterExp >= 64000){ $scope.characterLevel = '10'; }
      if(this.characterExp >= 85000){ $scope.characterLevel = '11'; }
      if(this.characterExp >= 100000){ $scope.characterLevel = '12'; }
      if(this.characterExp >= 120000){ $scope.characterLevel = '13'; }
      if(this.characterExp >= 140000){ $scope.characterLevel = '14'; }
      if(this.characterExp >= 164000){ $scope.characterLevel = '15'; }
      if(this.characterExp >= 195000){ $scope.characterLevel = '16'; }
      if(this.characterExp >= 225000){ $scope.characterLevel = '17'; }
      if(this.characterExp >= 265000){ $scope.characterLevel = '18'; }
      if(this.characterExp >= 305000){ $scope.characterLevel = '19'; }
      if(this.characterExp >= 355000){ $scope.characterLevel = '20'; }
    };

  });

'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('SummaryCtrl', function ($scope, $cookies, $log, $location, $anchorScroll) {
    var myName = $cookies.charName;
    var myLevel = $cookies.level;
    var myRace = $cookies.race;
    var myClass = $cookies.class;
    var myStr = $cookies.strMod;
    var myDex = $cookies.dexMod;
    var myCon = $cookies.conMod;
    var myInt = $cookies.intMod;
    var myWis = $cookies.wisMod;
    var myCha = $cookies.chaMod;

    $scope.isHidden = false;
    $scope.isModMsgHidden = false;

    $scope.levelMsg = '';
    $scope.raceMsg = '';
    $scope.classMsg = '';

    $log.debug(myName);

    $scope.basicMessage = [{
      msg : 'Some character details appear to be missing. Tap to correct.'
    }];

    $scope.abilityScoreMessage = [{
      msg : 'Ability scores missing. Tap to correct.'
    }];

    if(typeof myName === 'undefined' || myName === ''){
      myName = '<Unknown Name>';
      $scope.isHidden = false;
    }

    if(typeof myRace === 'undefined' || myRace === 'Select a Race'){
      $scope.raceMsg = '';
      $scope.isHidden = false;
    }else{
      $scope.raceMsg = myRace;
    }

    if(typeof myClass === 'undefined' || myClass === 'Select a Class'){
      $scope.classMsg = '';
      $scope.isHidden = false;
    }else{
      $scope.classMsg = myClass;
    }

    if(typeof myName !== 'undefined' && myName !== '' && typeof myRace !== 'undefined' && myRace !== 'Select a Race' && typeof myClass !== 'undefined' && myClass !== 'Select a Class'){
      $scope.isHidden = true;
    }

    if(myStr === 'undefined' || myStr === 'NaN' || myDex === 'undefined' || myDex === 'NaN' || myCon === 'undefined' || myCon === 'NaN' || myInt === 'undefined' || myInt === 'NaN' || myWis === 'undefined' || myWis === 'NaN' || myCha === 'undefined' || myCha === 'NaN'){
      $scope.isModMsgHidden = false;
    } else {
      $scope.isModMsgHidden = true;
    }

    $scope.charSummary = [{
      name : myName,
      level : myLevel,
      race : $scope.raceMsg,
      class : $scope.classMsg,
      strMod : myStr,
      dexMod : myDex,
      conMod : myCon,
      intMod : myInt,
      wisMod : myWis,
      chaMod : myCha
    }];
  });

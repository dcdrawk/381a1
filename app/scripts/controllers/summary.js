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
    var myStr = $cookies.str;
    var myDex = $cookies.dex;
    var myCon = $cookies.con;
    var myInt = $cookies.int;
    var myWis = $cookies.wis;
    var myCha = $cookies.cha;

    $log.debug(myName);
    $scope.charSummary = [{
      name : myName,
      level : myLevel,
      race : myRace,
      class : myClass,
      strMod : myStr,
      dexMod : myDex,
      conMod : myCon,
      intMod : myInt,
      wisMod : myWis,
      chaMod : myCha
    }];

    $scope.gotoTop = function (){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash('pageTitle');

      // call $anchorScroll()
      $anchorScroll();
    };
  });

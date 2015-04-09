'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('DiceCtrl', function ($scope, $timeout, $mdBottomSheet, $log, $mdDialog) {
    $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
    ];
 
	var canvasElement = document.getElementById('hammerPad');
	var controls = document.getElementById('controls');
	// create a simple instance
	// by default, it only adds horizontal recognizers
//	var ce = new Hammer(canvasElement);
//	var conE = new Hammer(controls);
//	
//	// create a pinch and rotate recognizer
//	// these require 2 pointers
//	var swipe = new Hammer.Swipe();
//	//var pinchend = new Hammer.Pinch.pinchend();
//	//var rotate = new Hammer.Rotate();
//
//	// add to the Manager
//	mc.add([swipe]);
	
	$scope.showTray = false;
	$scope.hideTray = true;
//	ce.on("pandown", function($ev) {
////		$scope.hideTray = false;
////		$scope.showTray = true;
//		$log.debug('hide');
//		controls.style.bottom = (-100)+'%';
//	});
//	ce.on("panup", function($ev) {
//		$log.debug('PAN UP');
////		if($scope.hideTray == false){
////			$scope.hideTray = true;
////			$scope.showTray = false;
////			$log.debug('hide');
////			controls.style.bottom = (-100)+'%';
////		} else {
////			$scope.hideTray = false;
////			$scope.showTray = true;
//			controls.style.bottom = (0)+'px';
////			$log.debug('show');
////		}
//		
//		$scope.$apply();
//		//$scope.showListBottomSheet($ev);
//		//$scope.showAlert($ev);
//	});
	
	$scope.testTap = function() {
		$log.debug('TAPPED!');
	}
  $scope.showListBottomSheet = function($event) {
	  $log.debug($event);
    $mdBottomSheet.show({
      templateUrl: 'bottom-sheet-template.html',
      controller: 'ListBottomSheetCtrl',
      //targetEvent: $event
    }); //.then(function(clickedItem) {
      //$scope.alert = clickedItem.name + ' clicked!';
    //});
//	}).then(function(clickedItem) {
//      $scope.alert = clickedItem.name + ' clicked!';
//    });  
  };
//  $scope.showGridBottomSheet = function($event) {
//    $scope.alert = '';
//    $mdBottomSheet.show({
//      templateUrl: 'bottom-sheet-grid-template.html',
//      controller: 'GridBottomSheetCtrl',
//      targetEvent: $event
//    }).then(function(clickedItem) {
//      $scope.alert = clickedItem.name + ' clicked!';
//    });
//  };
  })
.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
//  $scope.listItemClick = function($index) {
//    var clickedItem = $scope.items[$index];
//    $mdBottomSheet.hide(clickedItem);
//  };
});

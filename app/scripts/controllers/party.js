'use strict';

/**
 * @ngdoc function
 * @name myappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myappApp
 */
angular.module('myappApp')
  .controller('PartyCtrl', function ($scope, $log, $location, $rootScope, $window, $document) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

	$scope.testFunction = function () {
		console.log('TEST FUNCTION');	
	}
	$scope.init = function () {
    // check if there is query in url
    // and fire search in case its value is not empty

		$scope.realtimeOpen = true;
        startRealtime();
    };
	
//	function displayObjectChangedEvent(evt) {
//			console.log(evt);
//		  var events = evt.events;
//		  var eventCount = evt.events.length;
//		  for (var i = 0; i < eventCount; i++) {
//			console.log('Event type: '  + events[i].type);
//			console.log('Local event: ' + events[i].isLocal);
//			console.log('User ID: '     + events[i].userId);
//			console.log('Session ID: '  + events[i].sessionId);
//		  }
//		}
	//$document.addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, displayObjectChangedEvent);
//	var test2 = document.getElementById('testBtn2');
//	test2.onclick = function(e) {
//		//rtclient.changePermissions($fileID, null, 'anyone', 'writer');
//		console.log(newMap);
//	};
//	
//	$scope.clicked = function () {
//		//console.log(testMap);
//	}
//	var degred = $rootScope.$on('$locationChangeSuccess', function(){
//		var path = $location.path();
//		console.log('THIS IS THE PATH: ' + path);
//		var waxxy = parseQuery(window.location.href);
//		console.log(waxxy);
//	})
	    //$scope.init();
  });

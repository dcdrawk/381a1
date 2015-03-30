'use strict';

/**
 * @ngdoc overview
 * @name myappApp
 * @description
 * # myappApp
 *
 * Main module of the application.
 */
var app = {};
app.module = angular
  .module('myappApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMdIcons',
    'ngCookies',
    'duScroll'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey', {
      'default': '700', // by default use shade 700 from the cyan palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '200', // use shade 200 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette  ('amber', {
      'default': '400' // use shade 600 for default, and keep all other shades the same
    })
    .warnPalette('red', {
      'default': '600' // use shade 400 for default, and keep all other shades the same
    });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/character-details', {
        templateUrl: 'views/character-details.html',
        controller: 'DetailsCtrl'
      })
      .when('/proficiency', {
        templateUrl: 'views/proficiency.html#profTitle',
        controller: 'ProfCtrl'
      })
      .when('/ability-scores', {
        templateUrl: 'views/ability-scores.html',
        controller: 'AScoreCtrl'
      })
      .when('/to-do', {
        templateUrl: 'views/to-do.html',
        controller: 'ToDoCtrl'
      })
      .when('/character-summary', {
        templateUrl: 'views/character-summary.html',
        controller: 'SummaryCtrl'
      })
        .when('/party/:fileId/:filter', {
        templateUrl: 'views/party.html',
        controller: 'PartyCtrl'
      })
        .when('/toe', {
        templateUrl: 'views/toe.html',
        controller: 'PartyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .controller('TestCtrl', function($scope) {
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';
  })
  .controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log, $location) {
    $scope.toggleLeft = function() {
      $mdSidenav('left').toggle()
      .then(function(){
        $log.debug('toggle left is done');
      });
    };
    $scope.go = function ( path ) {
      $location.path( path );
      $mdSidenav('left').close();
    };

  })
  .controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      $mdSidenav('left').close()
      .then(function(){
        $log.debug('close LEFT is done');
      });
    };
    $scope.gotoTop = function (){
      // set the location.hash to the id of
      // the element you wish to scroll to.
      //$location.hash('pageTitle');
      // call $anchorScroll()
      //$anchorScroll();
    };
  })

/**
 * A simple type for todo items.
 * @constructor
 */
app.Todo = function () {
};

/**
 * Loads the document. Used to inject the collaborative document
 * into the main controller.
 *
 * @param $route
 * @param storage
 * @returns {*}
 */
app.loadFile = function ($route, storage) {
  var id = $route.current.params.fileId;
  var userId = $route.current.params.user;
  return storage.requireAuth(true, userId).then(function () {
    return storage.getDocument(id);
  });
};
app.loadFile.$inject = ['$route', 'storage'];


//.controller('SubheaderAppCtrl', function($scope) {
//    $scope.messages = [
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//      {
//        face : '/img/list/60.jpeg',
//        what: 'Brunch this weekend?',
//        who: 'Min Li Chan',
//        when: '3:08PM',
//        notes: ' Ill be in your neighborhood doing errands'
//      },
//    ];
//});

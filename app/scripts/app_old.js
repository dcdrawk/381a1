'use strict';

/**
 * @ngdoc overview
 * @name myappApp
 * @description
 * # myappApp
 *
 * Main module of the application.
 */

//var CONFIG = {
//  clientId: '516279059329-ucgvf9nubkm942qoc0iqgo838f3mfv6a.apps.googleusercontent.com',
//  scopes: [
//    'https://www.googleapis.com/auth/drive.file',
//    'https://www.googleapis.com/auth/drive.install'
//  ]
//};
//
var app = {};
///**
// * A simple type for todo items.
// * @constructor
// */
//app.module = angular.module('myappApp', []);
//app.Todo = function () {
//};
//
///**
// * Initializer for constructing via the realtime API
// *
// * @param title
// */
//app.Todo.prototype.initialize = function (title) {
//  var model = gapi.drive.realtime.custom.getModel(this);
//  this.title = model.createString(title);
//  this.completed = false;
//  this.setup();
//};
//
///**
// * Adds a "text" property to collaborative strings for ng-model compatibility
// * after a model is created or loaded.
// */
//app.Todo.prototype.setup = function() {
//  Object.defineProperty(this.title, 'text', {
//    set: this.title.setText,
//    get: this.title.getText
//  });
//};
//
///**
// * Loads the document. Used to inject the collaborative document
// * into the main controller.
// *
// * @param $route
// * @param storage
// * @returns {*}
// */
//app.loadFile = function ($route, storage) {
//  var id = $route.current.params.fileId;
//  var userId = $route.current.params.user;
//  return storage.requireAuth(true, userId).then(function () {
//    return storage.getDocument(id);
//  });
//};
//app.loadFile.$inject = ['$route', 'storage'];

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
    'duScroll',
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
      .when('/spells', {
        templateUrl: 'views/spells.html',
        controller: 'SpellsCtrl'
      })
      .when('/character-summary', {
        templateUrl: 'views/character-summary.html',
        controller: 'SummaryCtrl'
      })
		.when('/party', {
        templateUrl: 'views/party.html',
        controller: 'PartyCtrl'
      })
		.when('/party/:fileId/', {
        templateUrl: 'views/party.html',
        controller: 'PartyCtrl',
//		resolve: {
//          realtimeDocument: app.loadFile
//        }
      })
//        .when('/toe', {
//        templateUrl: 'views/toe.html',
//        controller: 'PartyCtrl'
//      
      .otherwise({
        redirectTo: '/'
      });
	
//		//adding from the todos example
//	  .when('/todos/:fileId/:filter', {
//        templateUrl: 'views/todos.html',
//        controller: 'MainCtrl',
//        resolve: {
//          realtimeDocument: app.loadFile
//        }
//      })
//      .when('/todos/create', {
//        templateUrl: 'views/loading.html',
//        controller: 'CreateCtrl'
//      })
//      .when('/todos/install', {
//        templateUrl: 'views/install.html',
//        controller: 'InstallCtrl'
//      })
//      .otherwise({
//        redirectTo: '/install'
//      });

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
    
    $scope.openLeft = function() {
      $mdSidenav('left').open()
      .then(function(){
          $log.debug('open left is done');
      });
    };
    
    $scope.closeLeft = function() {
      $mdSidenav('left').close()
      .then(function(){
          $log.debug('close left is done');
      });
    };
    $scope.go = function ( path ) {
      $location.path( path );
      $mdSidenav('left').close();
    };
//    var myElement = document.getElementById('doc-content');
//    var leftNav = document.getElementById('leftNav');
//    
//    var mc = new Hammer(myElement);
//    var ln = new Hammer(leftNav);
//
//    var pan = new Hammer.Pan({threshold: 200});
//    var pan2 = new Hammer.Pan({threshold: 200});
//    mc.add([pan]);
//    ln.add([pan2]);
//    
//    ln.on('panleft', function(ev) {
//        window.getSelection().removeAllRanges();
//        $scope.closeLeft();
//    });
//    
//    mc.on('panright', function(ev) {
//        window.getSelection().removeAllRanges();        
//        $scope.openLeft();
//    });
    
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
  });


///**
// * A simple type for todo items.
// * @constructor
// */
////app.module = angular.module('myappApp', []);
//app.Todo = function () {
//};
//
///**
// * Initializer for constructing via the realtime API
// *
// * @param title
// */
//app.Todo.prototype.initialize = function (title) {
//  var model = gapi.drive.realtime.custom.getModel(this);
//  this.title = model.createString(title);
//  this.completed = false;
//  this.setup();
//};
//
///**
// * Adds a "text" property to collaborative strings for ng-model compatibility
// * after a model is created or loaded.
// */
//app.Todo.prototype.setup = function() {
//  Object.defineProperty(this.title, 'text', {
//    set: this.title.setText,
//    get: this.title.getText
//  });
//};
//
///**
// * Loads the document. Used to inject the collaborative document
// * into the main controller.
// *
// * @param $route
// * @param storage
// * @returns {*}
// */
//app.loadFile = function ($route, storage) {
//  var id = $route.current.params.fileId;
//  var userId = $route.current.params.user;
//  return storage.requireAuth(true, userId).then(function () {
//    return storage.getDocument(id);
//  });
//};
//app.loadFile.$inject = ['$route', 'storage'];
//app.module.value('config', CONFIG);
//
///**
// * Set up handlers for various authorization issues that may arise if the access token
// * is revoked or expired.
// */
//app.module.run(['$rootScope', '$location', 'storage', function ($rootScope, $location, storage) {
//  // Error loading the document, likely due revoked access. Redirect back to home/install page
//  $rootScope.$on('$routeChangeError', function () {
//    $location.url('/install?target=' + encodeURIComponent($location.url()));
//  });
//
//  // Token expired, refresh
//  $rootScope.$on('todos.token_refresh_required', function () {
//    storage.requireAuth(true).then(function () {
//      // no-op
//    }, function () {
//      $location.url('/install?target=' + encodeURIComponent($location.url()));
//    });
//  });
//}]);
//
///**
// * Bootstrap the app
// */
//gapi.load('auth:client:drive-share:drive-realtime', function () {
//  gapi.auth.init();
//
//  // Register our Todo class
//  app.Todo.prototype.title = gapi.drive.realtime.custom.collaborativeField('title');
//  app.Todo.prototype.completed = gapi.drive.realtime.custom.collaborativeField('completed');
//
//  gapi.drive.realtime.custom.registerType(app.Todo, 'todo');
//  gapi.drive.realtime.custom.setInitializer(app.Todo, app.Todo.prototype.initialize);
//  gapi.drive.realtime.custom.setOnLoaded(app.Todo, app.Todo.prototype.setup);
//
//  $(document).ready(function () {
//	  console.log('test');
//    angular.bootstrap(document, ['myappApp']);
//  });
//});

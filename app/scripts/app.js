/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var CONFIG = {
  clientId: '516279059329-ucgvf9nubkm942qoc0iqgo838f3mfv6a.apps.googleusercontent.com',
  scopes: [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.install'
  ]
};

var app = {};

app.module = angular.module('myappApp', [
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
	'config'
  ]);

/**
 * A simple type for todo items.
 * @constructor
 */
app.Todo = function () {
};

/**
 * Initializer for constructing via the realtime API
 *
 * @param title
 */
app.Todo.prototype.initialize = function (title) {
  var model = gapi.drive.realtime.custom.getModel(this);
  this.title = model.createString(title);
  this.completed = false;
  this.setup();
};

/**
 * Adds a "text" property to collaborative strings for ng-model compatibility
 * after a model is created or loaded.
 */
app.Todo.prototype.setup = function() {
  Object.defineProperty(this.title, 'text', {
    set: this.title.setText,
    get: this.title.getText
  });
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
//app.loadFile.$inject = ['$route', 'storage'];

/**
 * Initialize our application routes
 */
app.module.config(function ($routeProvider) {
    $routeProvider
      .when('/todos/:fileId/:filter', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          realtimeDocument: app.loadFile
        }
      })
      .when('/create', {
        templateUrl: 'views/loading.html',
        controller: 'CreateCtrl'
      })
      .when('/install', {
        templateUrl: 'views/install.html',
        controller: 'InstallCtrl'
      })
      .otherwise({
        redirectTo: '/install'
      });
  }
);

 app.module.controller('TestCtrl', function($scope) {
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

app.module.value('config', CONFIG);

/**
 * Set up handlers for various authorization issues that may arise if the access token
 * is revoked or expired.
 */
app.module.run(['$rootScope', '$location', 'storage', function ($rootScope, $location, storage) {
  // Error loading the document, likely due revoked access. Redirect back to home/install page
  $rootScope.$on('$routeChangeError', function () {
    $location.url('/install?target=' + encodeURIComponent($location.url()));
  });

  // Token expired, refresh
  $rootScope.$on('todos.token_refresh_required', function () {
    storage.requireAuth(true).then(function () {
      // no-op
    }, function () {
      $location.url('/install?target=' + encodeURIComponent($location.url()));
    });
  });
}]);

/**
 * Bootstrap the app
 */
gapi.load('auth:client:drive-share:drive-realtime', function () {
  gapi.auth.init();

  // Register our Todo class
  app.Todo.prototype.title = gapi.drive.realtime.custom.collaborativeField('title');
  app.Todo.prototype.completed = gapi.drive.realtime.custom.collaborativeField('completed');

  gapi.drive.realtime.custom.registerType(app.Todo, 'todo');
  gapi.drive.realtime.custom.setInitializer(app.Todo, app.Todo.prototype.initialize);
  gapi.drive.realtime.custom.setOnLoaded(app.Todo, app.Todo.prototype.setup);

  $(document).ready(function () {
    angular.bootstrap(document, ['myappApp']);
  });
});

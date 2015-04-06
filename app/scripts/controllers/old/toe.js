var APP = angular.module('myappApp2', []);
// 
//APP.controller('gameController', function($scope) {

angular.module('myappApp')
.controller('gameController', function ($scope) {
    $scope.gameReady = false;
    $scope.chatInput = '';
    
    var wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        ];
        
    var scoreGame = function() {
        for (var k = 0; k < 2; k++) {
            var player = k == 0 ? 'x' : 'o';
            for (var i = 0; i < wins.length; i++) {
                var count = 0;
                for (var j = 0; j < wins[i].length; j++) {
                    if ($scope.tiles[wins[i][j]] == player) count++;
                }
                if (count == 3) return player;
            }
        }
        var used = 0;
        for (var i in $scope.tiles) {
            if ($scope.tiles[i] != 0) used++;
        }
        console.log(used);
        if (used == 9) return 'no one';
    };
    
    $scope.game = {turn:'x'};
    $scope.tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    $scope.chat = [];
    
    $scope.tileClick = function(index) {
        if ($scope.tiles[index] != 0) return;
        //set tile
        $scope.tiles[index] = $scope.game.turn;
        APP.tiles.set(index, $scope.game.turn);
        //change the turn
        $scope.game.turn = $scope.game.turn == 'x' ? 'o' : 'x';
        APP.game.set('turn', $scope.game.turn);
        //evaluate game state
        var winner = scoreGame();
        if (winner) {
            alert(winner + ' wins');
            $scope.reset();
        }
    };
    
    $scope.chatClick = function() {
        var data = {player:$scope.game.turn, message:$scope.chatInput, time:Date.now()};
        console.log(data);
        $scope.chat.push(data);
        APP.chat.push(data);
    };
    
    $scope.reset = function() {
        $scope.tiles = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        APP.tiles.replaceRange(0, $scope.tiles);
    };
    
    //public functions, accessed by drive.js externally
    APP.gameReady = function() {
        $scope.gameReady = true;
        $scope.$apply(); //udpate view
    };
    APP.updateTiles = function() {
        $scope.tiles = APP.tiles.asArray();
        $scope.$apply(); //udpate view
        var winner = scoreGame();
        if (winner) alert(winner + ' wins');
    };
    APP.updateChat = function() {
        $scope.chat = APP.chat.asArray();
        $scope.$apply(); //udpate view
    };
    APP.updateGame = function() {
        $scope.game.turn = APP.game.get('turn');
        $scope.$apply(); //udpate view
    };
});
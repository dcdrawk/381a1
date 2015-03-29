function onFileLoaded(doc) {
    APP.game = doc.getModel().getRoot().get('game');
    APP.tiles = doc.getModel().getRoot().get('tiles');
    APP.chat = doc.getModel().getRoot().get('chat');
    
    //Game
    function gameChange(e) {
        if (e.isLocal == true) return;
        console.log('gameChange', e);
        APP.updateGame();
    };
    APP.game.addEventListener(gapi.drive.realtime.EventType.VALUE_CHANGED, gameChange);
 
    
    //Tiles
    function tilesChange(e) {
        if (e.isLocal) return;
        console.log('tilesChange', e);
        APP.updateTiles();
    };
    APP.tiles.addEventListener(gapi.drive.realtime.EventType.VALUES_SET, tilesChange);
    
    
    //Tiles
    function chatChange(e) {
        if (e.isLocal) return;
        console.log('chatChange', e);
        APP.updateChat();
    };
    APP.chat.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, chatChange);
    
    //start game
    console.log(APP);
    APP.updateGame();
    APP.updateTiles();
    APP.gameReady();
}
 
function initializeModel(model) {
    console.log('model initialized');
    var game = model.createMap({turn:'x'});
    var tiles = model.createList([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    var chat = model.createList();
    
    model.getRoot().set('game', game);
    model.getRoot().set('tiles', tiles);
    model.getRoot().set('chat', chat);
}
 
var realtimeOptions = {
    clientId: '516279059329-ucgvf9nubkm942qoc0iqgo838f3mfv6a.apps.googleusercontent.com',
    authButtonElementId: 'authorizeButton',
    initializeModel: initializeModel,
    autoCreate: true,
    defaultTitle: "Realtime API Tic Tac Toe Example",
    newFileMimeType: null, // Using default.
    onFileLoaded: onFileLoaded,
    registerTypes: null, // No action.
    afterAuth: null // No action.
}
 
window.onload = function() {
    var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
    realtimeLoader.start();
}
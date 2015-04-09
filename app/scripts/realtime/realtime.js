/**
     * This function is called the first time that the Realtime model is created
     * for a file. This function should be used to initialize any values of the
     * model. In this case, we just create the single string model that will be
     * used to control our text box. The string has a starting value of 'Hello
     * Realtime World!', and is named 'text'.
     * @param model {gapi.drive.realtime.Model} the Realtime root model object.
     */
    function initializeModel(model) {
      var string = model.createString('Hello Realtime World!');
//		var string2 = model.createString('This ia a new string!');
		var map = model.createMap();
		//var list = doc.getModel().createList();
		model.getRoot().set('text', string);
//		model.getRoot().set('text2', string2);
		model.getRoot().set('map', map);
    }

    /**
     * This function is called when the Realtime file has been loaded. It should
     * be used to initialize any user interface components and event handlers
     * depending on the Realtime model. In this case, create a text control binder
     * and bind it to our string model that we created in initializeModel.
     * @param doc {gapi.drive.realtime.Document} the Realtime document.
     */
    function onFileLoaded(doc) {
		
      var string = doc.getModel().getRoot().get('text');
//		var string2 = doc.getModel().getRoot().get('text2');
		var map = doc.getModel().getRoot().get('map');
		//testMap = map.get('mylist');
		//newMap = testMap;
		//console.log(string);
		//map.set('mylist', 'list');
      // Keeping one box updated with a String binder.
      var textArea1 = document.getElementById('notes');
//		var textArea2 = document.getElementById('testText');
		//var testBtn = document.getElementById('testBtn');
		var binding = document.getElementById('binding');
      gapi.drive.realtime.databinding.bindString(string, textArea1);
//		gapi.drive.realtime.databinding.bindString(string2, textArea2);
		//gapi.drive.realtime.databinding.Binding(map, binding);
		//binding.innerHTML = gapi.drive.realtime.databinding.Binding(map, binding);
		
		//gapi.drive.realtime.databinding.bindString(string, textArea1);
      // Keeping one box updated with a custom EventListener.
//      var textArea2 = document.getElementById('editor2');
//      var updateTextArea2 = function(e) {
//        textArea2.value = string;
//      };
//      string.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, updateTextArea2);
//      string.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, updateTextArea2);
//      textArea2.onkeyup = function() {
//        string.setText(textArea2.value);
//      };
//      updateTextArea2();
      // Enabling UI Elements.
      textArea1.disabled = false;
//		textArea2.disabled = false;
		
//      textArea2.disabled = false;

      // Add logic for undo button.
      var model = doc.getModel();
//      var undoButton = document.getElementById('undoButton');
//      var redoButton = document.getElementById('redoButton');
 		var shareButton = document.getElementById('enableShare');
		//var shareButton2 = document.getElementById('shareButton');
		var disableShareButton = document.getElementById('disableShare');
		//var urlButton = document.getElementById('urlButton');
		var addQuest = document.getElementById('addQuest');
		var questName = document.getElementById('questName');
		var questDetails = document.getElementById('questDetails');
		var clearQuests = document.getElementById('clearQuests');
		var newQuestBtn = document.getElementById('newQuest');
		var questForm = document.getElementById('questForm');
		var urlText = document.getElementById('shortURL');
		
		var togNotes = document.getElementById('togNotes');
		var togQuests = document.getElementById('togQuests');
		var questLogContainer = document.getElementById('questLogContainer');
		//var togNotes = document.getElementById('togNotes');
//		var removeBtn = document.getElementById('removeBtn');
		//console.log('FALLALALA');
//      undoButton.onclick = function(e) {
//        model.undo();
//      };
//      redoButton.onclick = function(e) {
//        model.redo();
//      };
//		
		//File Permissions button setup
		var $fileID = rtclient.params['fileIds'];
		shareButton.onclick = function(e) {
			rtclient.changePermissions($fileID, null, 'anyone', 'writer');
		};

		disableShareButton.onclick = function(e) {
			rtclient.changePermissions($fileID, null, 'anyone', 'reader');
		};
		
		//toggles the display of the notes area
		togNotes.onclick = function() {		
			if(textArea1.style.display == ''){	
				textArea1.style.display = 'none';
				togNotes.innerHTML = 'Show';
			} else
			if(textArea1.style.display == 'block'){					
				textArea1.style.display = 'none';
				togNotes.innerHTML = 'Show';
			} else
			if(textArea1.style.display == 'none') {
				textArea1.style.display = 'block';
				togNotes.innerHTML = 'Hide';				
			}
		}
		//toggles the display of the notes area
		togQuests.onclick = function() {		
			if(questLogContainer.style.display == ''){	
				questLogContainer.style.display = 'none';
				togQuests.innerHTML = 'Show';
			} else
			if(questLogContainer.style.display == 'block'){					
				questLogContainer.style.display = 'none';
				togQuests.innerHTML = 'Show';
			} else
			if(questLogContainer.style.display == 'none') {
				questLogContainer.style.display = 'block';
				togQuests.innerHTML = 'Hide';				
			}
		}

		addQuest.onclick = function() {
			mapKeys = map.keys();            
            //creates a new quest object
			var newQuest = {
				id : mapKeys.length,
				description : questDetails.value,
				complete : false				
			}
			map.set(questName.value, newQuest);
			console.log('Add Quest ' + questName.value);
            
            //reset the input values
			questDetails.value = '';
			questName.value = '';
			addQuest.disabled = true;
			
			newQuestBtn.style.display = 'block';
			questForm.style.display = 'none';			
		};
        
		clearQuests.onclick = function() {
			map.clear();
		}
		newQuestBtn.onclick = function() {
			questForm.style.display = 'block';
			newQuestBtn.style.display = 'none';
		}
		questName.oninput = function() {
			//takes care of disabling the add quest button if both fields are empty
			if (questName.value == '' || questDetails.value == ''){
				addQuest.disabled = true;
			} else {
				addQuest.disabled = false;
			}
		}
		questDetails.oninput = function() {
			//takes care of disabling the add quest button if both fields are empty
			if (questName.value == '' || questDetails.value == ''){
				addQuest.disabled = true;
			} else {
				addQuest.disabled = false;
			}
		}
//		//var contents = {"longUrl": "http://www.reddit.com/"}
//		urlButton.onclick = function(e) {
//			//rtclient.urlShortener('https://www.googleapis.com/urlshortener/v1/url', contents);
////			rtclient.urlShortener('https://www.googleapis.com/auth/urlshortener', contents);
//			
//			//	gapi.client.setApiKey('AIzaSyCde-rPHpjfEEqmR93btsjT8fh6onckLow');
//			var pubKey = 'AIzaSyCde-rPHpjfEEqmR93btsjT8fh6onckLow';
//			gapi.client.load('urlshortener', 'v1').then(
//				rtclient.urlShortener('https://www.googleapis.com/urlshortener/v1/url?key='+pubKey, contents)
//			);
//		};
//      // Add event handler for UndoRedoStateChanged events.
//      var onUndoRedoStateChanged = function(e) {
//        undoButton.disabled = !e.canUndo;
//        redoButton.disabled = !e.canRedo;
//      };
//      model.addEventListener(gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED, onUndoRedoStateChanged);
		
		
		var questLog = document.getElementById('questLog');
		
		function displayObjectChangedEvent(evt) {
			console.log(evt);
			var events = evt.events;
			var eventCount = evt.events.length;
			for (var i = 0; i < eventCount; i++) {
				console.log('Event type: '  + events[i].type);
				console.log('Local event: ' + events[i].isLocal);
				console.log('User ID: '     + events[i].userId);
				console.log('Session ID: '  + events[i].sessionId);
			}
			testMap = map.get('mylist');
			mapKeys = map.keys();
			console.log( map.keys());
			var newHTML = formatQuestlog(mapKeys);
			quests.innerHTML = newHTML;			
		}
		doc.getModel().getRoot().addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, displayObjectChangedEvent);
		//console.log(doc.getModel());
		
		function formatQuestlog(keys) {
			var questHTML = '';
			console.log(keys);
			
			
			for(var i = 0; i < keys.length; i++){
				
				var name = keys[i];
				document.getElementById('questLog');
				//testMap2 = map.get('mylist');
				var questInfo = map.get(keys[i]);
				
				if(questInfo.complete){
					console.log(name + ' is complete');
					questHTML += '<div class="questContainer"><div class="questDetail complete">';
				} else {
					questHTML += '<div class="questContainer"><div class="questDetail">';
				}
				console.log(questInfo);
				questHTML += '<p><strong>' + name + '</strong></p>';
				questHTML += '<p>' + questInfo.description + '</p></div>';
				
				
				questHTML += '<div class="questControls"><p value="'+name+'" class="completeQuest">COMPLETE</p> <p value="'+name+'" class="removeQuest">REMOVE</p></div></div>'

				//questHTML += '<button value="'+name+'" class="removeQuest realtimeBtn md-padding md-primary md-button md-default-theme" ng-transclude="" style="display: inline-block;"><span class="ng-scope">Remove Quest</span>	</button>';
				//questHTML += '<md-button class="realtimeBtn md-padding md-primary" value="'+name+'">Remove</md-button>';
				//quests.innerHTML += questHTML;
				
				
			}

			return questHTML;
		}
		
		function removeQuest(value) {
			map.delete(value);
			//console.log(value);
		}
		function completeQuest(value) {
			var questKey = map.get(value);
			var questId = questKey.id;
			var questDesc = questKey.description;
			console.log(value);
			var updateQuest = {
				id : questId,
				description : questDesc,
				complete : true				
			}
			map.set(value, updateQuest);
		}
		
		document.onclick = function(e) {    
			if (e.target.className === 'removeQuest') {
				console.log('REMOVE!');
				//console.log((e.target.attributes.value));
				removeQuest(e.target.attributes[0].value);
			}
			else if (e.target.className === 'completeQuest') {
				console.log('COMPLETE!');
				//console.log((e.target.attributes.value));
				completeQuest(e.target.attributes[0].value);
			}
			else if (e.target.className === 'copyURL') {
				SelectText('shortURL');
				console.log('Link Copied!');
			}
		};
		
		//Sets up the initial quest log on load:
		mapKeys = map.keys();
		var newHTML = formatQuestlog(mapKeys);
		quests.innerHTML = newHTML;	
		
	}

    /**
     * Options for the Realtime loader.
     */
    var realtimeOptions = {
      /**
       * Client ID from the console.
       */
      clientId: '516279059329-ucgvf9nubkm942qoc0iqgo838f3mfv6a.apps.googleusercontent.com',

      /**
       * The ID of the button to click to authorize. Must be a DOM element ID.
       */
      authButtonElementId: 'authorizeButton',

      /**
       * Function to be called when a Realtime model is first created.
       */
      initializeModel: initializeModel,

      /**
       * Autocreate files right after auth automatically.
       */
      autoCreate: true,

      /**
       * The name of newly created Drive files.
       */
      defaultTitle: "Scollbinder Party",

      /**
       * The MIME type of newly created Drive Files. By default the application
       * specific MIME type will be used:
       *     application/vnd.google-apps.drive-sdk.
       */
      newFileMimeType: null, // Using default.

      /**
       * Function to be called every time a Realtime file is loaded.
       */
      onFileLoaded: onFileLoaded,

      /**
       * Function to be called to inityalize custom Collaborative Objects types.
       */
      registerTypes: null, // No action.

      /**
       * Function to be called after authorization and before loading files.
       */
      afterAuth: null // No action.
    }
	
//	function httpGet(theUrl, contents)
//	{
//		var xmlHttp = null;
//
//		xmlHttp = new XMLHttpRequest();
//		xmlHttp.open( "POST", theUrl, false );
//		xmlHttp.setRequestHeader("Content-type","application/json");
//		xmlHttp.send(contents);
//		return xmlHttp.responseText;
//	}
//	var contents = {"longUrl": "http://www.google.com/"}
//	//var newURL = httpGet('https://www.googleapis.com/urlshortener/v1/url', contents);
//	console.log(contents);
//gapi.client.load('urlshortener', 'v1').then(httpGet('https://www.googleapis.com/urlshortener/v1/url', contents));
	
//	rtclient.urlShortener('https://www.googleapis.com/urlshortener/v1/url', contents);
    /**
     * Start the Realtime loader with the options.
     */
    function startRealtime() {
      var realtimeLoader = new rtclient.RealtimeLoader(realtimeOptions);
      realtimeLoader.start();
    }
	
//got the select function from 
function SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}



//document.onclick = function(e) {  
//	console.log('Document Clicked!');
//    if (e.target.className === 'copyURL') {
//        SelectText('shortURL');
//		console.log('Link Selected!');
//    }
////	if (e.target.className === 'removeQuest') {
////		console.log('REMOVE!');
////		//console.log((e.target.attributes.value));
////		removeQuest(e.target.attributes[0].value);
////	}
//}
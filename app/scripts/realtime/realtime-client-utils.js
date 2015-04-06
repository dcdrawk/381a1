/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
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

 "use strict";

/**
 * @fileoverview Common utility functionality for Google Drive Realtime API,
 * including authorization and file loading. This functionality should serve
 * mostly as a well-documented example, though is usable in its own right.
 */


/**
 * @namespace Realtime client utilities namespace.
 */
var rtclient = rtclient || {}


/**
 * OAuth 2.0 scope for installing Drive Apps.
 * @const
 */
rtclient.INSTALL_SCOPE = 'https://www.googleapis.com/auth/drive.install'


/**
 * OAuth 2.0 scope for opening and creating files.
 * @const
 */
rtclient.FILE_SCOPE = 'https://www.googleapis.com/auth/drive.file'


/**
 * OAuth 2.0 scope for accessing the user's ID.
 * @const
 */
rtclient.OPENID_SCOPE = 'openid'


/**
 * MIME type for newly created Realtime files.
 * @const
 */
rtclient.REALTIME_MIMETYPE = 'application/vnd.google-apps.drive-sdk';


/**
 * Parses the hash parameters to this page and returns them as an object.
 * @function
 */
rtclient.getParams = function() {
  var params = {};
  var hashFragment = window.location.hash;
  if (hashFragment) {
    // split up the query string and store in an object
    var paramStrs = hashFragment.slice(1).split("&");
    for (var i = 0; i < paramStrs.length; i++) {
      var paramStr = paramStrs[i].split("=");
      params[paramStr[0]] = unescape(paramStr[1]);
    }
  }
  //console.log(params);
  return params;
}


/**
 * Instance of the query parameters.
 */
rtclient.params = rtclient.getParams();


/**
 * Fetches an option from options or a default value, logging an error if
 * neither is available.
 * @param options {Object} containing options.
 * @param key {string} option key.
 * @param defaultValue {Object} default option value (optional).
 */
rtclient.getOption = function(options, key, defaultValue) {
  var value = options[key] == undefined ? defaultValue : options[key];
  if (value == undefined) {
    console.error(key + ' should be present in the options.');
  }
  //console.log(value);
  return value;
}


/**
 * Creates a new Authorizer from the options.
 * @constructor
 * @param options {Object} for authorizer. Two keys are required as mandatory, these are:
 *
 *    1. "clientId", the Client ID from the console
 */
rtclient.Authorizer = function(options) {
  this.clientId = rtclient.getOption(options, 'clientId');
  // Get the user ID if it's available in the state query parameter.
  this.userId = rtclient.params['userId'];
  this.authButton = document.getElementById(rtclient.getOption(options, 'authButtonElementId'));
}


/**
 * Start the authorization process.
 * @param onAuthComplete {Function} to call once authorization has completed.
 */
rtclient.Authorizer.prototype.start = function(onAuthComplete) {
  var _this = this;
  gapi.load('auth:client,drive-realtime,drive-share', function() {
//      console.log('value');      
//      var $fileID = rtclient.params['fileIds'];
//      //console.log($fileID);
//       var s = new gapi.drive.share.ShareClient('516279059329');
//        s.setItemIds([$fileID]);
        
        
    _this.authorize(onAuthComplete);
  });
//	gapi.client.setApiKey('516279059329-ucgvf9nubkm942qoc0iqgo838f3mfv6a'); //get your ownn Browser API KEY
//	gapi.client.load('urlshortener', 'v1',function(){});
}


/**
 * Reauthorize the client with no callback (used for authorization failure).
 * @param onAuthComplete {Function} to call once authorization has completed.
 */
rtclient.Authorizer.prototype.authorize = function(onAuthComplete) {
  var clientId = this.clientId;
  var userId = this.userId;
  var _this = this;

  var handleAuthResult = function(authResult) {
    if (authResult && !authResult.error) {
      _this.authButton.disabled = true;
	 	_this.authButton.style.display = 'none';
      _this.fetchUserId(onAuthComplete);
    } else {
      _this.authButton.disabled = false;
		_this.authButton.style.display = 'block';
      _this.authButton.onclick = authorizeWithPopup;
    }
  };

  var authorizeWithPopup = function() {
    gapi.auth.authorize({
      client_id: clientId,
      scope: [
        rtclient.INSTALL_SCOPE,
        rtclient.FILE_SCOPE,
        rtclient.OPENID_SCOPE
      ],
      user_id: userId,
      immediate: false
    }, handleAuthResult);
    //console.log(clientId);
  };

  // Try with no popups first.
  gapi.auth.authorize({
    client_id: clientId,
    scope: [
      rtclient.INSTALL_SCOPE,
      rtclient.FILE_SCOPE,
      rtclient.OPENID_SCOPE
    ],
    user_id: userId,
    immediate: true
  }, handleAuthResult);
}


/**
 * Fetch the user ID using the UserInfo API and save it locally.
 * @param callback {Function} the callback to call after user ID has been
 *     fetched.
 */
rtclient.Authorizer.prototype.fetchUserId = function(callback) {
  var _this = this;
  gapi.client.load('oauth2', 'v2', function() {
    gapi.client.oauth2.userinfo.get().execute(function(resp) {
      if (resp.id) {
        _this.userId = resp.id;
      }
      if (callback) {
        callback();
      }
    });
  });
};

/**
 * Creates a new Realtime file.
 * @param title {string} title of the newly created file.
 * @param mimeType {string} the MIME type of the new file.
 * @param callback {Function} the callback to call after creation.
 */
rtclient.createRealtimeFile = function(title, mimeType, callback) {
  gapi.client.load('drive', 'v2', function() {
    gapi.client.drive.files.insert({
      'resource': {
        mimeType: mimeType,
        title: title
      }
    }).execute(callback);
  });
}


/**
 * Fetches the metadata for a Realtime file.
 * @param fileId {string} the file to load metadata for.
 * @param callback {Function} the callback to be called on completion, with signature:
 *
 *    function onGetFileMetadata(file) {}
 *
 * where the file parameter is a Google Drive API file resource instance.
 */
rtclient.getFileMetadata = function(fileId, callback) {
  gapi.client.load('drive', 'v2', function() {
    gapi.client.drive.files.get({
      'fileId' : fileId
    }).execute(callback);
  });
}

//
//console.log($test);

rtclient.retrieveAllFiles = function(callback) {
    gapi.client.load('drive', 'v2', function() {
        //var $results = null;
        var retrievePageOfFiles = function(request, result) {
            //console.log(request);
            request.execute(function(resp) {
                result = result.concat(resp.items);
                var nextPageToken = resp.nextPageToken;
                if (nextPageToken) {
                    request = gapi.client.drive.files.list({
                        'max-results': 3,
                        'pageToken': nextPageToken,
                        'q' : "title = 'Dupe test 1'"
                    });
                    retrievePageOfFiles(request, result);
                } else {
                    //console.log(result);
                    callback(result);
                }
            });
        };
        
        var initialRequest = gapi.client.drive.files.list();
        retrievePageOfFiles(initialRequest, []);
    });
}

rtclient.testFunction = function($value) {
    //gapi.client.load('drive', 'v2', function() {
    var emptyArray = [];
    if($value.length == 0){
        console.log('no file exists')
    } else {
        console.log($value);
        console.log('file exists!');
        rtclient.downloadFile($value[0], rtclient.testFunction2);
    }
     //rtclient.downloadFile();
//    });
}
                     
rtclient.testFunction2 = function($value) {
    //console.log($value);
	return 'SILLY';
}

/**
 * Parses the state parameter passed from the Drive user interface after Open
 * With operations.
 * @param stateParam {Object} the state query parameter as an object or null if
 *     parsing failed.
 */
rtclient.parseState = function(stateParam) {
  try {
    var stateObj = JSON.parse(stateParam);
    return stateObj;
  } catch(e) {
    return null;
  }
}
//rtclient.retrieveAllFiles = function(callback) {
//      gapi.client.load('oauth2', 'v2', function() {
//  var retrievePageOfFiles = function(request, result) {
//    request.execute(function(resp) {
//      result = result.concat(resp.items);
//      var nextPageToken = resp.nextPageToken;
//      if (nextPageToken) {
//        request = gapi.client.drive.files.list({
//            'max-results': 3,
//          'pageToken': nextPageToken
//        });
//        retrievePageOfFiles(request, result);
//      } else {
//        callback(result);
//      }
//    });
//  }
//  var initialRequest = gapi.client.drive.files.list();
//  retrievePageOfFiles(initialRequest, []);
//    });
//}
//
//var $test = rtclient.retrieveAllFiles();
//
//console.log($test);

/**
 * Handles authorizing, parsing query parameters, loading and creating Realtime
 * documents.
 * @constructor
 * @param options {Object} options for loader. Four keys are required as mandatory, these are:
 *
 *    1. "clientId", the Client ID from the console
 *    2. "initializeModel", the callback to call when the model is first created.
 *    3. "onFileLoaded", the callback to call when the file is loaded.
 *
 * and one key is optional:
 *
 *    1. "defaultTitle", the title of newly created Realtime files.
 */

var RTCLIENT;

rtclient.RealtimeLoader = function(options) {
  // Initialize configuration variables.
  this.onFileLoaded = rtclient.getOption(options, 'onFileLoaded');
  this.newFileMimeType = rtclient.getOption(options, 'newFileMimeType', rtclient.REALTIME_MIMETYPE);
  this.initializeModel = rtclient.getOption(options, 'initializeModel');
  this.registerTypes = rtclient.getOption(options, 'registerTypes', function(){});
  this.afterAuth = rtclient.getOption(options, 'afterAuth', function(){})
  this.autoCreate = rtclient.getOption(options, 'autoCreate', false); // This tells us if need to we automatically create a file after auth.
  this.defaultTitle = rtclient.getOption(options, 'defaultTitle', 'New Realtime File');
  this.authorizer = new rtclient.Authorizer(options);
	
	RTCLIENT = this;
}


/**
 * Redirects the browser back to the current page with an appropriate file ID.
 * @param fileIds {Array.} the IDs of the files to open.
 * @param userId {string} the ID of the user.
 */
rtclient.RealtimeLoader.prototype.redirectTo = function(fileIds, userId) {
  var params = [];
  if (fileIds) {
    params.push('fileIds=' + fileIds.join(','));
  }
  if (userId) {
    params.push('userId=' + userId);
  }

  // Naive URL construction.
  var newUrl = params.length == 0 ? './' : ('./#/party/&' + params.join('&'));
  // Using HTML URL re-write if available.
  if (window.history && window.history.replaceState) {
    window.history.replaceState("Google Drive Realtime API Playground", "Google Drive Realtime API Playground", newUrl);
  } else {
    window.location.href = newUrl;
  }
  // We are still here that means the page didn't reload.
  rtclient.params = rtclient.getParams();
  for (var index in fileIds) {
    gapi.drive.realtime.load(fileIds[index], this.onFileLoaded, this.initializeModel, this.handleErrors);
  }
}


/**
 * Starts the loader by authorizing.
 */
rtclient.RealtimeLoader.prototype.start = function() {
  // Bind to local context to make them suitable for callbacks.
  var _this = this;
  this.authorizer.start(function() {
    if (_this.registerTypes) {
      _this.registerTypes();
    }
    if (_this.afterAuth) {
      _this.afterAuth();
    }
    _this.load();
  });
}


/**
 * Handles errors thrown by the Realtime API.
 */
rtclient.RealtimeLoader.prototype.handleErrors = function(e) {
	console.log(e);
	if (e.type == 'not_found') {
		RTCLIENT.createNewFileAndRedirect();
	}
	
	
  if(e.type == gapi.drive.realtime.ErrorType.TOKEN_REFRESH_REQUIRED) {
    authorizer.authorize();
  } else if(e.type == gapi.drive.realtime.ErrorType.CLIENT_ERROR) {
    alert("An Error happened: " + e.message);
    window.location.href= "/";
  } else if(e.type == gapi.drive.realtime.ErrorType.NOT_FOUND) {
	  RTCLIENT.createNewFileAndRedirect();
    //alert("The file was not found. It does not exist or you do not have read access to the file.");
    //window.location.href= "/";
  } else if(e.type == gapi.drive.realtime.ErrorType.FORBIDDEN) {
  	console.log('NO WRITE PERMISSIONS');
	  notes.disabled = true;
  }
};


/**
 * Loads or creates a Realtime file depending on the fileId and state query
 * parameters.
 */
rtclient.RealtimeLoader.prototype.load = function() {
  var fileIds = rtclient.params['fileIds'];
  if (fileIds) {
    fileIds = fileIds.split(',');
  }
  var userId = this.authorizer.userId;
  var state = rtclient.params['state'];

  // Creating the error callback.
  var authorizer = this.authorizer;
    
    var urlId = parseQuery(window.location.href);    
	
    //console.log(urlId);
    if(urlId.fileIds){
        console.log('THERE IS A FILE ID!');
        localStorage.setItem('rtFileId', urlId.fileIds);
    }
    var file = localStorage.getItem('rtFileId');
    console.log(file);
	if (file) {
		fileIds = [file];
		console.log(fileIds);
		
		rtclient.retrievePermissions(fileIds);
		
	} else {
		var urlId = parseQuery(window.location.href);
		if(urlId.fileIds){
			console.log('THERE IS A FILE ID!');
			
		rtclient.retrievePermissions(fileIds);
			
		}
	}
	
  // We have file IDs in the query parameters, so we will use them to load a file.
  if (fileIds) {
    for (var index in fileIds) {
      gapi.drive.realtime.load(fileIds[index], this.onFileLoaded, this.initializeModel, this.handleErrors);
    }
	  this.redirectTo(fileIds, userId);
    return;
  }

  // We have a state parameter being redirected from the Drive UI. We will parse
  // it and redirect to the fileId contained.
  else if (state) {
    var stateObj = rtclient.parseState(state);
	  //console.log('state');
    // If opening a file from Drive.
    if (stateObj.action == "open") {
      fileIds = stateObj.ids;
      userId = stateObj.userId;
      this.redirectTo(fileIds, userId);
      return;
    }
  }

  if (this.autoCreate) {
    this.createNewFileAndRedirect();
  }
}


/**
 * Creates a new file and redirects to the URL to load it.
 */
rtclient.RealtimeLoader.prototype.createNewFileAndRedirect = function() {
    // No fileId or state have been passed. We create a new Realtime file and
    // redirect to it.
    var _this = this;
//    rtclient.testFunction(this.defaultTitle);
    //var $test = rtclient.retrieveAllFiles(rtclient.testFunction);
    
//    when( $test = rtclient.retrieveAllFiles()){
//        console.log($test);
//    }
//     setTimeout(function(){  console.log(rtclient.retrieveAllFiles())   }, 4000);
//    
//    
    rtclient.createRealtimeFile(this.defaultTitle, this.newFileMimeType, function(file) {
        if (file.id) {
			
			
			localStorage.setItem('rtFileId', file.id);
			rtclient.changePermissions(file.id, null, 'anyone', 'reader');
            _this.redirectTo([file.id], _this.authorizer.userId);
        }
        // File failed to be created, log why and do not attempt to redirect.
        else {
              console.error('Error creating file.');
              console.error(file);
        }
    });
}

/**
 * Download a file's content.
 *
 * @param {File} file Drive File instance.
 * @param {Function} callback Function to call when the request is complete.
 */
rtclient.downloadFile = function(file, callback) {
    gapi.client.load('drive', 'v2', function() {
        console.log(file.selfLink);
        if (file.selfLink) {
            var accessToken = gapi.auth.getToken().access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file.selfLink);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function() {
                console.log(xhr.responseText);
                callback(xhr.responseText);
            };
            xhr.onerror = function() {
                callback(null);
            };
            xhr.send();
        } else {
            callback(null);
        }
        rtclient.RealtimeLoader();
    });
}

/**
 * Retrieve a list of File resources.
 *
 * @param {Function} callback Function to call when the request is complete.
 */


//rtclient.retrieveAllFiles = function() {
//    gapi.client.load('drive', 'v2', function() {
//    var retrievePageOfFiles = function(request, result) {
//        request.execute(function(resp) {
//            result = result.concat(resp.items);
//            var nextPageToken = resp.nextPageToken;
//            if (nextPageToken) {
//                request = gapi.client.drive.files.list({
//                    'max-results': 3,
//                    'pageToken': nextPageToken
//                });
//                retrievePageOfFiles(request, result);
//            } else {
//                callback(result);
//            }
//        });
//    };
//    var initialRequest = gapi.client.drive.files.list();
//    retrievePageOfFiles(initialRequest, []);
//    });
//}
//$allFiles = rtclient.retrieveAllFiles();

//function retrieveAllFiles(callback) {
//  var retrievePageOfFiles = function(request, result) {
//    request.execute(function(resp) {
//      result = result.concat(resp.items);
//      var nextPageToken = resp.nextPageToken;
//      if (nextPageToken) {
//        request = gapi.client.drive.files.list({
//            'max-results': 3,
//          'pageToken': nextPageToken
//        });
//        retrievePageOfFiles(request, result);
//      } else {
//        callback(result);
//      }
//    });
//  }
//  var initialRequest = gapi.client.drive.files.list();
//  retrievePageOfFiles(initialRequest, []);
//}
function parseQuery(qstr)
{
  var query = {};
  var a = qstr.split('&');
  for (var i in a)
  {
    var b = a[i].split('=');
    query[decodeURIComponent(b[0])] = decodeURIComponent(b[1]);
  }

  return query;
}

/**
 * Insert a new permission.
 *
 * @param {String} fileId ID of the file to insert permission for.
 * @param {String} value User or group e-mail address, domain name or
 *                       {@code null} "default" type.
 * @param {String} type The value "user", "group", "domain" or "default".
 * @param {String} role The value "owner", "writer" or "reader".
 */
rtclient.changePermissions = function(fileId, value, type, role) {
	gapi.client.load('drive', 'v2', function() {
		var body = {
			'value': value,
				'type': type,
			'role': role
		};
		var request = gapi.client.drive.permissions.insert({
			'fileId': fileId,
			'resource': body
		});	
		request.execute(function(resp) { 
			rtclient.retrievePermissions(fileId);
		});
	});
	
	
	//adding functionality to show or hide the share buttons
	var enableShare = document.getElementById('enableShare');	
	var disableShare = document.getElementById('disableShare');
//	console.log('THIS IS A TEST');
	//if the enableshare button is showing
//	if(enableShare.style.display='block'){
//		console.log('THE BUTTON IS SHOWING!');
//	}
}

/**
 * Retrieve a list of permissions.
 *
 * @param {String} fileId ID of the file to retrieve permissions for.
 * @param {Function} callback Function to call when the request is complete.
 */
rtclient.retrievePermissions = function(fileId) {
	gapi.client.load('drive', 'v2', function() {
		var request = gapi.client.drive.permissions.list({
			'fileId': fileId
		});
		request.execute(function(resp) {
			console.log('HELLO');
			//console.log(resp.items[0].id);
			var ownerId = resp.items[0].id;
			
			//var aboutTimeout = window.setTimeout(rtclient.printAbout(), 2000);
			//console.log(about);
			console.log(resp);
			if(resp.items[1]){
				var sharedWith = resp.items[1].role;
					var enableShare = document.getElementById('enableShare');
					var disableShare = document.getElementById('disableShare');
					var notes = document.getElementById('notes');

					var about = rtclient.printAbout(ownerId, sharedWith);
			}
			
			
//			if(sharedWith == 'writer'){
//				console.log('this doc is open for anyone to write');
//				enableShare.style.display = 'none';
//				disableShare.style.display = 'block';
//			} else if (sharedWith == 'reader'){
//				notes.disabled = true;
//				enableShare.style.display = 'block';
//				disableShare.style.display = 'none';
//			}
		});
	});
}

/**
 * Print information about the current user along with the Drive API
 * settings.
 */
rtclient.printAbout = function (ownerId, sharedWith) {
	gapi.client.load('drive', 'v2', function() {
		var request = gapi.client.drive.about.get();
		request.execute(function(resp) {
			//console.log(resp);
			var shareControls = document.getElementById('shareControls');
			var userPermId = resp.user.permissionId;
			
			//if the user viewing the document is the owner
			if(userPermId == ownerId){
				shareControls.style.display = 'block';
				//shareControls.style.width = '200px';
				notes.disabled = false;
				if(sharedWith == 'writer'){
					console.log('this doc is open for anyone to write');
					enableShare.style.display = 'none';
					disableShare.style.display = 'inline-block';
				} else if (sharedWith == 'reader'){
					enableShare.style.display = 'inline-block';
					disableShare.style.display = 'none';
				}
				var pubKey = 'AIzaSyCde-rPHpjfEEqmR93btsjT8fh6onckLow';
				var currentURL = window.location.href;
				var contents = {"longUrl": currentURL}
				gapi.client.load('urlshortener', 'v1').then(
					rtclient.urlShortener('https://www.googleapis.com/urlshortener/v1/url?key='+pubKey, contents)
				);
				//if the viewer is not the owner
			} else {
				shareControls.style.display = 'none';
				
//				if(sharedWith == 'writer'){
//					notes.disabled = false;
//					console.log('this doc is open for anyone to write');
//					enableShare.style.display = 'none';
//					disableShare.style.display = 'inline-block';
//				} else if (sharedWith == 'reader'){
//					notes.disabled = true;
//					enableShare.style.display = 'inline-block';
//					disableShare.style.display = 'none';
//				}
			}
			//return resp.user.emailAddress;
//			console.log('Root folder ID: ' + resp.rootFolderId);
//			console.log('Total quota (bytes): ' + resp.quotaBytesTotal);
//			console.log('Used quota (bytes): ' + resp.quotaBytesUsed);
		});
	});
}

/**
 * URL Shortener.
 *
 * @param {String} fileId ID of the file to retrieve permissions for.
 * @param {Function} callback Function to call when the request is complete.
 */
rtclient.urlShortener = function(url, content) {
//		gapi.client.setApiKey('516279059329'); //get your ownn Browser API KEY
//	gapi.client.load('urlshortener', 'v1',function(){});
	var urlText = document.getElementById('shortURL');
	
	//gapi.client.load('drive', 'v2', function() {
		var xmlHttp = null;
		var json = JSON.stringify(content);
		xmlHttp = new XMLHttpRequest();
	
		xmlHttp.open( "POST", url, true );
		xmlHttp.setRequestHeader("Content-type","application/json");
		xmlHttp.send(json);
		//console.log (json);
		//console.log (xmlHttp.responseText);
		//return xmlHttp.responseText;
		xmlHttp.onreadystatechange = function() {
       	 	if(xmlHttp.responseText){
				var respArray = JSON.parse(xmlHttp.responseText);
				console.log(respArray.id);
				urlText.innerHTML = respArray.id;
			}
		}
		//urlText = xmlHttp.responseText;
	//});
}

//rtclient.urlShortener('https://www.googleapis.com/urlshortener/v1/url', contents);
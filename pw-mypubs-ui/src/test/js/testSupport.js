TestSupport = function() {
	//private members
	var _server;
	
return {
	stubJQueryAjaxRequest: function() {
		sinon.stub($, "ajax");
	},
	
	restoreJQuerAjaxRequest: function() {
		$.ajax.restore();
	},
	
	initServer: function() {
		_server = sinon.fakeServer.create();
		_server.autoRespond = true
	},
	
	restoreServer: function(server) {
		_server.restore();
	},
	
	setServerResponse: function(xml) {
		_server.respondWith([
	            200,
	            { "Content-Type": "text" },
	            xml
	        ]);
	},
	
	setServerXmlResponse: function(xml) {
		_server.respondWith([
	            200,
	            { "Content-Type": "application/xml" },
	            xml
	        ]);
	},
	
	setServerJsonResponse: function(json) {
		_server.respondWith([
 	            200,
 	            { "Content-Type": "application/json" },
 	           json
 	        ]);
	},
	
	setServerJsonResponseToRegex: function(regex, json) {
		_server.respondWith(
				"GET",
				regex,
				[
 	            200,
 	            { "Content-Type": "application/json" },
 	           json
 	        ]);
	},
	
	setServerJsonPostResponseToRegex: function(regex, json) {
		_server.respondWith(
				"POST",
				regex,
				[
 	            200,
 	            { "Content-Type": "application/json" },
 	           json
 	        ]);
	},
	
	doServerRespond: function() {
		_server.respond();
		TestSupport.restoreServer();
	},
	
	//returns true if any object in the array has all combinations of key-value pairs in keyValsArray
	hasObjectWith : function(objArray, kvpsArray) {
		for(var i = 0; i < objArray.length; i++) {
			var obj = objArray[i];
			var allPropsFound = true;

			for(var j = 0; j < kvpsArray.length; j++) {
				var kvp = kvpsArray[j];
				if(obj[kvp.key] !== kvp.value) {
					allPropsFound = false;
					break;
				}
			}
				
			if(allPropsFound) {
				return true;
			}
		}
		
		return false;
	}
};}();

TestSupport.data = {};

TestSupport.getArrayReturnTypeDataResponse = function(type){ 
	return '{}';	
}

TestSupport.getObjectReturnTypeDataResponse = function(type, fieldName){ 
	if(!fieldName) {
		fieldName = "fieldName"
	}
	return '{}';
}


describe("pw.auth module", function() {
	//set global constant
	APP_CONFIG = {
			endpoint: 'http://servicesUrl.com/pubs-service/'
	};
	var AUTH_SERVICE_PATH = 'auth/ad/token';
	var LOGOUT_SERVICE_PATH = 'auth/ad/logout';
	
	var AD_TOKEN_URL = APP_CONFIG.endpoint + AUTH_SERVICE_PATH;
	var LOGOUT_URL = APP_CONFIG.endpoint + LOGOUT_SERVICE_PATH;
	
	describe("Authentication service", function() {
		var authenticationService, httpBackend, locationMock, cookiesMock;

		beforeEach(function () {
			locationMock = {
					path : function(newPath) {}
			};
			spyOn(locationMock, 'path').andCallThrough();

			cookiesMock = {};

			module('pw.auth', function($provide) {
				// location mock
				$provide.value('$location', locationMock);
				$provide.value('$cookies', cookiesMock);
			});

			inject(function(Authentication, $httpBackend) {
				authenticationService = Authentication;
				httpBackend = $httpBackend;
			});

			//no http calls pending when we first start
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});

		afterEach(function() {
			httpBackend.verifyNoOutstandingRequest();
		});


		it("contains these API functions", function (){
			expect(authenticationService.getTokenPromise).toBeDefined();
			expect(authenticationService.logout).toBeDefined();
		});

		it("getTokenPromise will do an ajax call to a auth service to get a token " +
				"when no token exists in javascript memory or browser cookes", function (){
			//set up server responses
			var testToken = "auth-token";
			httpBackend.whenPOST(AD_TOKEN_URL).respond(testToken);

			//first call results in a fetch to token server
			authenticationService.getTokenPromise("user", "pass").then(function(token) {
				expect(token).toBe(testToken);
				expect(cookiesMock.myPubsAuthToken).toBe(testToken);
			});
			httpBackend.expectPOST(AD_TOKEN_URL);
			httpBackend.flush();
		});
		
		it("getTokenPromise get the token from a browser cookie if it exists " +
				"when no token exists in javascript memory or browser cookes", function (){
			//set up server responses
			var testToken = "auth-token";
			var testCookieToken = "token-from-cookie";
			httpBackend.whenPOST(AD_TOKEN_URL).respond(testToken);

			cookiesMock.myPubsAuthToken = testCookieToken; //preset the cookie
			
			authenticationService.getTokenPromise("user", "pass").then(function(token) {
				expect(token).toBe(testCookieToken);
				expect(cookiesMock.myPubsAuthToken).toBe(testCookieToken);
			});
		});
		
		it("getTokenPromise get the token from javascript memory if there", function (){
			//set up server responses
			var testToken = "auth-token";
			var testCookieToken = "token-from-cookie";
			var jsMemoryCookieToken = "token-from-memory";
			httpBackend.whenPOST(AD_TOKEN_URL).respond(testToken);

			authenticationService.loginState.authToken = jsMemoryCookieToken;
			cookiesMock.myPubsAuthToken = null; //no cookie
			
			authenticationService.getTokenPromise("user", "pass").then(function(token) {
				expect(token).toBe(jsMemoryCookieToken);
				expect(cookiesMock.myPubsAuthToken).toBe(jsMemoryCookieToken);
			});
		});

		it("logout calls a token invalidation service, clears token from cookie, and in memory; then routes to login page", function (){
			//first log in
			var testToken = "auth-token";
			httpBackend.whenPOST(AD_TOKEN_URL).respond(testToken);
			authenticationService.getTokenPromise("user", "pass").then(function(token) {
				expect(token).toBe(testToken);
				expect(cookiesMock.myPubsAuthToken).toBe(testToken);
			});
			httpBackend.expectPOST(AD_TOKEN_URL);
			httpBackend.flush();
			
			httpBackend.whenGET(LOGOUT_URL + "?token=" + testToken).respond("Logged out"); //TODO check for 200?
			authenticationService.logout();
			httpBackend.expectGET(LOGOUT_URL + "?token=" + testToken);
			httpBackend.flush();
			
			expect(cookiesMock.myPubsAuthToken).toBeFalsy();
			expect(authenticationService.loginState.authToken).toBeFalsy();
			expect(locationMock.path).toHaveBeenCalledWith('/Login');
		});
	});
});
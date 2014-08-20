describe("pw.auth module", function() {
	//set global constant
	APP_CONFIG = {
			endpoint: 'http://servicesUrl.com/pubs-service/'
	};
	var AUTH_SERVICE_PATH = 'auth/ad/token';
	var LOGOUT_SERVICE_PATH = 'auth/logout';
	
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
				$provide.value('APP_CONFIG', APP_CONFIG);
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
			expect(authenticationService.getToken).toBeDefined();
			expect(authenticationService.getNewTokenPromise).toBeDefined();
			expect(authenticationService.logout).toBeDefined();
		});

		it("getNewTokenPromise will do an ajax call to a auth service to get a token " +
				"and then store that token in a browser cookie and in memory javascript", function (){
			//set up server responses
			var testToken = "auth-token";
			httpBackend.whenPOST(AD_TOKEN_URL).respond(testToken);

			//first call results in a fetch to token server
			authenticationService.getNewTokenPromise("user", "pass").then(function(token) {
				expect(token).toBe(testToken);
				expect(cookiesMock.myPubsAuthToken).toBe(testToken);
			});
			httpBackend.expectPOST(AD_TOKEN_URL);
			httpBackend.flush();
		});
		
		it("getToken get the token from a browser cookie if it exists ", function (){
			var testToken = "auth-token";
			var testCookieToken = "token-from-cookie";
			
			//returns null if nothing was set
			expect(authenticationService.getToken()).toBe(null);
			
			//set cookie
			cookiesMock.myPubsAuthToken = testCookieToken;
			expect(authenticationService.getToken()).toBe(testCookieToken);
			expect(authenticationService.loginState.authToken).toBe(testCookieToken);
			
			//set up server responses
			httpBackend.whenPOST(AD_TOKEN_URL).respond(testToken);
			authenticationService.getNewTokenPromise("user", "pass").then(function(token) {
				expect(authenticationService.getToken()).toBe(testToken);
				expect(authenticationService.loginState.authToken).toBe(testToken);
			});
		});

		it("logout calls a token invalidation service, clears token from cookie, and in memory; then routes to login page", function (){
			//first log in
			var testToken = "auth-token";
			httpBackend.whenPOST(AD_TOKEN_URL).respond(testToken);
			authenticationService.getNewTokenPromise("user", "pass").then(function(token) {
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
describe("pw.auth module", function() {
	var scope, location;


	beforeEach(function () {
		module('pw.auth');
		inject(function($rootScope, $location) {
		});
	});

	describe("Authentication service", function() {
		it("contains these API functions", function (){
		});
		
		it("returns a promise for a token that is either 1) in memory (loginState), " +
				"2) in a browser cookie (and subsequently stored in loginState), or " +
				"3 fetched from auth token service using a post (and subsequently stored in loginState)", function (){});
		
		it("calls a token invalidation service, clears token from cookie, and in memory; then routes to login page", function (){});
		
		it("provides method to validate token with an auth service", function (){});
	});
});
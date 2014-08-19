(function() {

	angular.module('pw.auth', ['ngRoute'])
	
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/Login', {
			templateUrl: 'mypubs/main/login.html',
			controller: 'loginCtrl',
			openAccess: true
		})
	}])

	/**
	 * This service is a stateful singleton and maintains a current logged in state
	 */
	.service('Authentication', ['$http','$location', function($http, $location) {
		this.loginState = {
				user : '',
				authToken : ''
		};

		this.getToken = function(token) {
		};

		/**
		 * Invalidates token on service, in cookie, and in memory; then routes to login page
		 */
		this.logout = function() {
		};

		/**
		 * provides method to validate token with auth service
		 */
		auth.validateCurrentToken = function() {
		};

		return this;
	}]);
})();

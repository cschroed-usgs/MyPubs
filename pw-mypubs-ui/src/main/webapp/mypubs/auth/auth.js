(function() {
	var AUTH_SERVICE_PATH = 'auth/ad/token';
	var LOGOUT_SERVICE_PATH = 'auth/ad/logout';
	
	angular.module('pw.auth', ['ngRoute'])
	
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/Login', {
			templateUrl: 'mypubs/main/login.html',
			controller: 'loginCtrl',
			openAccess: true
		});
	}])

	/**
	 * This service is a stateful singleton and maintains a current logged in state
	 */
	.service('Authentication', ['$http','$location', '$q', '$cookies', function($http, $location, $q, $cookies) {
		this.loginState = {
				authToken : ''
		};

		this.getTokenPromise = function(user, pass) {
			
			//if we have a token stored in a browser cookie and none in memory, load from cookie
			if(!this.loginState.authToken && $cookies.myPubsAuthToken) {
				this.loginState.authToken = $cookies.myPubsAuthToken;
			}
			
			//if no token exists, go to server
			var _this = this;
			if(!this.loginState.authToken) {
				$http.post(APP_CONFIG.endpoint + AUTH_SERVICE_PATH,{
	                params : {
	                	username : user,
	                	password : pass
	                }
	            }).success(function(response) {
	            	$cookies.myPubsAuthToken = response;
	            	_this.loginState.authToken = response;
	            	deferred.resolve(_this.loginState.authToken);
	            });
			}
			
			var deferred = $q.defer(); //always return a promise
			setTimeout(function() {
				deferred.resolve(_this.loginState.authToken);
			}, 10);

			return deferred.promise;
		};

		/**
		 * Invalidates token on service, in cookie, and in memory; then routes to login page
		 */
		this.logout = function() {
			var _this = this;
			$http.get(APP_CONFIG.endpoint + LOGOUT_SERVICE_PATH,{
                params : {
                	token : _this.loginState.authToken || $cookies.myPubsAuthToken
                }
            }).success(function(response) {
            	$location.path("/Login");
            });
			
        	_this.loginState.authToken = null;
			$cookies.myPubsAuthToken = null;
		};

		return this;
	}]);
})();

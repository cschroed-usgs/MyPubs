(function() {
	var AUTH_SERVICE_PATH = 'auth/ad/token';
	var LOGOUT_SERVICE_PATH = 'auth/logout';

	angular.module('pw.auth', ['ngRoute', 'ngCookies'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/Login', {
			templateUrl: 'mypubs/auth/login.html',
			controller: 'LoginController'
		});
	}])

	.controller('LoginController', [ '$scope', '$location', 'Authentication', 'PubsModal', 
	                                 function($scope, $location, Authentication, PubsModal) {
		$scope.doLogin = function(user, pass) {
			Authentication.getTokenPromise(user, pass).then(function(token){
				$location.path('/Search');
			});
		};
	}])

	/**
	 * This service is a stateful singleton and maintains a current logged in state
	 */
	.service('Authentication', ['APP_CONFIG', '$http','$location', '$q', '$cookies', function(APP_CONFIG, $http, $location, $q, $cookies) {
		this.loginState = {
				authToken : null
		};

		/**
		 * Retrieves the token from javascript memory or browser cookie.
		 * @returns token or null if none exists
		 */
		this.getToken = function() {
			//if we have a token stored in a browser cookie and none in memory, load from cookie
			if(!this.loginState.authToken && $cookies.myPubsAuthToken) {
				this.loginState.authToken = $cookies.myPubsAuthToken;
			}

			return this.loginState.authToken;
		};
		
		this.getNewTokenPromise = function(user, pass) {
			var deferred = $q.defer();
			
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
				}).error(function(response){
					//TODO
					alert("get token errors");
				});
			}

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
	}])

	.factory('UnauthorizedInterceptor', function($q, $location) {
		var attachAuthToken = function(request) {
			
		};
		
		var handleUnauthorized = function(response) {
			if(response.status == 401) {
				$location.path("/Login");
			} else {
				return response;
			}
		};
		
		return {
			'response': handleUnauthorized,
			'responseError': handleUnauthorized
		};
	});

})();

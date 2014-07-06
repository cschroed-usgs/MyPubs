(function() {


angular.module('pw.auth', ['ngRoute'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Login', {
			templateUrl: 'mypubs/main/login.html',
			controller: 'loginCtrl',
			openAccess: true
		})
		$routeProvider.when('/Logout', {
			//templateUrl: 'mypubs/main/login.html',
			controller: 'logoutCtrl',
		})
	}
])


.run(['$rootScope', '$location', '$routeParams', '$route', 'Authenticaiton', 
function ($rootScope, $location, $routeParams, $route, auth) {
	$rootScope.$on('$routeChangeStart', function (event, next, current) {

		// TODO find a better place for this
		if ( ! auth.openRoutes ) {
			auth.openRoutes = []
			angular.forEach($route.routes, function(route, path) {
				route.openAccess && (auth.openRoutes.push(path));
			});		
		}


		if (next.$$route) {
			var nextPath = next.$$route.originalPath
			console.log('routeChangeStart ' + nextPath)
			if ( ! auth.isLoggedIn() && ! _.contains(auth.openRoutes, nextPath) ) {
				console.log('not isLoggedIn')
				event.preventDefault()
				$location.path('otherwise') // undefined route causes the default to be reouted
			}
			if (nextPath === '/Logout') {
				auth.logout()
				$location.path('otherwise') // undefined route causes the default to be reouted
			}
		}
	})
}])



.controller('loginCtrl', [ '$scope', 'Authenticaiton', function($scope, auth) {

	// TODO login user/pwd and fetch session token

	auth.setToken('token')

}])


.controller('logoutCtrl', [ '$scope','Authenticaiton', function($scope, auth) {

// TODO might not be needed

}])


.service('Authenticaiton', [ function() {

	var auth = this


	auth.token


	auth.setToken = function(token) {
		// TODO also need to send token with fetcher, lookup, and search
		auth.token = token
	}


	auth.logout = function() {
		// TODO also clear fetcher cache
		auth.setToken(undefined)
	}


	auth.isLoggedIn = function() {
		console.log('isLoggedIn')
		return auth.token !== undefined;
	}


	return auth

}])


}) ()

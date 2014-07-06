(function() {


angular.module('pw.login', ['ngRoute'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Login', {
			templateUrl: 'mypubs/main/login.html',
			controller: 'loginCtrl'
		})
	}
])


.controller('loginCtrl', [ '$scope', function($scope) {

	// TODO login user/pwd and fetch session token

}])


.controller('logoutCtrl', [ '$scope', function($scope) {

	// TODO remove login token

}])


}) ()

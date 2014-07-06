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

}])


}) ()

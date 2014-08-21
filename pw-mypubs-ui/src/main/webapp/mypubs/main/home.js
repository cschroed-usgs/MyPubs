(function() {


angular.module('pw.home', ['ngRoute'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Home', {
			templateUrl: 'mypubs/main/home.html',
			controller: 'homeCtrl'
		})
	}
])


.controller('homeCtrl', [ '$scope', function($scope) {

}])


}) ()

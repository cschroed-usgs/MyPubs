(function() {


angular.module('pw.search', ['ngRoute'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Search', {
			templateUrl: 'mypubs/search/search.html',
			controller: 'searchCtrl'
		})
	}
])


.controller('searchCtrl', [ '$scope', function($scope) {

}])


}) ()

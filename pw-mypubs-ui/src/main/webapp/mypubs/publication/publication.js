(function() {


angular.module('pw.publication', ['ngRoute'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Publication', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl'
		})
	}
])


.controller('publicationCtrl', [ '$scope', function($scope) {

}])


}) ()

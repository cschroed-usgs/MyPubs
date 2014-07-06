(function() {


angular.module('pw.publication', ['ngRoute'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Publication', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl'
		})
		$routeProvider.when('/Publication/:pubsid', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl'
		})
	}
])


.controller('publicationCtrl', [ '$scope', '$routeParams', function($scope, $routeParams) {

	// TODO if pubsid the fetch else use currently loaded

	console.log($routeParams.pubsid)

}])


}) ()

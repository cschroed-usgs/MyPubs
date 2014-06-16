(function() {

var mod = angular.module('pubsMain', ['ngRoute','pubsTab','pubsDataRow']);


mod.config([
'$routeProvider',
function($routeProvider) {
	mod.router = $routeProvider
}]);


mod.controller('mainCtrl', [
'$scope', '$log', '$location',
function ($scope, $log, $location) {

	$scope.doc = {name:"testDoc"}
	$scope.log = $log.log // needed for directives

	$scope.setRoute = function(routeName) {
		$scope.log('setRoute')
		$location.path('/' + routeName)
	}

/**
    mod.router.
    when('/Bibliodata', {
    	templateUrl: 'templates/bibliodata.html',
    	controller: 'BibliodataCtrl'
    }).
    otherwise({
        redirectTo: '/Bibliodata'
    });
**/

	$scope.log('main init')
}])


})();
(function() {

var mod = angular.module('mypubs', [
	'ngRoute','ui.select2','ui.bootstrap', 'ui.tinymce',
	'pubsTab','pubsDataRow','bibliodata'
])


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

    mod.router.
    when('/Bibliodata', {
    	templateUrl: 'templates/bibliodata.html',
    	controller: 'biblioCtrl'
    }).
    otherwise({
        redirectTo: '/unfinishedTab'
    });

	$scope.log('main init')
}])


}) ()

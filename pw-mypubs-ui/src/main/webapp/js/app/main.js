(function() {


var mod = angular.module('mypubs', [
	'ngRoute','ui.select2','ui.bootstrap', 'ui.tinymce',
	'pubsTab','pubsDataRow','bibliodata'
])


mod.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider // Placeholder for default, login, or routes
	}
])


mod.controller('mainCtrl', [
'$scope', '$log', '$location',
function ($scope, $log, $location) {

	$scope.doc = {name:"testDoc"}
	$scope.log = $log.log // needed for directives

	// sets the angular path on the url location hash
	$scope.setRoute = function(routeName) {
		$scope.log('setRoute')
		$location.path('/' + routeName)
	}
	
}])


}) ()

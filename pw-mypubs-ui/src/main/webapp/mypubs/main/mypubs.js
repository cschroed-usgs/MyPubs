(function() {


var mod = angular.module('pw.mypubs', [
	'ngRoute','ui.select2','ui.bootstrap', 'ui.tinymce',
	'pw.tabs','pw.dataRow','pw.bibliodata'
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

	// TODO need to work with server side on these
	// TODO login service should intercept all actions
	$scope.doc = {name:"testDoc"} // TODO service should load publication
	$scope.log = $log.log // needed for directives - maybe

	// sets the angular path on the url location hash
	$scope.setRoute = function(routeName) {
		$scope.log('setRoute')
		$location.path('/' + routeName)
	}

}])


}) ()

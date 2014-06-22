(function() {


var mod = angular.module('pw.mypubs', [
	'ngRoute','ui.select2','ui.bootstrap', 'ui.tinymce',
	'pw.tabs','pw.dataRow', 'pw.actions', 'pw.pubHeader',
	'pw.bibliodata', 'pw.catalog', 'pw.contacts', 'pw.links'
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
	var ctrl = this

	// TODO need to work with server side on these
	// TODO login service should intercept all actions
	$scope.doc = {name:"testDoc"} // TODO service should load publication
	$scope.log = $log.log // needed for directives - maybe


	// TODO I know the bellow sould be in a service - will get there in some future refactor
	$scope._showPreview = true

	$scope.showPreview = function(show) {
		if (typeof show === 'undefined') {
			//console.log($scope._showPreview)
			return $scope._showPreview
		}
		//console.log('Setting '+show)
		$scope._showPreview = show ? true : false
	}

	// sets the angular path on the url location hash
	$scope.setRoute = function(routeName) {
		$scope.log('setRoute ' + routeName)
		$location.path('/' + routeName)
	}

}])


mod.directive('preventDefault', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})

}) ()

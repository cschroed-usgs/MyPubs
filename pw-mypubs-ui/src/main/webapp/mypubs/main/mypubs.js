(function() {


angular.module('pw.mypubs', [
	'ngRoute','ui.select2','ui.bootstrap', 'ui.tinymce', 'ngAnimate', // angualr utils
	'pw.tabs', 'pw.actions', 'pw.pubHeader', 'pw.notify', // pw utils
	'pw.bibliodata', 'pw.catalog', 'pw.contacts', 'pw.links', 'pw.author' // tabs
])


.config(['$routeProvider',
	function($routeProvider) {
		// Placeholder for default, login, or routes
	}
])


.controller('mainCtrl', [
'$scope', '$log', '$location',
function ($scope, $log, $location) {

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
		//$scope.log('setRoute ' + routeName)
		$location.path('/' + routeName)
	}

}])


// nice utility directive
.directive('preventDefault', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})

}) ()

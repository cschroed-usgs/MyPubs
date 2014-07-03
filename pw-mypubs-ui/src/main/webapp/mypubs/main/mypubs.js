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

	$scope._show = 'Preview' // TODO index.html must compare to this when preview is impl

	$scope.show = function(show) {
		if (typeof show === 'undefined') {
			return $scope._show
		}
		return $scope._show = show
	}

	// sets the angular path on the url location hash
	$scope.setRoute = function(routeName) {
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

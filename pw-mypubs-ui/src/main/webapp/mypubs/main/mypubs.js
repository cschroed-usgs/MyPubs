(function() {


angular.module('pw.mypubs', [
	'ngRoute','ui.select2','ui.bootstrap', 'ui.tinymce', 'ngAnimate', // angular util modules
	'pw.actions', 'pw.pubHeader', 'pw.notify', // pw util modules
	'pw.bibliodata', 'pw.catalog', 'pw.contacts', 'pw.links', 'pw.author' // pub edit modules
])


.config(['$routeProvider',
	function($routeProvider) {
		// Placeholder for default, login, or routes
	}
])


.controller('mainCtrl', [
'$scope', '$log', '$location',
function ($scope, $log, $location) {

	$scope.tabs = [
		{
			title:"Bibliodata",
			templateUrl: 'mypubs/publication/bibliodata/bibliodata.html',
			controller: 'biblioCtrl'
		},
		{
			title:"Colaborators",
			templateUrl: 'mypubs/publication/authors/author.html',
			controller: 'authorsCtrl'
		},
		{
			title:"Links",
			templateUrl: 'mypubs/publication/links/links.html',
			controller: 'linksCtrl'
		},
		{
			title:"Contacts",
			templateUrl: 'mypubs/publication/contacts/contact.html',
			controller: 'contactCtrl'
		},
		{
			title:"Cataloging",
			templateUrl: 'mypubs/publication/catalog/catalog.html',
			controller: 'catalogCtrl'
		},
		{
			title:"Geospatial",
			templateUrl: 'mypubs/publication/geo/geo.html',
			controller: 'geoCtrl'
		},
	]


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

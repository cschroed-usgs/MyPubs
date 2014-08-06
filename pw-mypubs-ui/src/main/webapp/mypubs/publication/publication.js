(function() {


angular.module('pw.publication', ['ngRoute', 'pw.actions',
	'pw.bibliodata', 'pw.catalog', 'pw.contacts', 'pw.links', 'pw.contributors' // pub edit modules
])
.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Publication', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl',
		});
		$routeProvider.when('/Publication/:pubsid', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl',
                        resolve : {
			    pubData : function($route, PublicationFetcher) {
				    return PublicationFetcher.fetchPubById($route.current.params.pubsid);
			    }
                        }
		});
	}
    ])

.controller('publicationCtrl',
[ '$scope', '$routeParams', '$route',
function($scope, $routeParams, $route) {

	if ($routeParams.pubsid) {
	    $scope.pubData = $route.current.locals.pubData.data;
	}
	else {
	    $scope.pubData = {};
	}

	$scope.tabs = [
		{
			title:"Bibliodata",
			templateUrl: 'mypubs/publication/bibliodata/bibliodata.html',
			controller: 'biblioCtrl'
		},
		{
			title:"Contributors",
			templateUrl: 'mypubs/publication/contributors/contributor.html',
			controller: 'contributorCtrl'
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
		}
	];
}])

}) ();

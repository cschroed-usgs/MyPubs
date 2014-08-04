(function() {


angular.module('pw.publication', ['ngRoute', 'pw.actions',
	'pw.bibliodata', 'pw.catalog', 'pw.contacts', 'pw.links', 'pw.collaborator' // pub edit modules
])
.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Publication', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl',
            resolve: {
                pub : function(){return {};}
            }
		});
		$routeProvider.when('/Publication/:pubsid', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl',
            resolve : {
			    pub : ['$route', 'PublicationFetcher', function($route, PublicationFetcher) {
                    var pubsId = $route.current.params.pubsid;
                    var pub = PublicationFetcher.fetchPubById(pubsId);
                    return pub;
			    }]
            }
		});
	}
    ])

.controller('publicationCtrl',
[ '$scope', '$routeParams', '$route', 'pub',
function($scope, $routeParams, $route, pub) {

	$scope.pub = pub.data;
    $scope.printPub = function(){
        console.dir($scope.pub);
    };
	$scope.tabs = [
		{
			title:"Bibliodata",
			templateUrl: 'mypubs/publication/bibliodata/bibliodata.html',
			controller: 'biblioCtrl'
		},
		{
			title:"Collaborators",
			templateUrl: 'mypubs/publication/collaborators/collaborator.html',
			controller: 'collaboratorsCtrl'
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

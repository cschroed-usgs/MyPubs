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
                pubData : ['Publication', function(Publication){
                        return {
                            data : Publication()
                        };
                }]
            }
		});
		$routeProvider.when('/Publication/:pubsid', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl',
            resolve : {
			    pubData : ['$route', 'Publication', function($route, Publication) {
                    var pubsId = $route.current.params.pubsid;
                    return Publication(pubsId);
			    }]
            }
		});
	}
    ])
.factory('Publication', ['PublicationFetcher', function (PublicationFetcher) {
        var pubSkeleton = function () {
            return {
                "id": '',
                "type": {
                  "id": ''
                },
                "genre": {
                  "id": ''
                },
                "collection-title": {
                  "id": ''
                },
                "number": "",
                "subseries-title": "",
                "chapter-number": "",
                "sub-chapter-number": "",
                "title": "",
                "abstract": "",
                "language": "",
                "publisher": "",
                "publisher-place": "",
                "DOI": "",
                "ISSN": "",
                "ISBN": "",
                "display-to-public-date": "",
                "indexID": "",
                "collaboration": "",
                "usgs-citation": "",
                "cost-center": [],
                "links": [],
                "notes": "",
                "contact": {
                  "id": ''
                },
                "ipds-id": "",
                "productDescription": "",
                "pageFirst": "",
                "pageLast": "",
                "numberOfPages": "",
                "onlineOnly": "",
                "additionalOnlineFiles": "",
                "temporalStart": "",
                "temporalEnd": "",
                "authors": [],
                "editors": [],
                "validation-errors": []
              };
        };
        var pubConstructor = function (pubId) {
            var pubToReturn;
            if (pubId) {
                pubToReturn = PublicationFetcher.fetchPubById(pubId);
            }
            else{
                pubToReturn = pubSkeleton();
            }
            return pubToReturn;
        };
        return pubConstructor;
    }])
.controller('publicationCtrl',
[ '$scope', '$routeParams', '$route', 'pubData',
function($scope, $routeParams, $route, pubData) {

	$scope.pubData = pubData.data;
    $scope.printPub = function(){
        console.dir($scope.pubData);
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
}]);

}) ();

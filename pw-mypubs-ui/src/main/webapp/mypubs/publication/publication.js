(function() {

angular.module('pw.publication', ['ngRoute', 'pw.actions',
	'pw.bibliodata', 'pw.catalog', 'pw.contacts', 'pw.links', 'pw.contributors' // pub edit modules
])
.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Publication', {
			templateUrl: 'mypubs/publication/publication.html',
			controller: 'publicationCtrl',
            resolve: {
                pubData : ['Publication', function(Publication){
                        return Publication()
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
.factory('Publication', ['PublicationFetcher', '$q', function (PublicationFetcher, $q) {
        var pubSkeleton = function () {
            return {
                "id": '',
                "publicationType": {
                  "id": ''
                },
                "publicationSubtype": {
                  "id": ''
                },
                "seriesTitle": {
                  "id": ''
                },
                "seriesNumber": "",
                "subseriesTitle": "",
                "chapter": "",
                "subchapterNumber": "",
                "title": "",
                "abstract": "",
                "language": "",
                "publisher": "",
                "publisherLocation": "",
                "doi": "",
                "issn": "",
                "isbn": "",
                "displayToPublicDate": "",
                "indexId": "",
                "collaboration": "",
                "usgsCitation": "",
                "costCenters": [],
                "links": [],
                "notes": "",
                "contact": {
                  "id": ''
                },
                "ipdsId": "",
                "productDescription": "",
                "startPage": "",
                "endPage": "",
                "numberOfPages": "",
                "onlineOnly": "",
                "additionalOnlineFiles": "",
                "temporalStart": "",
                "temporalEnd": "",
                "authors": [],
                "editors": [],
                "validationErrors": []
              };
        };
        var pubConstructor = function (pubId) {
            var pubToReturn;
            if (pubId) {
                var deferred = $q.defer();
                PublicationFetcher.fetchPubById(pubId).then(function(httpPromise){
                    var response = httpPromise.data;
                    var safePub = pubSkeleton();
                    angular.forEach(safePub, function(defaultValue, key){
                        safePub[key] = response[key] || defaultValue;
                    });
                    deferred.resolve(safePub);
                });
                pubToReturn = deferred.promise;
            }
            else{
                pubToReturn = pubSkeleton();
            }
            return pubToReturn;
        };
        return pubConstructor;
    }])
.controller('publicationCtrl',
[ '$scope', '$routeParams', '$location','$route', 'pubData',
function($scope, $routeParams, $location, $route, pubData) {

	$scope.pubData = pubData;
    $scope.printPub = function(){
        console.dir($scope.pubData);
    };

    $scope.returnToSearch = function(){
    	//TODO verify dirty form status before allowing a return
		$location.path("/Search");
    };
    
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
}]);

}) ();

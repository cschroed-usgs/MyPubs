(function() {


angular.module('pw.fetcher',[])
    .factory('PublicationFetcher', ['$http',  'APP_CONFIG', function($http, APP_CONFIG) {

	var REST_ENDPOINT = APP_CONFIG.endpoint + 'mppublication/'
        return {
            fetchPubById : function(pubId) {
                return $http.get(REST_ENDPOINT + pubId,{
                    params : {
                        mimetype : 'json'
                    }
                });
            },
	    fetchContributor : function(contributorId) {
		return $http.get(REST_ENDPOINT + 'contributor/' + contributorId, {
		    params : {
			mimetype : 'json'
		    }
		});
	    }
        };
    }]);
}) ();

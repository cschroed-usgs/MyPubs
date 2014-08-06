(function() {


angular.module('pw.fetcher',[])
    .factory('PublicationFetcher', ['$http',  'APP_CONFIG', function($http, APP_CONFIG) {

        return {
            fetchPubById : function(pubId) {
                return $http.get(APP_CONFIG.endpoint + 'mppublication/' + pubId,{
                    params : {
                        mimetype : 'json'
                    }
                });
            },
	    fetchContributor : function(contributorId) {
		return $http.get(APP_CONFIG.endpoint + 'contributor/' + contributorId, {
		    params : {
			mimetype : 'json'
		    }
		});
	    }
        };
    }]);
}) ();

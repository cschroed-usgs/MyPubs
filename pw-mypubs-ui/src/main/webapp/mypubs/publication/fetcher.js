(function() {


angular.module('pw.fetcher',[])
    .factory('PublicationFetcher', ['$http',  'APP_CONFIG', function($http, APP_CONFIG) {

        return {
            fetchPubById : function(pubId) {
                var result = undefined;
                if(pubId){
                    result = $http.get(APP_CONFIG.endpoint + 'mppublication/' + pubId,{
                        params : {
                            mimetype : 'json'
                        }
                    });
                }
                return result;
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

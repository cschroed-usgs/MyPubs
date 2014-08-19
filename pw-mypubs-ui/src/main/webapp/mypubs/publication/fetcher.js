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
            searchByTermAndListIds : function(term, listIds, pageSize, startRow) {
                var result = undefined;
                var parms = {
                        mimetype : 'json',
                    };
                if(term && term.length > 0) {
                	parms.q = term;
                }
                if(listIds && listIds.length > 0) {
                	parms.listId = listIds;
                }

                if(pageSize) {
                	parms.page_size = pageSize;
                }

                if(startRow) {
                	parms.page_row_start = startRow;
                }
                
                result = $http.get(APP_CONFIG.endpoint + 'mppublications',{
                    params : parms
                });
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

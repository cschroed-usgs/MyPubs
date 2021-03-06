(function() {


angular.module('pw.fetcher',[])

    .factory('PublicationFetcher', ['$http',  'APP_CONFIG', function($http, APP_CONFIG) {

        return {
            fetchPubById : function(pubId) {
                var result = undefined;
                if (pubId) {
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
                if (term && term.length > 0) {
                	parms.q = term;
                }
                if (listIds && listIds.length > 0) {
                	parms.listId = listIds;
                }

                if (pageSize) {
                	parms.page_size = pageSize;
                }

                if (startRow) {
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
    }])
	
	.factory('PublicationPersister', ['$http',  'APP_CONFIG', '$q', function($http, APP_CONFIG, $q) {
		
		var pubCreateEndpoint =  APP_CONFIG.endpoint + 'mppublications';
		var pubUpdateEndpoint = APP_CONFIG.endpoint + 'mppublication/';
		var httpResponseIsErrorFree = function(httpResponse){
			var text = JSON.stringify(httpResponse).toLowerCase();
			var indexOfException = text.indexOf('exception');
			return  indexOfException === -1;
		};

		var errorPersistingPubMessage = 'Error persisting Publication';

		/**
		 * Persist the given pub, whether it is new or existing, and resolve the
		 * deferred as appropriate
		 * @param {Publication} pub as in the pubData variable kept on the publication controller scope
		 * @returns {Promise}
		 */
		var persistPub = function(pub){
			var deferredPubPersistence = $q.defer();
			//use a different http verb and url depending on whether the pub is new,
			//but otherwise do the same same thing
			var httpVerb, url;
			if (pub.isNew()) {
				url = pubCreateEndpoint;
				httpVerb = 'post';
			}
			else{
				httpVerb = 'put';
				url = pubUpdateEndpoint;
				url += pub.id;
			}
			
			$http[httpVerb](url, pub, {
				'headers' : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json'
				}
			})
			.success(function(response){
				if (httpResponseIsErrorFree(response)) {
					if(response.validationErrors && 0 !== response.validationErrors.length){
						deferredPubPersistence.reject(response);
					}
					else{
						deferredPubPersistence.resolve(response);
					}
				}
				else{
					deferredPubPersistence.reject(new Error(errorPersistingPubMessage));
				}
				deferredPubPersistence.resolve(response);
			})
			.error(function(response){
				deferredPubPersistence.reject(new Error(errorPersistingPubMessage));
			});
			
			return deferredPubPersistence.promise;
		};
		return {
			persistPub : persistPub,
			CREATE_ENDPOINT: pubCreateEndpoint,
			UPDATE_ENDPOINT: pubUpdateEndpoint
		};
	}]);
}) ();

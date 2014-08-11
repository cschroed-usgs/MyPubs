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
    }])
	
	.factory('PublicationPersister', ['$http',  'APP_CONFIG', '$q', function($http, APP_CONFIG, $q) {
		
		var pubPersistenceBaseUrl =  APP_CONFIG.endpoint + 'mpublication/';
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
			var url = pubPersistenceBaseUrl;
			//use a different http verb depending on whether the pub is new,
			//but otherwise do the same same thing
			var httpVerb;
			if(pub.isNew()){
				httpVerb = 'post';
			}
			else{
				httpVerb = 'put';
				url += pub.id;
			}
			
			$http[httpVerb](url, pub, {
				'headers' : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json'
				}
			})
			.success(function(response){
				if(httpResponseIsErrorFree(response)){
					deferredPubPersistence.resolve(response.data);
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
			PERSISTENCE_ENDPOINT: pubPersistenceBaseUrl
		};
	}]);
}) ();

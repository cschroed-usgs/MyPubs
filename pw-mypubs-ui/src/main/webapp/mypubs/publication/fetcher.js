(function() {


angular.module('pw.fetcher',['pw.util'])
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
	
	.factory('PublicationPersister', ['$http',  'APP_CONFIG', 'pwUtil', '$q', function($http, APP_CONFIG, pwUtil, $q) {
		
		var pubPersistenceUrl =  APP_CONFIG.endpoint + 'mpublication/';
		var httpResponseIsErrorFree = function(httpResponse){
			return httpResponse.data.toLowerCase().indexOf('exception') === -1;
		};

		var errorDeletingCostCenterMessage = 'Error deleting Cost Center(s) for a Publication';
		var errorPersistingPubMessage = 'Error persisting Publication';
		/**
		 * Persist the given pub, whether it is new or existing, and resolve the
		 * deferred as appropriate
		 * @param {Publication} pub
		 * @param {Deferred} deferred
		 */
		var persistenceHelper = function(pub, deferred){
			//use a different http verb, but otherwise do the same same thing
			var httpVerb = 'put';
			if(pub.isNew()){
				httpVerb = 'post';
			}
			$http[httpVerb](pubPersistenceUrl, pub, {
				'headers' : {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json'
				}
			})
			.success(function(response){
				if(httpResponseIsErrorFree(response)){
					deferred.resolve(response.data);
				}
				else{
					deferred.reject(new Error(errorPersistingPubMessage));
				}
				deferred.resolve(response);
			})
			.failure(function(response){
				deferred.reject(new Error(errorPersistingPubMessage));
			});
		};

		/**
		 * 
		 * @param {Publication} pub as in the pubData variable kept on the publication controller scope
		 * @param {Array | undefined} originalCostCenters the cost centers as originally delivered to the client, or undefined if
		 * the publication being persisted is new. If *pub*'s list of cost centers differ from the original cost centers, delete 
		 * the pub-costCenter associations prior to persisting. Equality between present and original lists is determined in a set-like fashion;
		 * exclusively by comparing the 'id' property of list items where order of ids in the list does not matter.
		 * @returns {Promise}
		 */
		var persistPub = function(pub, originalCostCenters){
			var deferredPubPersistence = $q.defer();
			var oldCostCenterIds = _.pluck(originalCostCenters, 'id');
			var newCostCenterIds = _.pluck(pub.costCenters, 'id');
			var costCenterIdsToDelete = _.without(oldCostCenterIds, newCostCenterIds);
			var costCenterPubAssociationDeletes = deleteCostCenterPubAssociations(pub.id, costCenterIdsToDelete);

			//declare this function here, where it has access to the promise
			
			$q.then(costCenterPubAssociationDeletes, function(httpResponses){
				if(_.every(httpResponses, httpResponseIsErrorFree)){
					persistenceHelper(pub, deferredPubPersistence);
				}
				else{
					deferredPubPersistence.reject(new Error(errorDeletingCostCenterMessage));
				}
			}, function(){deferredPubPersistence.reject(new Error(errorDeletingCostCenterMessage));});
			
			return deferredPubPersistence.promise;
		};
		
		/**
		 * 
		 * @param {Integer|String} pubId
		 * @param {Array<Integer|String>} costCenterIds
		 * @returns {Array<Promise>}
		 */
		var deleteCostCenterPubAssociations = function(pubId, costCenterIds){
			var costCenterPubAssociationDeletes = _.map(costCenterIds, function(costCenterId){
				var url = APP_CONFIG.endpoint + 'mpublication/' + pubId +'/costcenter/' + costCenterId;
				return $http.delete(url);
			});
			return costCenterPubAssociationDeletes;
		};
		
		return {
			persistPub : persistPub,
			deleteCostCenterPubAssociations: deleteCostCenterPubAssociations
		};
	}]);
}) ();

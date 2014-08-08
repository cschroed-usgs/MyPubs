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
	
	.factory('PublicationPersister', ['$http',  'APP_CONFIG', 'pwUtil', function($http, APP_CONFIG, pwUtil) {
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
			var oldCostCenterIds = _.pluck(originalCostCenters, 'id');
			var newCostCenterIds = _.pluck(pub.costCenters, 'id');
			
			var costCenterPubAssociationDeletes = [];
			if(pwUtil.setWiseEqual(oldCostCenterIds, newCostCenterIds)){
				costCenterPubAssociationDeletes = deleteCostCenterPubAssociations(pub.id, oldCostCenterIds);
			}
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

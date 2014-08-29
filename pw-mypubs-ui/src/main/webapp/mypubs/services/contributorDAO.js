(function() {
    angular.module('pw.contributorDAO', [])

    .factory('ContributorFetcher', ['$http', 'APP_CONFIG', function($http, APP_CONFIG) {
	    return {
		fetchContributorById : function(contributorId) {
		    var result = undefined;
		    if (contributorId) {
			result = $http.get(APP_CONFIG.endpoint + 'contributor/' + contributorId, {
			    params : {
				mimetype : 'json'
			    }
			});
		    }
		    return result;
		}
	    };
    }]);
})();


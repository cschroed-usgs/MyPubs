(function() {
    angular.module('pw.editContributor', ['ngRoute', 'pw.lookups', 'pw.modal', 'pw.contributorDAO'])

	.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/Contributor', {
		templateUrl : 'mypubs/contributor/edit_contributor.html',
		controller : 'editContributorCtrl',
		resolve: {
		    thisContributor : ['ContributorData', function(ContributorData) {
			    return ContributorData();
		    }]
		}
	    });
	    $routeProvider.when('/Contributor/:contributorid', {
		templateUrl : 'mypubs/contributor/edit_contributor.html',
		controller : 'editContributorCtrl',
		resolve : {
		    thisContributor : ['$route', 'ContributorData', function($route, ContributorData) {
			    var contributorId = $route.current.params.contributorid;
			    return ContributorData(contributorId);
		    }]
		}
	    });
	}])

	.factory('ContributorData', ['ContributorFetcher', '$q', function(ContributorFetcher, $q) {
	    var SkeletonContributor = function() {
		var self = this;
		var properties = {
		    contributorId : '',
		    family : '',
		    given : '',
		    suffix : '',
		    email : '',
		    affiliation : {id : ''},
		    organization : '',
		    corporation : '',
		    usgs : false
		};

		angular.forEach(properties, function(defaultValue, propertyName) {
		    self[propertyName] = defaultValue;
		});
	    };

	    SkeletonContributor.prototype = {
		isNew : function() {
		    return !(this.contributorId);
		},
		isCorporation : function() {
		    return (this.corporation === true);
		},
		isPerson : function() {
		    return (this.corporation === false);
		},
		isUSGS : function() {
		    return this.usgs;
		}

	    };

	    var getContributor = function(contributorId){
		var result;
		if (contributorId) {
		    var deferred = $q.defer();

		    ContributorFetcher.fetchContributorById(contributorId).then(function(response) {
			var safeContributor = new SkeletonContributor();
			angular.forEach(safeContributor, function(defaultValue, key) {
			   safeContributor[key] = (key in response.data) ? response.data[key] : defaultValue;
			});
			deferred.resolve(safeContributor);
		    });
		    result = deferred.promise;
		}
		else {
		    result = new SkeletonContributor();
		}
		return result;
	    };

	    return getContributor;
	}])

	.controller('editContributorCtrl', ['$scope', '$route', 'thisContributor', 'LookupFetcher', 'PubsModal', 'ContributorData',
		function($scope, $route, thisContributor, LookupFetcher, PubsModal, ContributorData) {

	    var retrieveAffiliations = function(isUSGS) {
		var lookupKind;
		if (isUSGS) {
		    lookupKind = 'costcenters';
		}
		else {
		    lookupKind = 'outsideaffiliates';
		}
		LookupFetcher.promise(lookupKind).then(function(response) {
		    $scope.affiliations = response.data;
		});
	    };

	    $scope.contributor = thisContributor;

	    // Setting up person/corporation picker
	    $scope.contributorKinds = [{id : 'P', text: 'Person'}, {id : 'C', text : 'Corporation'}];

	    $scope.localKind = {id : ''};
	    $scope.changeContribKind = function() {
		$scope.contributor.corporation = ($scope.localKind.id === 'C');
	    };

	    // Setting up affiliations picker
	    $scope.localAffiliationId = $scope.contributor.affiliation.id;
	    $scope.$watch('localAffiliationId', function(value) {
		$scope.contributor.affiliation = {id : value};
	    });

	    retrieveAffiliations($scope.contributor.isUSGS());

	    $scope.changeAffiliationSelect = function() {
		retrieveAffiliations($scope.contributor.isUSGS());
	    };

	    // Controller actions
	    $scope.saveChanges = function(){
		PubsModal.alert('Save Status', 'Save is not yet implemented');
	    };

	    $scope.cancelChanges = function() {
		$route.reload();
	    };
	}]);
}) ();



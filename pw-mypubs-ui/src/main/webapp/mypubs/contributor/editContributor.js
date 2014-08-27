(function() {
    angular.module('pw.editContributor', ['ngRoute', 'pw.lookups', 'pw.modal'])

	.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/Contributor', {
		templateUrl : 'mypubs/contributor/edit_contributor.html',
		controller : 'editContributorCtrl',
		resolve: {
		    contributorData : ['Contributor', function(Contributor) {
			    return Contributor();
		    }]
		}
	    });
	}])

	.factory('Contributor', function() {
	    var SkeletonContributor = function() {
		var self = this;
		var properties = {
		    contributor_id : '',
		    first : '',
		    given : '',
		    suffix : '',
		    email : '',
		    affiliation_id : '',
		    literal : '',
		    is_corporation : '',
		    is_usgs : 'N'
		};

		angular.forEach(properties, function(defaultValue, propertyName) {
		    self[propertyName] = defaultValue;
		});
	    };

	    SkeletonContributor.prototype = {
		isNew : function() {
		    return !(this.contributor_id);
		},
		isCorporation : function() {
		    return this.is_corporation === 'Y';
		},
		isPerson : function() {
		    return this.is_corporation === 'N';
		}
	    };

	    var getContributor = function(contributorId){
		var result;
		if (contributorId) {
		    return result;// TODO use a web service to retrieve a contributor.
		}
		else {
		    result = new SkeletonContributor();
		}
		return result;
	    };

	    return getContributor;
	})

	.controller('editContributorCtrl', ['$scope', 'contributorData', 'PubsModal', 'Contributor',
		function($scope, contributorData, PubsModal, Contributor) {
	    $scope.contributorKinds = [{id : 'N', text: 'Person'}, {id : 'Y', text : 'Corporation'}];

	    $scope.contributor = contributorData;

	    $scope.saveChanges = function(){
		PubsModal.alert('Save Status', 'Save is not yet implemented');
	    };

	    $scope.cancelChanges = function(){
		if ($scope.contributor.isNew()) {
		    $scope.contributor = Contributor();
		}
		else {
		    //TODO fetching contributors
		}
	    };
	}]);
}) ();



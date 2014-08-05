(function() {


angular.module('pw.contributors', ['pw.fetcher', 'pw.dataList', 'pw.fetcher', 'pw.lookups'])

    .factory('ContributorModel', function() {

	var getEmptyContributor = function() {
	    return {
		id : '',
		contributorId : '',
		rank : '',
		kind : ''
	    };
	};

	function Contributor(data) {
	    if (data && angular.isDefined(data.family)) {
		this.kind = 'Person';
	    }
	    else if (data && angular.isDefined(data.organization)) {
		this.kind = 'Corporation';
	    }
	    else {
		data = getEmptyContributor();
	    }
	    angular.extend(this, data);
	}

	Contributor.prototype = {
	    changeKind : function() {
		var removeProps = function(obj, propArray) {
		    var i;
		    for (i = 0; i < propArray.length; i++) {
			delete obj[propArray[i]];
		    }
		};

		var CORP_PROPS = ['organization'];
		var PERSON_PROPS = ['family', 'given', 'suffix', 'email', 'affliliation'];

		var i;

		this.contributorId = '';
		if (this.kind === 'Person') {
		    angular.extend(this, {
			family : '',
			given : '',
			suffix : '',
			email : '',
			affiliation : ''
		    });
		    removeProps(this, CORP_PROPS);
		}
		else if (this.kind === 'Corporation') {
		    angular.extend(this, {
			organization : ''
		    });
		    removeProps(this, PERSON_PROPS);

		}
		else {
		    removeProps(this, CORP_PROPS.concat(PERSON_PROPS));
		}
	    },
	    isPerson : function() {
		return this.kind === 'Person';
	    },
	    isCorporation : function() {
		return this.kind === 'Corporation';
	    }
	};

	return Contributor;
    })

    .controller('contributorsCtrl',
	['$scope', 'ContributorModel', 'PublicationFetcher', 'LookupFetcher', 'ListOrderingService', function ($scope, ContributorModel, PublicationFetcher, LookupFetcher, ListOrderingService) {
	var selectedIndex;

	var KINDS = ['Person', 'Corporation'];

	$scope.contribKindOptions = KINDS;

	$scope.isPerson = function(contributor) {
	    return contributor.isPerson(contributor);
	};
	$scope.isCorporation = function(contributor) {
	    return contributor.isCorporation(contributor);
	};

	$scope.contribKindSelect = '';
	$scope.changeKind = function(contributor) {
	    contributor.changeKind();
	};

	LookupFetcher.promise('contributortypes').then(function(response) {
	    $scope.contribTabs = response.data;
	    angular.forEach($scope.contribTabs, function(value, index) {
		// The property in pubs data will be the text in lower case
		var prop = value.text.toLowerCase();

		// Create properties on pubData and then sort by rank
		if (angular.isUndefined($scope.pubData[prop])) {
		    $scope.pubData[prop] = [];
		};
		$scope.pubData[prop] = _.sortBy($scope.pubData[prop], 'rank');

		// This is the scope variable that the html will use.
		$scope.contribTabs[index].data = [];
		angular.forEach($scope.pubData[prop], function(dataValue, dataIndex) {
		    $scope.contribTabs[index].data.push(new ContributorModel(dataValue));
		});
	    });
	});

	LookupFetcher.promise('people').then(function(response) {
	    $scope.personOptions = response.data;
	});

	LookupFetcher.promise('corporations').then(function(response) {
	    $scope.corporationOptions = response.data;
	});

	$scope.selectedTab = function(index) {
	    selectedIndex = index;
	};

	$scope.sortOptions = {
	    stop : function() {
		ListOrderingService.updateRank($scope.contribTabs[selectedIndex].data);
	    }
	};

	$scope.deleteContributor = function(index) {
	    ListOrderingService.deleteObj($scope.contribTabs[selectedIndex].data, index);
	};

	$scope.addContributor = function() {
	    ListOrderingService.addNewObj($scope.contribTabs[selectedIndex].data, new ContributorModel());
	};

	$scope.updateContributorInfo = function(index) {
	    PublicationFetcher.fetchContributor($scope.contribTabs[selectedIndex].data[index].contributorId).then(function(response) {
		angular.extend($scope.contribTabs[selectedIndex].data[index], response.data);
	    });

	};
    }]);


}) ();

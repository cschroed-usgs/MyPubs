describe('Tests for pw.editContributor', function() {

    var $q, mockContributorFetcher, fetcherDeferred, $rootScope;

    beforeEach(module('pw.editContributor'));

	beforeEach(module('pw.editContributor', function($provide) {
	    $provide.value('ContributorFetcher', mockContributorFetcher);
	}));

	beforeEach(function() {
	    mockContributorFetcher = {
		fetchContributorById : function(id) {
		  var fetcherDeferred = $q.defer();

		    var result;
		    if (id === 100) {
			// This is missing a field
			result = {
			    contributorId : id,
			    organization : 'Org1',
			    corporation : true,
			    usgs : false
			}
		    }
		    else {
			result = {
			    contributorId : id,
			    family : 'Jim',
			    given : 'Olsen',
			    suffix : 'JR',
			    email : 'jolsen@gmail.com',
			    affiliation : {id : 2, text : 'A2'},
			    corporation : false,
			    usgs : false
			};
		    }

		    fetcherDeferred.resolve({data : result});
		    return fetcherDeferred.promise;
		}
	    };

	    spyOn(mockContributorFetcher, 'fetchContributorById').andCallThrough();
	});

	beforeEach(inject(function($injector) {
	    $q = $injector.get('$q');
	    $rootScope = $injector.get('$rootScope');
	}));

    describe('Tests for routing', function() {

	it('Should have Contributor as a known route', inject(function($route){
	    var exists = false;
	    angular.forEach($route.routes, function(route, path) {
		exists |= path === '/Contributor';
	    });
	}));
    });

    describe('Tests for ContributorData factory', function() {

	it('Creates an empty contributor if no id is passed to factory function', inject(function(ContributorData) {
	    var contrib = new ContributorData();
	    expect(contrib.contributorId).toEqual('');
	    expect(contrib.corporation).toEqual('');
	    expect(contrib.usgs).toEqual(false);
	}));

	it('Expects isNew to return true for a new contributor', inject(function(ContributorData) {
	    var contrib = new ContributorData();
	    expect(contrib.isNew()).toBe(true);
	}));

	it('Expects isNew to return false if the contributor has an id', inject(function(ContributorData) {
	    var contrib = new ContributorData();
	    contrib.contributorId = '1';
	    expect(contrib.isNew()).toBe(false);
	}));

	it('Expects a new contributor to return false for isPerson and isCorporation', inject(function(ContributorData) {
	    var contrib = new ContributorData();
	    expect(contrib.isCorporation()).toBe(false);
	    expect(contrib.isPerson()).toBe(false);
	}));

	it('Expects a corporation contributor to return true for isCorporation', inject(function(ContributorData) {
	    var contrib = new ContributorData();
	    contrib.corporation = true;
	    expect(contrib.isCorporation()).toBe(true);
	    expect(contrib.isPerson()).toBe(false);
	}));

	it('Expects a non corporation contributor to return true for isPerson', inject(function(ContributorData) {
	    var contrib = new ContributorData();
	    contrib.corporation = false;
	    expect(contrib.isPerson()).toBe(true);
	    expect(contrib.isCorporation()).toBe(false);
	}));

	it('Expects a USGS contributor to return true for isUSGS', inject(function(ContributorData) {
	    var contrib = new ContributorData();
	    contrib.usgs = true;
	    expect(contrib.isUSGS()).toBe(true);
	}));

	it('Expects a non USGS contributor to return false for isUSGS', inject(function(ContributorData) {
	    var contrib = new ContributorData();
	    contrib.usgs = false;
	    expect(contrib.isUSGS()).toBe(false);
	}));

	it('Expects the contributor fetcher to be used to create a new contrib if contributorID is specfied', inject(function(ContributorData) {
	    var contrib;
	    var contribPromise = new ContributorData(1);
	    $rootScope.$apply();
	    contribPromise.then(function(data) {
		contrib = data;
	    });
	    $rootScope.$apply();
	    expect(contrib.contributorId).toEqual(1);
	    expect(contrib.organization).toEqual('');
	    expect(contrib.family).toEqual('Jim');
	}));
    });

    describe('Tests for editContributorCtrl', function() {
	COST_CENTERS = [{id : 1, text : 'CC1'}, {id : 2, text : 'CC2'}, {id : 3, text : 'CC3'}];
	OUTSIDE_AFFILIATIONS = [{id : 1, text : 'A1'}, {id : 2, text : 'A2'}, {id : 3, text : 'A3'}];

	var mockPubsModal, mockLookupFetcher, $scope, ContributorData, $q, mockRoute;
	var createController;

	beforeEach(function() {
	    mockPubsModal = jasmine.createSpyObj('mockPubsModal', ['alert']);

	    mockRoute = jasmine.createSpyObj('mockRoute', ['reload']);

	    mockLookupFetcher = {
		promise : function(lookup) {
		    var result = [];
		    var deferred = $q.defer();
		    if (lookup === 'costcenters') {
			result = COST_CENTERS;
		    }
		    else if (lookup === 'outsideaffiliates') {
			result = OUTSIDE_AFFILIATIONS;
		    }
		    deferred.resolve({data : result});
		    return deferred.promise;
		}
	    };

	    spyOn(mockLookupFetcher, 'promise').andCallThrough();
	});

	beforeEach(inject(function($injector) {
	    var $controller, $rootScope;

	    $rootScope = $injector.get('$rootScope');
	    $scope = $rootScope.$new();
	    $q = $injector.get('$q');
	    ContributorData = $injector.get('ContributorData');
	    $controller = $injector.get('$controller');

	    createController = function(thisContributor) {
		return $controller('editContributorCtrl', {
		    '$scope' : $scope,
		    '$route' : mockRoute,
		    'thisContributor' : thisContributor,
		    'LookupFetcher' : mockLookupFetcher,
		    'PubsModal' : mockPubsModal,
		    'ContributorData' : ContributorData
		});
	    };
	}));

	it('Expects that controller initialized with a non USGS contributor assigns the outside affiliations to affiliations', function() {
	    var contrib = ContributorData();
	    contrib.usgs = false;
	    var ctrl = createController(contrib);
	    $scope.$digest();

	    expect(mockLookupFetcher.promise).toHaveBeenCalledWith('outsideaffiliates');
	    expect($scope.affiliations).toEqual(OUTSIDE_AFFILIATIONS);
	});

	it('Expects that controller initialized with a USGS contributor assigns cost center to affiliations', function() {
	    var contrib = ContributorData();
	    contrib.usgs = true;
	    var ctrl = createController(contrib);
	    $scope.$digest();

	    expect(mockLookupFetcher.promise).toHaveBeenCalledWith('costcenters');
	    expect($scope.affiliations).toEqual(COST_CENTERS);
	});

	it('Expects that changing the localKind, updates the contributor\'s corporation property)', function() {
	    var ctrt = createController(ContributorData());
	    $scope.$digest();
	    $scope.localKind.id = 'P';
	    $scope.changeContribKind();
	    expect($scope.contributor.corporation).toBe(false);

	    $scope.localKind.id = 'C';
	    $scope.changeContribKind();
	    expect($scope.contributor.corporation).toBe(true);
	});

	it('Expects a change to localAffiliationId to update the contributor\'s affiliation', function() {
	    var ctrl = createController(ContributorData());
	    $scope.$digest();

	    $scope.localAffiliationId = 1;
	    $scope.$digest();
	    expect($scope.contributor.affiliation.id).toEqual(1);

	    $scope.localAffiliationId = 2;
	    $scope.$digest();
	    expect($scope.contributor.affiliation.id).toEqual(2);
	});

	it('Expects that calling cancel reloads the page', function() {
	    var ctrl = createController(ContributorData());
	    $scope.cancelChanges();
	    expect(mockRoute.reload).toHaveBeenCalled();
	});

	it('Expects that when changeAffiliationSelect is called it sets the affiliations to the correct set', function() {
	    var contrib = ContributorData();
	    contrib.usgs = false;
	    var ctrl = createController(contrib);
	    $scope.$digest();

	    $scope.contributor.usgs = true;
	    $scope.changeAffiliationSelect();
	    $scope.$digest();
	    expect($scope.affiliations).toEqual(COST_CENTERS);
	});

    });

});
describe('Tests for pw.editContributor', function() {

    beforeEach(module('pw.editContributor'));

    it('Should have a pubs contributor module', function() {
	expect(function() { angular.module('pw.editContributor'); }).not.toThrow();
    });

    it('Should have Contributor as a known route', inject(function($route){
	var exists = false;
	angular.forEach($route.routes, function(route, path) {
	    exists |= path === '/Contributor';
	});
    }));

    describe('Tests for Contributor factory', function() {
	it('Creates an empty contributor if no id is passed to factory function', inject(function(Contributor) {
	    var contrib = new Contributor();
	    expect(contrib.contributor_id).toEqual('');
	    expect(contrib.is_corporation).toEqual('');
	    expect(contrib.is_usgs).toEqual('N');
	}));

	it('Expects isNew to return false for a new contributor', inject(function(Contributor) {
	    var contrib = new Contributor();
	    expect(contrib.isNew()).toBe(true);
	}));

	it('Expects isNew to return true if the contributor has an id', inject(function(Contributor) {
	    var contrib = new Contributor();
	    contrib.contributor_id = '1';
	    expect(contrib.isNew()).toBe(false);
	}));

	it('Expects a new contributor to return false for isPerson and isCorporation', inject(function(Contributor) {
	    var contrib = new Contributor();
	    expect(contrib.isCorporation()).toBe(false);
	    expect(contrib.isPerson()).toBe(false);
	}));

	it('Expects a corporation contributor to return true for isCorporation', inject(function(Contributor) {
	    var contrib = new Contributor();
	    contrib.is_corporation = 'Y';
	    expect(contrib.isCorporation()).toBe(true);
	    expect(contrib.isPerson()).toBe(false);
	}));

	it('Expects a non corporation contributor to return true for isPerson', inject(function(Contributor) {
	    var contrib = new Contributor();
	    contrib.is_corporation = 'N';
	    expect(contrib.isPerson()).toBe(true);
	    expect(contrib.isCorporation()).toBe(false);
	}));
    });

    describe('Tests for editContributorCtrl', function() {
	var mockPubsModal, $scope, Contributor;
	var createController;

	beforeEach(function() {
	    mockPubsModal = jasmine.createSpyObj('mockPubsModal', ['alert']);
	});

	beforeEach(inject(function($injector) {
	    var $controller, $rootScope;

	    $rootScope = $injector.get('$rootScope');
	    $scope = $rootScope.$new();
	    Contributor = $injector.get('Contributor');
	    $controller = $injector.get('$controller');

	    createController = function(contributorData) {
		return $controller('editContributorCtrl', {
		    '$scope' : $scope,
		    'contributorData' : contributorData,
		    'PubsModal' : mockPubsModal,
		    'Contributor' : Contributor
		});
	    };
	}));

	it('Expects that calling cancel after assigning data to contributor, clears the contributor', function() {
	    var ctrl = createController(Contributor());
	    $scope.contributor.first = 'George';
	    $scope.contributor.given = 'Washington',
	    $scope.contributor.is_corporation = 'N';
	    $scope.cancelChanges();
	    expect($scope.contributor).toEqual(Contributor());
	});

    });

});
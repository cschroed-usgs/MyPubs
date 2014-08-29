describe('Tests for pw.contributorDAO', function() {

    var APP_CONFIG = {
        endpoint : 'https://dummy_service/'
    };
    var MIMETYPE = '?mimetype=json';

    it('Should have a pubs contributorDAO module', function() {
	expect(function() { angular.module('pw.contributorDAO'); }).not.toThrow();
    });

    describe('Tests for ContributorFetcher service', function() {
	var $httpBackend;

	beforeEach(module('pw.contributorDAO'));

	beforeEach(function () {
	    module(function ($provide) {
		    $provide.value('APP_CONFIG', APP_CONFIG);
	    });
	});

	beforeEach(inject(function($injector) {
	    $httpBackend = $injector.get('$httpBackend');
	    $httpBackend.when('GET', APP_CONFIG.endpoint + 'contributor/2' + MIMETYPE).respond({
		"id" : 2,
		"name" : "This Name"
	    });
	    $httpBackend.when('GET', APP_CONFIG.endpoint + 'contributor/12' + MIMETYPE).respond({
		"id" : 12,
		"name" : "That Name"
	    });
	}));

	afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

	it('Expects fetchContributorById to return a promise', inject(function(ContributorFetcher) {
	    var promiseSpy = jasmine.createSpy('promiseSpy');
	    var promise = ContributorFetcher.fetchContributorById(2).then(promiseSpy);

	    $httpBackend.expectGET(APP_CONFIG.endpoint + 'contributor/2' + MIMETYPE);

	    $httpBackend.flush();
	    expect(promiseSpy).toHaveBeenCalled();
	    expect(promiseSpy.calls[0].args[0].data).toEqual({id : 2, name : 'This Name'});
	}));
    });
});


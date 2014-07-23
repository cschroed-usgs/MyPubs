describe('pw.fetcher module', function() {

    var APP_CONFIG = {
        endpoint : 'https://dummy_service/'
    };
    var MIMETYPE = '?mimetype=json';

    it('should have a pubs fetcher module pw.fetcher', function() {
            // angular should find a defined mod
            var def = true;
            try {
              angular.module('pw.fetcher');
            } catch(e) {
              def = false;
            }
            expect(def).toBeTruthy();
    });

    describe('pw.fetcher.PublicationFetcher', function() {
        beforeEach(module('pw.fetcher'));

        beforeEach(function() {
            module(function($provide) {
                $provide.value('APP_CONFIG', APP_CONFIG);
            });
        });

        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', APP_CONFIG.endpoint + 'mppublication/12' + MIMETYPE).respond({
                "id": 12,
                "type": {
                    "id": 18,
                    "validationErrors": null
                },
                "genre": {
                    "id": 5,
                    "validationErrors": null
                }
            });
            $httpBackend.when('GET', APP_CONFIG.endpoint + 'mppublication/120' + MIMETYPE).respond({
                "id": 120,
                "type": {
                    "id": 28,
                    "validationErrors": null
                },
                "genre": {
                    "id": 25,
                    "validationErrors": null
                }
            });
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('Expects fetchPubById to return a promise', inject(function(PublicationFetcher) {
            var promiseSpy = jasmine.createSpy('promiseSpy');
            var promise = PublicationFetcher.fetchPubById(12).then(promiseSpy);

            $httpBackend.expectGET(APP_CONFIG.endpoint + 'mppublication/12' + MIMETYPE);

            $httpBackend.flush();
            expect(promiseSpy).toHaveBeenCalled();
            expect(promiseSpy.calls[0].args[0].data.id).toEqual(12);
        }));
    });

});
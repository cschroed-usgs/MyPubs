describe('pw.lookups module', function() {

    var MockNotify;

    beforeEach(function() {
        MockNotify = {
                calls : 0,
                error : function(){ MockNotify.calls++; }
        };
    });

    it('should have a pubs lookups module pw.lookups', function() {
            // angular should find a defined mod
            var def = true;
            try {
              angular.module('pw.lookups');
            } catch(e) {
              def = false;
            }
            expect(def).toBeTruthy();
    });
        describe('pw.lookups.LookupFetcher', function() {

            var $httpBackend, $scope;

            var URL_BASE  = 'https://cida-eros-pubsdev.er.usgs.gov:8443/pubs-services/lookup/';
            var MIMETYPE = 'mimetype=json';

            beforeEach(module('pw.lookups', 'mock.notify'));

            beforeEach(function(){
                    angular.module('mock.notify',[]).value('Notifier', MockNotify);
                    MockNotify.calls = 0;
            });

            beforeEach(inject(function($injector) {
                    $httpBackend = $injector.get('$httpBackend');
                    $httpBackend.when('GET', URL_BASE + 'asdf?' + MIMETYPE).respond({asdf:true});
                    $httpBackend.when('GET', URL_BASE + 'asdf?' + MIMETYPE + '&subtype=blots').respond({asdf:true});
                    $httpBackend.when('GET', URL_BASE + 'err?' + MIMETYPE).respond(500);

                    $scope = $injector.get('$rootScope');
            }));


            afterEach(function() {
                    $httpBackend.verifyNoOutstandingExpectation();
                    $httpBackend.verifyNoOutstandingRequest();
            });


            it('Should use the promise function\'s parameters in the url request', inject(function(LookupFetcher) {
                var promise = LookupFetcher.promise('asdf');
                $httpBackend.expectGET(URL_BASE + 'asdf?' + MIMETYPE);

                promise = LookupFetcher.promise('asdf', {subtype : 'blots'});
                $httpBackend.expectGET(URL_BASE + 'asdf?' + MIMETYPE + '&subtype=blots');

                $httpBackend.flush();
            }));

            it('When successful, should return a promise that returns the result', inject(function(LookupFetcher) {
                var successSpy = jasmine.createSpy('successSpy');
                LookupFetcher.promise('asdf').then(successSpy);
                $httpBackend.flush(1);
                expect(successSpy).toHaveBeenCalled();
                expect(successSpy.calls[0].args[0].data).toEqual({ asdf : true });
            }));

            it('When error, expect notifer to be called', inject(function(LookupFetcher) {
                LookupFetcher.promise('err');
                $httpBackend.flush();
                expect(MockNotify.calls).toBe(1);

            }));
        });

        describe('pw.lookups.LookupCascadeSelect2', function() {
            var mockLookupFetcher, q, deferred, rootscope;
            var LOOKUP_DATA = [{id : 1, text : 'Text1'}, {id : 2, text : 'Text2'}];

            beforeEach(module('pw.lookups', 'mock.notify'));

            beforeEach(function() {
                mockLookupFetcher = {
                    promise : function() {
                        deferred = q.defer();
                        return deferred.promise;
                    }
                };
                spyOn(mockLookupFetcher, 'promise').andCallThrough();

                module(function ($provide) {
                    $provide.value('LookupFetcher', mockLookupFetcher);
                 });
            });

            beforeEach(inject(function($injector) {
                rootScope = $injector.get('$rootScope');
                q = $injector.get('$q');
            }));

            it('Expects query function to use lookup service with the specified type and parent',
                inject(function(LookupCascadeSelect2) {
                var param = {};
                LookupCascadeSelect2.query(param, 'subtype1', {type1 : 'one'});
                expect(mockLookupFetcher.promise).toHaveBeenCalledWith('subtype1', {type1 : 'one'});
            }));

            it('Expects that when the promise has finished, query.callback is called with the lookup data', inject(function(LookupCascadeSelect2) {
                var param = jasmine.createSpyObj('param', ['callback']);
                LookupCascadeSelect2.query(param, 'subtype1', {type1 : 'one'});
                deferred.resolve({data : LOOKUP_DATA});
                rootScope.$apply();
                expect(param.callback).toHaveBeenCalledWith({
                    results : [
                        {id : 1, text : 'Text1'},
                        {id : 2, text : 'Text2'}
                    ]
                });
            }));

            it('Expects that initSelection should call promise with lookupType and parent', inject(function(LookupCascadeSelect2) {
                var callback = {};
                LookupCascadeSelect2.initSelection('subtype1', {type1 : 'one'}, 2, callback);
                expect(mockLookupFetcher.promise).toHaveBeenCalledWith('subtype1', {type1 : 'one'});
            }));

            it('Expects that when initSelection\'s promise is resolved that callback is called with the initValue object',
                inject(function(LookupCascadeSelect2) {
                    var callback = jasmine.createSpy('callback');
                    LookupCascadeSelect2.initSelection('subtype1', {type1 : 'one'}, 2, callback);
                    deferred.resolve({data : LOOKUP_DATA});
                    rootScope.$apply();
                    expect(callback).toHaveBeenCalledWith({id : 2, text : 'Text2'});
            }));

        });
});


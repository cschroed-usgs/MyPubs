describe("pw.bibliodata module", function(){


	beforeEach( module('pw.bibliodata') )


	it('should have a pubs bibliodata module pw.bibliodata', function() {
		// angular should find a defined mod
		var def = true;
		try {
			angular.module('pw.bibliodata')
		} catch(e) {
			def = false;
		}
		expect( def ).toBeTruthy();
	});

        describe('pw.bibliodata.biblioCtrl', function() {
            var scope, rootScope, q, createController, mockPubFetcher, mockLookupFetcher,  deferred;
            var LOOKUP_DATA = [{value : 1, text : 'Text1'}, {value : 2, text : 'Text2'}];

            beforeEach(function() {
                scope = {};

                mockPubFetcher = {
                    get : jasmine.createSpy('mockPubFetcher.get')
                };
                mockLookupFetcher = {
                    promise : function() {
                        return q.when({data : LOOKUP_DATA});
                    }
                };
                spyOn(mockLookupFetcher, 'promise').andCallThrough();
            });

            beforeEach(inject(function($injector) {
                rootScope = $injector.get('$rootScope');
                scope = rootScope.$new();
                q = $injector.get('$q');

                var $controller = $injector.get('$controller');
                createController = function() {
                    return $controller('biblioCtrl', {
                        '$scope': scope,
                        'PublicationFetcher': mockPubFetcher,
                        'LookupFetcher' : mockLookupFetcher
                    });
                };
            }));

            it('Should initialize the appropriate fields when no pubs data is returned from fetcher', function() {
                mockPubFetcher.get.andReturn({});

                myCtrl = createController();
                scope.$digest();
                expect(scope.type).toBeFalsy();
                expect(scope.genre).toBeFalsy();
                expect(scope.typeOptions).toEqual(LOOKUP_DATA);
                expect(scope.subtypeSelect2Options.query).toBeDefined();
                expect(scope.subtypeSelect2Options.initSelection).toBeDefined();
            });

            it('Should initialize the appropriate fields when pubs data is returned from fetcher', function() {
                mockPubFetcher.get.andReturn({properties : {
                        type : 1,
                        genre : 2
                }});
                myCtrl = createController();
                expect(scope.type).toEqual(1);
            });

            it('Expects that if type is changed, genre is cleared', function() {
                mockPubFetcher.get.andReturn({properties : {
                        type : 1,
                        genre : 2
                }});
                myCtrl = createController();
                scope.genre = 2;
                expect(scope.genre).toEqual(2);

                scope.type = 3;
                scope.$digest();
                expect(scope.genre).toEqual('');
            });

            it('The subtypeSelect2Options.query should update the option list', function() {
                var query, queryParam;
                mockPubFetcher.get.andReturn({properties : {
                        type : 1,
                        genre : 2
                }});
                myCtrl = createController();
                query = scope.subtypeSelect2Options.query;
                queryParam = {callback : jasmine.createSpy('queryCallback')};
                query(queryParam);
                expect(mockLookupFetcher.promise.calls.length).toBe(2);
                expect(mockLookupFetcher.promise.calls[1].args[1]).toEqual({
                    publicationtypeid : 1
                });
                scope.$digest();
                expect(queryParam.callback).toHaveBeenCalledWith({results : [{id : 1, text : 'Text1'}, {id : 2, text : 'Text2'}]});
            });

            it('The subtypeSelect2Options.initSelection should set the initial selection', function() {
                var element, callback, initSelection;
                mockPubFetcher.get.andReturn({properties : {
                        type : 1,
                        genre : 2
                }});
                callback = jasmine.createSpy('initCallback');

                myCtrl = createController();
                initSelection = scope.subtypeSelect2Options.initSelection;

                initSelection(element, callback);
                expect(scope.genre).toEqual(2);
                expect(mockLookupFetcher.promise.calls.length).toBe(2);
                expect(mockLookupFetcher.promise.calls[1].args[1]).toEqual({
                    publicationtypeid : 1
                });
                scope.$digest();
                expect(callback).toHaveBeenCalledWith({id : 2, text : 'Text2'});
            });
        });
});
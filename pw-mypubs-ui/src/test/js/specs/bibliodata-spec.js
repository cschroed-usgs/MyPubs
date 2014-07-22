describe("pw.bibliodata module", function(){


	beforeEach( module('pw.bibliodata') );


	it('should have a pubs bibliodata module pw.bibliodata', function() {
		// angular should find a defined mod
		var def = true;
		try {
			angular.module('pw.bibliodata');
		} catch(e) {
			def = false;
		}
		expect( def ).toBeTruthy();
	});

        describe('pw.bibliodata.biblioCtrl', function() {
            var scope, rootScope, q, createController, mockPubFetcher, mockLookupFetcher;
            var mockLookupCascadeSelect2;
            var LOOKUP_DATA = [{value : 1, text : 'Text1'}, {value : 2, text : 'Text2'}];

            beforeEach(function() {
                scope = {};

                mockPubFetcher = {
                    getPub : jasmine.createSpy('mockPubFetcher.getPub')
                };
                mockLookupFetcher = {
                    promise : function() {
                        return q.when({data : LOOKUP_DATA});
                    }
                };
                mockLookupCascadeSelect2 = jasmine.createSpyObj('mockLookupCascadeSelect2', ['query', 'initSelection']);
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
                        'LookupFetcher' : mockLookupFetcher,
                        'LookupCascadeSelect2' : mockLookupCascadeSelect2
                    });
                };
            }));

            it('Should initialize the appropriate fields when no pubs data is returned from fetcher', function() {
                mockPubFetcher.getPub.andReturn({});

                myCtrl = createController();
                scope.$digest();
                expect(scope.type).toBeFalsy();
                expect(scope.genre).toBeFalsy();
                expect(scope.collectionTitle).toBeFalsy();
                expect(scope.costCenters.length).toBe(0);
                expect(scope.subseriesTitle).toBeFalsy();
                expect(scope.number).toBeFalsy();
                expect(scope.chapterNumber).toBeFalsy();
                expect(scope.subChapterNumber).toBeFalsy();
                expect(scope.title).toBeFalsy();
                expect(scope.abstract).toBeFalsy();
                expect(scope.usgsCitation).toBeFalsy();
                expect(scope.language).toBeFalsy();
                expect(scope.publisher).toBeFalsy();
                expect(scope.publisherPlace).toBeFalsy();
                expect(scope.doi).toBeFalsy();
                expect(scope.issn).toBeFalsy();
                expect(scope.isbn).toBeFalsy();

                expect(scope.typeOptions).toEqual(LOOKUP_DATA);
                expect(scope.costCenterOptions).toEqual(LOOKUP_DATA);
                expect(scope.subtypeSelect2Options.query).toBeDefined();
                expect(scope.subtypeSelect2Options.initSelection).toBeDefined();
                expect(scope.seriesTitleSelect2Options.query).toBeDefined();
                expect(scope.seriesTitleSelect2Options.initSelection).toBeDefined();
                expect(scope.costCenterSelect2Options).toBeDefined();
                expect(scope.abstractEditorOptions).toBeDefined();
                expect(scope.changeType).toBeDefined();
                expect(scope.changeGenre).toBeDefined();
            });

            it('Expects the change* functions to update the appropriate fields immediately', function() {
                mockPubFetcher.getPub.andReturn({});

                myCtrl = createController();
                scope.$digest();
                scope.genre = 1;
                scope.collectionTitle = 2;
                scope.changeType();
                expect(scope.genre).toEqual('');
                expect(scope.collectionTitle).toEqual('');

                scope.collectionTitle = 3;
                scope.changeGenre();
                expect(scope.collectionTitle).toEqual('');
            });

            describe('Tests with pub data', function() {
                beforeEach(function() {
                    mockPubFetcher.getPub.andReturn({
                        type : {id : 1},
                        genre : {id : 2},
                        'collection-title' : {id : 3},
                        'cost-center' : [{id : 4}, {id : 5}],
                        'subseries-title' : 'text1',
                        number : 'text2',
                        'chapter-number' : 'text3',
                        'sub-chapter-number' : 'text4',
                        'title' : 'text5',
                        'abstract' : 'text6',
                        'usgs-citation' : 'text7',
                        'language' : 'text8',
                        'publisher' : 'text9',
                        'publisher-place' : 'text10',
                        'DOI' : 'text11',
                        'ISSN' : 'text12',
                        'ISBN' : 'text13'
                    });
                });

                it('Should initialize the appropriate fields when pubs data is returned from fetcher', function() {
                    myCtrl = createController();
                    expect(scope.type).toEqual(1);
                    expect(scope.genre).toEqual(2);
                    expect(scope.collectionTitle).toEqual(3);
                    expect(scope.costCenters).toEqual([4, 5]);
                    expect(scope.subseriesTitle).toEqual('text1');
                    expect(scope.number).toEqual('text2');
                    expect(scope.chapterNumber).toEqual('text3');
                    expect(scope.subChapterNumber).toEqual('text4');
                    expect(scope.title).toEqual('text5');
                    expect(scope.abstract).toEqual('text6');
                    expect(scope.usgsCitation).toEqual('text7');
                    expect(scope.language).toEqual('text8');
                    expect(scope.publisher).toEqual('text9');
                    expect(scope.publisherPlace).toEqual('text10');
                    expect(scope.doi).toEqual('text11');
                    expect(scope.issn).toEqual('text12');
                    expect(scope.isbn).toEqual('text13');
                });

                it('Expects that genre and collectionTitle are cleared after the second time changeType is called', function() {
                    myCtrl = createController();
                    scope.$digest();
                    scope.changeType();
                    expect(scope.genre).toEqual(2);
                    expect(scope.collectionTitle).toEqual(3);

                    scope.changeType();
                    expect(scope.genre).toEqual('');
                    expect(scope.collectionTitle).toEqual('');
                });

                it('Expects collectionTitle is cleared after the second time changeGenre is called', function() {
                    myCtrl = createController();
                    scope.$digest();
                    scope.changeGenre();
                    expect(scope.collectionTitle).toEqual(3);
                    scope.changeGenre();
                    expect(scope.collectionTitle).toEqual('');
                });

                it('The subtypeSelect2Options.query should use the LookupCascadeSelect2 service', function() {
                    var query, queryParam;
                    myCtrl = createController();
                    scope.$digest();

                    query = scope.subtypeSelect2Options.query;
                    queryParam = {callback : jasmine.createSpy('queryCallback')};
                    query(queryParam);
                    expect(mockLookupCascadeSelect2.query).toHaveBeenCalledWith(
                        queryParam, 'publicationsubtypes', {publicationtypeid : 1});
                });

                it('The subtypeSelect2Options.initSelection should set the initial selection', function() {
                    var element, callback, initSelection;
                    callback = jasmine.createSpy('initCallback');

                    myCtrl = createController();
                    initSelection = scope.subtypeSelect2Options.initSelection;

                    initSelection(element, callback);
                    expect(mockLookupCascadeSelect2.initSelection).toHaveBeenCalledWith(
                        'publicationsubtypes', {publicationtypeid : 1}, 2, callback);
                });

                it('The seriesTitleSelect2Options.query should use the LookupCascadeSelect2 service', function() {
                    var query, queryParam;
                    myCtrl = createController();
                    scope.$digest();

                    // This mocks what happend when the subtype select changes
                    scope.genre = {id : 2};
                    scope.$digest();

                    query = scope.seriesTitleSelect2Options.query;
                    queryParam = {callback : jasmine.createSpy('queryCallback')};
                    query(queryParam);
                    expect(mockLookupCascadeSelect2.query).toHaveBeenCalledWith(
                        queryParam, 'publicationseries', {publicationsubtypeid : 2});
                });

                it('The seriesTitleSelect2Options.initSelection should set the initial selection', function() {
                    var element, callback, initSelection;
                    callback = jasmine.createSpy('initCallback');

                    myCtrl = createController();
                    initSelection = scope.seriesTitleSelect2Options.initSelection;

                    initSelection(element, callback);
                    expect(mockLookupCascadeSelect2.initSelection).toHaveBeenCalledWith(
                        'publicationseries', {publicationsubtypeid : 2}, 3, callback);
                });
            });
        });
});
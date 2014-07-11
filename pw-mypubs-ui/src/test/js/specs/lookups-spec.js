describe('pw.lookups module', function() {
	var $httpBackend, $scope

	var urlBase  = 'mypubs_services/lookup/'
	var mimetype = '?mimetype=json'


	var MockNotify = {
		calls : 0,
		error : function(){ MockNotify.calls++ }
	}


	beforeEach(function(){
		angular.module('mock.notify',[]).value('Notifier', MockNotify)
		module('pw.lookups', 'mock.notify')
		MockNotify.calls = 0
	})

	beforeEach(inject(function($injector) {
		$httpBackend = $injector.get('$httpBackend');
		$httpBackend.when('GET', urlBase+'asdf'+mimetype).respond({asdf:true});
		$httpBackend.when('GET', urlBase+'publicationtype'+mimetype).respond({publicationtype:true});
		$httpBackend.when('GET', urlBase+'err'+mimetype).respond(500);

		$scope = $injector.get('$rootScope');
	}));


	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});


	it('should have a pubs lookups module pw.lookups', function() {
		// angular should find a defined mod
		var def = true
		try {
		  angular.module('pw.lookups')
		} catch(e) {
		  def = false
		}
		expect( def ).toBeTruthy()
	});


	it('should fetch testing token and than apply to component is called', inject(function(LookupFetcher) {
		var resp, component
		LookupFetcher._apply = function(type, data, comp) {
			resp = data
			component = comp
		}
		$httpBackend.expectGET( urlBase+'asdf'+mimetype );
		LookupFetcher._fetch('asdf', {qwert:true})
		$httpBackend.flush();

		expect(resp).toBeDefined()
		expect(resp.asdf).toBeTruthy()

		expect(component).toBeDefined()
		expect(component.qwert).toBeTruthy()

	}));


	it('should notify of http error', inject(function(LookupFetcher) {
		$httpBackend.expectGET( urlBase+'err'+mimetype );
		LookupFetcher._fetch('err', {})
		$httpBackend.flush();

		expect(MockNotify.calls).toBe(1)
	}));


	it('should notify of json error', inject(function(LookupFetcher) {
		LookupFetcher._apply('err', {})

		expect(MockNotify.calls).toBe(1)
	}));


	it('should parse JSON and set on component', inject(function(LookupFetcher) {
		expect(LookupFetcher._cache).toBeDefined()
		expect(LookupFetcher._cache.asdf).toBeUndefined()

		var values
		LookupFetcher._apply('asdf', '{"a":"1","b":"2"}', {
		  setValues : function(v) {
			values=v
		  }
		})
		var expected = {a:'1',b:'2'}
		expect(MockNotify.calls).toBe(0)
		expect(values).toEqual(expected)
		expect(LookupFetcher._cache.asdf).toEqual(expected)
	}));

})

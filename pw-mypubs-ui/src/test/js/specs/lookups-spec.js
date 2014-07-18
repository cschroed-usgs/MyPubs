describe('pw.lookups module', function() {
	var $httpBackend, $scope

	var URL_BASE  = 'https://cida-eros-pubsdev.er.usgs.gov:8443/pubs-services/lookup/';
	var MIMETYPE = 'mimetype=json';


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
		$httpBackend.when('GET', URL_BASE + 'asdf?' + MIMETYPE).respond({asdf:true});
		$httpBackend.when('GET', URL_BASE + 'asdf?' + MIMETYPE + '&subtype=blots').respond({asdf:true});
		$httpBackend.when('GET', URL_BASE + 'err?' + MIMETYPE).respond(500);

		$scope = $injector.get('$rootScope');
	}));


	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
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
/*
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
*/
});


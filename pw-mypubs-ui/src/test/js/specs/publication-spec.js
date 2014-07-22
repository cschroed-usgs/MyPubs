describe("pw.publication module", function(){

	var scope


	it('should have a pubs publication module pw.publication', function() {
		// angular should find a defined mod
		module('pw.publication')
		var def = true
		try {
			angular.module('pw.publication')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it('should have defined the tabas', function() {

		var routeParams = {pubsid:"asdf"}
		var pubsFetcher = {
			fetchByPubId : jasmine.createSpy('fetchByPubId'),
			getPub     : jasmine.createSpy('getPub')
		}

		module('pw.publication')

		inject (['$rootScope', '$controller', function($rootScope, $controller) {

			scope = $rootScope.$new()

			$controller('publicationCtrl', {
				'$scope': scope,
				'$routeParams': routeParams,
				'PublicationFetcher': pubsFetcher
			})

			expect(scope.tabs).toBeDefined()
			expect( angular.isObject(scope.tabs) ).toBeTruthy()
		}])

	});


})


describe("pw.search module", function(){

	beforeEach(function(){

		module('pw.auth','pw.search')

		inject(function($rootScope) {
			var next = {
				$$route : {originalPath:"/Logout"}
			}
			$rootScope.$broadcast('$routeChangeStart', next, {})
		})
	})


	it('should have a pubs Search module pw.search', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.search')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it("should have Search as a known route", inject(function($route){
		var exists = false

		angular.forEach($route.routes, function(route, path) {
			exists |= path==='/Search'
		});

		expect(exists).toBeTruthy()

	}))

	it("should not have Search open access path in known openRoutes", inject(function(Authentication){
		var exists = _.contains(Authentication.openRoutes, '/Search')
		expect(exists).toBeFalsy()
	}))

})

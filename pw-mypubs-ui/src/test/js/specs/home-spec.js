
describe("pw.home module", function(){

	beforeEach(function(){

		module('pw.auth','pw.home')

		inject(function($rootScope) {
			var next = {
				$$route : {originalPath:"/Logout"}
			}
			$rootScope.$broadcast('$routeChangeStart', next, {})
		})
	})


	it('should have a pubs Home module pw.home', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.home')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it("should have Home open access path in known openRoutes", inject(function(Authentication){
		var exists = _.contains(Authentication.openRoutes, '/Home')
		expect(exists).toBeTruthy()
	}))

})

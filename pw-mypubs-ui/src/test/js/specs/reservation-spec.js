
describe("pw.reservation module", function(){

	beforeEach(function(){

		module('pw.auth','pw.reservation')

		inject(function($rootScope) {
			var next = {
				$$route : {originalPath:"/Logout"}
			}
			$rootScope.$broadcast('$routeChangeStart', next, {})
		})
	})


	it('should have a pubs Reservation module pw.reservation', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.reservation')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it("should have Reservation as a known route", inject(function($route){
		var exists = false

		angular.forEach($route.routes, function(route, path) {
			exists |= path==='/Reservation'
		});

		expect(exists).toBeTruthy()

	}))

	it("should not have Reservation open access path in known openRoutes", inject(function(Authentication){
		var exists = _.contains(Authentication.openRoutes, '/Reservation')
		expect(exists).toBeFalsy()
	}))

})

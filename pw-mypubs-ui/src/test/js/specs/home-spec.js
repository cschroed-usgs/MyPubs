
describe("pw.home module", function(){

	beforeEach(function(){

		module('pw.auth','pw.home')
		
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
})

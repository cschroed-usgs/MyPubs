describe("pw.pubHeader module", function(){


	beforeEach( module('pw.pubHeader') )


	it('should have a pubs pubHeader module pw.pubHeader', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.pubHeader')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});

})
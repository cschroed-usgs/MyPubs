describe("pw.catalog module", function(){

	beforeEach( module('pw.catalog') );

	it('should have a pubs catalog module pw.catalog', function() {
		// angular should find a defined mod
		var def = true;
		try {
			angular.module('pw.catalog');
		} catch(e) {
			def = false;
		}
		expect( def ).toBeTruthy();
	});

});

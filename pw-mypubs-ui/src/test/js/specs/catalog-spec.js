describe("pw.catalog module", function(){


	beforeEach( module('pw.catalog') )


	it('should have a pubs catalog module pw.catalog', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.catalog')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it('should have added fields as row and called PublicationFetcher and fieldMapper',
		inject (['$rootScope', '$controller', function($rootScope, $controller) {

			var scope = $rootScope.$new()

			var fieldService = {
				fieldMapper : jasmine.createSpy('fieldMapper'),
			}
			var pubsFetcher = {
				get : jasmine.createSpy('get'),
			}
			var fields = [{id:123}]

			$controller('catalogCtrl', {
				'$scope': scope,
				'DataRowFieldService': fieldService,
				'PublicationFetcher': pubsFetcher,
				'catalogFields' : fields
			})

			expect(fieldService.fieldMapper).toHaveBeenCalled()
			expect(pubsFetcher.get).toHaveBeenCalled()
			expect(scope.rows).toBe(fields)
		}])
	)


})

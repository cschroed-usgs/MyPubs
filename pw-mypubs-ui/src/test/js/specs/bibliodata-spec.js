describe("pw.bibliodata module", function(){


	beforeEach( module('pw.bibliodata') )


	it('should have a pubs bibliodata module pw.bibliodata', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.bibliodata')
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

			$controller('biblioCtrl', {
				'$scope': scope,
				'DataRowFieldService': fieldService,
				'PublicationFetcher': pubsFetcher,
				'biblioFields' : fields
			})

			expect(fieldService.fieldMapper).toHaveBeenCalled()
			expect(pubsFetcher.get).toHaveBeenCalled()
			expect(scope.rows).toBe(fields)
		}])
	)


})

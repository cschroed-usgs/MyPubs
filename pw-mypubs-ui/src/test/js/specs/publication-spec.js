describe("pw.publication module", function(){
	var scope;


	it('should have a pubs publication module pw.publication', function() {
		// angular should find a defined mod
		module('pw.publication');
		var def = true;
		try {
			angular.module('pw.publication');
		} catch(e) {
			def = false;
		}
		expect( def ).toBeTruthy();
	});


	it('should have defined the tabs', function() {
        //mock pubData
        angular.module('pw.publication').constant('pubData' , {})
        module('pw.publication')
		inject (['$rootScope', '$controller', function($rootScope, $controller) {

			scope = $rootScope.$new();

			$controller('publicationCtrl', {
				'$scope': scope,
            });

			expect(scope.tabs).toBeDefined();
			expect( angular.isObject(scope.tabs) ).toBeTruthy();
		}]);

	});
	describe("Publication", function(){
		var pubInstance;
		
		var $injector = angular.injector(['pw.publication']);
		var Publication = $injector.get('Publication');
			
		beforeEach(function(){
			pubInstance = new Publication();
		});
		it('should classify a publication with a blank id as "new"', function(){
			expect(pubInstance.isNew()).toBe(true);
		});
		it('should classify a publication with non-zero length id as "not new"', function(){
			pubInstance.id = 'asdf';
			expect(pubInstance.isNew()).toBe(false);
		});
		it('should classify a publication with a number id as "not new"', function(){
			pubInstance.id = 42;
			expect(pubInstance.isNew()).toBe(false);
		});
	});
});

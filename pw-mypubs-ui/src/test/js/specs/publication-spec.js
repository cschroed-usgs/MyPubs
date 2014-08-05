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
        module('pw.publication')
        //now mock an app configuration for PublicationFetcher
		angular.module('pw.publication').constant('APP_CONFIG', {
            endpoint : 'fake'
    });;

		inject (['$rootScope', '$controller', 'Publication', function($rootScope, $controller, Publication) {

			scope = $rootScope.$new();

			$controller('publicationCtrl', {
				'$scope': scope,
				pubData : {
                    data: {
                        id: 1
                    }
                }
			});

			expect(scope.tabs).toBeDefined();
			expect( angular.isObject(scope.tabs) ).toBeTruthy();
			expect(scope.pubData).toEqual({id : 1});
		}]);

	});



});

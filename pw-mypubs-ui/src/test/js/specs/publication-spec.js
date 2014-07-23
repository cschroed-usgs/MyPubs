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

		var routeParams = {pubsid:"asdf"};
		var route = {current : {locals : {pubData : {data : {id : 1}}}}};

		module('pw.publication');

		inject (['$rootScope', '$controller', function($rootScope, $controller) {

			scope = $rootScope.$new();

			$controller('publicationCtrl', {
				'$scope': scope,
				'$routeParams': routeParams,
				'$route': route
			});

			expect(scope.tabs).toBeDefined();
			expect( angular.isObject(scope.tabs) ).toBeTruthy();
			expect(scope.pubData).toEqual({id : 1});
		}]);

	});


});

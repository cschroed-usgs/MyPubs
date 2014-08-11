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

	describe('publicationCtrl', function(){
		var scope; var controller;
		beforeEach(function(){
			//mock pubData
			angular.module('pw.publication').constant('pubData' , {})
			module('pw.publication')
			inject (['$rootScope', '$controller', function($rootScope, $controller) {

				scope = $rootScope.$new();

				controller = $controller('publicationCtrl', {
					'$scope': scope
				});
				
				}]);

		});
		it('should have defined the tabs', function() {
				expect(scope.tabs).toBeDefined();
				expect( angular.isObject(scope.tabs) ).toBeTruthy();
		});
		it('should receive the persisted pubs object when it successfully persists the pub', function(done){
			var existingPub, newPub;
			inject(['Publication', function(Publication){
					newPub = new Publication();
					existingPub = new Publication();
					existingPub.id = 42;
			}]);
			scope.pubData = newPub;
			scope.$digest();
			var persistPromise = scope.persistPub();
			setTimeout(function(){
				persistPromise.then(function(data){
				expect(data).toEqual(newPub);
				done();
			}, function(){
				//this must fail if the function is called
				expect(true).toBe(false);
				done();
			});
			}, 0);
			
			
			
		});
		

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

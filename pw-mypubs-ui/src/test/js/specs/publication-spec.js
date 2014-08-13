/* global angular*/
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
		var scope, controller, $httpBackend, existingPub, newPub, newPubHandler, existingPubHandler;
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
			inject(['Publication', '$httpBackend', 'PublicationPersister', function(Publication, _$httpBackend_, PublicationPersister){
					newPub = new Publication();
					existingPub = new Publication();
					existingPub.id = 42;
					$httpBackend = _$httpBackend_;
					newPubHandler = $httpBackend.when('POST', PublicationPersister.PERSISTENCE_ENDPOINT);
					newPubHandler.respond(newPub);
					existingPubHandler = $httpBackend.when('PUT', PublicationPersister.PERSISTENCE_ENDPOINT + existingPub.id);
					existingPubHandler.respond(existingPub);
			}]);

		});
		afterEach(function() {
			if($httpBackend){
				$httpBackend.verifyNoOutstandingExpectation();
				$httpBackend.verifyNoOutstandingRequest();
			}
		});
		it('should have defined the tabs', function() {
				expect(scope.tabs).toBeDefined();
				expect( angular.isObject(scope.tabs) ).toBeTruthy();
		});
		it('should receive the persisted pubs object when it successfully persists a new pub', function(done){
			scope.pubData = newPub;
			scope.$digest();
			var newPubPersistPromise = scope.persistPub();
			newPubPersistPromise.then(function(data){
				expect(data).toEqual(newPub);
			}, function(){
				//this must fail if the function is called
				expect(true).toBe(false);
			});
			$httpBackend.flush();
		});
		it('should receive the persisted pubs object when it successfully persists an existing pub', function(){
			scope.pubData = existingPub;
			scope.$digest();
			
			var existingPubPersistPromise = scope.persistPub();
			existingPubPersistPromise.then(function(data){
				expect(data).toEqual(existingPub);
			}, function(){
				//this must fail if the function is called
				expect(true).toBe(false);
			});
			$httpBackend.flush();
		});
		
		it('should receive an error message when it unsuccessfully persists a new pub', function(){
			newPubHandler.respond(404, '');
			
			scope.pubData = newPub;
			scope.$digest();
			var persistPromise = scope.persistPub();
			persistPromise.then(function(data){
				//this must fail if the function is called
				expect(true).toBe(false);
			}, function(message){
				expect(message.length).not.toBe(0);
			});
			$httpBackend.flush();
		});
		it('should receive an error message when it unsuccessfully persists an existing pub', function(){
			existingPubHandler.respond(404, '');
			
			scope.pubData = existingPub;
			scope.$digest();
			var persistPromise = scope.persistPub();
			persistPromise.then(function(data){
				//this must fail if the function is called
				expect(true).toBe(false);
			}, function(message){
				expect(message.length).not.toBe(0);
			});
			$httpBackend.flush();
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

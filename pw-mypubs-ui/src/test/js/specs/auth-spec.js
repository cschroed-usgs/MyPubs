
describe("pw.auth module", function() {


	var scope, location


	beforeEach(function () {
		module('pw.auth')
		inject(function($rootScope, $location) {
			scope    = $rootScope
			location = $location
		})
	})


	it('should have a pubs Authentication module pw.auth', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.auth')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it("should have new token on setToken",inject(function(Authentication){
		Authentication.setToken('asdf')
		expect(Authentication.token).toBe('asdf')
	}))


	it("should have isLoggedIn true on setToken (and false on logout)",inject(function(Authentication){
		Authentication.logout()
		expect(Authentication.isLoggedIn()).toBeFalsy()

		Authentication.setToken('asdf')
		expect(Authentication.isLoggedIn()).toBeTruthy()
	}))


	it("should have allowed route to protected path when logged in", inject(function(Authentication){

		var next = {
			$$route : {originalPath:"/ProtectedPath"}
		}
		var current = {}

		Authentication.setToken('logged in')
		var pathSpy = spyOn(location, 'path');

		scope.$broadcast('$routeChangeStart', next, current)

		expect(pathSpy).not.toHaveBeenCalled()

	}))


	it("should have called logout on route to /Logout", inject(function(Authentication){

		var logoutSpy = spyOn(Authentication,'logout')

		var next = {
			$$route : {originalPath:"/Logout"}
		}
		scope.$broadcast('$routeChangeStart', next, {})

		expect(logoutSpy).toHaveBeenCalled()
	}))


	it("should have allowed route to open path and not sent to the default path", inject(function(Authentication){

		var next = {
			$$route : {originalPath:"/OpenPath"}
		}
		var current = {}

		Authentication.logout()
		Authentication.openRoutes = ['/OpenPath']
		var pathSpy = spyOn(location, 'path');

		scope.$broadcast('$routeChangeStart', next, current)

		expect(pathSpy).not.toHaveBeenCalled()

	}))


})


describe("pw.auth module directive - mock route tests", function(){


	var scope, location


	beforeEach(function(){

		angular.module('mock.routePath', ['ngRoute'])
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.when('/anOpenPath', {
					templateUrl: 'mypubs/main/anOpenPath.html',
					controller: 'anOpenPathCtrl',
					openAccess: true
				})
				$routeProvider.when('/aClosedPath', {
					templateUrl: 'mypubs/main/aClosedPath.html',
					controller: 'aClosedPathCtrl',
					openAccess: false // or iundefined
				})
				$routeProvider.otherwise({
					redirectTo: '/anOpenPath'
				})
			}
		])

		module('pw.auth','mock.routePath')

		inject(function($rootScope, $location) {
			scope    = $rootScope
			location = $location
			var next = {
				$$route : {originalPath:"/Logout"}
			}
			$rootScope.$broadcast('$routeChangeStart', next, {})
		})
	})


	it("should have open access paths in known openRoutes", inject(function(Authentication){

		var exists = _.contains(Authentication.openRoutes, '/anOpenPath')
		expect(exists).toBeTruthy()

		exists = _.contains(Authentication.openRoutes, '/Login')
		expect(exists).toBeTruthy()

	}))


	it("should not have closed access path in known openRoutes", inject(function(Authentication){

		var exists = _.contains(Authentication.openRoutes, '/aClosedPath')

		expect(exists).toBeFalsy()

	}))


	it("should have redirected to default/otherwise path on logout", inject(function(Authentication){

		var pathSpy = spyOn(location, 'path');

		Authentication.logout()

		expect(pathSpy).toHaveBeenCalledWith('/anOpenPath')
	}))


	it("should have redirected when not logged in on any protected route", inject(function(Authentication){

		var next = {
			$$route : {originalPath:"/ProtectedPath"}
		}
		var current = {}

		Authentication.logout()
		var pathSpy = spyOn(location, 'path');

		scope.$broadcast('$routeChangeStart', next, current)

		expect(pathSpy).toHaveBeenCalledWith('/anOpenPath')

	}))


})
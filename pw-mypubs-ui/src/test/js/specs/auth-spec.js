
describe("pw.auth module", function() {


	var scope, location, routeParams, route


	beforeEach(function () {
		module('pw.auth')
		inject(function($rootScope, $location, $routeParams, $route) {
			scope    = $rootScope
			location = $location
			params   = $routeParams
			route    = $route
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


	it("should have redirected when not logged in on any protected route", inject(function(Authentication){

		var next = {
			$$route : {originalPath:"/ProtectedPath"}
		}
		var current = {}

		Authentication.logout()
		spyOn(location, 'path');

		scope.$broadcast('$routeChangeStart', next, current)

		expect(location.path).toHaveBeenCalledWith('otherwise')

	}))


	it("should have allowed route to protected path when logged in", inject(function(Authentication){

		var next = {
			$$route : {originalPath:"/ProtectedPath"}
		}
		var current = {}

		Authentication.setToken('logged in')
		spyOn(location, 'path');

		scope.$broadcast('$routeChangeStart', next, current)

		expect(location.path).not.toHaveBeenCalled()

	}))


	it("should have called logout on route to /Logout and sent to default path", inject(function(Authentication){

		var next = {
			$$route : {originalPath:"/Logout"}
		}
		var current = {}

		spyOn(Authentication,'logout')
		spyOn(location, 'path');

		scope.$broadcast('$routeChangeStart', next, current)

		expect(Authentication.logout).toHaveBeenCalled()
		expect(location.path).toHaveBeenCalledWith('otherwise')

	}))


	it("should have allowed route to open path and not sent to the default path", inject(function(Authentication){

		var next = {
			$$route : {originalPath:"/OpenPath"}
		}
		var current = {}

		Authentication.logout()
		Authentication.openRoutes = ['/OpenPath']
		spyOn(location, 'path');

		scope.$broadcast('$routeChangeStart', next, current)

		expect(location.path).not.toHaveBeenCalled()

	}))


})


describe("pw.auth module directive - mock route tests", function(){

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

		inject(function($rootScope) {
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
})
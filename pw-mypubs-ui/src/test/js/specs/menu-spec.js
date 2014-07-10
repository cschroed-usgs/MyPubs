
describe("pw.menu module directive", function(){


	var $scope, el


	function compileTemplate(template, callback) {
		// default template
		if (!template) {
			template = '<div><pw:menu></pw:menu></div>'
		}
		// inject the template into angular to compile and preserve the element
		inject(function($compile) {
			el = $compile(template)($scope)
			if (callback) {
				callback(el)
			}
		});
		// angular does this when in apps but not in tests
		$scope.$digest()
	}


	function changeRoute(route) {
		var next = {
			$$route : {originalPath: angular.isDefined(route) ?route :"/Logout"}
		}
		$scope.$broadcast('$routeChangeStart', next, {})
	}


	beforeEach(function() {

		// var MockAuth = {
		// 	setToken   = function(token) {}
		// 	logout     = function() {}
		// 	isLoggedIn = function() {}
		// }

		// angular.module("mock.auth",[]).value("Authentication", MockAuth)

		// module('pw.menu', 'mock.auth')
		module('pw.menu')	

		inject(function() {
			var req = new XMLHttpRequest()
			req.onload = function() {
				templateSrc = this.responseText
			}
			// Note that the relative path may be different from your unit test HTML file.
			// Using `false` as the third parameter to open() makes the operation synchronous.
			// Gentle reminder that boolean parameters are not the best API choice.
			req.open("get", "src/main/webapp/mypubs/menu/menu.html", false)
			req.send()
		})

		inject(function($rootScope, $compile, $templateCache) {
			$scope = $rootScope
			$templateCache.put("mypubs/menu/menu.html", templateSrc)
			changeRoute()
			compileTemplate()
		})

	})


	it('should have a pubs Menu module pw.menu', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.menu')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it('should have a setRoute menu controller scope that sets location.url', inject(function($location) {
		var scope = el.find('#menu').scope()

		expect(scope).toBeDefined()
		expect(scope.setRoute).toBeDefined()
		expect(typeof scope.setRoute === 'function').toBeTruthy()
		
		scope.setRoute('foo')
		expect($location.url()).toBe('/foo')
	}));


	it("should expect all menus active when logged in", inject(function(Authentication){

		var authSpy = spyOn(Authentication, 'isLoggedIn').andReturn(true);

		compileTemplate()

		expect(authSpy).toHaveBeenCalled()
		expect( el.find('button').length ).toBe(6)
		expect( el.find('.disabled').length ).toBe(0)
	
	}))


	it("should expect openRoutes menus active when not logged in", inject(function(Authentication){

		var authSpy = spyOn(Authentication, 'isLoggedIn').andReturn(false);
		
		compileTemplate()

		expect(authSpy).toHaveBeenCalled()
		expect( el.find('.disabled').length ).toBe(3)
	}))


	it("should expect logout menu visible when logged in", inject(function(Authentication){

		var authSpy = spyOn(Authentication, 'isLoggedIn').andReturn(true);

		compileTemplate()

		var logout = el.find('button:contains("Logout")')
		var loggin = el.find('button:contains("Login")')

		expect(authSpy).toHaveBeenCalled()
		expect( loggin.hasClass('ng-hide') ).toBeTruthy()
		expect( logout.hasClass('ng-hide') ).toBeFalsy()
	
	}))

	it("should expect login menu visible when logged out", inject(function(Authentication){

		var authSpy = spyOn(Authentication, 'isLoggedIn').andReturn(false);

		compileTemplate()

		var logout = el.find('button:contains("Logout")')
		var loggin = el.find('button:contains("Login")')

		expect(authSpy).toHaveBeenCalled()
		expect( logout.hasClass('ng-hide') ).toBeTruthy()
		expect( loggin.hasClass('ng-hide') ).toBeFalsy()
	
	}))

})

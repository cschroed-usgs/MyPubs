describe("pw.notify module", function() {


	var $scope, el


	function compileTemplate(template) {
		// default template
		if (!template) {
			template = '<pw:notify></pw:notify>'
		}
		// inject the template into angular to compile and preserve the element
		inject(function($compile) {
			el = $compile(template)($scope)
		});
		// angular does this when in apps but not in tests
		$scope.$digest()
	}

	// build the module and preserve the scope
	beforeEach(function () {
		module("pw.notify")
		inject(function() {
			var req = new XMLHttpRequest()
			req.onload = function() {
				templateSrc = this.responseText
			}
			// Note that the relative path may be different from your unit test HTML file.
			// Using `false` as the third parameter to open() makes the operation synchronous.
			// Gentle reminder that boolean parameters are not the best API choice.
			req.open("get", "src/main/webapp/mypubs/notify/notify.html", false)
			req.send()
		})
		inject(function($rootScope, $compile, $templateCache) {
			$scope = $rootScope
			$templateCache.put("mypubs/notify/notify.html", templateSrc)
		})
	})


	it('should have a pubs notify module pw.notify', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.notify')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	describe("render tests", function(){

		beforeEach(compileTemplate)

		it('should have loaded the template under test', inject(function($templateCache) {
			var tpl = $templateCache.get("mypubs/notify/notify.html")
			expect(tpl).toBeDefined()
			expect(tpl).toContain('alert')
		}))
		

		it('should have added an error message', inject(function(Notifier) {
			expect(el.html()).not.toContain('asdf')
			Notifier.error('asdf')
			expect(el.html()).toContain('asdf')
			expect(el.html()).toContain('type="danger"')
		}))
		

		it('should have added an info message', inject(function(Notifier) {
			expect(el.html()).not.toContain('asdf')
			Notifier.info('asdf')
			expect(el.html()).toContain('asdf')
			expect(el.html()).toContain('type="success"')
		}))
		

		it('should have added a warning message', inject(function(Notifier) {
			expect(el.html()).not.toContain('asdf')
			Notifier.warn('asdf')
			expect(el.html()).toContain('asdf')
			expect(el.html()).not.toContain('type="success"')
			expect(el.html()).not.toContain('type="danger"')
		}))
	
	})

	describe("service tests", function(){


		it('should have added an error message', inject(function(Notifier) {
			expect(Notifier.getMsgs().length).toBe(0)
			Notifier.error('asdf')
			expect(Notifier.getMsgs().length).toBe(1)
			var msg = Notifier.getMsgs()[0]
			expect(msg.type).toBe('danger')
			expect(msg.text).toBe('asdf')
		}))
		

		it('should have added an info message', inject(function(Notifier) {
			expect(Notifier.getMsgs().length).toBe(0)
			Notifier.info('asdf')
			expect(Notifier.getMsgs().length).toBe(1)
			var msg = Notifier.getMsgs()[0]
			expect(msg.type).toBe('success')
			expect(msg.text).toBe('asdf')
		}))
		

		it('should have added a warning message', inject(function(Notifier) {
			expect(Notifier.getMsgs().length).toBe(0)
			Notifier.warn('asdf')
			expect(Notifier.getMsgs().length).toBe(1)
			var msg = Notifier.getMsgs()[0]
			expect(msg.type).toBeUndefined()
			expect(msg.text).toBe('asdf')
		}))


		it('should have notify broadcast on messge', inject(function(Notifier) {
			var notifyCalled = false
			$scope.$on('notifier', function(){
				notifyCalled = true
			})
			Notifier.warn('asdf')
			expect(notifyCalled).toBeTruthy()
		}))


		it('should have removed a message', inject(function(Notifier) {
			expect(Notifier.getMsgs().length).toBe(0)
			Notifier.warn('asdf')
			expect(Notifier.getMsgs().length).toBe(1)
			Notifier.remove(0)
			expect(Notifier.getMsgs().length).toBe(0)
		}))

	})


	describe("controller tests", function() {


		it('should have scope defined with close and msgs', function() {
			compileTemplate()
			var scope = $(el).scope()

			expect(scope).toBeDefined()
			expect(scope.close).toBeDefined()
			expect(typeof scope.close === 'function').toBeTruthy()

			expect(scope.msgs).toBeDefined()
			expect(typeof scope.msgs === 'object').toBeTruthy()
		});


		it('should have scope.close remove the message', inject(function(Notifier) {
			Notifier.getMsgs().push({})
			expect(Notifier.getMsgs().length).toBe(1)

			compileTemplate()
			var scope = $(el).scope()
			scope.close(0)

			expect(Notifier.getMsgs().length).toBe(0)
		}));

	})

})
describe("pw.tabs module", function() {


	var $scope, templateSrc


    function compileTemplate(template) {
    	// default template
        if (!template) {
        	template = '<pw:tabs names="tab1,tab2,tab3" active="tab2"></pw:tabs>';
		}
        // inject the template into angular to compile and preserve the element
        var el
        inject(function($compile) {
            el = $compile(template)($scope)
        });
        // angular does this when in apps but not in tests
        $scope.$digest()
        return el
    }
	

	// build the module and preserve the scope
	beforeEach(function () {
		module("pw.tabs")
		inject(function($rootScope, $compile, $templateCache) {
			$scope = $rootScope
	    	$templateCache.put("mypubs/tabs/tabs.html", templateSrc)
		})
	})


	it('should load template source', function() {
		inject(function() {
		    var req = new XMLHttpRequest()
		    req.onload = function() {
		        templateSrc = this.responseText
		    }
		    // Note that the relative path may be different from your unit test HTML file.
		    // Using `false` as the third parameter to open() makes the operation synchronous.
		    // Gentle reminder that boolean parameters are not the best API choice.
		    req.open("get", "src/main/webapp/mypubs/tabs/tabs.html", false)
		    req.send()
		})
		expect(templateSrc).toBeDefined()
		expect(templateSrc.length > 10).toBeTruthy()
	})


	it('should have a pubsTab module', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.tabs')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it('should have three tabs and one active', function() {
		var el = compileTemplate()

		expect(el.find('a').length).toEqual(3)
		expect(el.find('.active').length).toEqual(1)
	});


	it('should have tab2 active', function() {
		var el = compileTemplate()
		el = el.find('.active').find('a')
		var tabName = el.text()

		expect(tabName).toEqual('tab2')
	});


	it('should call setTab on click', function() {
		
		var el  = compileTemplate()

		$scope.setTab = function() {
		 	setTabCalled = true
		}

		var setTabCalled   = false
		var tab = $(el).find('.disabled')[0]
		var ln  = $(tab).find('a')
		$(ln).trigger('click')

		expect(setTabCalled).toBeTruthy()
	});


	it('should call setRoute on click', function() {
		var setRouteCalled = false

		$scope.setRoute = function() {
		 	setRouteCalled = true
		}
		
		var el  = compileTemplate()
		var tab = $(el).find('.disabled')[0]
		var ln  = $(tab).find('a')
		$(ln).trigger('click')

		expect(setRouteCalled).toBeTruthy()
	});


	it('isActive should return true for the currently active tabName', function() {
		
		var el  = compileTemplate()

		expect($scope.isActive('tab2')).toBeTruthy()
		expect($scope.isActive('not-tab2')).toBeFalsy()
	});


	it('setTab should result in a change of the isActive result', function() {
		$scope.setRoute = function() {}
		
		var el  = compileTemplate()

		expect($scope.isActive('tab2')).toBeTruthy()

		$scope.setTab('tab1')
		
		expect($scope.isActive('tab1')).toBeTruthy()
		expect($scope.isActive('tab2')).toBeFalsy()
	});


	it('should have tab1 active on click', function() {
		$scope.setRoute = function() {}

		var el  = compileTemplate()

		var tab = $(el).find('.disabled')[0]
		var ln  = $(tab).find('a')
		$(ln).trigger('click')

		el = el.find('.active').find('a')
		var tabName = el.text()

		expect(tabName).toEqual('tab1')
		expect($scope.isActive('tab1')).toBeTruthy()
	});


});
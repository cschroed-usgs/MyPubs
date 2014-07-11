
describe("pw.list module directive", function() {


	var $scope, el


	function compileTemplate(template) {
		// default template
		if (!template) {
			template = '<div><div pw-list entries="testEntries" type-label="\'TestEntries\'" entry-height="123"'
					 + 'entry-width="321" service="TestService"><span class="inner" ng-bind="entry.name"></span></div></div>'
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
		idrag = idrop = false
		module("pw.list")
		inject(function() {
			var req = new XMLHttpRequest()
			req.onload = function() {
				templateSrc = this.responseText
			}
			// Note that the relative path may be different from your unit test HTML file.
			// Using `false` as the third parameter to open() makes the operation synchronous.
			// Gentle reminder that boolean parameters are not the best API choice.
			req.open("get", "src/main/webapp/mypubs/list/list.html", false)
			req.send()
		})
		inject(function($rootScope, $compile, $templateCache) {
			$scope = $rootScope
			$scope.testEntries = [
				{
					order:0,id:'a',name:'asdf',
				},
				{
					order:1,id:'b',name:'fdsa',
				},
				{
					order:2,id:'c',name:'qwerty'
				}
			]
			$templateCache.put("mypubs/list/list.html", templateSrc)
		})
	})



	it('should have a pubs List module pw.list', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.list')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	describe("pw.list module attrs", function() {

		it('should have the named entries from entries attr', function() {
			$scope.TestService = {}
			compileTemplate()

			var listGroups = el.find(".list-group")

			expect(listGroups.length).toBe(3)
			expect($(listGroups[0]).html()).toContain('asdf')
			expect($(listGroups[1]).html()).toContain('fdsa')
			expect($(listGroups[2]).html()).toContain('qwerty')

		});


		it('should have the height 123 from entry-height attr', function() {
			$scope.TestService = {}
			compileTemplate()

			var listGroups = el.find(".list-group")

			expect($(listGroups[0]).height()).toBe(123)
			expect($(listGroups[1]).height()).toBe(123)
			expect($(listGroups[2]).height()).toBe(123)

		});


		it('should have the width 321 from entry-width attr', function() {
			$scope.TestService = {}
			compileTemplate()

			var listGroups = el.find(".list-group")

			expect($(listGroups[0]).width()).toBe(321)
			expect($(listGroups[1]).width()).toBe(321)
			expect($(listGroups[2]).width()).toBe(321)
		});


		it('should have the new button with text TestEntries from type-label attr', function() {
			$scope.TestService = {}
			compileTemplate()

			var btn = el.find("button")

			expect(btn.text()).toContain("TestEntries")
		});


		it('should have the entryTop scope method return various order top css', function() {
			compileTemplate()

			var entry = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead
			var entryTop0 = scope.entryTop(0)
			var entryTop3 = scope.entryTop(3)

			expect(entryTop0).toBe('0px')
			expect(entryTop3).toBe( (123*3)+'px' )
		});


		it('should have the reorder controlsTop scope method return top css at the midpoint', function() {
			compileTemplate()

			var entry = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead
			var top   = scope.controlsTop()

			// the mid point is 123/2 and the 14 is 1/2 the reorder controls height
			expect(top).toBe( (-123/2-14)+'px' )
		});


		it('should have the listHeight scope method return list height css', function() {
			compileTemplate()

			var entry  = el.find(".list-group")[0]
			var scope  = $(el).scope().$$childHead
			var height = scope.listHeight()

			expect(height).toBe( (123*3)+'px')
		});


		it('should have the controlsAlignment right by default', function() {
			compileTemplate()

			var entry  = el.find(".list-group")[0]
			var scope  = $(el).scope().$$childHead
			var right = scope.controlsAlignment()

			expect(right).toBe('list-reorder-handle-right')
		});


		it('should have the controlsAlignment left by attr setting', function() {
			template = '<div><div pw-list       controls-align="left"      entries="testEntries" type-label="\'TestEntries\'" entry-height="123"'
					 + 'entry-width="321" service="TestService"><span class="inner" ng-bind="entry.name"></span></div></div>'
			compileTemplate(template)

			var entry = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead
			var left  = scope.controlsAlignment()

			expect(left).toBe('list-reorder-handle-left')
		});

	});


	describe("pw.list module controller add and remove tests", function() {

		it('should have the new button click call service.newEntry() if no current new entry', function() {
			var newEntry = jasmine.createSpy('newEntry').andReturn({})
			$scope.TestService = {newEntry:newEntry}

			var isDirty  = jasmine.createSpy('isDirty').andReturn(false)
			$scope.isDirty = isDirty

			compileTemplate()

			var btn = el.find("button")
			btn.simulate('click',{})

			//expect($scope.isNewEntry).toBe(false) // not just falsy
			expect(isDirty).toHaveBeenCalled()
			expect(newEntry).toHaveBeenCalled()
		});


		it('should NOT have the new button click call service.newEntry() if there is a new entry', function() {
			var newEntry = jasmine.createSpy('newEntry').andReturn({})
			$scope.TestService = {newEntry:newEntry}

			var isDirty  = jasmine.createSpy('isDirty').andReturn(false)
			$scope.isDirty = isDirty

			compileTemplate()

			var btn = el.find("button")
			btn.simulate('click',{})

			expect(isDirty).toHaveBeenCalled()
			expect(newEntry).toHaveBeenCalled()

			newEntry = jasmine.createSpy('newEntry').andReturn({})
			$scope.TestService.newEntry = newEntry
			btn.simulate('click',{})

			expect(newEntry).not.toHaveBeenCalled()
		});


		it('should have the remove click call service.remove(id) - not the newEntry', function() {
			var remove = jasmine.createSpy('remove').andReturn([])
			$scope.TestService = {remove:remove}

			compileTemplate()

			var btn = el.find(".list-remove")[0]
			$(btn).scope().aNewEntry.id = 'z'
			var isNewEntry = $(btn).scope().isNewEntry
			isNewEntry.val = true

			$(btn).simulate('click',{})

			expect( isNewEntry.val ).toBeTruthy() // unchanged
			expect(remove).toHaveBeenCalled()

			btn = el.find(".list-remove")[0]
			expect(btn).toBeUndefined()
		});


		it('should have the remove click call service.remove(id) - the newEntry', function() {
			var remove = jasmine.createSpy('remove').andReturn([])
			$scope.TestService = {remove:remove}

			compileTemplate()

			var btn = el.find(".list-remove")[0]
			$(btn).scope().aNewEntry.id = 'a'
			var isNewEntry = $(btn).scope().isNewEntry
			isNewEntry.val = true

			$(btn).simulate('click',{})

			expect( isNewEntry.val ).toBeFalsy() // changed
			expect(remove).toHaveBeenCalled()
		});


	});


	describe("pw.list module controller reorder tests", function() {


		it('should have the called service.reorder(id, dir) with dir -1 for reorder-before', function() {
			var reorder = jasmine.createSpy('reorder')
			$scope.TestService = {reorder:reorder}

			compileTemplate()

			var btn = el.find(".list-reorder-before")[0]
			$(btn).simulate('click',{})

			expect(reorder).toHaveBeenCalledWith('a',-1)
		});


		it('should have the called service.reorder(id, dir) with dir +1 for reorder-after', function() {
			var reorder = jasmine.createSpy('reorder')
			$scope.TestService = {reorder:reorder}

			compileTemplate()

			var btn = el.find(".list-reorder-after")[0]
			$(btn).simulate('click',{})

			expect(reorder).toHaveBeenCalledWith('a',+1)
		});


		it('should have the selected order index in the scope on startDnd', function() {
			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			expect( $(entry).scope().indexDrag ).toBe(1)
		});


		it('should NOT have called findEntryByOrder if NO start dnd index set on reorderDnd', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder')
			$scope.TestService = {findEntryByOrder:findEntryByOrder}

			compileTemplate()

			var over = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead
			scope.reorderDnd(0)

			expect(findEntryByOrder).not.toHaveBeenCalled()
		});


		it('should NOT have called findEntryByOrder if end undefined on reorderDnd', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder')
			$scope.TestService = {findEntryByOrder:findEntryByOrder}

			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead
			scope.reorderDnd()

			expect(findEntryByOrder).not.toHaveBeenCalled()
		});


		it('should NOT have called findEntryByOrder if end out of bounds on reorderDnd', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder')
			$scope.TestService = {findEntryByOrder:findEntryByOrder}

			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead

			scope.reorderDnd(-1)
			expect(findEntryByOrder).not.toHaveBeenCalled()

			scope.reorderDnd(3)
			expect(findEntryByOrder).not.toHaveBeenCalled()
		});


		it('should have called findEntryByOrder if start dnd index set on reorderDnd', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder')
			$scope.TestService = {findEntryByOrder:findEntryByOrder}

			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead
			scope.reorderDnd(0)

			expect(findEntryByOrder).toHaveBeenCalled()
		});


		it('should have cleared drag index to prepare for next drag on reorderDnd', function() {
			$scope.TestService = {
				findEntryByOrder : function(order) {},
				reorder : function(order) {},
			}
			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead

			var idxBefore = scope.indexDrag
			scope.reorderDnd(0)
			var idxAfter  = scope.indexDrag

			expect(idxBefore).toBeDefined()
			expect(idxAfter).toBeUndefined()
		});


		it('should have called reorder once with dir -1 on reorderDnd before', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder').andReturn({id:'z'})
			var reorder = jasmine.createSpy('reorder')
			$scope.TestService = {
				findEntryByOrder:findEntryByOrder,
				reorder:reorder
			}

			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead

			$('div').addClass('dnd-over-top')

			scope.reorderDnd(0)

			$('div').removeClass('dnd-over-top')

			expect(reorder).toHaveBeenCalledWith('z',-1)
			expect( reorder.calls.length ).toBe(1)
		});


		it('should NOT have called reorder reorderDnd drop on bottom of previous component - esstial a move to current location', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder').andReturn({id:'z'})
			var reorder = jasmine.createSpy('reorder')
			$scope.TestService = {
				findEntryByOrder:findEntryByOrder,
				reorder:reorder
			}

			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[0]
			var scope = $(el).scope().$$childHead

			$('div').removeClass('dnd-over-top')

			scope.reorderDnd(0)

			expect(reorder).not.toHaveBeenCalled()
		});


		it('should have called reorder once with dir +1 on reorderDnd after', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder').andReturn({id:'z'})
			var reorder = jasmine.createSpy('reorder')
			$scope.TestService = {
				findEntryByOrder:findEntryByOrder,
				reorder:reorder
			}

			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[2]
			var scope = $(el).scope().$$childHead

			$('div').removeClass('dnd-over-top')

			scope.reorderDnd(2)

			expect(reorder).toHaveBeenCalledWith('z',+1)
			expect( reorder.calls.length ).toBe(1)
		});


		it('should NOT have called reorder reorderDnd drop on top of next component - essentially a move to current location', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder').andReturn({id:'z'})
			var reorder = jasmine.createSpy('reorder')
			$scope.TestService = {
				findEntryByOrder:findEntryByOrder,
				reorder:reorder
			}

			compileTemplate()

			var entry = el.find(".list-group")[1]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[2]
			var scope = $(el).scope().$$childHead

			$('div').addClass('dnd-over-top')

			scope.reorderDnd(2)

			$('div').removeClass('dnd-over-top')

			expect(reorder).not.toHaveBeenCalled()
		});


		it('should have called reorder twice with dir +1 on reorderDnd two rows after', function() {
			var findEntryByOrder = jasmine.createSpy('findEntryByOrder').andReturn({id:'z'})
			var reorder = jasmine.createSpy('reorder')
			$scope.TestService = {
				findEntryByOrder:findEntryByOrder,
				reorder:reorder
			}

			compileTemplate()

			var entry = el.find(".list-group")[0]
			$(entry).simulate('dragstart',{})

			var over = el.find(".list-group")[2]
			var scope = $(el).scope().$$childHead

			$('div').removeClass('dnd-over-top')

			scope.reorderDnd(2)

			expect(reorder).toHaveBeenCalledWith('z',+1)
			expect( reorder.calls.length ).toBe(2)
		});
	});


});

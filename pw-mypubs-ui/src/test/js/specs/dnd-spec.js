
describe("pw.dragdrop module directive", function() {


	var $scope, el, idrag, idrop


	function compileTemplate(template) {
		// default template
		if (!template) {
			template = '<div><div id="dragit" pw-draggable="" drag="idrag()" class=""></div>'
					 + '     <div id="dropit" pw-droppable="" drop="idrop()" class=""></div></div>';
		}
		// inject the template into angular to compile and preserve the element
		inject(function($compile) {
			el = $compile(template)($scope)
			var d = el.find('#dragit')
			d.width(10)
			d.height(10)
			d = el.find('#dropit')
			d.width(10)
			d.height(10)

		});
		// angular does this when in apps but not in tests
		$scope.$digest()
	}
	

	// build the module and preserve the scope
	beforeEach(function () {
		idrag = idrop = false
		module("pw.dragdrop")
		inject(function($rootScope, $compile, $templateCache) {
			$scope = $rootScope
			$scope.idrag = function() {idrag=true}
			$scope.idrop = function() {idrop=true}
			compileTemplate()
		})
	})



	it('should have a pubs DnD module pw.dragdrop', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.dragdrop')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	describe("pw-draggable directive", function() {

		describe("dragstart events", function() {

			it('should have a dnd-drag class after dragstart', function() {
				var d = el.find('#dragit')

				var classBefore = d.attr('class')
				d.simulate('dragstart', {})
				var classAfter = d.attr('class')

				expect(classBefore).toBe('')
				expect(classAfter).toBe('dnd-drag')
			});


			it('should have DragStarted.is true after dragstart', function() {
				inject( function(DragStarted) {
					var d = el.find('#dragit')

					DragStarted.is = false
					expect(DragStarted.is).toBeFalsy()

					d.simulate('dragstart', {})

					expect(DragStarted.is).toBeTruthy()
				})
			});


			it('should have called the drag method after dragstart', function() {
				inject( function(DragStarted) {
					var d = el.find('#dragit')

					expect(idrag).toBeFalsy()

					d.simulate('dragstart', {})

					expect(idrag).toBeTruthy()
				})
			});
		});


		describe("dragend events", function() {

			it('should have a dnd-drag class removed after dragend', function() {
				var d = el.find('#dragit')

				d.simulate('dragstart', {})
				var classBefore = d.attr('class')
				d.simulate('dragend', {})
				var classAfter = d.attr('class')

				expect(classAfter).toBe('')
				expect(classBefore).toBe('dnd-drag')
			});


			it('should have DragStarted.is false after dragend', function() {
				inject( function(DragStarted) {
					var d = el.find('#dragit')
					d.simulate('dragstart', {})

					expect(DragStarted.is).toBeTruthy()

					d.simulate('dragend', {})

					expect(DragStarted.is).toBeFalsy()
				})
			});

		});

	});


	describe("pw-droppable directive", function() {


		describe("dragover events", function() {


			it('should NOT have applied class after dragover with DragStarted.is false', function() {
				inject( function(DragStarted) {
					var d = el.find('#dropit')
					var classBefore = d.attr('class')
					expect(classBefore).toBe('')

					DragStarted.is = false
					d.simulate('dragover', {})

					var classAfter = d.attr('class')
					expect(classAfter).toContain('')
				})
			});


			it('should have applied class dnd-over after dragover with DragStarted.is true', function() {
				inject( function(DragStarted) {
					var d = el.find('#dropit')

					var classBefore = d.attr('class')
					expect(classBefore).toBe('')

					DragStarted.is = true
					d.simulate('dragover', {})

					var classAfter = d.attr('class')
					expect(classAfter).toContain('dnd-over')
				})
			});


			it('should have applied class dnd-over-top after dragover bottom of item', function() {
				inject( function(DragStarted) {
					var d = el.find('#dropit')

					var classBefore = d.attr('class')
					expect(classBefore).toBe('')

					DragStarted.is = true
					d.simulate('dragover', {clientY: d.height()/2 -1 })

					var classAfter = d.attr('class')
					expect(classAfter).toContain('dnd-over-top')
				})
			});


			it('should have applied class dnd-over-bottom after dragover bottom of item', function() {
				inject( function(DragStarted) {
					var d = el.find('#dropit')

					var classBefore = d.attr('class')
					expect(classBefore).toBe('')

					DragStarted.is = true
					d.simulate('dragover', {clientY: d.height()/2 +1 })

					var classAfter = d.attr('class')
					expect(classAfter).toContain('dnd-over-bottom')
				})
			});

		});


		describe("dragleave events", function() {

			it('should have removed all dnd classes after dragleave', function() {
				inject( function() {
					var d = el.find('#dropit')

					d.addClass('dnd-over')
					d.addClass('dnd-over-top')
					d.addClass('dnd-over-bottom')
					var classBefore = d.attr('class')
					expect(classBefore).toContain('dnd-over ')
					expect(classBefore).toContain('dnd-over-top')
					expect(classBefore).toContain('dnd-over-bottom')

					d.simulate('dragleave', {})

					var classAfter = d.attr('class')
					expect(classAfter).toBe('')
				})
			});


		});


		describe("drop events", function() {

			it('should have removed all dnd classes after drop if DragStarted.is false', function() {
				inject( function(DragStarted) {
					var d = el.find('#dropit')

					d.addClass('dnd-over')
					d.addClass('dnd-over-top')
					d.addClass('dnd-over-bottom')
					var classBefore = d.attr('class')
					expect(classBefore).toContain('dnd-over ')
					expect(classBefore).toContain('dnd-over-top')
					expect(classBefore).toContain('dnd-over-bottom')

					DragStarted.is = false
					d.simulate('drop', {})

					var classAfter = d.attr('class')
					expect(classAfter).toBe('')
				})
			});


			it('should have removed all dnd classes after drop if DragStarted.is true', function() {
				inject( function(DragStarted) {
					var d = el.find('#dropit')

					d.addClass('dnd-over')
					d.addClass('dnd-over-top')
					d.addClass('dnd-over-bottom')
					var classBefore = d.attr('class')
					expect(classBefore).toContain('dnd-over ')
					expect(classBefore).toContain('dnd-over-top')
					expect(classBefore).toContain('dnd-over-bottom')

					DragStarted.is = true
					d.simulate('drop', {})

					var classAfter = d.attr('class')
					expect(classAfter).toBe('')
				})
			});


			it('should NOT have called drop after drop if DragStarted.is false', function() {
				inject( function(DragStarted) {
					var d = el.find('#dropit')

					DragStarted.is = false
					d.simulate('drop', {})

					expect(idrop).toBeFalsy()
				})
			});


			it('should have called drop after drop if DragStarted.is true', function() {
				inject( function(DragStarted) {
					var d = el.find('#dropit')

					DragStarted.is = true
					d.simulate('drop', {})

					expect(idrop).toBeTruthy()
				})
			});


		});

	});

});

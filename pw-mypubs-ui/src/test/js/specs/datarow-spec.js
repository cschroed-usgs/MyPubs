// TODO why do I have to place this here rather than adding it to the module ?
// TODO why is this necessary to get proper angular.$compile ?
var testCtrl = function($scope) {}


describe("pw.dataRow module dataRow directive", function() {


	var $scope, templateSrc


	var rowMap = function (rows) {
		var data = []
		for (var r=0; r<rows; r++) {
			data.push({
				name   : "name"+r,
				label  : "label"+r,
				value  : "value"+r,
				rowType: "Readonly",
			})
		}
		return data
	}


    function compileTemplate(template) {
    	// default template
        if (!template) {
        	template = '<div ng-controller="testCtrl"><pw:datarow ng-repeat="row in rows" data="row"></pw:datarow></div>';
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
		module("pw.dataRow")
		inject(function($templateCache) {
			var templates    = ['Checkbox','Date','Editor','Gap','Readonly','Select','Text','Textbox','Time']
			var templateUrl  = 'mypubs/datarow/row'
			var templatePath = 'src/main/webapp/' + templateUrl

			_.each(templates, function(template) {
			    var req    = new XMLHttpRequest()
			    req.onload = function() {
			        templateSrc = this.responseText
			    	$templateCache.put(templateUrl + template + ".html", templateSrc)
			    }
			    // Note that the relative path may be different from your unit test HTML file.
			    // Using `false` as the third parameter to open() makes the operation synchronous.
			    // Gentle reminder that boolean parameters are not the best API choice.
			    req.open("get", templatePath + template + ".html", false)
			    req.send()
			})
		})
		inject(function($rootScope) {
			$scope = $rootScope
		})
	})


	it('should have a pubs datarow module pw.datarow', function() {
		// angular should find a defined mod
		var def = true
		try {
			angular.module('pw.dataRow')
		} catch(e) {
			def = false
		}
		expect( def ).toBeTruthy()
	});


	it('should have one label field', function() {
		$scope.rows = rowMap(1)

		var el = compileTemplate()

		expect(el.find('.label').length).toEqual(1)
	});


	it('should have three label field', function() {
		$scope.rows = rowMap(3)

		var el = compileTemplate()

		expect(el.find('.label').length).toEqual(3)
	});


	it('should have text value in Readonly field', function() {
		$scope.rows = rowMap(1)

		var el = compileTemplate()

		expect(el.find('.value').text()).toEqual("value0")
	});


	it('should have input:text DOM in Text field', function() {
		$scope.rows = rowMap(1)
		$scope.rows[0].rowType = 'Text'

		var el = compileTemplate()
		var input = el.find('.value').find('input')
		
		expect(input.length).toBe(1)
		expect(input.val() ).toBe('value0')
	});


	it('should have textarea DOM in Textbox field', function() {
		$scope.rows = rowMap(1)
		$scope.rows[0].rowType = 'Textbox'

		var el = compileTemplate()

		expect(el.find('textarea').val()).toEqual("value0")
	});


	it('should have nothing DOM in Gap field', function() {
		$scope.rows = rowMap(1)
		$scope.rows[0].rowType = 'Gap'

		var el = compileTemplate()

		expect(el.find('.gap').length).toBe(1)
	});


	it('should have select DOM in Select field', function() {
		var data = rowMap(1)[0]
		$scope.rows = [data]
		data.rowType = 'Select'
		data.options = [{value:'value0',text:'A'},{value:'value1',text:'B'},]

		var el = compileTemplate()

		expect(el.find('select').length).toBe(1)
		expect(el.find('option').length).toBe(3) // there is the default empty option
		expect( $(el.find('option')[0]).text() ).toBe("")
		expect( $(el.find('option')[1]).text() ).toBe("A")
		expect( $(el.find('option')[2]).text() ).toBe("B")
		expect( $(el.find('option')[1]).val() ).toBe("value0")
		expect( $(el.find('option')[2]).val() ).toBe("value1")

	});


	it('should have tinymce DOM in Editor field', function() {
		$scope.rows = rowMap(1)
		$scope.rows[0].rowType = 'Editor'

		var el = compileTemplate()

		expect(el.find('textarea').attr('ui-tinymce')).toBe("data.options")
	});


	it('should have datepicker DOM in Date field', function() {
		$scope.rows = rowMap(1)
		$scope.rows[0].rowType = 'Date'

		var el = compileTemplate()

		var val = el.find('input').attr('datepicker-options')
		expect(val).toBe("data.options")

		val = el.find('button.btn-calendar').attr('ng-click')
		expect(val).toBe("data.open($event)")

		val = el.find('.form-date-time')
		expect(val).toBeDefined()
		expect(val.length).toBe(0)
	});
	

	it('should have datepicker DOM in Date field with time', function() {
		$scope.rows = rowMap(1)
		$scope.rows[0].rowType = 'Date'
		$scope.rows[0].andTime =  true

		var el = compileTemplate()

		var val = el.find('input').attr('datepicker-options')
		expect(val).toBe("data.options")

		val = el.find('button.btn-calendar').attr('ng-click')
		expect(val).toBe("data.open($event)")

		val = el.find('.form-date-time')
		expect(val).toBeDefined()
		expect(val.length).toBe(1)
	});
	

	it('should have timepicker field in DOM for time', function() {
		$scope.rows = rowMap(1)
		$scope.rows[0].rowType = 'Time'

		var el = compileTemplate()

		val = el.find('timepicker')
		expect(val).toBeDefined()
		expect(val.length).toBe(1)
	});
	

});



describe("pw.dataRow module DataRowFieldService", function() {

	beforeEach(module('pw.dataRow'))

	describe("DataRowFieldService exists/defined", function() {
		it('should have service for DataRowFieldService', inject(function(DataRowFieldService) {
			expect(DataRowFieldService).toBeDefined()
		}))
	})

	describe("verify DataRowFieldService.openDatePicker action", function() {

		// TODO compared to all the other tests this one is a monster - a smell

		it('DataRowFieldService should trigger click', inject(function(DataRowFieldService) {
			var field = {elId:"FieldId"} // dpFieldId
			var event = {
				preventDefaultCalled : false,
				stopPropagationCalled : false,
				stopImmediatePropagationCalled : false,
				preventDefault : function() { event.preventDefaultCalled = true },
				stopPropagation : function(){ event.stopPropagationCalled = true },
				stopImmediatePropagation : function() { event.stopImmediatePropagationCalled = true },
			}

			var jqRef = jQuery
			try {

				var triggered
				var selected
				$ = jQuery = function(selector) {
					selected = selector
					return {
						trigger : function(event) {
							triggered = event
						}
					}
				}
				jQuery.Event = jqRef.Event

				var target = document.createElement("DIV")
				target.id = "dpFieldId"
				var body = document.getElementsByTagName('body')[0]
				body.appendChild(target)

				DataRowFieldService.openDatePicker(field, event)

				expect(event.preventDefaultCalled).toBeTruthy()
				expect(event.stopPropagationCalled).toBeTruthy()
				expect(event.stopImmediatePropagationCalled).toBeTruthy()

				expect(selected.id).toBe("dpFieldId")

				expect(triggered).toBeDefined()
				expect(triggered.type).toBe("keydown")
				expect(triggered.which).toBe(40) // down arrow
				expect(triggered.ctrlKey).toBeFalsy()
				expect(triggered.isDefaultPrevented()).toBeTruthy()
			} finally {
				$ = jQuery = jqRef // rule one, test in issolation
			}

		}))
	})

	describe("verify DataRowFieldService.formatEditor options", function() {
		it('DataRowFieldService should hide the menu', inject(function(DataRowFieldService) {
			var opts = {}
			DataRowFieldService.formatEditor(opts)
			expect(opts.menu).toBeFalsy()
		}))
	})

	describe("verify DataRowFieldService.formatEditor options", function() {

		it('DataRowFieldService should have date format yyyy-MM-dd', inject(function(DataRowFieldService) {
			var opts = {}
			DataRowFieldService.formatDate(opts)
			expect(opts.format).toBe("yyyy-MM-dd")
		}))
	})
		
	describe("verify DataRowFieldService.formatDate options", function() {

		var MockLookup = {}

		beforeEach(function(){
			MockLookup.type = ""
			MockLookup.taget = ""
			MockLookup.get = function(type, target) {
				MockLookup.type   = type
				MockLookup.target = target
			}

			angular.module('mock.lookup',[]).value('LookupFetcher', MockLookup)
			module("pw.dataRow",'mock.lookup')
		})


		it('DataRowFieldService should have date options startingDay 1', inject(function(DataRowFieldService) {
			var opts = {}
			DataRowFieldService.formatDate(opts)
			expect(opts.options.startingDay).toBe(1)
		}))
		
		it('DataRowFieldService should have date options formatYear yy', inject(function(DataRowFieldService) {
			var opts = {}
			DataRowFieldService.formatDate(opts)
			expect(opts.options.formatYear).toBe('yy')
		}))
		
		it('DataRowFieldService should have date open function', inject(function(DataRowFieldService) {
			var opts = {}
			DataRowFieldService.formatDate(opts)
			expect(opts.open).toBeDefined()
			expect(typeof opts.open).toBe('function')
		}))

		it('DataRowFieldService should have date open function', inject(function(DataRowFieldService) {
			var openDatePickerCalled = false
			DataRowFieldService.openDatePicker = function() {
				openDatePickerCalled = true
			} 
			var opts = {}
			DataRowFieldService.formatDate(opts)
			opts.open({})
			expect(openDatePickerCalled).toBeTruthy()
		}))


		it('DataRowFieldService should have fieldMapper function find properties and additionalProperties',
		inject(function(DataRowFieldService) {

			var formatDateCalled = false
			DataRowFieldService.formatDate = function() {
				formatDateCalled = true
			} 
			var formatEditorCalled = false
			DataRowFieldService.formatEditor = function() {
				formatEditorCalled = true
			}

			var fields = [
				{
					additional:true,
					name   : "product-description",
					rowType: "Text",
				},
				{
					name   : "page-first",
					rowType: "Text",
				},
			]
			var data = {
				properties : {
					"page-first" : "123"
				},
				additionalProperties : {
					"product-description" : "asdf"
				}
			}

			DataRowFieldService.fieldMapper(fields, data)

			expect(formatDateCalled).toBeFalsy()
			expect(formatEditorCalled).toBeFalsy()

			expect(fields[0].value).toBe("asdf")
			expect(fields[1].value).toBe("123")
		}))


		it('DataRowFieldService should have fieldMapper function Date',
		inject(function(DataRowFieldService) {

			var formatDateCalled = false
			DataRowFieldService.formatDate = function() {
				formatDateCalled = true
			} 
			var formatEditorCalled = false
			DataRowFieldService.formatEditor = function() {
				formatEditorCalled = true
			}

			var fields = [
				{
					name   : "date",
					rowType: "Date",
				},
			]
			var data = {
				properties : {
					"date" : "123"
				},
			}

			DataRowFieldService.fieldMapper(fields, data)

			expect(formatDateCalled).toBeTruthy()
			expect(formatEditorCalled).toBeFalsy()

			expect(fields[0].value).toBe("123")
		}))


		it('DataRowFieldService should have fieldMapper function Editor',
		inject(function(DataRowFieldService) {

			var formatDateCalled = false
			DataRowFieldService.formatDate = function() {
				formatDateCalled = true
			} 
			var formatEditorCalled = false
			DataRowFieldService.formatEditor = function() {
				formatEditorCalled = true
			}

			var fields = [
				{
					name   : "field-name",
					rowType: "Editor",
				},
			]
			var data = {
				properties : {
					"field-name" : "asdf"
				},
			}

			DataRowFieldService.fieldMapper(fields, data)

			expect(formatDateCalled).toBeFalsy()
			expect(formatEditorCalled).toBeTruthy()

			expect(fields[0].value).toBe("asdf")
		}))


		it('DataRowFieldService should have fieldMapper function Select calls Lookup to get options',
		inject(function(DataRowFieldService) {

			var formatDateCalled = false
			DataRowFieldService.formatDate = function() {
				formatDateCalled = true
			} 
			var formatEditorCalled = false
			DataRowFieldService.formatEditor = function() {
				formatEditorCalled = true
			}

			var fields = [
				{
					name   : "selectable",
					rowType: "Select",
					type   : "asdf"
				},
			]
			var data = {
				properties : {
					"selectable" : "123"
				},
			}

			DataRowFieldService.fieldMapper(fields, data)

			expect(formatDateCalled).toBeFalsy()
			expect(formatEditorCalled).toBeFalsy()

			expect(MockLookup.type).toBe("asdf")
			expect(fields[0].value).toBe("123")
		}))


	})

	// service.formatDate = function(date) {
	// 	date.open = function(event) {
	// 		service.openDatePicker(date, event)
	// 	}
	// }




})

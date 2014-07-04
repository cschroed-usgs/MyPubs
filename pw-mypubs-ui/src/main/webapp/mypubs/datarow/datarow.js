(function() {


var templates    = ['Date','Editor','Gap','Readonly','Select','Text','Textbox','Time']
var templatePath = 'mypubs/datarow/row'
var templateCache


var getTemplate  = function(rowType) {
	return templatePath+rowType+'.html'
}


var registerTemplate = function($templateCache, templateUrl) {
	if ($templateCache.get(templateUrl)) return

	var req = new XMLHttpRequest()
	req.onload = function() {
		var templateSrc = this.responseText
		$templateCache.put(templateUrl,	templateSrc)
	}
	req.open("get", templateUrl, false)
	req.send()
}



angular.module('pw.dataRow', [])


.run(['$templateCache',function($templateCache) {
	templateCache = $templateCache

	_.each(templates, function(template) {
		var templateUrl = getTemplate(template)
		registerTemplate($templateCache, templateUrl)
	})
}])


.directive('pwDatarow', function($compile) {

	var pwDatarow = {
		restrict    : 'E', //AEC
		replace     : true,
		transclude  : true,
		scope       : {data:"="},

		controller : function($scope) {
		},

		link : function($scope, el, attrs) {

			var templateUrl = getTemplate($scope.data.rowType)
			var templateSrc = templateCache.get(templateUrl)
			el.html(templateSrc)

			//console.log(templateUrl)

			$compile(el.contents())($scope)
		}
	}

	return pwDatarow
})


.service('DataRowFieldService', function() {
	var service = this

	service.openDatePicker = function(field, event) {
		var dpDate = document.getElementById("dp"+field.elId)
		var keydown      = jQuery.Event("keydown")
		keydown.ctrlKey  = false
		keydown.which    = 40
		keydown.target   = dpDate
		keydown.preventDefault()
		$(dpDate).trigger(keydown)

		event.preventDefault()
		event.stopImmediatePropagation()
		event.stopPropagation()
	}


	service.formatDate = function(date) {
		date.format  = "mm/dd/yyyy"
		date.options = {
			formatYear: 'yy',
			startingDay: 1
		}
		date.open = function(event) {
			service.openDatePicker(date, event)
		}
	}


	service.formatEditor = function(editor) {
		editor.options = {
			menubar   : false,
		}
	}


	service.fieldMapper = function(fieldMapping, data) {
		_.each(fieldMapping, function(field){
			field.value = data[field.name]

			if (field.rowType === "Date") {
				service.formatDate(field)
			} else if (field.rowType == "Editor") {
				service.formatEditor(field)
			}
		})
		return fieldMapping
	}

})


}) ()

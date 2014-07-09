(function() {


var templates    = ['Checkbox','Date','Editor','Gap','Readonly','Multiselect','Select','Text','Textbox','Time']
var templatePath = 'mypubs/datarow/row'
var templateCache


var getTemplate  = function(rowType) {
	return templatePath+rowType+'.html'
}


var registerTemplate = function($templateCache, templateUrl) {
	if ( $templateCache.get(templateUrl) ) {
		return
	}

	var req = new XMLHttpRequest()
	req.onload = function() {
		var templateSrc = this.responseText
		$templateCache.put(templateUrl,	templateSrc)
	}
	req.open("get", templateUrl, false)
	req.send()
}



angular.module('pw.dataRow', ['pw.lookups'])


.run(['$templateCache',function($templateCache) {
	templateCache = $templateCache

	angular.forEach(templates, function(template) {
		var templateUrl = getTemplate(template)
		registerTemplate($templateCache, templateUrl)
	})
}])


.directive('pwDatarow', ['$compile', function($compile) {

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

			$compile(el.contents())($scope)
		}
	}

	return pwDatarow
}])


.service('DataRowFieldService', ['LookupFetcher', function(Lookup) {
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
		date.format  = "yyyy-MM-dd"
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
		angular.forEach(fieldMapping, function(field) {
			if (field.rowType === "Gap") {
				return
			}

			if (field.additional) {
				field.value = data.additionalProperties[field.name]
			} else if ( angular.isDefined(data.properties) ) {
				field.value = data.properties[field.name]
			} else {
				field.value = data[field.name]
			}
			if ( angular.isUndefined(field.value) ) {
				var msg = 'Warning: did not find value for ' + field.name + '->' + field.label
				if (field.additional) {
					msg += ' in additional'
				}
				console.log(msg)
			}

			if (field.rowType === "Date") {
				service.formatDate(field)
			} else if (field.rowType == "Editor") {
				service.formatEditor(field)
			} else if (field.rowType == "Select" && field.type) {
				Lookup.get( field.type, optionsProxy(field) )
			} else if (field.rowType == "Multiselect") {
				Lookup.affixMultiselect(field.type, field)
			} else if (field.rowType == "MultiAjax") {
				//Lookups.affixAjax(field.type, field) // TODO
			}
		})
		return fieldMapping
	}

}])


var optionsProxy = function(datum) {
	return {
		setValues : function(options) {
			if (datum.options.length === 0) {
				datum.options.push.apply(datum.options, options)
			}
		}
	}
}


}) ()

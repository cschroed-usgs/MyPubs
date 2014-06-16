(function() {


var mod = angular.module('pubsDataRow', []);


var templates    = ['Readonly']
var templatePath = 'templates/data/data'
var templateCache

var getTemplate  = function(rowType) {
    return templatePath+rowType+'.html';
}

var registerTemplate = function($templateCache, templateUrl) {
    var req = new XMLHttpRequest()
    req.onload = function() {
        var templateSrc = this.responseText
		$templateCache.put(templateUrl,	templateSrc)
    }
    req.open("get", templateUrl, false)
    req.send()
}


mod.run(['$templateCache',function($templateCache) {
	templateCache = $templateCache

	_.each(templates, function(template) {
		var templateUrl = getTemplate(template)
		registerTemplate($templateCache, templateUrl)
	})
}])


mod.directive('pubsDatarow', function($compile) {

	console.log('pubsDatarow')

	var _this = {
		restrict    : 'E', //AEC
		replace     : true,
		transclude  : true,
		scope       : {
			data : "=",
		},

		controller : function($scope) {
		},

		link : function($scope, el, attrs) {

	        var templateUrl = getTemplate($scope.data.rowType)
	        var templateSrc = templateCache.get(templateUrl)
	        el.html(templateSrc)

	        $compile(el.contents())($scope);
        }
	}

	return _this;
})


mod.controller('biblioCtrl', [
'$scope',
function($scope){
	$scope.rows = [
		{
			label  : "Prod ID",
			value  : "700000000",
			rowType: "Readonly",
		},
		{
			label  : "Index ID",
			value  : "otr8068900",
			rowType: "Readonly",
		},
		{
			label  : "Display to Public Date",
			value  : "2014-05-28",
			rowType: "Readonly",
		},
	]

}])

}) ();


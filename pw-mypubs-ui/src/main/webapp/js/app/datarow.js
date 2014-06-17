(function() {


var mod = angular.module('pubsDataRow', []);


var templates    = ['Checkbox','Editor','Gap','Readonly','Select','Text','Textbox']
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
		{
			rowType: "Gap",
		},
		{
			rowType: "Select",
			label  : "Publication Type",
			value  : "2",
			placeholder:"Select a Publication Type",
			options: [{value:"1",text:'USGS Series'},{value:"2",text:'Other Series'},],
		},
		{
			rowType: "Select",
			label  : "Series Title",
			value  : "",
			placeholder:"Select a Series",
			options: [{value:"1",text:'Open File Report'},{value:"2",text:'Book'},],
		},
		{
			label  : "Subseries",
			value  : "Climate change adaption Series",
			rowType: "Text",
		},
		{
			label  : "Series Number",
			value  : "2012-1234",
			rowType: "Text",
		},
		{
			label  : "Collaboration/Cooperation",
			value  : "ABC",
			rowType: "Text",
		},
		{
			label  : "USGS Citation",
			value  : "This is an entry. The quick brown fox jumps over the lazy dog. Sally sells sea shells at the sea shore.",
			rowType: "Textbox",
		}

	]

}])

}) ();


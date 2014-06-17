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

// TODO could be angular value
var fieldMapping = function() {
	return [
		{
			name   : "pid",
			label  : "Prod ID",
			rowType: "Readonly",
		},
		{
			name   : "idx",
			label  : "Index ID",
			rowType: "Readonly",
		},
		{
			name   : "public_date",
			label  : "Display to Public Date",
			rowType: "Readonly",
		},
		{
			rowType: "Gap",
		},
		{
			name   : "pub_type",
			label  : "Publication Type",
			rowType: "Select",
			options: [{value:"1",text:'USGS Series'},{value:"2",text:'Other Series'},],
			placeholder:"Select a Publication Type",
		},
		{
			name   : "series_title",
			label  : "Series Title",
			rowType: "Select",
			options: [{value:"1",text:'Open File Report'},{value:"2",text:'Book'},],
			placeholder:"Select a Series",
		},
		{
			name   : "subseries",
			label  : "Subseries",
			rowType: "Text",
		},
		{
			name   : "series_num",
			label  : "Series Number",
			rowType: "Text",
		},
		{
			name   : "chapter",
			label  : "Chapter",
			rowType: "Text",
		},
		{
			name   : "subchapter",
			label  : "subchapter",
			rowType: "Text",
		},
		{
			name   : "title",
			label  : "Title",
			rowType: "Text",
		},
		{
			name   : "collaborators",
			label  : "Collaboration/Cooperation",
			rowType: "Text",
		},
		{
			name   : "abstract",
			label  : "Abstract",
			rowType: "Editor",
		},
		{
			name   : "usgs_citation",
			label  : "USGS Citation",
			rowType: "Textbox",
		},
		{
			name   : "lang",
			label  : "Language",
			rowType: "Text",
		},
		{
			name   : "publication",
			label  : "Publication",
			rowType: "Text",
		},
		{
			name   : "pub_location",
			label  : "Publication Location",
			rowType: "Text",
		},

	]
}


var fieldMapper = function(fieldMapping, data) {
	_.each(fieldMapping, function(field){
		field.value = data[field.name]
	})
}


mod.controller('biblioCtrl', [
'$scope',
function($scope) {

	var pubData = { // TODO to be fetched
			pid  : "700000000",
			idx  : "otr8068900",
			public_date  : "2014-05-28",
			pub_type  : "2",
			series_title  : "",
			subseries  : "Climate change adaption Series",
			series_number  : "2012-1234",
			collaborators  : "ABC",
			usgs_citation  : "This is an entry. The quick brown fox jumps over the lazy dog. Sally sells sea shells at the sea shore.",
		}


	var fields = fieldMapping()
	fieldMapper(fields, pubData)

	$scope.rows = fields

}])

}) ();


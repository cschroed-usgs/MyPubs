(function() {


angular.module('pw.bibliodata',['pw.dataRow','pw.fetcher', 'pw.lookups'])


.controller('biblioCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log', 'biblioFields', 'LookupFetcher',
function ($scope, DataRowFieldService, PublicationFetcher, $log, fields, Lookup) {

	var pubData = PublicationFetcher.getById('asdf')
	$scope.rows = fields
	DataRowFieldService.fieldMapper(fields, pubData)

	Lookup.get(Lookup.type.publication, optionsDecorator(fields[0], $scope))
}])


.factory('biblioFields', function() {
	return [
		{
			name   : "pub_type",
			label  : "Publication Type",
			rowType: "Select",
			options: [],
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
			label  : "Subchapter",
			rowType: "Text",
		},
		{
			name   : "title",
			label  : "Title",
			rowType: "Text",
		},
		{
			rowType: "Gap",
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
			rowType: "Gap",
		},
		{
			name   : "language",
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
		{
			name   : "costcenters",
			label  : "Cost Centers",
			rowType: "Select",
		},
	]
})


var optionsDecorator = function(datum, scope) {
	return {
		setValues : function(options) {
			if (datum.options.length === 0) {
				datum.options.push.apply(datum.options, options)
			}
		}
	}
}

}) ()

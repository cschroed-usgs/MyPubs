(function() {


angular.module('pw.bibliodata',['pw.dataRow','pw.fetcher', 'pw.lookups'])


.controller('biblioCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log', 'biblioFields',
function ($scope, DataRowFieldService, PublicationFetcher, $log, fields) {

	var pubData = PublicationFetcher.getById('asdf')
	$scope.rows = fields
	DataRowFieldService.fieldMapper(fields, pubData)
}])


.factory('biblioFields',['LookupFetcher', function(Lookup) {
	return [
		{
			name   : "pub_type",
			label  : "Publication Type",
			rowType: "Select",
			options: [],
			type   : Lookup.type.publications,
			placeholder:"Select a Publication Type",
		},
		{
			name   : "costcenters",
			label  : "Cost Centers",
			rowType: "Multiselect",
			type   : Lookup.type.costCenters,
			options: [],
			value  : [],
			placeholder:"Select Centers",
		},
		{
			name   : "series_title",
			label  : "Series Title",
			rowType: "Select",
			options: [],
			type   : Lookup.type.seriesTitles,
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
	]
}])

}) ()

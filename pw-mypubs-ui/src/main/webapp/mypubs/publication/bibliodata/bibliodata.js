(function() {


angular.module('pw.bibliodata',['pw.dataRow','pw.fetcher', 'pw.lookups'])


.controller('biblioCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', 'biblioFields',
function ($scope, DataRowFieldService, PublicationFetcher, fields) {

	var pubData = PublicationFetcher.get()
	$scope.rows = fields
	DataRowFieldService.fieldMapper(fields, pubData)
}])


.factory('biblioFields',['LookupFetcher', function(Lookup) {
	return [
		{
			name   : "type",
			label  : "Publication Type",
			rowType: "Select",
			options: [],
			type   : Lookup.type.publications,
			placeholder:"Select a Publication Type",
		},
		{
			name   : "genre",
			label  : "Publication Subtype",
			rowType: "Select",
			options: [],
			type   : Lookup.type.genres,
			placeholder:"Select a Publication Subtype",
		},
		{
			additional:true,
			name   : "cost-center",
			label  : "Cost Centers",
			rowType: "Multiselect",
			type   : Lookup.type.costCenters,
			options: [],
			value  : [],
			placeholder:"Select Centers",
		},
		{
			name   : "collection-title",
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
			name   : "number",
			label  : "Series Number",
			rowType: "Text",
		},
		{
			name   : "chapter-number",
			label  : "Chapter",
			rowType: "Text",
		},
		{
			name   : "sub-chapter-number",
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
			additional:true,
			name   : "collaboratortion",
			label  : "Collaboration/Cooperation",
			rowType: "Text",
		},
		{
			name   : "abstract",
			label  : "Abstract",
			rowType: "Editor",
		},
		{
			additional:true,
			name   : "usgs-citation",
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
			name   : "publisher",
			label  : "Publication",
			rowType: "Text",
		},
		{
			name   : "publisher-place",
			label  : "Publication Location",
			rowType: "Text",
		},
		{
			name   : "DOI",
			label  : "DOI",
			rowType: "Text",
		},
		{
			name   : "ISSN",
			label  : "ISSN",
			rowType: "Text",
		},
		{
			name   : "ISBN",
			label  : "ISBN",
			rowType: "Text",
		},
	]
}])

}) ()

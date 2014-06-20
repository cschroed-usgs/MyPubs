(function() {


var mod = angular.module('pw.bibliodata',['pw.dataRow','ngRoute','pw.fetcher'])


mod.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Bibliodata', {
	    	templateUrl: 'mypubs/publication/bibliodata/bibliodata.html',
	    	controller: 'biblioCtrl'
	    })
	}
])


mod.controller('biblioCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log',
function ($scope, DataRowFieldService, PublicationFetcher, $log) {

	var pubData = PublicationFetcher.getById('asdf')
	$scope.rows = biblioFields()
	DataRowFieldService.fieldMapper($scope.rows, pubData)

}])


var biblioFields = function() {
	return [
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
}


}) ()

(function() {


angular.module('pw.catalog',['pw.dataRow','ngRoute','pw.fetcher'])


.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Cataloging', {
			templateUrl: 'mypubs/publication/catalog/catalog.html',
			controller: 'catalogCtrl'
		})
	}
])


.controller('catalogCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log', 'catFields',
function ($scope, DataRowFieldService, PublicationFetcher, $log, fields) {

	var pubData = PublicationFetcher.getById('asdf')
	$scope.rows = fields
	DataRowFieldService.fieldMapper(fields, pubData)

}])


.factory('catFields', function() {
	return [
		{
			name   : "keywords",
			label  : "Keywords",
			rowType: "Select",
			options: [{value:"1",text:'Need-To-Make-This'},{value:"2",text:'A-Multiple-Select'},],
			placeholder:"Enter Keywords",
		},
		{
			name   : "description",
			label  : "Prod Description",
			rowType: "Text",
		},
		{
			name   : "start_page",
			label  : "Start Page",
			rowType: "Text",
		},
		{
			name   : "end_page",
			label  : "End Page",
			rowType: "Text",
		},
		{
			name   : "pages",
			label  : "Number of Pages",
			rowType: "Text",
		},
		{
			name   : "online_flag_1",
			label  : "Online Only Flag",
			rowType: "Text",
		},
		{
			name   : "online_flag_2",
			label  : "Another Online Only Flag",
			rowType: "Text",
		},
		{
			rowType: "Gap",
		},
		{
			name   : "temporal_start",
			label  : "Temporal Start",
			rowType: "Text",
		},
		{
			name   : "temporal_end",
			label  : "Temporal End",
			rowType: "Text",
		},
		{
			name   : "notes",
			label  : "Notes",
			rowType: "Textbox",
		},

	]
})


}) ()

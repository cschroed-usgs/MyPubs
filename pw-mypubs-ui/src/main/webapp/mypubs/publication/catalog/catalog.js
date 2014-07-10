(function() {


angular.module('pw.catalog',['pw.dataRow','pw.fetcher'])


.controller('catalogCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log', 'catFields',
function ($scope, DataRowFieldService, PublicationFetcher, $log, fields) {

	var pubData = PublicationFetcher.get()
	$scope.rows = fields
	DataRowFieldService.fieldMapper(fields, pubData)

}])


.factory('catFields', function() {
	return [
		// {
		// 	name   : "keywords",
		// 	label  : "Keywords",
		// 	rowType: "MultiAjax",
		// 	options: [{value:"1",text:'Need-To-Make-This'},{value:"2",text:'A-Multiple-Select'},],
		// 	placeholder:"Enter Keywords",
		// },
		{
			rowType: "Gap",
		},
		{
			additional:true,
			name   : "product-description",
			label  : "Product Description",
			rowType: "Text",
		},
		{
			rowType: "Gap",
		},
		{
			name   : "page-first",
			label  : "Start Page",
			rowType: "Text",
		},
		{
			name   : "page-last",
			label  : "End Page",
			rowType: "Text",
		},
		{
			name   : "number-of-pages",
			label  : "Number of Pages",
			rowType: "Text",
		},
		{
			rowType: "Gap",
		},
		{
			additional:true,
			name   : "online-only",
			label  : "Online Only",
			rowType: "Checkbox",
		},
		{
			additional:true,
			name   : "additional-online-files",
			label  : "Additional Online Files",
			rowType: "Checkbox",
		},
		{
			rowType: "Gap",
		},
		{
			additional:true,
			name   : "temporal-start",
			label  : "Temporal Start",
			rowType: "Date",
			elId   : "temporalStart"
		},
		{
			additional:true,
			name   : "temporal-end",
			label  : "Temporal End",
			rowType: "Date",
			elId   : "temporalEnd"
		},
		{
			rowType: "Gap",
		},
		{
			additional:true,
			name   : "Notes",
			label  : "Notes",
			rowType: "Textbox",
		},
		{
			rowType: "Gap",
		},

	]
})


}) ()

(function() {


angular.module('pw.pubHeader', [])


.directive('pwPubheader', function() {

	var _this = {
		restrict   : 'E', //AEC
		replace    : true,
		transclude : true,
		scope      : true,
		templateUrl: 'mypubs/publication/header/header.html',
	}
	return _this
})


.controller('pubHeaderCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log', 'headerFields',
function ($scope, DataRowFieldService, PublicationFetcher, $log, fields) {

	var pubData = PublicationFetcher.get()
	$scope.rows = fields
	DataRowFieldService.fieldMapper(fields, pubData)
}])


.factory('headerFields', function() {
	return [
		{
			name   : "id",
			label  : "Prod ID",
			rowType: "Readonly",
		},
		{
			additional:true,
			name   : "index-id",
			label  : "Index ID",
			rowType: "Readonly",
		},
		{
			additional:true,
			name   : "display-to-public-date",
			label  : "Display to Public",
			rowType: "Date",
			andTime: true,
			elId   : "PublicDate",
		},
	]
})


}) ()

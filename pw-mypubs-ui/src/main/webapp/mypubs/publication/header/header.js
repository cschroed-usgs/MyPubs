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

	var pubData = PublicationFetcher.getById('asdf')
	$scope.rows = fields
	DataRowFieldService.fieldMapper(fields, pubData)
	
}])


.factory('headerFields', function() {
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
			label  : "Display to Public",
			rowType: "Date",
			elId   : "PublicDate",
		},
	]
})


}) ()

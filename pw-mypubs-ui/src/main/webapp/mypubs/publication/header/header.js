(function() {


var mod = angular.module('pw.pubHeader', [])


mod.directive('pwPubheader', function() {

	var _this = {
		restrict   : 'E', //AEC
		replace    : true,
		transclude : true,
		scope      : true,
		templateUrl: 'mypubs/publication/header/header.html',
	}
	return _this
})


mod.controller('pubHeaderCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log',
function ($scope, DataRowFieldService, PublicationFetcher, $log) {

	var pubData = PublicationFetcher.getById('asdf')
	$scope.rows = fields()
	DataRowFieldService.fieldMapper($scope.rows, pubData)
	
	$scope.pubslist = {
		name   : "Publications List",
		action : function() {
			// TODO service.doPublicaitonsList
		}
	}
	$scope.reservations = {
		name   : "Reservations",
		action : function() {
			// TODO service.doReserveations
		}
	}

}])


var fields = function() {
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
			rowType: "Date", 
			elId   : "PublicDate",
		},
	]
}


}) ()


(function() {


var mod = angular.module('pw.contacts',['pw.dataRow','ngRoute','pw.fetcher'])


mod.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Contacts', {
	    	templateUrl: 'mypubs/publication/contacts/contacts.html',
	    	controller: 'contactsCtrl'
	    })
	}
])


mod.controller('contactsCtrl', [
'$scope', 'DataRowFieldService', 'PublicationFetcher', '$log',
function ($scope, DataRowFieldService, PublicationFetcher, $log) {

	var pubData = PublicationFetcher.getById('asdf')
	$scope.rows = biblioFields()
	DataRowFieldService.fieldMapper($scope.rows, pubData)

}])


var biblioFields = function() {
	return [
		{
			name   : "link",
			label  : "Link",
			rowType: "Text",
		},
		{
			name   : "link_text",
			label  : "Link Text",
			rowType: "Text",
		},
		{
			name   : "name",
			label  : "Name",
			rowType: "Text",
		},
		{
			name   : "address1",
			label  : "Address Line 1",
			rowType: "Text",
		},
		{
			name   : "address2",
			label  : "Address Line 2",
			rowType: "Text",
		},
		{
			name   : "address3",
			label  : "Address Line 3",
			rowType: "Text",
		},
		{
			name   : "city",
			label  : "City",
			rowType: "Text",
		},
		{
			name   : "state",
			label  : "State",
			rowType: "Select",
			options: [{value:"WI",text:'Need-To-Make-This'},{value:"2",text:'Populated-with-States'},],
			placeholder:"Select a State",
		},
		{
			name   : "zipcode",
			label  : "zipcode",
			rowType: "Text",
		},
		{
			name   : "website",
			label  : "Website",
			rowType: "Text",
		},

	]
}


}) ()

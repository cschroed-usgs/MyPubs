(function() {


angular.module('pw.contacts',['pw.dataRow','ngRoute','pw.fetcher', 'pw.list', 'pw.collection'])


.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Contacts', {
	    	templateUrl: 'mypubs/publication/contacts/contact.html',
	    	controller: 'contactCtrl'
	    })
	}
])


.service('Contacts', 
[ 'DataRowFieldService', 'PublicationFetcher', 'Collection', '$rootScope', 'contactFields',
function (DataRowFieldService, PublicationFetcher, Collection, $rootScope, fields) {

	var ctx = Collection(this)

	ctx.id       = ''
	ctx.contact  = []
	

	ctx.setContacts = function(contacts) {
		ctx.setEntries(contacts, 'contacts')

		if (ctx.getEntries() && ctx.getEntries()[0]) {
			ctx._assignContact( ctx.getEntries()[0] )
		}
	}


	ctx._assignContact = function(contact) {
		ctx.id = contact.id
		ctx.contact = DataRowFieldService.fieldMapper(fields, contact)

		$rootScope.$broadcast('activeContact')
	}


	ctx.isActive = function(id) {
		return ctx.id === id
	}


	ctx.select = function(id) {
		if ( ctx.isActive(id) ) return

		var contact = _.where(ctx.getEntries(), {id: id})

		if ( contact  && (contact=contact[0]) ) {
			ctx._assignContact(contact)
		}
	}

}])


.controller('contactCtrl', [
'$scope',  'Contacts', '$log', '$location',
function ($scope, Contacts, $log, $location) {

	Contacts.setContacts()


	$scope.$on('activeContact', function() {
		$scope.contact = Contacts.contact
	})


	$scope.newEntry = function() {
		var contact = Contacts.newEntry(['name','address1','address2','address3','city','state','zipcode','website','link','link_text'])
		Contacts.select(contact.id)
	}
	
}])


.controller('contactsCtrl', [
'$scope',  'Contacts', '$log',
function ($scope, Contacts, $log) {

	Contacts.setContacts()

	$scope.listName = 'contact_'
	
	$scope.Contacts = Contacts
	$scope.contacts = Contacts.getEntries()


	$scope.isSelected = function(contactId) {
		return Contacts.isActive(contactId)
	}


	$scope.select = function(contactId) {
		Contacts.select(contactId)
		return false
	}

}])


.factory('contactFields', function() {
	return [
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
			rowType: "Gap",
		},
		{
			name   : "website",
			label  : "Website",
			rowType: "Text",
		},
		{
			rowType: "Gap",
		},
		{
			name   : "link_text",
			label  : "Link Text",
			rowType: "Text",
		},
		{
			name   : "link",
			label  : "Link",
			rowType: "Text",
		},

	]
})


.directive('pwContacts', function(){

	var pwContacts = {
		restrict   : 'E', //AEC
		replace    : true,
		transclude : true,
		templateUrl: 'mypubs/publication/contacts/contacts.html',

		link       : function($scope, el, attrs) {
			// placeholder
		}
	}

	return pwContacts
})


}) ()

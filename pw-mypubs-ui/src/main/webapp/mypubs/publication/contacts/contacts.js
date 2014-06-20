(function() {


var mod = angular.module('pw.contacts',['pw.dataRow','ngRoute','pw.fetcher'])


mod.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Contacts', {
	    	templateUrl: 'mypubs/publication/contacts/contact.html',
	    	//controller: 'contactCtrl'
	    })
	}
])


mod.service('Contacts', 
[ 'DataRowFieldService', 'PublicationFetcher',
function (DataRowFieldService, PublicationFetcher) {


	var ctx = this

	ctx.id       = ''
	ctx.contacts = []
	ctx.contact  = []

	ctx.setContacts = function(contacts) {
		if (contacts) {
			ctx.contacts = contacts
		} else {
			ctx.contacts = PublicationFetcher.get().contacts
		}

		if (ctx.contacts && ctx.contacts[0]) {
			assignContact( ctx.contacts[0] )
		}
	}

	var assignContact = function(contact) {
		ctx.id = contact.id
		ctx.contact = DataRowFieldService.fieldMapper(fields(), contact)

		console.log("Contacts Service: " + contact.id)
	}

	ctx.isActive = function(id) {
		return ctx.id === id
	}

	ctx.select = function(id) {
		if ( ctx.isActive(id) ) return

		var contact = _.where(ctx.contacts, {id: id})

		if ( contact  && (contact=contact[0]) ) {
			assignContact(contact)
		}
	}
}])


mod.controller('contactCtrl', [
'$scope',  'Contacts', '$log',
function ($scope, Contacts, $log) {

	Contacts.setContacts()

	$scope.$watch(Contacts.contact, function() {
		$scope.contact = Contacts.contact

		console.log("Contact Ctrl: " + Contacts.id)
	})
	$scope.showPreview(false)
	
}])


mod.controller('contactsCtrl', [
'$scope',  'Contacts', '$log',
function ($scope, Contacts, $log) {

	Contacts.setContacts()

	$scope.isSelected = function(contactId) {
		return Contacts.isActive(contactId)
	}

	$scope.select = function(contactId) {
		console.log("Contacts Ctrl: " + contactId)

		Contacts.select(contactId)
		return false
	}

	$scope.contacts = Contacts.contacts
	$scope.showPreview(false)

}])


var fields = function() {
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
			name   : "link",
			label  : "Link",
			rowType: "Text",
		},
		{
			name   : "link_text",
			label  : "Link Text",
			rowType: "Text",
		},

	]
}


mod.directive('pwContacts', function(){

	var pwContacts = {
		restrict   : 'E', //AEC
		replace    : true,
		transclude : true,
		templateUrl: 'mypubs/publication/contacts/contacts.html',

//		controller : contactsCtrl,
		
		link       : function($scope, el, attrs) {

		}
	}

	return pwContacts

})


}) ()

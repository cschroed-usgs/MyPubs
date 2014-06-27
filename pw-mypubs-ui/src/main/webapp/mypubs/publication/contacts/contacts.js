(function() {


var mod = angular.module('pw.contacts',['pw.dataRow','ngRoute','pw.fetcher', 'pw.list', 'pw.collection'])


mod.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Contacts', {
	    	templateUrl: 'mypubs/publication/contacts/contact.html',
	    	controller: 'contactCtrl'
	    })
	}
])


mod.service('Contacts', 
[ 'DataRowFieldService', 'PublicationFetcher', 'Collection',
function (DataRowFieldService, PublicationFetcher, Collection) {

	var ctx = this

	Collection(ctx)

	ctx.id       = ''
	ctx.contact  = []
	
	ctx.listeners= []
	ctx.listenToActive = function(listener) {
		if (typeof listener === 'function') {
			ctx.listeners.push(listener)
			listener(ctx.contact)
		}
	}
	ctx.braudCast= function() {
		_.each(ctx.listeners, function(listener) {
			listener(ctx.contact)
		})
	}

	ctx.setContacts = function(contacts) {
		ctx.setEntries(contacts, 'contacts')

		if (ctx.getEntries() && ctx.getEntries()[0]) {
			ctx._assignContact( ctx.getEntries()[0] )
		}
	}

	ctx._assignContact = function(contact) {
		ctx.id = contact.id
		ctx.contact = DataRowFieldService.fieldMapper(fields(), contact)

		ctx.braudCast()
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


mod.controller('contactCtrl', [
'$scope',  'Contacts', '$log', '$location',
function ($scope, Contacts, $log, $location) {

	Contacts.setContacts()

	Contacts.listenToActive(function(contact){
		$scope.contact = contact
	})

	$scope.showPreview( $location.path() !== '/Contacts' )
	
}])


mod.controller('contactsCtrl', [
'$scope',  'Contacts', '$log', '$location',
function ($scope, Contacts, $log, $location) {

	Contacts.setContacts()

	$scope.Contacts = Contacts
	$scope.contacts = Contacts.getEntries()


	$scope.isSelected = function(contactId) {
		return Contacts.isActive(contactId)
	}

	$scope.select = function(contactId) {
		Contacts.select(contactId)
		return false
	}


	$scope.showPreview( $location.path() !== '/Contacts' )

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

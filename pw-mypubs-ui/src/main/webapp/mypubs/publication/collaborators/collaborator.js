(function() {


angular.module('pw.collaborator',['pw.fetcher', 'pw.list', 'pw.collection', 'pw.lookups'])


.service('Collaborators', [
'Collection', 'LookupFetcher',
function (Collection, Lookup) {

	var ctx = Collection(this)


	ctx.setCollaborators = function(type) {
		ctx.hasEntries = false
		ctx.setEntries(null, type)

		// set corporate or person entry
		angular.forEach(ctx.getEntries(), function(entry) {
			if ( angular.isUndefined(entry.type) || entry.type === '' ) {
				entry.type = ( angular.isUndefined(entry.given) || entry.given === '') ?'c' :'p'
			}
		})
	}


	ctx.getTypeOptions = function() {
		return [
			{value:"p", text:"Person"},
			{value:"c", text:"Corporation"},
		]
	}


	ctx.collaboratorTypes= []
	ctx.getCollaboratorTypes = function() {
		return Lookup.fetchOptions(Lookup.type.collaborators, ctx.collaboratorTypes)
	}


	ctx.newEntry = function() {
		return ctx._newEntry(['type','family','given','email','literal'])
	}


}])


.controller('collaboratorsCtrl', [
'$scope', 'Collaborators', '$log',
function ($scope, Collaborators, $log) {

	$scope.listName     = 'contrib_'

	$scope.Collaborators= Collaborators
	$scope.typeOptions  = Collaborators.getTypeOptions()
	$scope.contribTypes = Collaborators.getCollaboratorTypes()

	$scope.collaboratorType = 'author'

	$scope.collaboratorShow = function(type) {
		if ( angular.isUndefined(type) ) {
			return $scope.collaboratorType
		}
		$scope.collaboratorType = type

		Collaborators.setCollaborators(type)

		$scope.collaborators    = Collaborators.getEntries()
	}
	$scope.collaboratorShow( $scope.collaboratorType )


	$scope.isDirty     = function(collaborator) {
		return (collaborator.email   !== ""
			 || collaborator.family  !== ""
			 || collaborator.given   !== ""
			 || collaborator.literal !== ""
			 || collaborator.affiliation !== ""
			)
	}


	$scope.isCorporation = function(collaborator) {
		return collaborator.type === 'c'
	}


}])


}) ()

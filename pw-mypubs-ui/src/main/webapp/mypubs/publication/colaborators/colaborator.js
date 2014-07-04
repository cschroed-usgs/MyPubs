(function() {


angular.module('pw.colaborator',['pw.fetcher', 'pw.list', 'pw.collection'])


.service('Colaborators', [
'PublicationFetcher', 'Collection',
function (PublicationFetcher, Collection) {

	var ctx = Collection(this)


	ctx.setColaborators = function(type) {
		ctx.hasEntries = false
		ctx.setEntries(null, type)

		_.each(ctx.getEntries(), function(entry) {
			if ( ! entry.type || entry.type==="") {
				entry.type = (!entry.given||entry.given==='') ?'c':'p'
			}
		})
	}


	ctx.getTypeOptions = function() {
		return [
			{value:"p", text:"Person"},
			{value:"c", text:"Corporation"},
		]
	}


	ctx.newEntry = function() {
		return ctx._newEntry(['type','family','given','email','literal'])
	}


}])


.controller('colaboratorsCtrl', [
'$scope', 'Colaborators', '$log',
function ($scope, Colaborators, $log) {

	$scope.listName    = 'contrib_'
	
	$scope.Colaborators= Colaborators
	$scope.typeOptions = Colaborators.getTypeOptions()

	$scope.contribTypes= [
		{
			type :'author',
			title:'Authors',
		},
		{
			type :'editor',
			title:'Editors',
		},
	]


	$scope.colaboratorType = 'author'

	$scope.colaboratorShow = function(type) {
		if (typeof type === 'undefined') {
			return $scope.colaboratorType
		}
		$scope.colaboratorType = type
	
		Colaborators.setColaborators(type)

		$scope.colaborators    = Colaborators.getEntries()
	}
	$scope.colaboratorShow( $scope.colaboratorType )


	$scope.isDirty     = function(colaborator) {
		return (colaborator.email   !== ""
			 || colaborator.family  !== ""
			 || colaborator.given   !== ""
			 || colaborator.literal !== ""
			 || colaborator.affiliation !== ""
			) 
	}


	$scope.isCorporation = function(colaborator) {
		return colaborator.type === 'c'
	}


}])


}) ()

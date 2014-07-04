(function() {


angular.module('pw.colaborator',['pw.fetcher', 'pw.list', 'pw.collection', 'pw.lookups'])


.service('Colaborators', [
'PublicationFetcher', 'Collection', 'LookupFetcher',
function (PublicationFetcher, Collection, Lookup) {

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


	ctx.colaboratorTypes= []
	ctx.getColaboratorTypes = function() {
		return ctx.fetchOptions(Lookup.type.colaborators, ctx.colaboratorTypes)
	}


	ctx.fetchOptions = function(type, cOptions) {
		if (cOptions && cOptions.length>0) {
			return
		}
		var proxy = {
			setValues : function(options) {
				cOptions.push.apply(cOptions, options)
			}
		}
		Lookup.get(type, proxy)
		return cOptions
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
	$scope.contribTypes= Colaborators.getColaboratorTypes()

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

(function() {


angular.module('pw.links',['pw.fetcher', 'pw.list', 'pw.collection', 'pw.lookups'])


.service('Links', 
[ 'PublicationFetcher', 'Collection', 'LookupFetcher',
function (PublicationFetcher, Collection, Lookup) {

	var ctx = Collection(this)


	ctx.setLinks = function(links) {
		ctx.setEntries(links, 'links')
	}


	ctx.typeOptions = []
	ctx.getTypeOptions = function() {
		return Lookup.fetchOptions(Lookup.type.linkSubjects, ctx.typeOptions)
	}


	ctx.fileOptions = []
	ctx.getFileOptions = function() {
		return Lookup.fetchOptions(Lookup.type.linkFiles, ctx.fileOptions)
	}


	ctx.newEntry = function() {
		return ctx._newEntry(['type','url','text','size','fileType','description'])
	}


}])


.controller('linksCtrl', [
'$scope', 'Links', '$log',
function ($scope, Links, $log) {

	Links.setLinks()

	$scope.listName    = 'link_'

	$scope.Links       = Links
	$scope.links       = Links.getEntries()
	$scope.typeOptions = Links.getTypeOptions()
	$scope.fileOptions = Links.getFileOptions()


	$scope.isDirty     = function(link) {
		return (link.description !== ""
			 || link.type !== ""
			 || link.url  !== ""
			 || link.text !== ""
			 || link.size !== ""
			 || link.fileType !== ""
			) 
	}

}])


}) ()

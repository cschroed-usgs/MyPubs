(function() {


var mod = angular.module('pw.links',['ngRoute','pw.fetcher', 'pw.list', 'pw.collection'])


mod.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Links', {
	    	templateUrl: 'mypubs/publication/links/links.html',
	    	controller: 'linksCtrl'
	    })
	}
])


mod.service('Links', 
[ 'PublicationFetcher', 'Collection',
function (PublicationFetcher, Collection) {

	var ctx = Collection(this)


	ctx.setLinks = function(links) {
		ctx.setEntries(links, 'links')
	}


	ctx.getTypeOptions = function() {
		return [
			{value:"m", text:"Map"},
			{value:"r", text:"Report"},
		]
	}


	ctx.getFileOptions = function() {
		return [
			{value:"pdf", text:"PDF"},
			{value:"gif", text:"giff"},
		]
	}


	ctx.newEntry = function() {
        return ctx._newEntry(['type','url','text','size','fileType','description'])
	}


}])


mod.controller('linksCtrl', [
'$scope', 'Links', '$log',
function ($scope, Links, $log) {

	Links.setLinks()

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

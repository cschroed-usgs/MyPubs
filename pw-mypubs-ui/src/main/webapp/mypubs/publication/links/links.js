(function() {


var mod = angular.module('pw.links',['ngRoute','pw.fetcher'])


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
[ 'PublicationFetcher',
function (PublicationFetcher) {

	var ctx = this

	ctx.links = []
	

	ctx.getLinks = function() {
		return ctx.links
	}


	ctx.setLinks = function(links) {
		if (links) {
			ctx.links = links
		} else {
			ctx.links = PublicationFetcher.get().links
		}
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


	ctx.newLink = function() {
		var link = {
            type:"",
            url :"",
            text:"",
            size:"",
            fileType:"",
            description:"",
		}
		ctx.links.push(link)
		return link
	}

}])


mod.controller('linksCtrl', [
'$scope', 'PublicationFetcher', 'Links', '$log',
function ($scope, DataRowFieldService, Links, $log) {

	Links.setLinks()

	$scope.links       = Links.getLinks()
	$scope.typeOptions = Links.getTypeOptions()
	$scope.fileOptions = Links.getFileOptions()

	$scope.isNewLink = false
	$scope.aNewLink  = {}

	$scope.newLink = function() {
		if ( $scope.isNewLink ) {
			return
		}

		$scope.aNewLink = Links.newLink()
		$scope.isNewLink = true

		$scope.$watch('aNewLink', function(link) {
			if (link.description === ""
			 && link.type === ""
			 && link.url  === ""
			 && link.text === ""
			 && link.size === ""
			 && link.fileType    === ""
				) {
				return
			}
			$scope.isNewLink = false
		}, true)
	}

}])


}) ()

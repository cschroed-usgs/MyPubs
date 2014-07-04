(function() {


angular.module('pw.author',['ngRoute','pw.fetcher', 'pw.list', 'pw.collection'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Contributors', {
			templateUrl: 'mypubs/publication/authors/author.html',
			controller: 'authorsCtrl'
		})
	}
])


.service('Authors', [
'PublicationFetcher', 'Collection',
function (PublicationFetcher, Collection) {

	var ctx = Collection(this)


	ctx.setAuthors = function(type) {
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


.controller('authorsCtrl', [
'$scope', 'Authors', '$log',
function ($scope, Authors, $log) {

	$scope.listName    = 'contrib_'
	
	$scope.Authors     = Authors
	$scope.typeOptions = Authors.getTypeOptions()

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


	$scope.authorType = 'author'

	$scope.authorShow = function(type) {
		if (typeof type === 'undefined') {
			return $scope.authorType
		}
		$scope.authorType = type
	
		Authors.setAuthors(type)

		$scope.authors     = Authors.getEntries()
	}
	$scope.authorShow( $scope.authorType )

	$scope.isDirty     = function(author) {
		return (author.email   !== ""
			 || author.family  !== ""
			 || author.given   !== ""
			 || author.literal !== ""
			) 
	}


	$scope.isCorporation = function(author) {
		return author.type === 'c'
	}


}])


}) ()

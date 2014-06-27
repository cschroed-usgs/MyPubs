(function() {


var mod = angular.module('pw.author',['ngRoute','pw.fetcher', 'pw.list', 'pw.collection'])


mod.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Contributors', {
	    	templateUrl: 'mypubs/publication/authors/author.html',
	    	controller: 'authorsCtrl'
	    })
	}
])


mod.service('Authors', 
[ 'PublicationFetcher', 'Collection',
function (PublicationFetcher, Collection) {

	var ctx = Collection(this)


	ctx.setAuthors = function(entries) {
		ctx.setEntries(entries, 'author')

		_.each(ctx.getEntries(), function(entry) {
			if ( ! entry.type || entry.type==="") {
				entry.type = (!entry.given||entry.given==='') ?'c':'a'
			}
		})
	}


	ctx.getTypeOptions = function() {
		return [
			{value:"a", text:"Author"},
			{value:"c", text:"Corporation"},
		]
	}


	ctx.newEntry = function() {
		return ctx._newEntry(['type','family','given','email','literal'])
	}


}])


mod.controller('authorsCtrl', [
'$scope', 'Authors', '$log',
function ($scope, Authors, $log) {

	Authors.setAuthors()

	$scope.Authors     = Authors
	$scope.authors     = Authors.getEntries()
	$scope.typeOptions = Authors.getTypeOptions()


	$scope.isDirty     = function(author) {
		return (author.email   !== ""
			 || author.family  !== ""
			 || author.given   !== ""
			 || author.literal !== ""
			) 
	}


	$scope.isCorporation = function(author) {
		console.log('isCorporation')
		return author.type === 'c'
	}


}])


}) ()

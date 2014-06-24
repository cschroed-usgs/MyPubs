(function() {


var mod = angular.module('pw.links',['ngRoute','pw.fetcher', 'pw.dragdrop'])


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
	ctx.hasLinks = false
	

	ctx.getLinks = function() {
		return ctx.links
	}


	ctx.setLinks = function(links) {
		if (links) {
			ctx.links = links
		} else if ( ! ctx.hasLinks ) {
			ctx.links = PublicationFetcher.get().links
			ctx.hasLinks = true
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
		var id = "_" + Math.random()
		    id = id.replace("0.","")

		var link = {
			id  :id,
            type:"",
            url :"",
            text:"",
            size:"",
            fileType:"",
            description:"",
            order:ctx.links.length
		}
		ctx.links.push(link)
		return link
	}


	ctx.findById = function(id) {
		var i
		for (i=0;i<ctx.links.length;i++) {
			if (ctx.links[i].id === id) {
				break
			}
		}
		return i
	}
	ctx.findByOrder = function(order) {
		var i
		for (i=0;i<ctx.links.length;i++) {
			if (ctx.links[i].order === order) {
				break
			}
		}
		return ctx.links[i]
	}
	var findElement = function(id) {
		var i
		for (i=0;i<ctx.links.length;i++) {
			if (ctx.links[i].id === id) {
				break
			}
		}
		return ctx.links[i]
	}


	ctx.remove = function(id) {
		var i = ctx.findById(id)
		var links1 = []
		if (i>0) {
			links1 = ctx.links.slice(0,i)
		}
		if (i<ctx.links.length-1) {
			var links2 = ctx.links.slice(i+1)
			links1.push.apply(links1,links2)
		}
		return ctx.links = links1
	}

	ctx.reorder = function(id,direction) {
		var i0 = ctx.findById(id)
		var e0 = ctx.links[i0]
		var i1 = e0.order+direction
		var e1
		if (i1>=0 && i1<ctx.links.length) {
			e1 = ctx.findByOrder(i1)

			var order = e0.order
			e0.order  = e1.order
			e1.order  = order
		}
		//return ctx.links = links1
	}

	ctx.reorderArray = function(id,direction) {
		var i0 = ctx.findById(id)
		var e0 = ctx.links[i0]
		var i1 = i0+direction
		var e1
		if (i1>=0 && i1<ctx.links.length) {
			e1 = ctx.links[i0+direction]
		}

		var links1 = []
		if (i0+direction>0) {
			links1 = ctx.links.slice(0, i0 - (direction<0 ?1 :0) )
		}
		if (direction<0) {
			links1.push(e0)
			if (e1) links1.push(e1)
		} else {
			if (e1) links1.push(e1)
			links1.push(e0)
		}
		if ( i0+1 + (direction>0 ?1 :0) < ctx.links.length ) {
			var links2 = ctx.links.slice(i0+1 + (direction>0 ?1 :0))
			links1.push.apply(links1,links2)
		}

		return ctx.links = links1
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

	$scope.remove = function(id) {
		if (id===$scope.aNewLink.id) {
			$scope.isNewLink = false
		}
		$scope.links = Links.remove(id)
	}

	$scope.reorderUp = function(id) {
		Links.reorder(id,-1)
	}
	$scope.reorderDown = function(id) {
		Links.reorder(id,+1)
	}

	$scope.startDnd  = function(index) {
		$scope.indexDrag = index
	}
	$scope.reoderDnd = function(end) {
		if ( $(".dnd-over-top").length ) {
			end -= 0.5 // insert above drop location
		} else {
			end += 0.5 // insert below drop location
		}
		var start = $scope.indexDrag
		var link  = Links.findByOrder(start)
		var inc   = (((end-start) < 1) ?-1 :+1)
		console.log('reoderDnd from '+ start +' to '+ end +" by "+ inc)

		while ( (inc<0 && start+inc > end) || (inc>0 && start+inc < end) ) {
			Links.reorder( link.id, inc)
			start += inc
			console.log('reoderDnd from '+ start +' to '+ end +" by "+ inc)
		}
		console.log('-')

	}

}])


}) ()

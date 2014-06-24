(function() {


var mod = angular.module('pw.author',['ngRoute','pw.fetcher', 'pw.dragdrop'])


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
[ 'PublicationFetcher',
function (PublicationFetcher) {

	var ctx = this

	ctx.entries = []
	ctx.hasEntries = false
	

	ctx.getEntries = function() {
		return ctx.entries
	}


	ctx.setEntries = function(entries) {
		if (entries) {
			ctx.entries = entries
		} else if ( ! ctx.hasEntries ) {
			ctx.entries = PublicationFetcher.get().author
			ctx.hasEntries = true
		}
	}


	ctx.getTypeOptions = function() {
		return [
			{value:"a", text:"Author"},
			{value:"c", text:"Corporation"},
		]
	}


	ctx.newEntry = function() {
		var id = "_" + Math.random()
		    id = id.replace("0.","")

		var entry = {
			id     :id,
            type   :"",
            family :"",
            given  :"",
            email  :"",
            literal:"",
            order:ctx.entries.length
		}
		ctx.entries.push(entry)
		return entry
	}


	ctx.findIndexById = function(id) {
		var i
		for (i=0;i<ctx.entries.length;i++) {
			if (ctx.entries[i].id === id) {
				break
			}
		}
		return i
	}
	ctx.findIndexByOrder = function(order) {
		var i
		for (i=0;i<ctx.entries.length;i++) {
			if (ctx.entries[i].order === order) {
				break
			}
		}
		return ctx.entries[i]
	}
	var findElement = function(id) {
		var i
		for (i=0;i<ctx.entries.length;i++) {
			if (ctx.entries[i].id === id) {
				break
			}
		}
		return ctx.entries[i]
	}


	ctx.remove = function(id) {
		var i = ctx.findIndexById(id)
		var entries1 = []
		if (i>0) {
			entries1 = ctx.entries.slice(0,i)
		}
		if (i<ctx.entries.length-1) {
			var entries2 = ctx.entries.slice(i+1)
			entries1.push.apply(entries1,entries2)
		}
		return ctx.entries = entries1
	}

	ctx.reorder = function(id,direction) {
		var i0 = ctx.findIndexById(id)
		var e0 = ctx.entries[i0]
		var i1 = e0.order+direction
		var e1
		if (i1>=0 && i1<ctx.entries.length) {
			e1 = ctx.findIndexByOrder(i1)

			var order = e0.order
			e0.order  = e1.order
			e1.order  = order
		}
		//return ctx.entries = entries1
	}

	ctx.reorderArray = function(id,direction) {
		var i0 = ctx.findIndexById(id)
		var e0 = ctx.entries[i0]
		var i1 = i0+direction
		var e1
		if (i1>=0 && i1<ctx.entries.length) {
			e1 = ctx.entries[i0+direction]
		}

		var entries1 = []
		if (i0+direction>0) {
			entries1 = ctx.entries.slice(0, i0 - (direction<0 ?1 :0) )
		}
		if (direction<0) {
			entries1.push(e0)
			if (e1) entries1.push(e1)
		} else {
			if (e1) entries1.push(e1)
			entries1.push(e0)
		}
		if ( i0+1 + (direction>0 ?1 :0) < ctx.entries.length ) {
			var entries2 = ctx.entries.slice(i0+1 + (direction>0 ?1 :0))
			entries1.push.apply(entries1,entries2)
		}

		return ctx.entries = entries1
	}



}])


mod.controller('authorsCtrl', [
'$scope', 'PublicationFetcher', 'Authors', '$log',
function ($scope, DataRowFieldService, Authors, $log) {

	Authors.setEntries()

	$scope.entries     = Authors.getEntries()
	$scope.typeOptions = Authors.getTypeOptions()

	$scope.isNewEntry  = false
	$scope.aNewEntry   = {}

	_.each($scope.entries, function(entry) {
		if ( ! entry.type || entry.type==="") {
			entry.type = (!entry.given||entry.given==='') ?'c':'a'
		}
	})

	$scope.newEntry = function() {
		if ( $scope.isNewEntry ) {
			return
		}

		$scope.aNewEntry = Authors.newEntry()
		$scope.isNewEntry = true

		$scope.$watch('aNewEntry', function(entry) {
			if (entry.email   === ""
			 && entry.family  === ""
			 && entry.given   === ""
			 && entry.literal === ""
				) {
				return
			}
			$scope.isNewEntry = false
		}, true)
	}

	$scope.remove = function(id) {
		if (id===$scope.aNewEntry.id) {
			$scope.isNewEntry = false
		}
		$scope.entries = Authors.remove(id)
	}

	$scope.reorderUp = function(id) {
		Authors.reorder(id,-1)
	}
	$scope.reorderDown = function(id) {
		Authors.reorder(id,+1)
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
		var entry = Authors.findIndexByOrder(start)
		var inc   = (((end-start) < 1) ?-1 :+1)

		while ( (inc<0 && start+inc > end) || (inc>0 && start+inc < end) ) {
			Authors.reorder( entry.id, inc)
			start += inc
		}

	}

	$scope.isCorporation = function(entry) {
		return entry.type === 'c'
	}

}])


}) ()

(function() {


angular.module('pw.collection',['pw.fetcher'])


.factory('Collection', 
[ 'PublicationFetcher',
function (PublicationFetcher) {
	var ctx = {}

	ctx.entries = []
	ctx.hasEntries = false
	

	ctx.getEntries = function() {
		return ctx.entries
	}


	ctx.setEntries = function(entries, type) {
		if (entries) {
			ctx.entries = entries
		} else if ( ! ctx.hasEntries && type ) {
			ctx.entries = PublicationFetcher.get()[type]
			ctx.hasEntries = true
		}
	}


	ctx.newEntry = function() {
		var id = "_" + Math.random()
		    id = id.replace("0.","")

		var entry = ctx.entryFactory()
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
	ctx._findElement = function(id) {
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
		var oldOrder = ctx.entries[i].order
		var entries1 = []
		if (i>0) {
			entries1 = ctx.entries.slice(0,i)
		}
		if (i<ctx.entries.length-1) {
			var entries2 = ctx.entries.slice(i+1)
			entries1.push.apply(entries1,entries2)
		}
		_.each(entries1, function(entry) {
			if (entry.order > oldOrder) {
				entry.order--
			}			
		})

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

	ctx.extend = function(onto) {
		_.each(ctx, function(value, key){
			onto[key] = value
		})
	}

	return ctx


}])


}) ()

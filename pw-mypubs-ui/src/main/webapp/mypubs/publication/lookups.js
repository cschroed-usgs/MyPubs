(function() {


angular.module('pw.lookups',['pw.notify'])


.service('LookupFetcher', ['$http', 'Notifier', function($http, Notifier) {

	var ctx = this


	// here fore lookup not enforcement
	ctx.type = {
		publications: 'publicationtype',
		costCenters : 'costcentertype',
		seriesTitles: 'seriestitletype',
		linkSubjects: 'linktype',
		linkFiles:    'linkfiletype',
		states:       'statetype',
		colaborators: 'colaboratortype',
	}


	ctx.get = function(type, component) {
		var values
		if ( values=ctx._cache[type] ) { // assign intentional
			component.setValues(values)
		} else {
			ctx._fetch(type, component)
		}
	}


	ctx._cache = {
		colaboratortype : [{"value" :"author","text":"Authors",},{"value" :"editor","text":"Editors",}],
		statetype       : [{"value":"WA","text":"Washington"},{"value":"WI","text":"Wisconsin"},],
		linktype        : [{"value":"m","text":"Map"},{"value":"r","text":"Report"},],
		linkfiletype    : [{"value":"pdf","text":"PDF"},{"value":"gif","text":"giff"},],
		seriestitletype : [{"value":"1","text":'Open File Report'},{"value":"2","text":'Book'},],
		costcentertype  : [{"value":"1","text":"Cost Center 1"}, {"value":"2","text":"Cost Center 2"},],
		publicationtype : [{"value":"1","text":"USGS Numbered Series","id":1},{"value":"2","text":"USGS Unnumbered Series","id":2},{"value":"3","text":"Abstract or summary","id":3},{"value":"4","text":"Atlas","id":4},{"value":"5","text":"Autobiography/Biography/Memoir","id":5},{"value":"6","text":"Bibliography","id":6},{"value":"8","text":"Catalog","id":8},{"value":"9","text":"Chart","id":9},{"value":"10","text":"Conference publication","id":10},{"value":"11","text":"Database-nonspatial","id":11},{"value":"12","text":"Dictionary","id":12},{"value":"13","text":"Directory","id":13},{"value":"14","text":"Encyclopedia","id":14},{"value":"15","text":"Essay","id":15},{"value":"16","text":"Graphic","id":16},{"value":"18","text":"Handbook","id":18},{"value":"19","text":"Index","id":19},{"value":"20","text":"Instruction","id":20},{"value":"21","text":"Interview","id":21},{"value":"23","text":"Letter","id":23},{"value":"24","text":"Map","id":24},{"value":"26","text":"Model","id":26},{"value":"27","text":"Motion picture","id":27},{"value":"28","text":"Newspaper","id":28},{"value":"29","text":"Patent","id":29},{"value":"30","text":"Periodical","id":30},{"value":"31","text":"Picture","id":31},{"value":"32","text":"Poetry","id":32},{"value":"33","text":"Programmed text","id":33},{"value":"34","text":"Remote sensing image","id":34},{"value":"35","text":"Report","id":35},{"value":"36","text":"Review","id":36},{"value":"37","text":"Book series","id":37},{"value":"38","text":"Short story","id":38},{"value":"39","text":"Sound","id":39},{"value":"40","text":"Speech","id":40},{"value":"41","text":"Statistics","id":41},{"value":"42","text":"Survey of literature","id":42},{"value":"43","text":"Technical drawing","id":43},{"value":"45","text":"Thesis","id":45},{"value":"46","text":"Videorecording","id":46},{"value":"47","text":"Web site","id":47},{"value":"60","text":"Book","id":60},{"value":"61","text":"Book chapter","id":61},{"value":"62","text":"Article","id":62},{"value":"63","text":"Poster","id":63},{"value":"64","text":"Monograph","id":64},{"value":"65","text":"Database-spatial","id":65},{"value":"66","text":"Pamphlet","id":66},{"value":"67","text":"Manuscript","id":67},{"value":"117","text":"Federal Government Series","id":117},{"value":"118","text":"State/Local Government Series","id":118},{"value":"119","text":"Organization Series","id":119},{"value":"120","text":"Other Government Series","id":120},{"value":"121","text":"Journal","id":121}]
	}


	ctx._urlBase  = 'mypubs_services/lookup/'
	ctx._mimeJson = '?mimetype=json'

	ctx._url = function(type) {
		return ctx._urlBase + type + ctx._mimeJson
	}


	ctx._fetch = function(type, component) {
		$http({method: 'GET', url: ctx._url(type)})

		.success(function(data, status, headers, config) {
			ctx._apply(type, data, component)
		})
		.error(function(data, status, headers, config) {
			Notifier.error("Server not available.")
		});		
	}


	ctx._apply = function(type, json, component) {
		try {
			var values = angular.fromJson(json)
			// store in cache
			ctx._cache[type] = values
			// apply to the component
			component.setValues(values)
		} catch (e) {
			Notifier.error("Invalid values from server.")
		}
	}


	ctx.affixMultiselect = function(type, component) {
		component.options = {
			multiple: true,
			query: function (query) {
				var proxy = {
					setValues : function(options) {
						if (options && options[0]
						 && options[0].id!==options[0].value) {
							angular.forEach(options, function(option){
								option.id=option.value
							})
						}
						query.callback({ results: options });
					}
				}
				ctx.get(type, proxy)
			},
			initSelection: function (element, callback) {
				var val = $(element).select2('val')
				var results = []

				var proxy = {
					setValues : function(options) {
						angular.forEach(val, function(v){
							var partial = _.where(options, {value: v.value});
							results.push.apply(results, partial)
						})
						callback(results);
					}
				}
			}
		};
	}


	ctx.fetchOptions = function(type, options) {
		if ( angular.isDefined(options) && options.length > 0 ) {
			return
		}
		var proxy = {
			setValues : function(fOptions) {
				options.push.apply(options, fOptions)
			}
		}
		ctx.get(type, proxy)
		return options
	}


	ctx.affixAjax = function(type, component) {
		component.ajax = {
			url: ctx._url(type),
			data   : function (term, page) {
				return {}; // query params go here
			},
			results: function (data, page) {
				return {results: data};
			},
			error  : function() {
				Notifier.error("Server Error.")
			}
		}
	}


}])

}) ()

//https://cida-eros-pubsdev.er.usgs.gov:8443/mypubs_services/lookup/publicationtype?mimetype=json
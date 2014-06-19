(function() {


angular.module('pw.fetcher',[])
.service('PublicationFetcher', function() {


	this.getById = function(pubId) {
		var pub = { // TODO to be fetched
			pid  : "700000000",
			idx  : "otr8068900",
			public_date    : "05/28/2014", // 6/17/14
			pub_type       : "2",
			series_title   : "",
			subseries      : "Climate change adaption Series",
			series_number  : "2012-1234",
			collaborators  : "ABC",
			abstract       : "This is an entry. The quick brown fox jumps over the lazy dog. Sally sells sea shells at the sea shore.",
			usgs_citation  : "This is an entry. The quick brown fox jumps over the lazy dog. Sally sells sea shells at the sea shore.",
		}
		return pub
	}


	this.getByFilter = function(filter) {
		return {}
	}

})


}) ()

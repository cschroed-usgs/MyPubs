(function() {


angular.module('pw.links',['pw.lookups'])

    .controller('linksCtrl',
	['$scope', 'LookupFetcher', function($scope, LookupFetcher) {

		var getEmptyLink = function(links) {
		    var newRank;
		    if (links.length === 0) {
			newRank = 1;
		    }
		    else {
			newRank = _.max(links, function(link) { return link.rank; }).rank + 1;
		    }

		    return {
			id : '',
			rank : newRank,
			type : {},
			url : '',
			text : '',
			size : '',
			mime_type : {},
			description : ''
		    };
		};

		var updateRank = function(links) {
		    var i;
		    var result = links;
		    for (i = 0; i < result.length; i++) {
			result[i].rank = i + 1;
		    }
		    return result;
		};

		if (angular.isUndefined($scope.pubData.links)) {
		    $scope.pubData.links = [];
		}
		$scope.pubData.links = _.sortBy($scope.pubData.links, 'rank');

		// Fetch the link lookups for link type and file type
//		LookupFetcher.promise('linktypes').then(function(response) {
		    $scope.linkTypeOptions = [{id : 1, text: 'Text1'}];//response.data;
//		});
//		LookupFetcher.promise('linkfiletypes').then(function(response) {
		    $scope.fileTypeOptions = [{id : 1, text : 'Text2'}]; //response.data;
//		});

		$scope.sortOptions = {
		    stop : function(e, ui) {
			//Update rank
			$scope.pubData.links = updateRank($scope.pubData.links);
		    }
		};

		$scope.addNewLink = function() {
		    $scope.pubData.links.push(getEmptyLink($scope.pubData.links));
		};

		$scope.deleteLink = function(index) {
		    $scope.pubData.links.splice(index, 1);
		    $scope.pubData.links = updateRank($scope.pubData.links);
		};
	}]);
}) ();

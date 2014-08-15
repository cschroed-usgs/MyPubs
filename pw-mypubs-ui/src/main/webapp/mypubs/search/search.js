(function() {


angular.module('pw.search', ['ngRoute', 'ngGrid', 'pw.fetcher'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Search', {
			templateUrl: 'mypubs/search/search.html',
			controller: 'searchCtrl'
		})
	}
])

.controller('searchCtrl', [ '$scope', '$location', 'PublicationFetcher', function($scope, $location, fetcher) {
	$scope.search = function(searchTerm, listIds, pageSize, pageStartRow) {
		fetcher.searchByTermAndListIds(searchTerm, listIds, pageSize, pageStartRow).then(function(httpPromise){
			$scope.pubs = httpPromise.data.records;
			$scope.recordCount = httpPromise.data.recordCount;
	    });
		$scope.searchTerm = searchTerm; //apply search term to scope so template updates
	};
	
	$scope.toggleSearch = function(searchTerm) {
		alert("toggle search mode!");
	};
	
	$scope.addPubList = function() {
		alert("function to add pub list");
	};
	
	$scope.moreListOptions = function() {
		alert("function to present more pub list options");
	};
	
	$scope.editSelectedPublication = function() { 
		if($scope.selectedPubs.length == 1) {
			$location.path("/Publication/" + $scope.selectedPubs[0].id);
		} else {
			//TODO use better messaging display
			alert("You must select one, and only one, publication to edit.");
		} 
	};
	$scope.removeSelectedPublicationsFromLists = function() { alert("function to remove selected pubs from selected lists"); };
	$scope.morePublicationOptions = function() { alert("function for more pub options"); };
	
    $scope.selectedPubsLists = [];
	$scope.pubsListGrid = {
	        data: 'pubsLists',
	        selectedItems: $scope.selectedPubsLists,
	        columnDefs: [
	                     {field:'name', displayName:'Name'},
	                     {field:'description', displayName:'Description'}]
	    };
	$scope.$watch('selectedPubsLists', function (newVal, oldVal) {
		//create array of listIds
		var listIds = [];
		if($scope.selectedPubsLists) {
			for(var i in $scope.selectedPubsLists) {
				listIds.push($scope.selectedPubsLists[i].id);
			}
		}
		$scope.search($scope.searchTerm, listIds);
    }, true);
	
    $scope.selectedPubs = [];
	$scope.pubsGrid = {
        data: 'pubs',
        selectedItems: $scope.selectedPubs,
        columnDefs: [{field:'publicationType', displayName:'Type', width: 60},
                     {field:'seriesTitle', displayName:'USGS Series', width: 100},
                     {field:'seriesNumber', displayName:'Report Number', width: 110},
                     {field:'year', displayName:'Year', width: 50},
                     {field:'title', displayName:'Title', width: 200},
                     {field:'authors', displayName:'Author', width: 175}], 
        enableSorting: false,
        showFooter: true,
        totalServerItems: 'recordCount'
    };
	
	//TODO load these lists
	$scope.pubsLists = [];
	$scope.pubs = [];
	
	$scope.search();
}])


}) ()

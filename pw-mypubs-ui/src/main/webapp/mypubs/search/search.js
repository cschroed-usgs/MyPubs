(function() {
var DEFAULT_PAGE_SIZE = 15;

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
	$scope.pubsLists = []; //TODO load these lists with future functionality
	$scope.pubs = [];
	
	$scope.searchClick = function(searchTermField) {
		$scope.searchTerm = searchTermField; //a way for us to not update the model until we get a click
		$scope.search();
	};
	
	$scope.search = function() {
		$scope.pubs = {}; //clear grid for loader
		$scope.pubsGrid.ngGrid.$root.addClass("pubs-loading-indicator");
		
		var searchTerm = $scope.searchTerm;
		
		//create array of listIds
		var listIds = [];
		if($scope.selectedPubsLists) {
			for(var i in $scope.selectedPubsLists) {
				listIds.push($scope.selectedPubsLists[i].id);
			}
		}
		
		var pageSize = $scope.pagingState.pageSize;
		
		var currentPage = $scope.pagingState.currentPage
		var startRow = (currentPage - 1) * pageSize;
		fetcher.searchByTermAndListIds(searchTerm, listIds, pageSize, startRow).then(function(httpPromise){
			$scope.pubs = httpPromise.data.records;
			$scope.recordCount = httpPromise.data.recordCount;
			$scope.selectedPubs.length = 0; //clear selections, for some reason, ngGrid/angular needs a reference to the original array to keep the watch valid
			$scope.pubsGrid.ngGrid.$root.removeClass("pubs-loading-indicator");
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
		$scope.search();
    }, true);
	
    $scope.selectedPubs = [];
    $scope.pagingState = {
        pageSizes: [15, 25, 50, 100],
        pageSize: DEFAULT_PAGE_SIZE,
        currentPage: 1
    };
	$scope.pubsGrid = {
        data: 'pubs',
        selectedItems: $scope.selectedPubs,
        columnDefs: [{field:'publicationType', displayName:'Type', width: 60},
                     {field:'seriesTitle', displayName:'USGS Series', width: 100},
                     {field:'seriesNumber', displayName:'Report Number', width: 125},
                     {field:'year', displayName:'Year', width: 50},
                     {field:'title', displayName:'Title'},
                     {field:'authors', displayName:'Author', width: 175,
                    	 cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>' +
                    		 '<authors ng-show="COL_FIELD.length"><author ng-repeat="auth in COL_FIELD ">{{auth.given}} {{auth.family}};</author> </authors>' + 
                    		 '</span></div>'}], 
        enableSorting: false,
        enableColumnResize: true,
        showFooter: true,
        totalServerItems: 'recordCount',
        enablePaging: true,
        pagingOptions: $scope.pagingState
    };
	$scope.$watch('pagingState', function (newVal, oldVal) {
    	$scope.search();
    }, true);
}]);
}) ();

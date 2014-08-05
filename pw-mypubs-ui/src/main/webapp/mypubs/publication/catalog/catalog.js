(function() {

	angular.module('pw.catalog', [])
		.controller('catalogCtrl', [
			'$scope',
			function($scope) {

				$scope.productDescription = '';
				$scope.numberOfPages = '';
				$scope.pageFirst = '';
				$scope.pageLast = '';
				$scope.onlineOnly = 'N';
				$scope.additionalOnlineFiles = 'N';
				$scope.temporalStart = '';
				$scope.temporalEnd = '';
				$scope.notes = '';
				if (!_.isEmpty($scope.pubData)) {
					$scope.productDescription = $scope.pubData.productDescription;
					$scope.numberOfPages = $scope.pubData.numberOfPages;
					$scope.pageFirst = $scope.pubData.pageFirst;
					$scope.pageLast = $scope.pubData.pageLast;
					$scope.onlineOnly = $scope.pubData.onlineOnly;
					$scope.additionalOnlineFiles = $scope.pubData.additionalOnlineFiles;
					$scope.temporalStart = $scope.pubData.temporalStart;
					$scope.temporalEnd = $scope.pubData.temporalEnd;
					$scope.notes = $scope.pubData.notes;
				}
			}]);
}) ();
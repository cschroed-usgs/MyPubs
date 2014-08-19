(function() {
	angular.module('pw.modal', ['ui.bootstrap.modal'])
	.service('PubsModal', ['$rootScope', '$modal', function($rootScope, $modal) {
		this.alert = function (title, message, ctrl) {
			$rootScope.modalOptions = {};
			$rootScope.modalOptions.title = title;
			$rootScope.modalOptions.message = message;

			$rootScope.modalInstance = $modal.open({
				templateUrl: 'mypubs/modal/alert.html',
				size: 'lg'
			});
			
			$rootScope.ok = function(){
				$rootScope.modalInstance.close();
			};
		};
	}]);

}) ();
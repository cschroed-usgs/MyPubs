(function() {


var mypubs = angular.module('pw.mypubs', [
		'ngRoute','ui.select2','ui.bootstrap', 'ui.tinymce', 'ngAnimate', 'ui.sortable',// angular util modules
		'pw.pubHeader', 'pw.notify', 'pw.menu', 'pw.fetcher',// pw util modules
		'pw.home','pw.search', 'pw.publication', 'pw.reservation', // mypubs pages
		'ui.bootstrap.datetimepicker' //datetimepicker
	])
	.constant('APP_CONFIG', {})
	.controller('mainCtrl', ['$scope', '$log', '$location',
		function ($scope, $log, $location) {
			$scope._show = 'Preview' ;// TODO index.html must compare to this when preview is impl
		
			$scope.show = function(show) {
				if ( angular.isUndefined(show) ) {
					return $scope._show;
				}
				return $scope._show = show;
			};
	}])
	// nice utility directive
	.directive('preventDefault', function() {
		return function(scope, element, attrs) {
			$(element).click(function(event) {
				event.preventDefault();
			});
		};
	}).run(function(APP_CONFIG) {
		//TODO, this might be hackish, no guarantees the constants will be set before other parts of the app needs them.
		var initInjector = angular.injector(['ng']);
		var $http = initInjector.get('$http');
		$http({method: 'GET', url: 'service/configuration/props'})
			.success(function(data, status, headers, config) {
				angular.extend(APP_CONFIG, data);
			});
	});

	
}) ();

(function() {


var mypubs = angular.module('pw.mypubs', [
		'ngRoute', 'ngGrid','ui.select2','ui.bootstrap', 'ui.tinymce', 'ngAnimate', 'ui.sortable',// angular util modules
		'pw.pubHeader', 'pw.notify', 'pw.fetcher',// pw util modules
		'pw.home','pw.search', 'pw.publication', 'pw.reservation', // mypubs pages
		'ui.bootstrap.datetimepicker' //datetimepicker

	]);
	if(angular.isDefined(window.PUBS) && angular.isDefined(PUBS.constants)){
		mypubs.constant('APP_CONFIG', PUBS.constants); //this is a bit of a hack/magic. This constant is injected into the HTML using JSP (index.jsp + constants.jsp)
	}
	mypubs.controller('mainCtrl', ['$scope', '$log', '$location',
		function ($scope, $log, $location) {
			$scope.show = function(show) {
				if ( angular.isUndefined(show) ) {
					return $scope._show;
				}
				return $scope._show = show;
			};
	}]);
	
	// nice utility directive
	mypubs.directive('preventDefault', function() {
		return function(scope, element, attrs) {
			$(element).click(function(event) {
				event.preventDefault();
			});
		};
	});
	
}) ();

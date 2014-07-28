(function() {


angular.module('pw.mypubs', [
	'ngRoute','ui.select2','ui.bootstrap', 'ui.tinymce', 'ngAnimate', 'ui.sortable',// angular util modules
	'pw.pubHeader', 'pw.notify', 'pw.menu', 'pw.fetcher',// pw util modules
	'pw.home','pw.search', 'pw.publication', 'pw.reservation' // mypubs pages
])
    .constant('APP_CONFIG', {
        endpoint : 'https://cida-eros-pubsdev.er.usgs.gov:8443/pubs-services/'
    })

.controller('mainCtrl', [
'$scope', '$log', '$location',
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
})

}) ();

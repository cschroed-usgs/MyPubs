(function() {


angular.module('pw.reservation', ['ngRoute'])


.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/Reservation', {
			templateUrl: 'mypubs/reservation/reservation.html',
			controller: 'reservationCtrl'
		})
	}
])


.controller('reservationCtrl', [ '$scope', function($scope) {

}])


}) ()

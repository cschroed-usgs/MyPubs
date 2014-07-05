(function() {


angular.module('pw.menu', [])


.directive('pwMenu',[ function() {

	var menu = {
		restrict    : 'E', //AEC
		replace     : true,
		transclude  : true,
		templateUrl : "mypubs/menu/menu.html",

		controller : function($scope) {

			$scope.menuLeft = [
				{
					name  : "Home",
				},
				{
					name  : "Search",
					enable: true,
				},
				{
					name  : "Publication",
					enable: true,
				},
				{
					name  : "Reservation",
					enable: true,
				},
			]

			$scope.menuRight = [
				{
					name : "Login",
					show : false,
				},
				{
					name : "Logout",
					show : true,
				},
			]

			$scope.menu = {
				selected : $scope.menuLeft[0].name,
				login : false
			}

			$scope.$watch('menu.selected', function(){
				if ($scope.menu.selected === 'Login') {
					$scope.menu.login = true
				} else if ($scope.menu.selected === 'Logout') {
					$scope.menu.login = false
				}
			})

			$scope.isLogin = function() {
				return $scope.menu.login
			}
			$scope.showOnLogin = function(show) {
				if (show === undefined) {
					return true // always show
				}
				// show when login state matches requests state
				return  show === $scope.isLogin()
			}
		},

		link : function($scope, el, attrs) {
			// this is the button group scope not each ngRepeat scope
		}
	}

	return menu
}])

})()
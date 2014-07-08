(function() {


angular.module('pw.menu', [])


.directive('pwMenu',[ function() {

	var menu = {
		restrict    : 'E', //AEC
		replace     : true,
		transclude  : true,
		templateUrl : "mypubs/menu/menu.html",

		controller : function($scope, $location) {

			// sets the angular path on the url location hash
			$scope.setRoute = function(routeName) {
				$location.path('/' + routeName)
			}

		},

		link : function($scope, el, attrs) {
			// this is the button group scope not each ngRepeat scope

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
				login : true // TODO
			}


			var menuBoth = []
			menuBoth.push.apply(menuBoth, $scope.menuLeft)
			menuBoth.push.apply(menuBoth, $scope.menuRight)

			var menuState = function() {
				angular.forEach(menuBoth, function(btn){
					btn.state = angular.isUndefined(btn.enable) || btn.enable && $scope.isLogin() ?'':'disabled'
				})
				// let the state take effect then respond to it
				setTimeout(function(){
					$(el.find('button')).removeAttr('disabled')
					$(el.find('.disabled')).attr('disabled',true)
				},0)
			}


			$scope.$watch('menu.selected', function(){
				if ($scope.menu.selected === 'Login') {
					$scope.menu.login = true // TODO
				} else if ($scope.menu.selected === 'Logout') {
					$scope.menu.login = false
				}
				menuState()
				$scope.setRoute($scope.menu.selected)
			})


			$scope.isLogin = function() {
				return $scope.menu.login
			}
			$scope.showOnLogin = function(show) {
				if ( angular.isUndefined(show) ) {
					return true // always show
				}
				// show when login state matches requests state
				return  show === $scope.isLogin()
			}

		}
	}

	return menu
}])

})()
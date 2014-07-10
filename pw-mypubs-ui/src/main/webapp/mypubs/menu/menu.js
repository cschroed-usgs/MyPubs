(function() {


angular.module('pw.menu', ['pw.auth'])


.directive('pwMenu',['Authentication', function(Auth) {

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
			}


			var menuBoth = []
			menuBoth.push.apply(menuBoth, $scope.menuLeft)
			menuBoth.push.apply(menuBoth, $scope.menuRight)

			var menuState = function() {
				angular.forEach(menuBoth, function(btn) {
					if ( angular.isDefined(btn.enable) ) {
						btn.state = (btn.enable && Auth.isLoggedIn()) ?'' :'disabled'
					}
				})
				// let the state take effect then respond to it by applying the disabled="true" attr
				setTimeout(function(){
					$(el.find('button')).removeAttr('disabled')
					$(el.find('.disabled')).attr('disabled',true)
				},0)
			}

			$scope.$on('logged-out', function(){
				menuState()
			})
			$scope.$on('logged-in', function(){
				menuState()
			})
			$scope.$watch('menu.selected', function() {
				$scope.setRoute($scope.menu.selected)
			})


			$scope.isLogin = function() {
				return Auth.isLoggedIn()
			}
			$scope.showOnLogin = function(show) {
				if ( angular.isUndefined(show) ) {
					return true // always show by default
				}
				// show when login state matches requests state
				return  show === $scope.isLogin()
			}

			menuState() // init state to logged-in state
		}
	}

	return menu
}])

})()

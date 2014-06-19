(function() {


var mod = angular.module('pw.tabs', [])


mod.directive('pwTabs', function() {

	var _this = {
		restrict   : 'E', //AEC
		replace    : true,
		transclude : true,
		templateUrl: 'templates/tabs.html',

		setActive  : function(tabName) {
			_this.activeTab = tabName
		},
		getActive  : function() {
			return _this.activeTab
		},

		controller : function($scope) {
			$scope.setTab = function(tabName) {
				$scope.setRoute(tabName)
				_this.setActive(tabName)
			}
			
			$scope.isActive = function(tabName) {
				return tabName === _this.getActive()
			}
		},

		link : function($scope, el, attrs) {
			$scope.tabs = attrs.names.split(',')
			if (attrs.active) {
				_this.setActive(attrs.active)
			} else {
				_this.setActive($scope.tabs[0])
			}
		}
	}

	return _this
})


}) ()


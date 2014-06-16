(function() {


var mod = angular.module('pubsTab', []);


mod.directive('pubsTabs', function() {

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
			_this.setActive(attrs.active)
		}
	}

	return _this;
})


}) ();


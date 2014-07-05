(function() {


var mod = angular.module('pw.tabs', [])


mod.directive('pwTabs', function() {

	var pwTabs = {
		
		restrict   : 'E', //AEC
		replace    : true,
		transclude : true,
		templateUrl: 'mypubs/tabs/tabs.html',

		setActive  : function(tabName) {
			pwTabs.activeTab = tabName
		},
		getActive  : function() {
			return pwTabs.activeTab
		},

		controller : function($scope) {
			$scope.setTab = function(tabName) {
				$scope.show('Preview')
				$scope.setRoute(tabName)
				pwTabs.setActive(tabName)
			}
			
			$scope.isActive = function(tabName) {
				return tabName === pwTabs.getActive()
			}
		},

		link : function($scope, el, attrs) {
			$scope.tabs = attrs.names.split(',')
			if (attrs.active) {
				pwTabs.setActive(attrs.active)
			} else {
				pwTabs.setActive($scope.tabs[0])
			}
		}
	}

	return pwTabs
})


}) ()


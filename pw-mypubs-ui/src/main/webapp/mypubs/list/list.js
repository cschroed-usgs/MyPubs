(function() {


var mod = angular.module('pw.list', [])


mod.directive('pwList', ['$compile', function($compile) {

	var pwList = {
		restrict     : 'AEC', //AEC
		replace      : true,
		transclude   : true,
//		scope        : true,
		scope        : {
			entries  : "=entries",
			Entries  : "=service",
			type: "=type",
		},
		templateUrl: 'mypubs/list/list.html',

		controller  : function($scope) {
//console.log($scope.type)

			$scope.isNewEntry  = false
			$scope.aNewEntry   = {}
			var Entries = $scope.Entries

			$scope.newEntry = function() {
				if ( $scope.isNewEntry ) {
					return
				}

				$scope.aNewEntry  = Entries.newEntry()
				$scope.isNewEntry = true

				$scope.$watch('aNewEntry', function(entry) {
					if ( $scope.isDirty(entry) ) {
						$scope.isNewEntry = false
					}
				}, true)
			}

			$scope.remove = function(id) {
				if (id===$scope.aNewEntry.id) {
					$scope.isNewEntry = false
				}
				$scope.entries = Entries.remove(id)
			}

			$scope.reorderBefore = function(id) {
				Entries.reorder(id,-1)
			}
			$scope.reorderAfter = function(id) {
				Entries.reorder(id,+1)
			}

			$scope.startDnd  = function(index) {
				$scope.indexDrag = index
			}
			$scope.reoderDnd = function(end) {
				var start = $scope.indexDrag

				if ( start === undefined ) {
					return
				}

				if ( $(".dnd-over-top").length ) {
					end -= 0.5 // insert above drop location
				} else {
					end += 0.5 // insert below drop location
				}
				var entry = Entries.findIndexByOrder(start)
				var inc   = (((end-start) < 1) ?-1 :+1)

				while ( (inc<0 && start+inc > end) || (inc>0 && start+inc < end) ) {
					Entries.reorder( entry.id, inc)
					start += inc
				}
				$scope.indexDrag = undefined
			}

		},

		link : function($scope, el, attrs, ctrl, transclude) {
			// $scope.isNewEntry  = false
			// $scope.aNewEntry   = {}

			transclude($scope, function(inner) {
				$scope.listEntry = inner
			})

		}
	}

	return pwList
}])


mod.directive('pwListEntry', function($compile) {
    return {
		transclude  : true,
        link: function($scope, element, attrs, ctrl, $transclude){
            $transclude($scope, function(inner) {              
                element.append($compile($scope.listEntry.clone())($scope) );
            });
        }
    }

})

}) ()

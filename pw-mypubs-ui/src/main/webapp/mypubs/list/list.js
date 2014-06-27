(function() {


var mod = angular.module('pw.list', ['pw.dragdrop'])


mod.directive('pwList', function() {

	var pwList = {
		replace      : true,
		transclude   : true,
		templateUrl: 'mypubs/list/list.html',
		scope        : {
			entries    : '=',
			Entries    : "=service",
			type       : '=',
			entryHeight: '=',
		},
		templateUrl: 'mypubs/list/list.html',

		controller  : function($scope) {

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

	}

	return pwList
})


mod.directive('pwListEntry', function(){
    return {
        link: function(scope, element, attrs, ctrl, transclude){
            transclude(scope, function(inner) {              
                element.append(inner);
            });
        }
    }
});

}) ()

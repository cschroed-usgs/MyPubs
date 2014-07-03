(function() {


var mod = angular.module('pw.list', ['pw.dragdrop'])


mod.directive('pwList', ['$parse', function($parse) {

	var pwList = {
		replace      : true,
		transclude   : true,
		scope        : true,
		templateUrl  : 'mypubs/list/list.html',

		link : function($scope, $el, $attrs) {
			pwList.service     = $scope[$attrs.service]
			$scope.entries     = $scope[$attrs.entries]
			$scope.typeLabel   = $parse($attrs.typeLabel)()
			$scope.entryHeight = $parse($attrs.entryHeight)()
			$scope.rowHeight   = ($scope.entryHeight) + 'px'
			$scope.rowWidth    = $parse($attrs.entryWidth)() + 'px'
			$scope.controlsLeft= $attrs.controlsAlign === 'left'
			$scope.hideButton  = $attrs.hideButton && $attrs.hideButton !== 'false'
		},

		controller   : function($scope) {

			$scope.isNewEntry  = {val:false}
			$scope.aNewEntry   = {}

			$scope.newEntry = function() {
				if ( $scope.isNewEntry.val ) {
					return
				}

				$scope.aNewEntry  = pwList.service.newEntry()
				$scope.isNewEntry.val = true

				$scope.$watch('aNewEntry', function(entry) {
					if ( $scope.isDirty(entry) ) {
						$scope.isNewEntry.val = false
					}
				}, true)
			}

			$scope.remove = function(id) {
				if (id===$scope.aNewEntry.id) {
					$scope.isNewEntry.val = false
				}
				$scope.entries = pwList.service.remove(id)
			}

			$scope.reorderBefore = function(id) {
				pwList.service.reorder(id,-1)
			}
			$scope.reorderAfter = function(id) {
				pwList.service.reorder(id,+1)
			}

			$scope.startDnd  = function(index) {
				$scope.indexDrag = index
			}
			$scope.reoderDnd = function(end) {
				var start = $scope.indexDrag

				if ( start === undefined || end === undefined
					|| end < 0 || end >= $scope.entries.length ) {
					return
				}
				var entry = pwList.service.findEntryByOrder(start)

				if ( $(".dnd-over-top").length ) {
					end -= 0.5 // insert above drop location
				} else {
					end += 0.5 // insert below drop location
				}

				var inc   = (((end-start) < 1) ?-1 :+1)
				// bi-directional loop
				while ( (inc<0 && start+inc > end) || (inc>0 && start+inc < end) ) {
					pwList.service.reorder( entry.id, inc)
					start += inc
				}
				$scope.indexDrag = undefined
			}

			$scope.entryTop   = function(count) {
				return (count * $scope.entryHeight) + 'px'
			}
			$scope.listHeight  = function() {
				return ($scope.entries.length * $scope.entryHeight) + 'px'
			}
			$scope.controlsAlignment = function() {
				return 'list-reorder-handle-' + ($scope.controlsLeft ?'left' :'right')
			}
			$scope.controlsTop = function() {
				return (-$scope.entryHeight/2 -14) + 'px'
			}

		},

	}

	return pwList
}])


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

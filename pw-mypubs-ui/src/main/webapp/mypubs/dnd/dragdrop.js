(function() {


var mod = angular.module('pw.dragdrop', []);


// prevent other drag-drop actions from triggering here
// no DND from OS or other stay items from the page
mod.value('DragStarted',{is:false})


mod.directive('pwDraggable', ['DragStarted', function(DragStarted) {
    return { restrict : 'A',
        link: function($scope, element, attributes) {
            var el = element[0];

            el.draggable = true;

            el.addEventListener('dragstart', function(e) {
                DragStarted.is = true;
                this.classList.add('dnd-drag');

                $scope.$apply(attributes.drag);

                return false;
            }, false);

            el.addEventListener('dragend', function(e) {
                DragStarted.is = false;
                this.classList.remove('dnd-drag');

                return false;
            }, false);
        }
    }
}]);


mod.directive('pwDroppable', ['DragStarted', function(DragStarted) {
    var removeDndClasses = function(el) {
        el.classList.remove('dnd-over');
        el.classList.remove('dnd-over-top');
        el.classList.remove('dnd-over-bottom');
    }

    return { restrict : 'A',
        link: function($scope, element, attributes) {
            var el = element[0];

            el.addEventListener('dragover', function(e) {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                if ( ! DragStarted.is ) {
                    return
                }

                var top    = $(this).offset().top
                var height = $(this).height()

                this.classList.add('dnd-over');
                if ( e.pageY - top < height/2 ) {
                    this.classList.add('dnd-over-top');
                    this.classList.remove('dnd-over-bottom');
                } else {
                    this.classList.remove('dnd-over-top');
                    this.classList.add('dnd-over-bottom');
                }

                return false;
            }, false);

            el.addEventListener('dragleave', function(e) {
                removeDndClasses(this);

                return false;
            }, false);

            el.addEventListener('drop', function(e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if ( ! DragStarted.is ) {
                    removeDndClasses(this);
                    return
                }

                $scope.$apply(attributes.drop);

                removeDndClasses(this);

                return false;
            }, false);
        }
    }
}]);


}) ()


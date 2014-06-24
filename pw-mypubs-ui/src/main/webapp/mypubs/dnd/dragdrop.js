var mod = angular.module('pw.dragdrop', []);


mod.service('dragTarget',function() {
    var ctx = this
    ctx.get = function() {
        return ctx.dragTarget
    }
    ctx.set = function(el) {
        ctx.dragTarget = $(el)
    }
});


mod.directive('pwDraggable', ['dragTarget', function (dragTarget) {
    return {
        restrict : 'A',
        link: function ($scope, element, attributes) {
            var el = element[0];

            el.draggable = true;

            el.addEventListener('dragstart', function (e) {
                //console.log('dragstart')
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.clearData('Text');
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('dnd-drag');

                dragTarget.set(el);
                $scope.$apply(attributes.drag);

                return false;
            }, false);

            el.addEventListener('dragend', function (e) {
                //console.log('dragend')
                this.classList.remove('dnd-drag');
                return false;
            }, false);
        }
    }
}]);


mod.directive('pwDroppable',  ['dragTarget', function (dragTarget) {
    return {
        restrict : 'A',
        link: function ($scope, element, attributes) {
            var el = element[0];

            el.addEventListener('dragover', function (e) {
                e.dataTransfer.dropEffect = 'move';

                if (e.preventDefault) {
                    e.preventDefault();
                }

                var py = e.pageY
                var ty = $(this).offset().top
                var hy = $(this).height()

                this.classList.add('dnd-over');
                if ( py-ty < hy/2 ) {
                    this.classList.add('dnd-over-top');
                    this.classList.remove('dnd-over-bottom');
                } else {
                    this.classList.remove('dnd-over-top');
                    this.classList.add('dnd-over-bottom');
                }

                return false;
            }, false);

            el.addEventListener('dragenter', function (e) {
                this.classList.add('dnd-over');
                return false;
            }, false);

            el.addEventListener('dragleave', function (e) {
                this.classList.remove('dnd-over');
                this.classList.remove('dnd-over-top');
                this.classList.remove('dnd-over-bottom');

                return false;
            }, false);

            el.addEventListener('drop', function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }

                $scope.$apply(attributes.drop);

                this.classList.remove('dnd-over');
                this.classList.remove('dnd-over-top');
                this.classList.remove('dnd-over-bottom');

                return false;
            }, false);
        }
    }
}]);

(function() {


angular.module('pw.notify',[])


.directive('pwNotify', function() {

	return {
		restrict   : 'E', //AEC
		replace    : true,
		transclude : true,
		scope      : true,
		templateUrl: 'mypubs/notify/notify.html',
	}

})


.service('Notifier', ['$rootScope', function($rootScope) {

	var ctx = this

	ctx._msgs = [] // should this be an angular.value?


	ctx.getMsgs = function() {
		return ctx._msgs
	}


	ctx.remove = function(index) {
		ctx._msgs.splice(index, 1)
	}


	ctx.notify = function(msg, type) {
		ctx._msgs.push({
			type: type,
			text: msg
		})
		$rootScope.$broadcast('notifier')
	}


	// informative messages are success in ui-bootstrap
	ctx.info = function(msg) {
		ctx.notify(msg, 'success')
	}
	

	// warn is the default in ui-bootstrap
	ctx.warn = function(msg) {
		ctx.notify(msg)
	}


	// erro messages are danger in ui-bootstrap
	ctx.error = function(msg) {
		ctx.notify(msg, 'danger')
	}

}])


.controller('notifyCtrl', ['$scope','Notifier', function($scope, Notifier) {

	$scope.msgs = Notifier.getMsgs()


	$scope.$on('notifier', function() {
		//defer scope application in case already $digesting
        $timeout(function($scope){
            $scope.$apply();
        }, 0, false);//final boolean parameter ensures function call is not wrapped in its own $apply function
	});


	$scope.close = function(index) {
		Notifier.remove(index)
	}

}])


}) ()

(function() {

angular.module('pw.pubHeader', [])
    .directive('pwPubheader', function() {
        var _this = {
                restrict   : 'E', //AEC
                replace    : true,
                transclude : true,
                scope      : true,
                templateUrl: 'mypubs/publication/header/header.html'
        };
        return _this;
    })

    .controller('pubHeaderCtrl', [
    '$scope', function ($scope) {

        var pubData = $scope.pubData;
        console.log(pubData);

        if ( angular.isDefined(pubData.displayToPublicDate) ) {
            //write out new date property as a date object
            $scope.date = new Date(pubData.displayToPublicDate);
        }
		$scope.$watch('date', function(newValue){
			pubData.displayToPublicDate = newValue;
		});
                        
    }]);
}) ();

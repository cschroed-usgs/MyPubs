/* global angular console */
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
		var dateForScope;
        if ( angular.isDefined(pubData.displayToPublicDate) && pubData.displayToPublicDate.length !== 0) {
            //write out new date property as a date object
            dateForScope = new Date(pubData.displayToPublicDate);
        }
		else{
			dateForScope = new Date();
		}
		$scope.date = dateForScope;
		$scope.$watch('date', function(newValue){
			pubData.displayToPublicDate = newValue;
		});
                        
    }]);
}) ();

(function() {


angular.module('pw.bibliodata',['pw.dataRow','pw.fetcher', 'pw.lookups'])
    .controller('biblioCtrl', [
        '$scope', 'PublicationFetcher', 'LookupFetcher',
        function ($scope, PublicationFetcher, LookupFetcher) {

            var pubData = PublicationFetcher.get();
            $scope.type;
            $scope.genre;
            if (pubData.properties) {
                $scope.type = pubData.properties.type;
            }

            LookupFetcher.promise('publicationtypes').then(function(response) {
                $scope.typeOptions = response.data;

            });

            $scope.subtypeSelect2Options = {
                query : function(query) {
                    LookupFetcher.promise('publicationsubtypes', {publicationtypeid : $scope.type}).then(function(response) {
                        var data = {results: []};
                        angular.forEach(response.data, function(option) {
                            data.results.push({id : option.value, text : option.text});
                        });
                        query.callback(data);
                    });
                },
                initSelection : function(element, callback) {
                    $scope.genre = pubData.properties.genre;
                    LookupFetcher.promise('publicationsubtypes', {publicationtypeid : $scope.type}).then(function(response) {
                        var items = _.where(response.data, {value : $scope.genre});
                        if (items.length > 0) {
                            callback({id : items[0].value, text : items[0].text});
                        }
                    });
                },
                placeholder : 'Select a publication subtype'
            };
            $scope.$watch('type', function() {
                $scope.genre = '';
            });
    }]);

}) ();

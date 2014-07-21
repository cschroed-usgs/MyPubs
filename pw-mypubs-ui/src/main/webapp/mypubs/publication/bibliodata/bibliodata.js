(function() {


angular.module('pw.bibliodata',['pw.dataRow','pw.fetcher', 'pw.lookups'])
    .controller('biblioCtrl', [
        '$scope', 'PublicationFetcher', 'LookupFetcher', 'LookupCascadeSelect2',
        function ($scope, PublicationFetcher, LookupFetcher, LookupCascadeSelect2) {

            var pubData = PublicationFetcher.get();
            $scope.type = '';
            $scope.genre = '';
            $scope.collection_title = '';
            if (pubData.properties) {
                $scope.type = pubData.properties.type.id;
                $scope.genre = pubData.properties.genre.id;
                $scope.collection_title = pubData.properties['collection-title'].id;
            }

            LookupFetcher.promise('publicationtypes').then(function(response) {
                $scope.typeOptions = response.data;

            });

            $scope.subtypeSelect2Options = {
                query : function(query) {
                    LookupCascadeSelect2.query(query, 'publicationsubtypes', {publicationtypeid : $scope.type});
                },
                initSelection : function(element, callback) {
                    LookupCascadeSelect2.initSelection('publicationsubtypes', {publicationtypeid : $scope.type}, pubData.properties.genre.id, callback);
                },
                placeholder : 'Select a publication subtype'
            };

            $scope.seriesTitleSelect2Options = {
                query : function(query) {
                    LookupCascadeSelect2.query(query, 'publicationseries', {publicationsubtypeid : $scope.genre.id});
                },
                initSelection : function(element, callback) {
                    LookupCascadeSelect2.initSelection('publicationseries', {publicationsubtypeid : pubData.properties.genre.id}, pubData.properties['collection-title'].id, callback);
                },
                placeholder : 'Select a series'
            };
            $scope.$watch('type', function(newValue, oldValue) {
                if ((oldValue) && (newValue !== oldValue)) {
                    $scope.genre = '' ;
                }
            });
            $scope.$watch('genre', function(newValue, oldValue) {
                if ((oldValue) && (newValue !== oldValue)) {
                    $scope.collection_title = '';
                }
            });

    }]);

}) ();

(function() {


angular.module('pw.bibliodata',['pw.dataRow','pw.fetcher', 'pw.lookups'])
    .controller('biblioCtrl', [
        '$scope', 'LookupFetcher', 'LookupCascadeSelect2', '$routeParams',
        function ($scope, LookupFetcher, LookupCascadeSelect2, $routeParams) {

            // This are used to control whether the change* functions are executed.
            // We don't want them to execute the first time it is fired when publication
            // data has been loaded.
            var typeInputIsInitialized = false;
            var genreInputIsInitialized = false;

            if (!$routeParams.pubsid){
                typeInputIsInitialized = true;
                genreInputIsInitialized = true;
            }

            $scope.changeType = function() {
                if (typeInputIsInitialized) {
                    $scope.pubData.genre.id = '';
                    $scope.pubData['collection-title'] = '';
                }
                else {
                    typeInputIsInitialized = true;
                }
            };

            $scope.changeGenre = function() {
                if (genreInputIsInitialized) {
                    $scope.pubData['collectionTitle'] = '';
                }
                else {
                    genreInputIsInitialized = true;
                }
            }

            LookupFetcher.promise('publicationtypes').then(function(response) {
                $scope.typeOptions = response.data;

            });

            LookupFetcher.promise('costcenters').then(function(response) {
                $scope.costCenterOptions = response.data;
            });

            $scope.subtypeSelect2Options = {
                query : function(query) {
                    LookupCascadeSelect2.query(query, 'publicationsubtypes', {publicationtypeid : $scope.pubData.type.id});
                },
                initSelection : function(element, callback) {
                    LookupCascadeSelect2.initSelection('publicationsubtypes', {publicationtypeid : $scope.pubData.type.id}, $scope.pubData.genre.id, callback);
                },
                placeholder : 'Select a publication subtype'
            };

            $scope.seriesTitleSelect2Options = {
                query : function(query) {
                    LookupCascadeSelect2.query(query, 'publicationseries', {publicationsubtypeid : $scope.pubData.genre.id});
                },
                initSelection : function(element, callback) {
                    LookupCascadeSelect2.initSelection('publicationseries', {publicationsubtypeid : $scope.pubData.genre.id}, $scope.pubData['collection-title'].id, callback);
                },
                placeholder : 'Select a series'
            };

            $scope.costCenterSelect2Options = {
                placeholder : 'Select one or more cost centers'
            };

            $scope.abstractEditorOptions = {
                menubar : false
            };
    }]);

}) ();

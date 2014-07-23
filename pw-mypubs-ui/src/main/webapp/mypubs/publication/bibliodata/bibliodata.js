(function() {


angular.module('pw.bibliodata',['pw.dataRow','pw.fetcher', 'pw.lookups'])
    .controller('biblioCtrl', [
        '$scope', 'LookupFetcher', 'LookupCascadeSelect2',
        function ($scope, LookupFetcher, LookupCascadeSelect2) {

            // This are used to control whether the change* functions are executed.
            // We don't want them to execute the first time it is fired when publication
            // data has been loaded.
            var typeInputIsInitialized = false;
            var genreInputIsInitialized = false;

            $scope.type = '';
            $scope.genre = '';
            $scope.collectionTitle = '';
            $scope.costCenters = [];
            $scope.subseriesTitle = '';
            $scope.number = '';
            $scope.chapterNumber = '';
            $scope.suChapterNumber = '';
            $scope.title = '';
            $scope.abstract = '';
            $scope.usgsCitation = '';
            $scope.language = '';
            $scope.publisher = '';
            $scope.publisherPlace = '';
            $scope.doi = '';
            $scope.issn = '';
            $scope.isbn = '';
            if (_.isEmpty($scope.pubData)){
                typeInputIsInitialized = true;
                genreInputIsInitialized = true;
            }
            else {
                $scope.type = $scope.pubData.type.id;
                $scope.genre = $scope.pubData.genre.id;
                $scope.collectionTitle = $scope.pubData['collection-title'].id;
                angular.forEach($scope.pubData['cost-center'], function(c) {
                    $scope.costCenters.push(c.id);
                });
                $scope.subseriesTitle = $scope.pubData['subseries-title'];
                $scope.number = $scope.pubData.number;
                $scope.chapterNumber = $scope.pubData['chapter-number'];
                $scope.subChapterNumber = $scope.pubData['sub-chapter-number'];
                $scope.title = $scope.pubData.title;
                $scope.abstract = $scope.pubData.abstract;
                $scope.usgsCitation = $scope.pubData['usgs-citation'];
                $scope.language = $scope.pubData.language;
                $scope.publisher = $scope.pubData.publisher;
                $scope.publisherPlace = $scope.pubData['publisher-place'];
                $scope.doi = $scope.pubData.DOI;
                $scope.issn = $scope.pubData.ISSN;
                $scope.isbn = $scope.pubData.ISBN;

                // The first time the selects are initialized I do not want the change functions to execute
                typeInputIsInitialized = false;
                genreInputIsInitialized = false;
            }

            $scope.changeType = function() {
                if (typeInputIsInitialized) {
                    $scope.genre = '';
                    $scope.collectionTitle = '';
                }
                else {
                    typeInputIsInitialized = true;
                }
            };

            $scope.changeGenre = function() {
                if (genreInputIsInitialized) {
                    $scope.collectionTitle = '';
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
                    LookupCascadeSelect2.query(query, 'publicationsubtypes', {publicationtypeid : $scope.type});
                },
                initSelection : function(element, callback) {
                    LookupCascadeSelect2.initSelection('publicationsubtypes', {publicationtypeid : $scope.type}, $scope.pubData.genre.id, callback);
                },
                placeholder : 'Select a publication subtype'
            };

            $scope.seriesTitleSelect2Options = {
                query : function(query) {
                    LookupCascadeSelect2.query(query, 'publicationseries', {publicationsubtypeid : $scope.genre.id});
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

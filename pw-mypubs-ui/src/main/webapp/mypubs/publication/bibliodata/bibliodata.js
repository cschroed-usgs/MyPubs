(function() {


angular.module('pw.bibliodata',['pw.dataRow','pw.fetcher', 'pw.lookups'])
    .controller('biblioCtrl', [
        '$scope', 'PublicationFetcher', 'LookupFetcher', 'LookupCascadeSelect2',
        function ($scope, PublicationFetcher, LookupFetcher, LookupCascadeSelect2) {

            var pubData = PublicationFetcher.get();
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
            if (!(_.isEmpty(pubData) )){
                $scope.type = pubData.type.id;
                $scope.genre = pubData.genre.id;
                $scope.collectionTitle = pubData['collection-title'].id;
                angular.forEach(pubData['cost-center'], function(c) {
                    $scope.costCenters.push(c.id);
                });
                $scope.subseriesTitle = pubData['subseries-title'];
                $scope.number = pubData.number;
                $scope.chapterNumber = pubData['chapter-number'];
                $scope.subChapterNumber = pubData['sub-chapter-number'];
                $scope.title = pubData.title;
                $scope.abstract = pubData.abstract;
                $scope.usgsCitation = pubData['usgs-citation'];
                $scope.language = pubData.language;
                $scope.publisher = pubData.publisher;
                $scope.publisherPlace = pubData['publisher-place'];
                $scope.doi = pubData.DOI;
                $scope.issn = pubData.ISSN;
                $scope.isbn = pubData.ISBN;
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
                    LookupCascadeSelect2.initSelection('publicationsubtypes', {publicationtypeid : $scope.type}, pubData.genre.id, callback);
                },
                placeholder : 'Select a publication subtype'
            };

            $scope.seriesTitleSelect2Options = {
                query : function(query) {
                    LookupCascadeSelect2.query(query, 'publicationseries', {publicationsubtypeid : $scope.genre.id});
                },
                initSelection : function(element, callback) {
                    LookupCascadeSelect2.initSelection('publicationseries', {publicationsubtypeid : pubData.genre.id}, pubData['collection-title'].id, callback);
                },
                placeholder : 'Select a series'
            };

            $scope.costCenterSelect2Options = {
                placeholder : 'Select one or more cost centers'
            };

            $scope.abstractEditorOptions = {
                menubar : false
            };

            $scope.$watch('type', function(newValue, oldValue) {
                if ((oldValue) && (newValue !== oldValue)) {
                    $scope.genre = '' ;
                }
            });
            $scope.$watch('genre', function(newValue, oldValue) {
                if ((oldValue) && (newValue !== oldValue)) {
                    $scope.collectionTitle = '';
                }
            });

    }]);

}) ();

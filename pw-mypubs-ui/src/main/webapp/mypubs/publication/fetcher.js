(function() {


angular.module('pw.fetcher',[])
    .service('PublicationFetcher', ['$http',  'APP_CONFIG', function($http, APP_CONFIG) {

        var pub = {};

        return {
            fetchPubById : function(pubId) {
                return $http.get(APP_CONFIG.endpoint + 'mppublication/' + pubId,{
                    params : {
                        mimetype : 'json'
                    }
                });
            }
        };
    }]);
}) ();

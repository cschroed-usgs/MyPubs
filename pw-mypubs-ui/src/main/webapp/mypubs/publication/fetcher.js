(function() {


angular.module('pw.fetcher',[])
    .service('PublicationFetcher', ['$http',  'APP_CONFIG', function($http, APP_CONFIG) {

        var pub = {};

        return {
            fetchPubById : function(pubId) {
                var result = undefined;
                if(pubId){
                    result = $http.get(APP_CONFIG.endpoint + 'mppublication/' + pubId,{
                        params : {
                            mimetype : 'json'
                        }
                    });
                }
                return result;
            }
        };
    }]);
}) ();

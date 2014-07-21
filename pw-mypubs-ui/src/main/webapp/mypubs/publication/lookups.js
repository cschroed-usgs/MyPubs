(function() {


angular.module('pw.lookups',['pw.notify'])

    .service('LookupFetcher', ['$http', 'Notifier', function($http, Notifier) {

        var ctx = this;

        // TODO replace with configurable end point
        ctx._urlBase  = 'https://cida-eros-pubsdev.er.usgs.gov:8443/pubs-services/lookup/';

        ctx.promise = function(lookupType, queryParams) {
            var params = queryParams ? queryParams : {};
            params.mimetype = 'json';

            return $http.get(ctx._urlBase + lookupType, {
                params : params
            }).error(function() {
                Notifier.error('Lookup service failed');
            });
        };
    }])

    .service('LookupCascadeSelect2', ['LookupFetcher', function(LookupFetcher) {
            this.query = function(query, lookupType, parent) {
                parent.text = query.term;
                LookupFetcher.promise(lookupType, parent).then(function(response) {
                    query.callback({results : response.data});
                });
            };

            this.initSelection = function(lookupType, parent, initValue, callback) {
                LookupFetcher.promise(lookupType, parent).then(function(response) {
                    var items = _.where(response.data, {id : parseInt(initValue)});
                    if (items.length > 0) {
                        callback(items[0]);
                    }
                });
            };
    }]);

}) ();

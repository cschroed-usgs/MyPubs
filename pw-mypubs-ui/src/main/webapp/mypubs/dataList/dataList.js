(function() {
    var mod = angular.module('pw.dataList', []);

    mod.factory('ListOrderingService', function() {
	var srv = {};

	srv.updateRank = function(list) {
	    var i;
	    for (i = 0; i < list.length; i++) {
		list[i].rank = i + 1;
	    }
	};

	srv.addNewObj = function(list, emptyObj) {
	    var newObj = emptyObj;
	    if (list.length === 0) {
		newObj.rank = 1;
	    }
	    else {
		newObj.rank = _.max(list, function(obj) { return obj.rank; }).rank + 1;
	    }
	    list.push(newObj);
	};

	srv.deleteObj = function(list, index) {
	    list.splice(index, 1);
	    srv.updateRank(list);
	};

	return srv;
    });

})();



(function() {
    var mod = angular.module('pw.dataList', []);

    mod.factory('ListOrderingService', function() {
	// The service assumes that the list objects contain a property, rank, which
	// indicates the ordering of the list.
	var srv = {};

	srv.updateRank = function(list) {
	    var i;
	    for (i = 0; i < list.length; i++) {
		list[i].rank = i + 1;
	    }
	};

	srv.addNewObj = function(list, createEmptyObj) {
	    var newObj = createEmptyObj();
	    var result = list;
	    if (result.length === 0) {
		newObj.rank = 1;
	    }
	    else {
		newObj.rank = _.max(list, function(obj) { return obj.rank; }).rank + 1;
	    }
	    result.push(newObj);
	    return result.concat([]);
	};

	srv.deleteObj = function(list, index) {
	    list.splice(index, 1);
	    srv.updateRank(list);
	};

	return srv;
    });

    mod.directive('pwDataListRow', function() {
	// The onDelete attribute should be a function which removes the row from the DOM and scope.
	return {
	    restrict : 'E',
	    transclude : true,
	    templateUrl : 'mypubs/dataList/data_list_row.html',
	    scope: {
		'delete' : '&onDelete'
	    }
	};
    });

})();



/*global angular*/
(function () {
    var utilModule = angular.module('pw.util', []);
    
	utilModule.service('pwUtil', function(){
		return {
			/**
			 * Compute set-wise equality of arrays. Array items are compared on 
			 * a === basis. Since we are testing for set-wise equality, order 
			 * doesn't matter.
			 * @param {Array} oneSet
			 * @param {Array} anotherSet
			 * @returns {Boolean} true if set-wise equal, false otherwise
			 */
			setWiseEqual: function(oneSet, anotherSet){
				var setsAreEqual = false;
				if(_.isArray(oneSet) && _isArray(anotherSet)){
					if (oneSet.length === anotherSet.length){
						var intersection = _.intersection(oneSet, anotherSet);
						if(oneSet.length === intersection.length){
							setsAreEqual = true;
						}
					}
				}
				return setsAreEqual;
			}
		};
	});
}());

describe('Tests for pw.dataList module', function() {

    beforeEach(module('pw.dataList'));

    it('Should have the module pw.dataList', function() {
	expect(function() { angular.module('pw.dataList'); }).not.toThrow();
    });

    describe('Tests for pw.dataList ListOrderingService', function() {
	var createEmptyObj =  function() {
	    return {
		prop1 : '',
		prop2 : ''
	    };
	};

	it('Expects addNewObj on empty list to update the list to contain a single empty object with rank 1',
	    inject(function(ListOrderingService) {
	    var list = [];
	    ListOrderingService.addNewObj(list, createEmptyObj());
	    expect(list.length).toBe(1);
	    expect(list[0]).toEqual({prop1 : '', prop2 : '', rank : 1});
	}));

	it('Expects addNewObj on a non-empty list to add an empty object to the end and set the rank correctly',
	    inject(function(ListOrderingService) {
	    var list = [{
		prop1 : 'One',
		prop2 : 'Two',
		rank : 1
	    },{
		prop1 : 'Eleven',
		prop2 : 'Twelve',
		rank : 2
	    }];
	    ListOrderingService.addNewObj(list, createEmptyObj());
	    expect(list.length).toBe(3);
	    expect(list[2]).toEqual({prop1 : '', prop2 : '', rank : 3});
	}));

	it('Expects updateRank on an empty list to not change the list', inject(function(ListOrderingService){
	    var list = [];
	    ListOrderingService.updateRank(list);
	    expect(list.length).toBe(0);
	}));

	it('Expects updateRank on a list to update the rank to reflect the current order of the list', inject(function(ListOrderingService) {
	    var list = [
		{prop1 : 'One', rank : 3}, {prop1 : 'Two', rank : 1}, {prop1 : 'Three', rank : 2}, {prop1 : 'Four', rank : 4}];
	    ListOrderingService.updateRank(list);
	    expect(list.length).toBe(4);
	    expect(list).toEqual([{prop1 : 'One', rank : 1}, {prop1 : 'Two', rank : 2}, {prop1 : 'Three', rank : 3}, {prop1 : 'Four', rank : 4}]);
	}));

	it('Expects deleteObj on an empty list to not update the list', inject(function(ListOrderingService){
	    var list = [];
	    ListOrderingService.deleteObj(list, 2);
	    expect(list.length).toBe(0);
	}));

	it('Expects deleteObj to remove the selected object and update the rank property to reflect the new order of the list',
	    inject(function(ListOrderingService) {
	    var list = [{prop1 : 'One', rank : 1}, {prop1 : 'Two', rank : 3}, {prop1 : 'Three', rank : 4}, {prop1 : 'Four', rank : 2}];
	    ListOrderingService.deleteObj(list, 0);
	    expect(list.length).toBe(3);
	    expect(list).toEqual([{prop1 : 'Two', rank : 1}, {prop1 : 'Three', rank : 2}, {prop1 : 'Four', rank : 3}]);
	}));
    });

    describe('Tests for pwDataListRow directive', function() {
	var $compile, $rootScope;
	var deleteSpy = jasmine.createSpy('deleteSpy');
	var templateSrc;
	beforeEach(function() {
	    inject(function() {
		var req = new XMLHttpRequest();
		req.onload = function() {
			templateSrc = this.responseText;
		};
		// Note that the relative path may be different from your unit test HTML file.
		// Using `false` as the third parameter to open() makes the operation synchronous.
		// Gentle reminder that boolean parameters are not the best API choice.
		req.open("get", "src/main/webapp/mypubs/dataList/data_list_row.html", false);
		req.send();
	    });
	});

	beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache) {
	    $compile = _$compile_;
	    $rootScope =_$rootScope_;
	    $rootScope.deleteObj = deleteSpy;
	    $templateCache.put('mypubs/dataList/data_list_row.html', templateSrc);
	}));

	it('Replaces the element with the appropriate content', function() {
	    var testHtml = '<pw-data-list-row on-delete="deleteObj()"><input id="test-input" type="text" /></pw-data-list-row>';
	    var element = $compile(testHtml)($rootScope);
	    $rootScope.$digest();
	    var elementScope = element.scope();
	    expect(element.find('#test-input').length).toBe(1);
	    expect(elementScope.deleteObj).toEqual(deleteSpy);
	});
    });
});
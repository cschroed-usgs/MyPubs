
describe("pw.collection module directive", function() {


	var $scope, threeEntries


	beforeEach(function () {
		threeEntries = 	[
			{
				order:1,id:'a',name:'asdf',
			},
			{
				order:0,id:'b',name:'fdsa',
			},
			{
				order:2,id:'c',name:'qwerty'
			}
		]

		var MockFetcher = {
		//	angular.extend(this)
			testEntries : threeEntries,
			
			get : function() {
				return {
					type3 : threeEntries,
					type0 : [],
					type1 : [ threeEntries[1] ],
					type2 : [ threeEntries[0], threeEntries[1] ],
				}
			}
		}
		angular.module('mock.fetcher',[]).value('PublicationFetcher', MockFetcher)

		module("pw.collection", "mock.fetcher")

		inject(function($rootScope, $compile, $templateCache) {
			$scope = $rootScope
		})

	})


	describe('module existence and set/get tests', function() {

		it('should have a pubs Collection module pw.collection', function() {
			// angular should find a defined mod
			var def = true
			try {
				angular.module('pw.collection')
			} catch(e) {
				def = false
			}
			expect( def ).toBeTruthy()
		});


		it('should have extended the given object', inject(function(Collection){
			var obj = {fn:function(){}}
			var col = Collection(obj)

			expect(col.fn).toBeDefined()
		}))


		it('should have set/get entries to given array', inject(function(Collection) {
			var entries = [{id:'x'},{id:'y'},]
			var col = Collection()
			col.setEntries(entries)

			expect(col.entries).toEqual(entries)
			expect(col.entries).toEqual(col.getEntries())
			expect( col.entries[0].id ).toBe(entries[0].id)
		}))


		it('should have set/get entries to given type', inject(function(Collection) {
			var entries = threeEntries
			var col = Collection()
			col.setEntries(null, 'type3')

			expect(col.entries).toEqual(entries)
			expect(col.entries).toEqual(col.getEntries())
			expect( col.entries[0].id ).toBe(entries[0].id)
		}))

	})

	describe("new entry tests", function(){

		it("should have a tmp id from the client", inject(function(Collection) {
			var entry = Collection()._newEntry()

			expect(entry.id).toBeDefined()
			expect(entry.id.length > 1).toBeTruthy()
			expect(entry.id[0]).toBe('_')
		}))

		it("should have added an order based on number of the enties", inject(function(Collection) {
			var entry, col = Collection()

			entry = col._newEntry()
			expect(entry.order).toBe(0)
			
			entry = col._newEntry()
			expect(entry.order).toBe(1)
			
			entry = col._newEntry()
			expect(entry.order).toBe(2)
		}))

		it("should have each collection independent of another", inject(function(Collection) {
			var entry
			var col1 = Collection()
			var col2 = Collection()

			entry = col1._newEntry()
			expect(entry.order).toBe(0)
			
			entry = col2._newEntry()
			expect(entry.order).toBe(0)

			expect(col1.getEntries().length).toBe(1)
			expect(col2.getEntries().length).toBe(1)
			expect(col2.getEntries()[0]).not.toBe(col1.getEntries()[0])
		}))

		it("should have initiliazed the entry with given fields", inject(function(Collection) {
			var entry, col = Collection()
			entry = col._newEntry(['field1','field2'])

			expect(entry.field1).toBe('')
			expect(entry.field2).toBe('')
			expect(entry.field3).toBeUndefined()
		}))

	})

	describe("entry lookup and find", function(){

		it("should have found entry by id", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.findIndexById('a') ).toBe(0)
			expect( col.findIndexById('b') ).toBe(1)
			expect( col.findIndexById('c') ).toBe(2)
		}))

		it("should have returned -1 index for an id that does not exist", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.findIndexById('z') ).toBe(-1)
		}))

		it("should have found entry by order", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.findEntryByOrder(0).id ).toBe('b')
			expect( col.findEntryByOrder(1).id ).toBe('a')
			expect( col.findEntryByOrder(2).id ).toBe('c')
		}))

		it("should have returned undefined for an order that does not exist", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.findEntryByOrder(12) ).toBeUndefined()
		}))

		it("should have found entry by id", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.findEntryById('a') ).toBe(threeEntries[0])
			expect( col.findEntryById('b') ).toBe(threeEntries[1])
			expect( col.findEntryById('c') ).toBe(threeEntries[2])
		}))

		it("should have returned undefined for an id that does not exist", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.findEntryById('z') ).toBeUndefined()
		}))

	})

	describe("remove entires", function(){

		it("should have removed entry by id (last entry)", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.getEntries().length ).toBe(3)

			col.remove('c')

			expect( col.getEntries().length ).toBe(2)
			expect( col.findEntryById('c') ).toBeUndefined()
		}))

		it("should have reordered later entries after remove (first entry)", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.findEntryByOrder(0).id ).toBe('b')
			expect( col.findEntryByOrder(2).id ).toBe('c')

			col.remove('a')
			
			expect( col.findEntryByOrder(0).id ).toBe('b')
			expect( col.findEntryByOrder(1).id ).toBe('c')

		}))

		it("should have reordered remaining entries after remove (middle entry)", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			expect( col.findEntryByOrder(1).id ).toBe('a')
			expect( col.findEntryByOrder(2).id ).toBe('c')

			col.remove('b')
			
			expect( col.findEntryByOrder(0).id ).toBe('a')
			expect( col.findEntryByOrder(1).id ).toBe('c')

		}))

		it("should have be able to remove the last remaining entry", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type1")

			col.remove('b')
			
			expect( col.getEntries().length ).toBe(0)
		}))

		it("should have do nothing on remove on empty set", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type0")

			col.remove('b')
			
			expect( col.getEntries().length ).toBe(0)
		}))

	})


	describe("reorder entires", function(){

		it("should have reordered entry from 1 to 0 - backward", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			col.reorder('a',-1)

			// swap a and b
			expect( threeEntries[0].order ).toBe(0)
			expect( threeEntries[1].order ).toBe(1)
			// expect this one to be unchanged
			expect( threeEntries[2].order ).toBe(2)

		}))

		it("should have reordered entry from 1 to 2 - forward", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			col.reorder('a',+1)

			// swap a and c
			expect( threeEntries[0].order ).toBe(2)
			expect( threeEntries[2].order ).toBe(1)
			// expect this one to be unchanged
			expect( threeEntries[1].order ).toBe(0)

		}))

		it("should NOT have reordered entry from 0 to 0 (unchanged) - backwards", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			col.reorder('b',-1)

			// expect to be unchanged
			expect( threeEntries[0].order ).toBe(1)
			expect( threeEntries[1].order ).toBe(0)
			expect( threeEntries[2].order ).toBe(2)

		}))

		it("should NOT have reordered entry from 2 to 2 (unchanged) - forward", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			col.reorder('c',+1)

			// expect to be unchanged
			expect( threeEntries[0].order ).toBe(1)
			expect( threeEntries[1].order ).toBe(0)
			expect( threeEntries[2].order ).toBe(2)

		}))

		it("should NOT have reordered entry that is not found", inject(function(Collection) {
			var col = Collection()
			col.setEntries(null,"type3")

			col.reorder('z',+1)

			// expect to be unchanged
			expect( threeEntries[0].order ).toBe(1)
			expect( threeEntries[1].order ).toBe(0)
			expect( threeEntries[2].order ).toBe(2)

		}))

	})

})

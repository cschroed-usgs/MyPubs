describe("Javascript importing", function() {
	//this is only imported during and required for testing
    it("loads sinon library for testing support", function() { 
        expect(sinon).toBeDefined();
    });
    
    it("loads jQuery library", function() {
        expect(jQuery).toBeDefined();
    }); 
       
    it("loads Angular library", function() {
        expect(angular).toBeDefined();
    }); 
       
    it("loads Angular Mocks library", function() {
        expect(angular.mock).toBeDefined();
    }); 
       
    it("loads underscore.js library", function() {
        expect(_).toBeDefined();
    });
});


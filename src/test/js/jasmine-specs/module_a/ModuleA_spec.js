/*global myco:true */

describe('ModuleA.js', function() {
	
	describe('add', function() {
		var add= myco.webappTemplate.moduleA.ModuleA.add;
		
		it('adds two numbers', function() {
			expect(add(1,2)).toBe(3);
		});
		
	});
	
	
});
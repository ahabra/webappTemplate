/*global myco:true, namespace:true */

namespace('myco.webappTemplate.moduleA.ModuleA');

(function() {
	myco.webappTemplate.moduleA.ModuleA.add = add;
	
	function add(a,b) {
		
		return a+b;
	}
	
})();
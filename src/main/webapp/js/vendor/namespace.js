/*global _, window, tstring */

var tek271Libs= tek271Libs || {};

tek271Libs.namespace = function(path) {
	if (_.isUndefined(path) || path===null || tstring(path).isBlank()) { return;}
  
	var parent= window;
	_.each(path.split('.'), function(part) {
		part= tstring(part).trim();
		parent[part]= parent[part] || {};
		parent= parent[part];
	});
  
};

var namespace = tek271Libs.namespace;

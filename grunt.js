/*global module:true */

module.exports = function(grunt) {
  var gruntSupport = GruntSupport(grunt);
	
	// Project configuration.
	grunt.initConfig({
		lint : {
			files: gruntSupport.getLintFiles()
		},

		jshint : {  // http://www.jshint.com/docs/
			options : {
				browser: true,			// define document, navigator, ...
				jquery: true,				// define $, jQuery
				
				bitwise: true,      // prohibit single | &
				camelcase: true,    // variables must use camel case, no underscore
				eqeqeq: true,       // must use === for comparisions, no ==
				forin: true,
				noarg: true,        // prohibit arguments.caller and arguments.callee. deprecated
				undef:true,
				unused: true,
				trailing: true,     // no line trailing spaces
				maxparams:5,        // of functions
				maxdepth: 2,        // of nested blocks
				maxstatements: 12   // in a function
			},
			globals: {
				describe:true, it:true, expect:true,  // jasmine
				_:true   // underscore.js
			}
		},

		jasmine : {
			src : gruntSupport.getVendeorDependency().concat(['src/main/webapp/js/**/*.js']),
			specs : 'src/test/js/jasmine-specs/**/*_spec.js',
			timeout : 5000,
			junit : {
				output : 'target/jasmine/'
			},
			phantomjs : {
				'ignore-ssl-errors' : true
			}
		}

	});

	// IMPORTANT: run this before you run grunt 1st time in this project:
	//    npm install grunt-jasmine-runner
	// it will create the "node_modules/" directory in the project's root
	grunt.loadNpmTasks('grunt-jasmine-runner');

	// Default task.
	grunt.registerTask('default', 'lint jasmine');

};

/** Helper functions to support the main grunt module */
function GruntSupport(grunt) {
	
	function getLintFiles() {
		var jsRoots =['grunt.js', 'src/test/js/jasmine-specs/**/*.js', 'src/main/webapp/js/**/*.js'];
		var files = grunt.file.expandFiles(jsRoots).filter(function(file) {
			return file.indexOf('/vendor/') < 0;
		});
		return files;
	}

	function getVendeorDependency() {
		var dep= ['jquery', 'underscore', 'tstring', 'namespace'];
		for (var i=0; i<dep.length; i++) {
			dep[i] = 'src/main/webapp/js/vendor/' + dep[i] + '.js';
		}
		return dep;
	}
	
	return {
		getLintFiles: getLintFiles,
		getVendeorDependency: getVendeorDependency
	};
}

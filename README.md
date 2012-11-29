Web App Template

The is a template for a web app: Java with Maven, JavaScript with Grunt.

It consists of the following:
1. Maven project which produces war file
2. Maven dependencies added for: junit, commons-lang3, guava-13
3. The web app directory includes a JavaScript directory (js)
4. Third-party JS files are in js/vendor, include: jquery, underscore.js, namespace.js, tstring.js
5. Jasmine specs in test/js/jasmine-specs
6. grunt.js file configured to lint all the js code and run jasmine specs.

Java Dependencies:
1. JDK 1.6
2. Maven 3

JavaScript Dependencies:
1. node.js
2. phantom.js
3. grunt.js

Make sure that all dependencies are installed on your machine before you start running the app.

To build with maven, at the command line in your project's directory:
mvn clean package

To run with grunt, at the command line in your project's directory:

run this once: npm install grunt-jasmine-runner

then run
grunt

to lint and run your jasmine specs



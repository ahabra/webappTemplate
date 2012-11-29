# Web App Template

The is a template for a web app: Java with Maven, JavaScript with Grunt.

It consists of the following:
<ol>
  <li>Maven project which produces war file</li>
  <li>Maven dependencies added for: junit, commons-lang3, guava-13</li>
  <li>The web app directory includes a JavaScript directory (js)</li>
  <li>Third-party JS files are in js/vendor, include: jquery, underscore.js, namespace.js, tstring.js</li>
  <li>Jasmine specs in test/js/jasmine-specs</li>
  <li>grunt.js file configured to lint all the js code and run jasmine specs.</li>
</ol>

Java Dependencies:
<ol>
  <li>JDK 1.6</li>
  <li>Maven 3</li>
</ol>

JavaScript Dependencies:
<ol>
  <li>node.js</li>
  <li>phantom.js: for running jasmine specs in headless browser</li>
  <li>grunt.js</li>
</ol>

Make sure that all dependencies are installed on your machine before you start running the app.

To build with maven, at the command line in your project's directory:
<pre>mvn clean package</pre>

To run with grunt, at the command line in your project's directory:

run this once: 
<pre>npm install grunt-jasmine-runner</pre>

then run
<pre>grunt</pre>

to lint and run your jasmine specs

To run jasmine in a browser:
<pre>grunt jasmine-server</pre>

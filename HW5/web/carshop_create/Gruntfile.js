module.exports = function (grunt) {
	"use strict";
	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");
	grunt.registerTask("default", [
		"lint",
		"lint",
		"build"
	]);
	grunt.config.set("deploy_mode", "html_repo");
};
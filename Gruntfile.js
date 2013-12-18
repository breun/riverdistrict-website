module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat_css: {
    		options: {
    		  // Task-specific options go here.
    		},
    		all: {
    		  src: ["./css/*.css"],
    		  dest: "allstyles.css"
    		},
  		},
    });

    grunt.loadNpmTasks('grunt-concat-css');

    grunt.registerTask('default', ['concat_css']);

};
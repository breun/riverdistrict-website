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
        watch: {
            files: "./css/*.css",
            tasks: ['concat_css']
        },
    });

    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat_css']);

};
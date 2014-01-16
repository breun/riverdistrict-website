module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    //     concat_css: {
    // 		options: {
    // 		  // Task-specific options go here.
    // 		},
    // 		all: {
    // 		  src: ["./css/*.css"],
    // 		  dest: "allstyles.css"
    // 		},
  		// },
concat: {
            css: {
                src: [
                    'css/*.css'
                ],
                dest: 'allstyles.css'
            },
            js: {
                src: [
                    'used/*.js'
                ],
                dest: 'dest/combined.js'
            }
        },

        //

        cssmin : {
            css:{
                src: 'allstyles.css',
                dest: 'allstyles.min.css'
            }
        },

        uglify: {
            js: {
                files: {
                    'dest/combined.js': ['dest/combined.js']
                }
            }
        },

        watch: {
            files: ['./css/*.css','used/*.js'],
            tasks: ['concat','cssmin', 'uglify' ]
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);

};
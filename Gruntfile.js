module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        cssmin : {
            css: {
                src: 'allstyles.css',
                dest: 'dest/allstyles.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'dest/combined.js': ['dest/combined.js']
                }
            }
        },
	copy: {
	    main: {
	        src: ['1px.png', 'favicon.ico', 'images/**', 'index.html', 'jquery.min.js', 'riverdistrict-presskit.zip'],
		dest: 'dest/'
	    }
	},
        watch: {
            files: ['./css/*.css', 'used/*.js'],
            tasks: ['concat', 'cssmin', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js', 'copy']);
};

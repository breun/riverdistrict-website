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
                dest: 'combined.js'
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
                    'dest/combined.min.js': ['combined.js']
                }
            }
        },
	copy: {
	    main: {
	        src: ['.htaccess', 'favicon.ico', 'images/**', 'index.html', 'jquery.min.js', 'riverdistrict-presskit.zip'],
		dest: 'dest/'
	    }
	},
        watch: {
	    css: {
	        files: 'css/*.css',
		tasks: ['concat:css', 'cssmin']
	    },
	    js: {
	        files: 'used/*.js',
                tasks: ['concat:js', 'uglify']
	    },
	    "static": {
	        files: ['.htaccess', 'favicon.ico', 'images/**', 'index.html', 'jquery.min.js', 'riverdistrict-presskit.zip'],
                tasks: ['copy']
	    }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'copy']);
};

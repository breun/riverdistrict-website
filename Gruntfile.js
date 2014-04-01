module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'css/*.css'
                ],
                dest: 'allstyles.css'
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
                    'dest/combined.min.js': ['js/*.js']
                }
            }
        },
	copy: {
	    main: {
	        expand: true,
	        cwd: 'static/',
	        src: '**',
		dest: 'dest/'
	    }
	},
        watch: {
	    css: {
	        files: 'css/*.css',
		tasks: ['concat:css', 'cssmin']
	    },
	    js: {
	        files: 'js/*.js',
                tasks: 'uglify'
	    },
	    main: {
	        files: 'static/**',
                tasks: 'copy'
	    }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'concat', 'cssmin', 'uglify']);
};

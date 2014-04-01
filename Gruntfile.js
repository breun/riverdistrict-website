module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin : {
            css: {
                src: 'css/*.css',
                dest: 'dest/allstyles.min.css'
            }
        },
        uglify: {
            js: {
	        src: 'js/*.js',
		dest: 'dest/combined.min.js'
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
		tasks: 'cssmin'
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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'cssmin', 'uglify']);
};

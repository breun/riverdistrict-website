module.exports = function (grunt) {

    grunt.initConfig({

        clean: ['dest/'],
        
        connect: {
            server: {
                options: {
                    base: 'dest/',
                    keepalive: true
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
        
        cssmin : {
            css: {
                src: 'css/*.css',
                dest: 'dest/combined.min.css'
            }
        },
        
        uglify: {
            js: {
                src: 'js/*.js',
                dest: 'dest/combined.min.js'
            }
        },
        
        compress: {
            presskit: {
                options: {
                    archive: 'dest/riverdistrict-presskit.zip'
                },
                expand: true,
                cwd: 'presskit/',
                src: '**'
            }
        },
        
        watch: {
            presskit: {
                files: 'presskit/**',
                tasks: 'compress'
            },
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
        },

	rsync: {
	    options: {
	        args: ['--recursive', '--compress', '--checksum', '--delete', '--verbose']
	    },
	    prod: {
	        options: {
		    src: 'dest/',
		    dest: '/riverdistrictmusic.com/',
		    host: 'breun@breun.nl'
		}
	    }
	}
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-rsync");

    grunt.registerTask('default', ['clean', 'copy', 'cssmin', 'uglify', 'compress']);
};
